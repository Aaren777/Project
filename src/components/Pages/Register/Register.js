import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Styles from './registerStyle.module.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../../store/actions';

function Register(props) {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
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
    const handleSubmit = () => {
        const { name, surname, email, password, confirmPassword } = values
        let valid = true
        let passwordMessage = null;
        if (!confirmPassword) {
            passwordMessage = 'Field is required'
            valid = false
        }
        else if (password !== confirmPassword) {
            passwordMessage = `Password didn't match`
            valid = false
        }
        setErrors({
            name: name ? "" : 'Field is required',
            surname: surname ? "" : 'Field is required',
            email: email ? "" : 'Field is required',
            password: password ? "" : 'Field is required',
            confirmPassword: confirmPassword ? passwordMessage : passwordMessage,
        })
        if (valid) {
            props.register(values)
        }
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={5}>
                    <Form className='mt-5'>
                        <h1 className='text-center'>Register</h1>
                        <Form.Group>
                            <Form.Control
                                className={errors.name ? Styles.invalid : ''}
                                type="text"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                name="name"
                                value={values.name}
                            />
                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className={errors.surname ? Styles.invalid : ''}
                                type="text"
                                placeholder="Enter your surname"
                                onChange={handleChange}
                                name="surname"
                                value={values.surname}
                            />
                            <Form.Text className="text-danger">
                                {errors.surname}
                            </Form.Text>
                        </Form.Group>
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
                        <Form.Group>
                            <Form.Control
                                className={errors.confirmPassword ? Styles.invalid : ''}
                                type="password"
                                placeholder="Confirm password"
                                onChange={handleChange}
                                name="confirmPassword"
                                value={values.confirmPassword}
                            />
                            <Form.Text className="text-danger">
                                {errors.confirmPassword}
                            </Form.Text>
                        </Form.Group>
                        <div className='text-center'>
                            <Button
                                variant="primary"
                                className={Styles.buttonSubmit}
                                onClick={handleSubmit}>
                                Register
                         </Button>
                        </div>
                        <Link to='/login'>Already registered? Try to login.</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
const mapDispatchToProps = {
    register
};


export default connect(null, mapDispatchToProps)(Register)