import React from 'react';

const TaskSummary = ({ metrics }) => {
  return (
    <div>
      <h2>Task Summary</h2>
      <p>Total Tasks: {metrics.totalTasks}</p>
      <p>Completed Tasks: {metrics.completedTasks}</p>
    </div>
  );
};

export default TaskSummary;
