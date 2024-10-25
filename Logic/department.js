const Department = require("../Schemas/department");
const mongoose = require("mongoose");

module.exports = {
  addDepartment: function (name) {
    const department = new Department({
      name: name,
    });
    department.save();
    console.log("done");
  },
  findDepartments: async function () {
    const data = await Department.find();
    return data.sort(function (dep1, dep2) {
      if (dep1.name[0].toLowerCase() < dep2.name[0].toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  },
  findDepartment: async function (id) {
    const data = await Department.find({ _id: id });
    return data;
  },
  findByName: async function (name) {
    const data = await Department.find({ name: name });
    return data;
  },
};
