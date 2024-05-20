import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const createTable = (entityName, fields) => {
  return axios.post(`${API_URL}/create-table`, { entityName, fields });
};

const addEntity = (entityName, data) => {
  return axios.post(`${API_URL}/${entityName}`, data);
};

const getEntities = (entityName) => {
  return axios.get(`${API_URL}/${entityName}`);
};

const updateEntity = (entityName, id, data) => {
  return axios.put(`${API_URL}/${entityName}/${id}`, data);
};

const deleteEntity = (entityName, id) => {
  return axios.delete(`${API_URL}/${entityName}/${id}`);
};

export default {
  createTable,
  addEntity,
  getEntities,
  updateEntity,
  deleteEntity,
};
