import React, {useContext, useEffect} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {Context} from "../../../core/Context";

export const Layout = ({ children }) => {
    const nav = useHistory();
    const {user, logout, updateBalance} = useContext(Context);

    useEffect(() => {
        user.login ? updateBalance() : nav.push('/login');
    }, [user]);

    return (
        <div className={"h-100 w-100 d-flex flex-column"}>
            <Navbar className={"w-100 d-flex p-2 sticky-top"} style={{backgroundColor: "rebeccapurple"}}>
                <Navbar.Brand className={"text-white"}>Profi</Navbar.Brand>
                <Nav className={"d-flex flex-grow-1 gap-2 justify-content-end"}>
                    {user.login ? <Button variant={'primary'} onClick={logout}>Выйти</Button> : (
                        <>
                            <Link className={"text-white text-decoration-none btn btn-primary"} to={'/reg'}>Регистрация</Link>
                            <Link className={"text-white text-decoration-none btn btn-primary"} to={'/login'}>Вход</Link>
                        </>
                    )}
                </Nav>
            </Navbar>
            {children}
        </div>
    );
};