import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Quiz from './pages/Quiz';
import Module from './pages/Module'; // Import Module page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="courses/:moduleId" element={<Module />} /> {/* New Route */}
      </Route>
    </Routes>
  );
}

export default App;
