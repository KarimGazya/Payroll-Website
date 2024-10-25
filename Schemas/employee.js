//Requires
const mongoose = require("mongoose");

//Database Init
mongoose.connect("mongodb://0.0.0.0:27017/PayrollDB", {
  useNewUrlParser: true,
});

//Employee Init
const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
});

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
