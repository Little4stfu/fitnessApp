import { useState, useEffect, useContext } from 'react';
import { Form, Button , Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Register() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isActive, setIsActive] = useState(false);


    useEffect(() => {
        if (
            email !== '' &&
            password !== '' &&
            confirmPassword !== '' &&
            password === confirmPassword 

        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword]);

    const registerUser = (e) => {
        e.preventDefault();

        fetch('https://fitnessapp-api-ln8u.onrender.com/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.message === 'Registered Successfully') {

                
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    notyf.success(data.message);
                    console.log(data.message);
                } 
                else {
                    notyf.error('Registration failed. Please try again.');
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                notyf.error('Something went wrong. Please try again');
            });
    };

    return  (

        (user.id !== null)?
        <Navigate to="/"/>
        :
        <Card className="justify-content-center mx-auto my-5" style={{ maxWidth: '600px' }}>
             <Card.Header>
                <h5 className="my-4 text-center">Register</h5>
            </Card.Header>

            <Card.Body>
        <Form onSubmit={(e) => registerUser(e)}>
          
          
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>

            {isActive ? (
                <Button variant="primary" type="submit" id="submitBtn">
                    Submit
                </Button>
            ) : (
                <Button variant="danger" type="submit" id="submitBtn" disabled>
                    Submit
                </Button>
            )}
        </Form>
        </Card.Body>
        <Card.Footer>
                <p>Already have an account? Click here to <a href='/Login'> Login </a> </p>
            </Card.Footer>
        </Card>
    );
}
