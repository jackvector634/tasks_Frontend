import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import { Table } from 'react-bootstrap'; // Importing Table component from react-bootstrap

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetching users from the server
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setUsers(response); // Assuming response is already an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='userList'>
      <h2>User List</h2>
      <Table striped bordered hover> {/* Applying Bootstrap table styles */}
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
