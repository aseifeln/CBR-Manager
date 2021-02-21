
const { Sequelize } = require('sequelize');

//Connecting to DB

// Reference: https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7
if (process.env.NODE_ENV === 'production')
{
    module.exports = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
}
else 
{
    module.exports = new Sequelize('postgres://' + process.env.DB_URL)
}