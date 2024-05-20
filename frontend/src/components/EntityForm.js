// src/components/EntityForm.js
import React, { useState } from 'react';
import axios from 'axios';

function EntityForm() {
    const [entityName, setEntityName] = useState('');
    const [fieldsWithData, setFieldsWithData] = useState([{ name: '', type: '', data: '' }]);

    const handleAddFieldWithData = () => {
        setFieldsWithData([...fieldsWithData, { name: '', type: '', data: '' }]);
    };

    const handleChangeFieldWithData = (index, field, value) => {
        const newFields = fieldsWithData.map((f, idx) => idx === index ? { ...f, [field]: value } : f);
        setFieldsWithData(newFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/create-table', { entityName, fields: fieldsWithData });
            await axios.post(`http://localhost:3000/api/${entityName}/initial-data`, { fieldsWithData });
            alert('Entity and initial data created successfully');
        } catch (error) {
            alert('Failed to create entity or data');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={entityName} onChange={e => setEntityName(e.target.value)} placeholder="Entity Name" />
            {fieldsWithData.map((field, index) => (
                <div key={index}>
                    <input type="text" value={field.name} onChange={e => handleChangeFieldWithData(index, 'name', e.target.value)} placeholder="Field Name" />
                    <input type="text" value={field.type} onChange={e => handleChangeFieldWithData(index, 'type', e.target.value)} placeholder="Field Type" />
                    <input type="text" value={field.data} onChange={e => handleChangeFieldWithData(index, 'data', e.target.value)} placeholder="Field Data" />
                </div>
            ))}
            <button type="button" onClick={handleAddFieldWithData}>Add Field</button>
            <button type="submit">Create Entity and Data</button>
        </form>
    );
}

export default EntityForm;
