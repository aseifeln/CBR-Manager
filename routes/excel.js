const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const excel = require('excel4node');
const client = require('../models/client');


// @route   GET /excel
// @desc    GET all filtered clients in an excel format
router.get('/', async (req,res) => {

    // Get all filtered clients
    let filters = JSON.parse(req.query.filters);
    let sortBy = [[req.query.sortBy, "DESC"]];
    if (sortBy[0][0] === '') {
        sortBy = [];
    }

    let disabilitiesInSearch = filters.hasOwnProperty('DisabilityType');
    let nameInSearch = filters.hasOwnProperty('FirstName') || filters.hasOwnProperty('LastName');
    let selectionClause;
    if (nameInSearch && disabilitiesInSearch) {
        selectionClause = {
            [Op.or]:
                [
                    {FirstName: {[Op.in]: [filters.FirstName, filters.LastName]}},
                    {LastName: {[Op.in]: [filters.FirstName, filters.LastName]}},
                    delete filters['FirstName'],
                    delete filters['LastName'],
                ],
            [Op.and]:
                [
                    {DisabilityType: {[Op.contains]: [filters.DisabilityType]}},
                    delete filters['DisabilityType'],
                    filters,

                ]
        }
    } else if (nameInSearch && !disabilitiesInSearch) {
        selectionClause = {
            [Op.or]:
                [
                    {FirstName: {[Op.in]: [filters.FirstName, filters.LastName]}},
                    {LastName: {[Op.in]: [filters.FirstName, filters.LastName]}},
                    delete filters['FirstName'],
                    delete filters['LastName'],
                ],
            [Op.and]: filters
        }
    } else if (!nameInSearch && disabilitiesInSearch) {
        selectionClause = {
            [Op.and]:
                [
                    {DisabilityType: {[Op.contains]: [filters.DisabilityType]}},
                    delete filters['DisabilityType'],
                    filters,
                ]
        }
    } else {
        selectionClause = filters;
    }

    let allClients = await client.findAll(
        {
            // SELECT * FROM Clients WHERE FirstName IN filters.Name OR LastName IN filters.Name
            where: selectionClause,
            order: sortBy,
        })
        .then()
        .catch(err => res.status(400).json(err));

    // Create Excel Workbook
    const wb = new excel.Workbook();

    let clientSheet = wb.addWorksheet('Clients');

    await generateGenericWorkSheet(wb, clientSheet, allClients)
        .then(wb.write('excel.xlsx', res))
        .catch(err => res.status(400).json(err));
})

// Takes an Excel workbook and sheet then adds the data to the sheet.
// data must come from a database call
async function generateGenericWorkSheet(workBook, workSheet, data) {
    // Excel Sheet Headers
    let headerStyle = workBook.createStyle({
        font: {
            color: 'black',
            size: '14',
            bold: true,
            underline: true,
        },
        alignment: {
            horizontal: 'center',
        }
    })

    let cellStyle = workBook.createStyle({
        font: {
            color: 'black',
            size: '14',
        },
        alignment: {
            wrapText: false,
            horizontal: 'left',
        }
    })
    const attributes = data[0]._options.attributes;
    for (let i = 0; i < attributes.length - 1; i++) {
        workSheet.cell(1, i + 1)
            .string(attributes[i])
            .style(headerStyle)
        workSheet.column(i + 1).setWidth(18);
    }
    // Fill cells with client data
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < attributes.length; j++) {
            let currAttribute = attributes[j]
            let currValue = data[i].dataValues[currAttribute];

            switch (typeof(currValue)) {
                case 'number':
                    workSheet.cell(i + 2, j + 1)
                        .number(currValue)
                        .style(cellStyle)
                    break;
                case 'string':
                    workSheet.cell(i + 2, j + 1)
                        .string(currValue)
                        .style(cellStyle)
                    break;
                case 'object':
                    if (currAttribute === 'DateCreated') {
                        workSheet.cell(i + 2, j + 1)
                            .date(currValue).style({numberFormat: 'dd-mm-yyyy'})
                            .style(cellStyle)
                    } else if (currAttribute === 'DisabilityType') {
                        workSheet.cell(i + 2, j + 1)
                            .string(currValue)
                            .style(cellStyle)
                    }
                    break;
            }
        }
    }
}

module.exports = router;