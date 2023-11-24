import React, {useContext, useState} from 'react';
import {Context} from "../../core/Context";
import {WhiteContainer} from "./HOCs/WhiteContainer";
import {Form} from "react-bootstrap";
import {FormInput} from "../kit/FormInput";
import {LoadingButton} from "../kit/LoadingButton";
import ProfiService from "../../services/ProfiService";

export const GetBalance = () => {
    const {user, catchPromiseError} = useContext(Context);
    const [loading, setLoading] = useState(false);

    const getBalance = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const wallet = ev.target[0].value;
        await ProfiService.getBalance(wallet)
            .then((balance) => {
                switch (user.role) {
                    case "0":
                        alert(`Пользователь по адресу ${wallet} имеет:
                            ${balance[1] / 10**10} подготовительных токенов
                            ${balance[2] / 10**10} приватных токенов
                            ${balance[3] / 10**10} публичных токенов`
                        );
                        break;
                    case "1":
                        alert(`Пользователь по адресу ${wallet} имеет: ${balance[2] / 10**10} приватных токенов`);
                        break;
                    case "2":
                        alert(`Пользователь по адресу ${wallet} имеет: ${balance[3] / 10**10} публичных токенов`);
                        break;
                    default:
                        alert("Недостаточно прав!");
                }
            })
            .catch(catchPromiseError);
        setLoading(false);
    }

    return (
        <WhiteContainer>
            <h1 className={"text-center"}>Посмотреть токены</h1>
            <Form onSubmit={getBalance}>
                <FormInput controlId={"form-wallet"} label={'Адрес'} />
                <LoadingButton isLoading={loading} className={'w-100'}>Получить</LoadingButton>
            </Form>
        </WhiteContainer>
    );
};