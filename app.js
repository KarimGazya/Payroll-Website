//Requires
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Employee = require("./Logic/employee");
const Department = require("./Logic/department");
const Payroll = require("./Logic/payroll");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let messager = "";
let Emps = [];
let pay = [];
let depList = [];
let EmployeesList = [];
let depName = "Choose Department";
let depID = "";
let departmentN = "";

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/Department.ejs", function (req, res) {
  res.render("Department", { message: messager });
  messager = "";
});

app.post("/Department.ejs", function (req, res) {
  Department.findByName(req.body.Name).then((data) => {
    if (data[0]) {
      messager = "Department name already exists!";
    } else {
      Department.addDepartment(req.body.Name);
      messager = "Info added Successfully";
    }
  });

  res.redirect("/Department.ejs");
});

app.get("/Edit.ejs", function (req, res) {
  let name, address, email, department, test;
  Employee.findEmployee(req.query.q).then((data) => {
    name = data[0].name;
    address = data[0].address;
    email = data[0].email;
    test = data[0].department;

    Department.findDepartment(test[0].toString()).then((data) => {
      department = data[0];

      Department.findDepartments().then((data) => {
        res.render("Edit", {
          message: messager,
          departmentslist: data,
          Name: name,
          Address: address,
          Email: email,
          id: req.query.q,
          department: department,
        });
        messager = "";
      });
    });
  });
});

app.post("/Edit.ejs", function (req, res) {
  Employee.updateEmployee(
    req.query.q,
    req.body.name,
    req.body.address,
    req.body.email,
    req.body.did
  );
  res.redirect("/Search.ejs");
});

app.get("/Employee.ejs", function (req, res) {
  Department.findDepartments().then((data) => {
    res.render("Employee", {
      message: messager,
      departmentslist: data,
    });
    messager = "";
  });
});

app.post("/Employee.ejs", function (req, res) {
  Employee.addEmployee(
    req.body.name,
    req.body.address,
    req.body.email,
    req.body.did
  );
  messager = "Info added Successfully";
  res.redirect("/Employee.ejs");
});

app.get("/payroll.ejs", function (req, res) {
  let date = calendar();

  Employee.findEmployees().then((data) => {
    res.render("payroll", {
      message: messager,
      EmployeesList: data,
      date: date,
    });
    messager = "";
  });
});

app.post("/payroll.ejs", function (req, res) {
  Payroll.addPayroll(
    req.body.Eid,
    Number(req.body.Salary),
    new Date(req.body.Date)
  );

  messager = "Info added Successfully";
  res.redirect("/payroll.ejs");
});

app.get("/Search.ejs", function (req, res) {
  EmployeesList = [];
  depID = "";
  messager = "";

  if (req.query.name) {
    depName = req.query.name;
  } else {
    depName = "--Choose Department--";
  }

  if (req.query.o) {
    Employee.deleteEmployee(req.query.q);
    Payroll.deleteEmployeeHistory(req.query.q);
    messager = "Employee info deleted !";
    Employee.findEmployees().then((data) => {
      EmployeesList = data;
      res.render("Search", {
        Department: depName,
        departmentList: depList,
        EmployeesList: EmployeesList,
        Employee: Emps,
        departments: departmentN,
        message: messager,
      });
      Emps = [];
      messager = "";
    });
  }

  if (req.query.q) {
    depID = req.query.q;

    Employee.findByDepartment(depID).then((data) => {
      EmployeesList = data;

      Department.findDepartments().then((data) => {
        depList = data;

        res.render("Search", {
          Department: depName,
          departmentList: depList,
          EmployeesList: EmployeesList,
          Employee: Emps,
          departments: departmentN,
          message: messager,
        });
        Emps = [];
      });
    });
  } else {
    Department.findDepartments().then((data) => {
      depList = data;
    });
    Employee.findEmployees().then((data) => {
      EmployeesList = data;
      res.render("Search", {
        Department: depName,
        departmentList: depList,
        EmployeesList: EmployeesList,
        Employee: Emps,
        departments: departmentN,
        message: messager,
      });
      Emps = [];
    });
  }
});

app.post("/Search.ejs", function (req, res) {
  Emps = [];

  if (req.body.Name == "noEmployee") {
    Employee.findByDepartment(depID).then((data) => {
      Emps = data;
    });
    Department.findDepartment(depID).then((data) => {
      departmentN = data[0].name;
    });
    res.redirect("/Search.ejs");
  } else {
    Employee.findEmployee(req.body.Name).then((data) => {
      Emps = data;
      Department.findDepartment(Emps[0].department[0]._id.toString()).then(
        (data) => {
          departmentN = data[0].name;
        }
      );
    });

    res.redirect("/Search.ejs");
  }
});

app.get("/options.ejs", function (req, res) {
  let empN = "";
  Employee.findEmployee(req.query.q).then((data) => {
    empN = data[0].name;
    Payroll.findByEmployee(req.query.q).then((data) => {
      pay = data.sort(function (pay1, pay2) {
        console.log(pay1);
        if (pay1.date.getMonth() < pay2.date.getMonth()) {
          return -1;
        } else {
          return 1;
        }
      });

      res.render("options", { payRoll: pay, Name: empN });
      pay = [];
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

function calendar() {
  today = new Date();
  data =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return data;
}
