import React from 'react';

const TaskAssignment = ({ assignee, onAssign }) => {
  return (
    <div>
      <h2>Task Assignment</h2>
      <p>Assignee: {assignee}</p>
      <button onClick={onAssign}>Assign Task</button>
    </div>
  );
};

export default TaskAssignment;
