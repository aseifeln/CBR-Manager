const { Op } = require('sequelize')

const validLocations = ['BidiBidi Zone 1', 'BidiBidi Zone 2', 'BidiBidi Zone 3',
    'BidiBidi Zone 4', 'BidiBidi Zone 5', 'Palorinya Basecamp',
    'Palorinya Zone 1', 'Palorinya Zone 2', 'Palorinya Zone 3'];
const validDisabilities = [
    'Amputee', 'Polio', 'Spinal Cord Injury', 'Cerebral Palsy',
    'Spina Bifida', 'Hydrocephalus', 'Visual Impairment', 'Hearing Impairment',
    'Don\'t Know', 'Other'];

function ValidateFilters(filters) {
    // Removes all nulls from the object
    let validatedFilters = Object.fromEntries(Object.entries(filters).filter(filter => {
        const [key, val] = filter;
        if (key === 'location' || 'DisabilityType' || 'Date') {
            return (filters[key][0] !== null);
        }
        return (filters[key] !== null);
    }));

    // Checks all types are correct (eg. Dateformat, location enum, disability enum, date range)
    for (let [key, val] of Object.entries(validatedFilters)) {
        if (key === 'location') {
            val = JSON.parse(val)
            let locations = val.filter(location => {
                return !!validLocations.find(validLocation => location === validLocation);
            })
            if (locations.length !== 0) {
                validatedFilters[key] = locations;
            }
        }
        else if (key === 'DisabilityType') {
            val = JSON.parse(val)
            let disabilities = val.filter(disability => {
                return !!validDisabilities.find(validDisability => disability === validDisability);
            })
            if (disabilities.length !== 0) {
                validatedFilters[key] = disabilities;
            }
        }
        else if (key === 'Date') {
            let date = JSON.parse(validatedFilters.Date)
            if (date.length === 1) {
                let dateParsed = date[0].split('-').reverse().map(Number);
                validatedFilters.Date = new Date(dateParsed[0], dateParsed[1], dateParsed[2]);
            }
            else if (date.length === 2) {
                let from = date[0].split('-').reverse().map(Number);
                let to = date[1].split('-').reverse().map(Number);

                let fromDate = new Date(from[0], from[1], from[2])
                let toDate = new Date(to[0], to[1], to[2])

                validatedFilters.Date = {
                    [Op.between]: [fromDate, toDate]
                }
            }
        }
    }
    return validatedFilters;
}

function MatchFilters(filters, query) {
    const validQuery = Object.entries(query).filter(entry => {
        const [key, val] = entry;
        return filters.hasOwnProperty(key);
    });

    validQuery.map(filter => {
        const [key, val] = filter;
        return filters[key] = val
    });
}

module.exports = { ValidateFilters, MatchFilters }
