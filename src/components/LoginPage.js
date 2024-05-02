import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import { Card, Form, Button, Spinner } from 'react-bootstrap'; // Importing Bootstrap components

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Checking if user is already logged in
        const token =  Cookies.get('token');
        if (token) {
            // Redirecting to tasks page if user is already logged in
            navigate('/tasks');
        }
    }, [navigate]);

    async function login(e) {
        e.preventDefault(); // Preventing the default form submission behavior
        setLoading(true); // Setting loading state to true

        try {
            const url = 'https://task-management-api-klht.onrender.com/api/auth/login';

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            };

            // Performing the fetch request and wait for the response
            const response = await fetch(url, options);

            // Checking if the response is successful (status code 200)
            if (response.ok) {
                // Parsing the response body as JSON and wait for it
                const data = await response.json();
                // Extracting the token from the response data
                const token = data.token;
                // Setting token in localStorage
                localStorage.setItem('token', token);
                // Setting token in cookie
                Cookies.set('token', token);
                // Redirecting to dashboard after successful login
                navigate('/tasks');
            } else {
                // If the response is not successful, throwing an error
                throw new Error('Failed to login');
            }
        } catch (error) {
            // Handling any errors that occur during the fetch request, JSON parsing, or processing
            console.error('Error:', error);
            // Displaying error message
            alert('An error occurred while logging in');
        } finally {
            setLoading(false); // Setting loading state to false after login attempt
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form onSubmit={login}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                                </Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link to="/register">Don't have an account? Sign Up</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
