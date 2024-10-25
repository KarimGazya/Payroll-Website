//Requires
const mongoose = require("mongoose");

//Database Init
mongoose.connect("mongodb://0.0.0.0:27017/PayrollDB", {
  useNewUrlParser: true,
});

//Department Init
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;
