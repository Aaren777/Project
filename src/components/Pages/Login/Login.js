import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Styles from './loginStyle.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../store/actions';

function Login(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: null,
        password: null,
    });
    const handleChange = ({ target: { name, value } }) => {
        if (!value) {
            setErrors({
                ...errors,
                [name]: 'Field is required'
            });
        }
        else {
            setErrors({
                ...errors,
                [name]: null
            });
        }
        if (name === 'email' && value) {
            const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailReg.test(value)) {
                setErrors({
                    ...errors,
                    email: 'Invalid email'
                });
            }
        }
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
           return handleSubmit()
        }
    };
    const handleSubmit = () => {
        const { email, password } = values

        setErrors({
            email: email ? "" : 'Field is required',
            password: password ? "" : 'Field is required',
        })
        if (email && password) {
            props.login(values)
        }
    }
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={5}>
                    <Form className='mt-5'>
                        <h1 className='text-center'>Login</h1>
                        <Form.Group>
                            <Form.Control
                                className={errors.email ? Styles.invalid : ''}
                                type="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                name="email"
                                value={values.email}
                            />
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className={errors.password ? Styles.invalid : ''}
                                type="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                name="password"
                                value={values.password}
                            />
                            <Form.Text className="text-danger">
                                {errors.password}
                            </Form.Text>
                        </Form.Group>
                        <div className='text-center'>
                            <Button
                                variant="primary"
                                className={Styles.buttonSubmit}
                                onClick={handleSubmit}
                                onKeyPress={handleKeyDown}
                                >
                                Login
                         </Button>
                        </div>
                        <Link to='/register'>Don't have account yet? Register now!</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
const mapDispatchToProps = {
    login
};


export default connect(null, mapDispatchToProps)(Login)