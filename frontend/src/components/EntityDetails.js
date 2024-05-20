import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EntityDetails({ editMode }) {
  const { entityName, id } = useParams(); // Retrieve parameters from the URL
  const navigate = useNavigate(); // Replaces useHistory for navigation
  const [entityData, setEntityData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch entity data when the component mounts or parameters change
    console.log("are we here2");
    axios.get(`/api/entities/${entityName}/${id || ''}`)
      .then(response => {
        setEntityData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching entity data:', error);
        setLoading(false);
      });
  }, [entityName, id]);

  const handleDelete = () => {
    // Function to handle the deletion of an entity
    axios.delete(`/api/entities/${entityName}/${id}`)
      .then(() => {
        navigate('/entities'); // Navigate back to the list of entities after deletion
      })
      .catch(error => console.error('Error deleting entity:', error));
  };

  const handleInputChange = (event) => {
    // Handle changes in input fields
    const { name, value } = event.target;
    setEntityData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save updated data
    axios.put(`/api/entities/${entityName}/${id}`, entityData)
      .then(() => {
        navigate('/entities'); // Navigate back to the list after saving
      })
      .catch(error => console.error('Error updating entity:', error));
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  return (
    <div>
      {editMode ? (
        <div>
          <h2>Edit {entityName}</h2>
          {/* Generate input fields based on entityData keys */}
          {Object.keys(entityData).map(key => (
            <div key={key}>
              <label>{key}:</label>
              <input
                type="text"
                name={key}
                value={entityData[key] || ''}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2>Details of {entityName}</h2>
          {/* Display entity data */}
          {Object.entries(entityData).map(([key, value]) => (
            <div key={key}>{key}: {value}</div>
          ))}
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default EntityDetails;
