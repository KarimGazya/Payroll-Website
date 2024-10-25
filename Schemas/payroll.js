//Requires
const mongoose = require("mongoose");

//Database Init
mongoose.connect("mongodb://0.0.0.0:27017/PayrollDB", {
  useNewUrlParser: true,
});

const payrollSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  employee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Payroll = mongoose.model("payroll", payrollSchema);

module.exports = Payroll;
