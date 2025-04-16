import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProjectDetailsPage from './pages/ProjectDetailsPage';3
// import ProjectForm from './components/ProjectForm';
import AddProjectPage from './pages/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-project" element={<AddProjectPage />} />
        <Route path="/edit-project/:id" element={<EditProjectPage />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />}
         />

      </Routes>
    </Router>
  );
}

export default App;
