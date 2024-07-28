require('dotenv').config()
const express = require("express");
const router = express.Router();
const {sample_error,sample_success,UUIDV4,timestamp} = require("../utilities");
const { EmployeeTable, CafeTable, sequelize } = require("../db/index");
const logger = require("../logger");
const { v4: uuidv4 } = require('uuid');


/**
 * @swagger
 * tags:
 *   name: Cafes
 *   description: Cafes operations
 */

/**
 * @swagger
 * /allcafes:
 *   get:
 *     tags: [AllCafes]
 *     description: Get cafes by location
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
router.get("/all-cafes", async (req, res) => {
  try {
    await CafeTable.findAll().then((data) => res.json(sample_success(data))).catch((err) => res.json(sample_error(err)));
  } catch (e) {
    res.json(sample_error(e));
  }
});

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
router.get("/cafes", async (req, res) => {
  try {
    const location = req?.query?.location;
    const query = `
      SELECT c.*, COUNT(e.id) AS employeeCount
      FROM Cafes c
      LEFT JOIN Employments em ON c.id = em.CafeId
      LEFT JOIN Employees e ON e.id = em.EmployeeId
      WHERE c.location = :location
      GROUP BY c.id
      ORDER BY employeeCount DESC;
    `;

    await sequelize
      .query(query, {
        replacements: { location: location },
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => res.json(sample_success(data)))
      .catch((err) => res.json(sample_error(err)));
    // await CafeTable.findAll({ where: { location: req?.query?.location } }).then((data) => res.json(data)).catch((err) => res.json(sample_error));
  } catch (e) {
    res.json(sample_error(e));
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
router.get("/employees", async (req, res) => {
  try {
    const cafeName = req.query.cafe;
    const query = `
      SELECT e.*, c.name AS cafe
      FROM Employees e
      INNER JOIN Employments em ON e.id = em.EmployeeId
      INNER JOIN Cafes c ON c.id = em.CafeId
      WHERE c.name = :cafeName
    `;
    await sequelize
      .query(query, {
        replacements: { cafeName: cafeName },
        type: sequelize.QueryTypes.SELECT,
      })
      .then((data) => res.json(data))
      .catch((err) => res.json(sample_error(err)));
  } catch (e) {
    console.log("error", e.message);
    res.json(sample_error(e));
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
router.post("/cafe", async (req, res) => {
  try {
  req.body.id = uuidv4()
  req.body.createdAt = timestamp
  req.body.updatedAt = req.body.createdAt
  await CafeTable.create(req?.body)
      .then((data) => {
        res.json(sample_success(req.body));})
      .catch((err) => res.json(sample_error(err)));
  } catch (e) {
    res.json(sample_error(e));
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
router.post("/employee", async (req, res) => {
  try {
  req.body.id = uuidv4()
  req.body.createdAt = timestamp
  req.body.updatedAt = req.body.createdAt
  await EmployeeTable.create(req?.body)
      .then((data) => res.json(sample_success(req.body)))
      .catch((err) => sample_error(err));
  } catch (e) {
    res.json(sample_error(e));
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
router.put("/cafe", async (req, res) => {
  try {
    await CafeTable.update(req?.body, { where: { id: req?.body.id } })
      .then((data) => res.json(sample_success(req.body)))
      .catch((err) => res.json(sample_error(err)));
  } catch (e) {
    res.json(sample_error(e));
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
router.put("/employee", async (req, res) => {
  try {
    await EmployeeTable.update(req?.body, { where: { id: req?.body.id } })
      .then((data) => res.json(sample_success(req.body)))
      .catch((err) => res.json(sample_error(err)));
  } catch (e) {
    res.json(sample_error(e));
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
router.delete("/cafe", async (req, res) => {
  try {
    await CafeTable.destroy({ where: { id: req?.query.id } })
      .then((data) => res.json(sample_success(req.query.id)))
      .catch((err) => res.json(sample_error(err)));
  } catch (e) {
    res.json(sample_error(e));
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
router.delete("/employee", async (req, res) => {
  try {
    await EmployeeTable.destroy({ where: { id: req?.query.id } })
      .then((data) => res.json(sample_success(req.query.id)))
      .catch((err) => res.json(sample_error(err)));
  } catch (e) {
    res.json(sample_error(e));
  }
});

module.exports = router;
