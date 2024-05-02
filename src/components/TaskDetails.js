import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask, getTaskById, updateTaskById } from '../services/taskService';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [editableFields, setEditableFields] = useState({
    title: false,
    description: false,
    status: false,
    assignee: false
  });
  const [assigneeError, setAssigneeError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [updating, setUpdating] = useState(false); // State for update loader
  const { id } = useParams(); // Extracting the id parameter from the URL
  const history = useNavigate();

  useEffect(() => {
    // Fetching task details using the id parameter
    const fetchData = async () => {
      try {
        if (id === 'new') {
          // If id is 'new', initializing an empty task object for adding a new task
          setTask({
            title: '',
            description: '',
            status: 'TODO',
            assignee: ''
          });
        } else {
          const response = await getTaskById(id);
          setTask(response); // Assuming response contains the task details
        }
      } catch (error) {
        alert('Error fetching task details:');
      }
    };

    fetchData();
  }, [id]); // Including id in the dependency array to re-fetch task details when id changes

  const handleEdit = (field) => {
    setEditableFields(prevState => ({
      ...prevState,
      [field]: true
    }));
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true); // Starting update loader
      if (id === 'new') {
        // If id is 'new', calling createTask function instead of updateTaskById
        await createTask(task);
        history('/tasks'); // Redirecting to task list after adding a new task
      } else {
        // Calling updateTaskById function with the updated task object
        await updateTaskById(id, task);
      }
      setEditableFields({
        title: false,
        description: false,
        status: false,
        assignee: false
      });
      // Optionally, fetching task details again to ensure updated details are displayed
    } catch (error) {
      console.error('Error updating task details:', error);
    } finally {
      setUpdating(false); // Stoping update loader
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Validating assignee field
    if (name === 'assignee') {
      if (!isValidObjectId(value)) {
        setAssigneeError('Invalid ObjectId format');
      } else {
        setAssigneeError('');
      }
    }

    // Validating status field
    if (name === 'status') {
      if (!['TODO', 'IN_PROGRESS', 'DONE'].includes(value)) {
        setStatusError('Invalid status');
      } else {
        setStatusError('');
      }
    }
  };

  const isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  };

  if (!task) {
    return <div  style={{"display":"flex","justifyContent":"center","alignItems":"center","height":"100vh"}}>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="border-info">
            <Card.Header className="bg-info text-white">{id === 'new' ? 'Add New Task' : 'Task Details'}</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>Title:</Form.Label>
                  <Col sm={8}>
                    {editableFields.title ? (
                      <Form.Control
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{task.title}</span>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>Description:</Form.Label>
                  <Col sm={8}>
                    {editableFields.description ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{task.description}</span>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>Status:</Form.Label>
                  <Col sm={8}>
                    {editableFields.status ? (
                      <Form.Select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        isInvalid={statusError}
                      >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                      </Form.Select>
                    ) : (
                      <span>{task.status}</span>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {statusError}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={4}>Assignee:</Form.Label>
                  <Col sm={8}>
                    {editableFields.assignee ? (
                      <Form.Control
                        type="text"
                        name="assignee"
                        value={task.assignee}
                        onChange={handleChange}
                        isInvalid={assigneeError}
                      />
                    ) : (
                      <span>{task.assignee}</span>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {assigneeError}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
  
                <div className="text-center">
                  {Object.keys(editableFields).map((field, index) => (
                    <Button
                      key={index}
                      className="me-2"
                      variant="secondary"
                      onClick={() => handleEdit(field)}
                    >
                      Edit {field}
                    </Button>
                  ))}
                  <Button variant="primary" onClick={handleUpdate}>
                    {updating ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      id === 'new' ? 'Add Task' : 'Update'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskDetails;