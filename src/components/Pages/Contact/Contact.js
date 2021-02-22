import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Styles from './contactStyle.module.css'

export default function Contact() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
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
        const errorsArr = Object.values(errors);
        const errorsExist = !errorsArr.every(el => el === null);

        const valuesArr = Object.values(values);
        const valuesExist = !valuesArr.some(el => el === '')

        if (valuesExist && !errorsExist) {
            fetch('http://localhost:3001/form', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
                .then(async (response) => {
                    const res = await response.json();
                    if (response.status >= 400 && response.status < 600) {
                        if (res.error) {
                            throw res.error;
                        }
                        else {
                            throw new Error('Error')
                        }
                    }

                    setValues({
                        name: '',
                        email: '',
                        message: ''
                    });
                })
                .catch((error) => {
                    console.log('error', error)
                })
            return
        }
        if (!valuesExist && !errorsExist) {
            setErrors({
                name: 'Field is required',
                email: 'Field is required',
                message: 'Field is required'
            })
        }
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={5}>
                    <Form className='mt-5'>
                        <h1 className='text-center'>Contact Us</h1>
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
                                className={errors.name ? Styles.invalid : ''}
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
                                className={errors.name ? Styles.invalid : ''}
                                as="textarea"
                                placeholder="Enter your message"
                                rows={5}
                                onChange={handleChange}
                                name="message"
                                value={values.message}
                            />
                            <Form.Text className="text-danger">
                                {errors.message}
                            </Form.Text>
                        </Form.Group>
                        <div className='text-center'>
                            <Button
                                variant="primary"
                                className={Styles.buttonSubmit}
                                onClick={handleSubmit}>
                                Send
                         </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}