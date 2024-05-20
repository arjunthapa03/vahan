import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EntityList() {
    const [entities, setEntities] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/entities')
            .then(response => {
                setEntities(response.data);
            })
            .catch(error => console.error('Error fetching entities:', error));
    }, []);
    return (
        <div>
            <h2>Entities</h2>
            {entities.map((entity, idx) => (
                <div key={idx}>
                    <h3>{entity.tableName}</h3>
                    <ul>
                        {entity.data.length > 0 ? entity.data.map((row, index) => (
                            <li key={index}>
                                {Object.entries(row).map(([key, value]) => (
                                    <span key={key}>{key}: {value.toString()}, </span>
                                ))}
                            </li>
                        )) : <li>No data available.</li>}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default EntityList;
