// src/models/Entity.js
const db = require('../db');

const mapFieldType = (fieldType) => {
  switch (fieldType.toLowerCase()) {
    case 'string': return 'TEXT';
    case 'number': return 'INTEGER';
    case 'boolean': return 'BOOLEAN';
    case 'date': return 'DATE';
    default: return 'TEXT';
  }
};

class Entity {
  static async getAllTableData() {
    try {
        const query = `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' AND table_name NOT IN ('pg_catalog', 'information_schema');`;
        const result = await db.query(query);
        const allTablesData = [];

        for (const table of result.rows) {
            const dataQuery = `SELECT * FROM "${table.table_name}";`;
            const dataResult = await db.query(dataQuery);
            allTablesData.push({ tableName: table.table_name, data: dataResult.rows });
        }
        return allTablesData;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
  }

  static async createTable(entityName, fields) {
    const fieldStrings = fields.map(field => `${field.name} ${mapFieldType(field.type)}`).join(', ');
    const query = `CREATE TABLE ${entityName} (id SERIAL PRIMARY KEY, ${fieldStrings});`;
    return db.query(query).catch(err => {
      console.error(`Error creating table ${entityName}:`, err);
      throw new Error(`Failed to create table: ${err.message}`);
    });
  }

  static async insertInitialData(entityName, fieldsWithData) {
    const keys = fieldsWithData.map(field => field.name);
    const values = fieldsWithData.map(field => field.data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    const query = `INSERT INTO "${entityName}" (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *;`;
    return db.query(query, values).catch(err => {
      console.error(`Error inserting data into ${entityName}:`, err);
      throw new Error(`Failed to insert initial data: ${err.message}`);
    });
  }
}

module.exports = Entity;
