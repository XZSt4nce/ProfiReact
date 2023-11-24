import React from 'react';
import {Button, Spinner} from "react-bootstrap";

export const LoadingButton = ({isLoading, className, onClick, children, variant = 'primary', disabled = false}) => {
    return (
        <Button className={className} variant={variant} onClick={onClick} type={'submit'} disabled={isLoading || disabled}>
            {isLoading ? <Spinner size={'sm'} /> : children}
        </Button>
    );
};