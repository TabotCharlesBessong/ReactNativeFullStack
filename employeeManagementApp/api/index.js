const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const moment = require("moment");
const dotenv = require("dotenv");
// const { addEmployee } = require('./controller/employee.controller.js')
const Employee = require("./models/employee.js");

const app = express();
const port = 5000 || process.env.PORT;
app.use(cors());
dotenv.config();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the DB!!!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB ", error);
  });

app.listen(port, () => {
  console.log(`The server is running on port number ${port}.....`);
});

app.post("/add-employee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee saved successfully", employee: newEmployee });
  } catch (error) {
    console.log("Error creating an employee", error);
    res.status(500).json({ message: "Failed to add employee" });
  }
});

app.get("/employees",async (req,res) => {
  try {
    const employees = await Employee.find()
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({message:"Failed to retrieve all the employees"})
  }
})