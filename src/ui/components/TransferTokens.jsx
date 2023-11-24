import React, {useContext, useState} from 'react';
import {WhiteContainer} from "./HOCs/WhiteContainer";
import {FormInput} from "../kit/FormInput";
import {LoadingButton} from "../kit/LoadingButton";
import {Form} from "react-bootstrap";
import {Context} from "../../core/Context";
import ProfiService from "../../services/ProfiService";
import Web3 from "web3";

export const TransferTokens = () => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(false);

    const transferTokens = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const to = ev.target[0].value;
        const amount = ev.target[1].value;
        const tokenType = ev.target[2].value;
        const tokenTypeString = tokenType === 0 ? 'подготовительных' : tokenType === 1 ? 'приватных' : 'публичных';
        if (Web3.utils.isAddress(to)) {
            if (window.confirm(`Перевести ${amount} ${tokenTypeString} токенов на адрес ${to}?`)) {
                await ProfiService.transferToken(user.wallet, to, amount * 10**10, tokenType)
                    .catch((e) => {
                        console.log(e);
                        const reason = e.toString().split(': ')[3];
                        alert(reason ?? "Потеряно соединение с контрактом!");
                    });
            }
        } else {
            alert("Введите верный адрес!");
        }
        setLoading(false);
    }

    return (
        <WhiteContainer>
            <h1 className={'text-center'}>Перевести токены</h1>
            <Form onSubmit={transferTokens}>
                <FormInput controlId={"form-wallet"} label={'Адрес'} />
                <FormInput controlId={"form-amount"} label={'Количество'} />
                <Form.Group className="mb-3" controlId={'form-token'}>
                    <Form.Label>Тип токена</Form.Label>
                    <Form.Select required>
                        <option value="0">Подготовительный</option>
                        <option value="1">Приватный</option>
                        <option value="2">Публичный</option>
                    </Form.Select>
                </Form.Group>
                <LoadingButton isLoading={loading} className={'w-100'}>Перевести</LoadingButton>
            </Form>
        </WhiteContainer>
    );
};