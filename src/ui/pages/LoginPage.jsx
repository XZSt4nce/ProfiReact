import React, {useContext, useState} from 'react';
import {Form} from "react-bootstrap";
import ProfiService from "../../services/ProfiService";
import {useHistory} from "react-router-dom";
import {Context} from "../../core/Context";
import {LoadingButton} from "../kit/LoadingButton";
import {WhiteContainer} from "../components/HOCs/WhiteContainer";
import {FormInput} from "../kit/FormInput";

const LoginPage = () => {
    const nav = useHistory();
    const {setUserData, catchPromiseError} = useContext(Context);
    const [loading, setLoading] = useState(false);

    const logIn = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const login = ev.target[0].value;
        const password = ev.target[1].value;
        await ProfiService.signIn(login, password)
            .then((user) => {
                setUserData(user);
                nav.push('/');
            })
            .catch(catchPromiseError);
        setLoading(false);
    };

    return (
        <div className={"d-flex flex-grow-1 align-items-center justify-content-center p-3"}>
            <WhiteContainer className={'w-100'} style={{maxWidth: "500px"}}>
                <h1 className={"text-center"}>Вход</h1>
                <Form onSubmit={logIn}>
                    <FormInput controlId={"form-login"} label={'Логин'} />
                    <FormInput controlId={"form-password"} label={'Пароль'} type={'password'} />
                    <LoadingButton isLoading={loading} className={'w-100'}>Войти</LoadingButton>
                </Form>
            </WhiteContainer>
        </div>
    );
};

export default LoginPage;