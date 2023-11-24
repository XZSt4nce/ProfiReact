import React, {useContext, useState} from 'react';
import {Form} from "react-bootstrap";
import ProfiService from "../../services/ProfiService";
import {useHistory} from "react-router-dom";
import {WhiteContainer} from "../components/HOCs/WhiteContainer";
import {FormInput} from "../kit/FormInput";
import {LoadingButton} from "../kit/LoadingButton";
import {utils} from "web3";
import {Context} from "../../core/Context";

const RegisterPage = () => {
    const nav = useHistory();
    const [loading, setLoading] = useState(false);
    const {catchPromiseError} = useContext(Context);

    const register = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const address = ev.target[0].value;
        const login = ev.target[1].value;
        const password = ev.target[2].value;
        const passwordRepeat = ev.target[3].value;

        if (password !== passwordRepeat) {
            alert("Пароли не совпадают!");
        } else if (!utils.isAddress(address)) {
            alert("Введите верный адрес!")
        } else {
            await ProfiService.signUp(address, login, password)
                .then(() => nav.push('/login'))
                .catch(catchPromiseError);
        }
        setLoading(false);
    }

    return (
        <div className={"d-flex flex-grow-1 align-items-center justify-content-center p-3"}>
            <WhiteContainer style={{maxWidth: "500px"}}>
                <h1 className={"text-center"}>Регистрация</h1>
                <Form onSubmit={register}>
                    <FormInput controlId={'form-wallet'} label={'Адрес'} />
                    <FormInput controlId={'form-login'} label={'Логин'} />
                    <FormInput controlId={'form-password'} label={'Пароль'} type={'password'} />
                    <FormInput controlId={'form-repeat-password'} label={'Повторите пароль'} placeholder={"Введите пароль ещё раз"} type={'password'} />
                    <LoadingButton isLoading={loading} className={'w-100'}>Зарегистрироваться</LoadingButton>
                </Form>
            </WhiteContainer>
        </div>
    );
};

export default RegisterPage;