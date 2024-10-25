const Payroll = require("../Schemas/payroll");

module.exports = {
  addPayroll: function (employeeID, salary, date) {
    const pay = new Payroll({
      employee: employeeID,
      salary: salary,
      date: date,
    });
    pay.save();
  },
  findByEmployee: async function (id) {
    const data = await Payroll.find({ employee: id });
    return data;
  },
  deleteEmployeeHistory: function (id) {
    Payroll.deleteMany({ employee: id }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  },
};
