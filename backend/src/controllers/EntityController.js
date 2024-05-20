const Entity = require('../models/Entity');

exports.getAllEntities = async (req, res) => {
    try {
        const entities = await Entity.getAllTables();
        res.json(entities);
    } catch (error) {
        console.error("Failed to retrieve entities:", error);
        res.status(500).json({ error: "Failed to retrieve entities" });
    }
};

// You can add more functions to handle other endpoints as neede