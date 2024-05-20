// src/routes/entityRoutes.js
const express = require('express');
const Entity = require('../models/Entity');
const router = express.Router();

router.get('/entities', async (req, res) => {
    try {
        const tables = await Entity.getAllTableData();
        res.json(tables);
    } catch (error) {
        console.error("Error retrieving entities:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/create-table', async (req, res) => {
    try {
        await Entity.createTable(req.body.entityName, req.body.fields);
        res.status(201).send({ message: 'Table created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:entityName/initial-data', async (req, res) => {
    try {
        const result = await Entity.insertInitialData(req.params.entityName, req.body.fieldsWithData);
        res.status(201).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
