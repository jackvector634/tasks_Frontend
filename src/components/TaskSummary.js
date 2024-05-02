import React, { useEffect, useState } from 'react';
import { calculateTaskMetrics } from '../services/taskService';

const TaskSummary = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await calculateTaskMetrics();
        setMetrics(res); // Setting the metrics state after fetching
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    }

    fetchMetrics(); // Calling the fetchMetrics function
  }, []);

  return (
    <div className="container mt-5">
      <div className="card bg-light shadow">
        <div className="card-header bg-primary text-white">
          <h2>Task Summary</h2>
        </div>
        <div className="card-body">
          <div className="row border-bottom py-2">
            <div className="col-md-6">
              <p className="card-text font-weight-bold">Total Tasks</p>
            </div>
            <div className="col-md-6">
              <p className="card-text">{metrics.totalTasks}</p>
            </div>
          </div>
          <div className="row border-bottom py-2">
            <div className="col-md-6">
              <p className="card-text font-weight-bold">Completed Tasks</p>
            </div>
            <div className="col-md-6">
              <p className="card-text">{metrics.completedTasks}</p>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-md-6">
              <p className="card-text font-weight-bold">In Progress Tasks</p>
            </div>
            <div className="col-md-6">
              <p className="card-text">{metrics.inProgressTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
