import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing useHistory for programmatic navigation
import { getTasks, deleteTaskById } from '../services/taskService'; // Importing deleteTaskById function
import { Spinner, Button } from 'react-bootstrap'; // Importing Spinner and Button components
import Cookies from 'js-cookie'; // Importing Cookies for managing cookies

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const history = useNavigate(); // Getting the history object for programmatic navigation


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks();
        setTasks(response);
        setLoading(false); // Setting loading to false after fetching tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);



  const handleDelete = async (taskId) => {
    try {
      await deleteTaskById(taskId);
      // After successful deletion, removing the deleted task from the tasks array
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSignOut = () => {
    // Removing token cookie
    Cookies.remove('token');
    // Redirecting to login page after signing out
    history('/login');
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4 text-primary">Task List</h2>
      <div className="mb-3">
        <Link to="/tasks/new" className="btn btn-primary">Add New Task</Link>
        <Link to= "/tasks/summary" className="btn btn-success ms-2">Task Summary</Link> {/* Button for TaskSummary page */}
        <Button variant="danger" className="ms-2" onClick={handleSignOut}>Sign Out</Button> {/* Signout button */}
      </div>
      {loading ? ( // Rendering Spinner if loading is true
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : ( // Rendering task list if loading is false
        <>
          <ul className="list-group">
            {tasks && tasks.map(task => (
              <li key={task._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/tasks/${task._id}`} className="text-primary">{task.title}</Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskList;
