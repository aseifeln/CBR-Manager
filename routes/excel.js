const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const excel = require('excel4node');
const client = require('../models/client');

// @route   GET /excel
// @desc    GET all filtered clients in an excel format
router.get('/', async (req,res) => {

    // Get all filtered clients
    let filters = req.query;
    let nameInSearch = filters.hasOwnProperty('FirstName') || filters.hasOwnProperty('LastName')
    let selectionClause = {
        [Op.or]:
            [
                {FirstName: {[Op.in]: [filters.FirstName, filters.LastName]}},
                {LastName: {[Op.in]: [filters.FirstName, filters.LastName]}},
                delete filters['FirstName'],
                delete filters['LastName'],

            ],
        [Op.and]: filters
    }
    if (!nameInSearch) {
        selectionClause = filters;
    }

    let allClients = await client.findAll(
        {
            // SELECT * FROM Clients WHERE FirstName IN filters.Name OR LastName IN filters.Name
            where: selectionClause
        })
        .then()
        .catch(err => res.status(400).json(err));

    // Create Excel Workbook
    const wb = new excel.Workbook();

    let clientSheet = wb.addWorksheet('Clients');

    // Excel Sheet Headers
    let headerStyle = wb.createStyle({
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

    let cellStyle = wb.createStyle({
        font: {
            color: 'black',
            size: '14',
        },
        alignment: {
            wrapText: false,
            horizontal: 'left',
    }
    })

    const clientAttributes = allClients[0]._options.attributes;
    for (let i = 0; i < clientAttributes.length - 1; i++) {
        clientSheet.cell(1, i + 1)
            .string(clientAttributes[i])
            .style(headerStyle)
        clientSheet.column(i + 1).setWidth(18);
    }
    // Fill cells with client data
    for (let i = 0; i < allClients.length; i++) {
        for (let j = 0; j < clientAttributes.length; j++) {
            let currAttribute = clientAttributes[j]
            let currValue = allClients[i].dataValues[currAttribute];

            switch (typeof(currValue)) {
                case 'number':
                    clientSheet.cell(i + 2, j + 1)
                        .number(currValue)
                        .style(cellStyle)
                    break;
                case 'string':
                    clientSheet.cell(i + 2, j + 1)
                        .string(currValue)
                        .style(cellStyle)
                    break;
                case 'object':
                    if (currAttribute === 'DateCreated') {
                        clientSheet.cell(i + 2, j + 1)
                            .date(currValue).style({numberFormat: 'dd-mm-yyyy'})
                            .style(cellStyle)
                    }
                    break;
            }
        }
    }
    wb.write('excel.xlsx', res);
})


module.exports = router;