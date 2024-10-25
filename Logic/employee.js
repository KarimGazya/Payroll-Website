const Employee = require("../Schemas/employee");

module.exports = {
  addEmployee: function (name, address, email, departmentID) {
    const emp = new Employee({
      name: name,
      address: address,
      email: email,
      department: departmentID,
    });
    emp.save();
  },
  findEmployees: async function () {
    const data = await Employee.find();

    return data.sort(function (emp1, emp2) {
      if (emp1.name[0].toLowerCase() < emp2.name[0].toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  },
  findEmployee: async function (id) {
    const data = await Employee.find({ _id: id });
    return data;
  },
  findByDepartment: async function (id) {
    const data = await Employee.find({ department: id });
    return data.sort(function (emp1, emp2) {
      if (emp1.name[0].toLowerCase() < emp2.name[0].toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  },
  deleteEmployee: function (id) {
    Employee.deleteOne({ _id: id }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  },
  updateEmployee: function (EmployeeID, name, address, email, departmentID) {
    Employee.updateOne(
      { _id: EmployeeID },
      { name: name, address: address, email: email, department: departmentID },
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  },
};
