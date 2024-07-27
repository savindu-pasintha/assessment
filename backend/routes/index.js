const express = require('express');
const router = express.Router();

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
  // Mock response
  res.json([
    { id: 'uuid-1', name: 'Cafe A', description: 'Description A', location: 'Location A', employees: 10 ,logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Starbucks_Coffee_Logo.svg/1200px-Starbucks_Coffee_Logo.svg.png"},
    { id: 'uuid-2', name: 'Cafe B', description: 'Description B', location: 'Location B', employees: 5,logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Starbucks_Coffee_Logo.svg/1200px-Starbucks_Coffee_Logo.svg.png" }
  ]);
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
  // Mock response
  res.json([
    { id: 'UI1234567', name: 'John Doe', email_address: 'john@example.com', phone_number: '91234567', days_worked: 20, cafe: 'Cafe A' },
    { id: 'UI7654321', name: 'Jane Smith', email_address: 'jane@example.com', phone_number: '81234567', days_worked: 15, cafe: 'Cafe B' }
  ]);
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
  // Mock response
  res.status(201).send('Cafe created');
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
  // Mock response
  res.status(201).send('Employee created');
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
  // Mock response
  res.send('Cafe updated');
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
  // Mock response
  res.send('Employee updated');
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
  // Mock response
  res.send('Cafe deleted');
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
  // Mock response
  res.send('Employee deleted');
});

module.exports = router;
