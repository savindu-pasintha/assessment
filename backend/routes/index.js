const express = require('express');
const router = express.Router();
const {sample_error,sample_success} = require("../utilities")
const {
  EmployeeTable,
  CafeTable,
  EmploymentTable,
} = require('../db/index')

/**
 * @swagger
 * tags:
 *   name: Cafes
 *   description: Cafes operations
 */

/**
 * @swagger
 * /cafes:
 *   get:
 *     tags: [Cafes]
 *     description: Get cafes by location
 *     parameters:
 *       - name: location
 *         in: query
 *         description: Location to filter cafes
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cafes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Cafe ID (UUID)
 *                   name:
 *                     type: string
 *                     description: Cafe name
 *                   description:
 *                     type: string
 *                     description: Cafe description
 *                   logo:
 *                     type: string
 *                     description: Cafe logo URL
 *                   location:
 *                     type: string
 *                     description: Cafe location
 *                   employees:
 *                     type: integer
 *                     description: Number of employees
 */
router.get('/cafes', (req, res) => {
  try{
    CafeTable.findAll({where:{location: req?.query?.location}}).then((data)=>res.json(data)).catch((err)=>res.json(sample_error))
  }catch(e){
    res.json(sample_error)
    // res.json([
    //   { id: 'uuid-1', name: 'Cafe A', description: 'Description A', location: 'Location A', employees: 10 ,logo:"https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg"},
    //   { id: 'uuid-2', name: 'Cafe B', description: 'Description B', location: 'Location B', employees: 5,logo:"https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg" }
    // ]);
  }
});

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employees operations
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     tags: [Employees]
 *     description: Get employees by café
 *     parameters:
 *       - name: cafe
 *         in: query
 *         description: Cafe to filter employees
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Employee ID
 *                   name:
 *                     type: string
 *                     description: Employee name
 *                   email_address:
 *                     type: string
 *                     description: Employee email
 *                   phone_number:
 *                     type: string
 *                     description: Employee phone number
 *                   days_worked:
 *                     type: integer
 *                     description: Number of days worked
 *                   cafe:
 *                     type: string
 *                     description: Cafe name
 */
router.get('/employees', (req, res) => {
  try{
    EmployeeTable.findAll({where:{cafe: req?.query?.cafe}}).then((data)=>res.json(data)).catch((err)=>res.json(sample_error))
  }catch(e){
    res.json(sample_error)
    // res.json([
    //   { id: 'UI1234567', name: 'John Doe', email_address: 'john@example.com', phone_number: '91234567', days_worked: 20, cafe: 'Cafe A' },
    //   { id: 'UI7654321', name: 'Jane Smith', email_address: 'jane@example.com', phone_number: '81234567', days_worked: 15, cafe: 'Cafe B' }
    // ]);
  }
});

/**
 * @swagger
 * /cafe:
 *   post:
 *     tags: [Cafes]
 *     description: Create a new café
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               logo:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Café created
 */
router.post('/cafe', (req, res) => {
  try{
    CafeTable.create(req?.body).then((data)=>res.json(sample_success)).catch((err)=>res.json(sample_error))
  }catch(e){
    res.json(sample_error)
  }
});

/**
 * @swagger
 * /employee:
 *   post:
 *     tags: [Employees]
 *     description: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email_address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               gender:
 *                 type: string
 *               cafe:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created
 */
router.post('/employee', (req, res) => {
  try{
    EmployeeTable.create(req?.body).then((data)=>res.json(sample_success)).catch((err)=>res.json(sample_error))
  }catch(e){
    res.json(sample_error)
  }
});

/**
 * @swagger
 * /cafe:
 *   put:
 *     tags: [Cafes]
 *     description: Update café details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               logo:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Café updated
 */
router.put('/cafe', (req, res) => {
  try{
    CafeTable.update(req?.body,{where:{id:req?.body.id}}).then((data)=>res.json(sample_success)).catch((err)=>res.json(sample_error))
  }catch(e){
    res.json(sample_error)
  }
});

/**
 * @swagger
 * /employee:
 *   put:
 *     tags: [Employees]
 *     description: Update employee details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email_address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               gender:
 *                 type: string
 *               cafe:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated
 */
router.put('/employee', (req, res) => {
  try{
    EmployeeTable.update(req?.body,{where:{id:req?.body.id}}).then((data)=>res.json(sample_success)).catch((err)=>res.json(sample_error))
  }catch(e){
    res.json(sample_error)
  }
});

/**
 * @swagger
 * /cafe:
 *   delete:
 *     tags: [Cafes]
 *     description: Delete a café and all its employees
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the café to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Café deleted
 */
router.delete('/cafe', (req, res) => {
  try{
    CafeTable.destroy({where:{id:req?.body.id}}).then((data)=>res.json(sample_success)).catch((err)=>res.json(sample_error))
  }catch(e){
    res.json(sample_error)
  }
});

/**
 * @swagger
 * /employee:
 *   delete:
 *     tags: [Employees]
 *     description: Delete an employee
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the employee to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 */
router.delete('/employee', (req, res) => {
  try{
    EmployeeTable.destroy({where:{id:req?.body.id}}).then((data)=>res.json(sample_success)).catch((err)=>res.json(sample_error))
  }catch(e){
    res.json(sample_error)
  }
});

module.exports = router;
