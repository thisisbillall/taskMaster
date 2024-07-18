import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListComponent from './components/TaskListComponent';

function App() {
  return (
    <div className="App">
      <h1>TaskMaster!</h1>
      <Router>
        <Routes>
          <Route path="/" element={<TaskListComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
