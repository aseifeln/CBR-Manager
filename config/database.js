const { Sequelize } = require('sequelize');

//Connecting to DB

// Reference: https://github.com/sequelize/sequelize/issues/956
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
