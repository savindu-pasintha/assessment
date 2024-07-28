const sequelize = require('./sequalizeDB');
const EmployeeTable = require('./models/employeeTable');
const CafeTable = require('./models/cafeTable');
const EmploymentTable = require('./models/employmentTable');

// Relationships
EmployeeTable.belongsToMany(CafeTable, { through: EmploymentTable });
CafeTable.belongsToMany(EmployeeTable, { through: EmploymentTable });

module.exports = {
    EmployeeTable,
    CafeTable,
    EmploymentTable,
    sequelize,
};
