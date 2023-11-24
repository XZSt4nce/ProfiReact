import React from 'react';
import {Form} from "react-bootstrap";

export const FormInput = ({controlId, label, placeholder, required = true, type = 'text'}) => {
    placeholder = placeholder ?? `Введите ${label.toLowerCase()}`;

    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} required={required} />
        </Form.Group>
    );
};