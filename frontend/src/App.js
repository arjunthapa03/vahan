import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EntityForm from './components/EntityForm';
import EntityList from './components/EntityList';
import EntityDetails from './components/EntityDetails';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-entity">Create Entity</Link>
            </li>
            <li>
              <Link to="/entities">View Entities</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/create-entity" element={<EntityForm />} />
          <Route path="/entities/:entityName/edit/:id" element={<EntityDetails editMode={true} />} />
          <Route path="/entities/:entityName" element={<EntityDetails editMode={false} />} />
          <Route path="/entities" element={<EntityList />} />
          <Route path="/" element={<h1>Welcome to the CMS</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
