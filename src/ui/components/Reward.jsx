import React, {useContext, useState} from 'react';
import {Form} from "react-bootstrap";
import {FormInput} from "../kit/FormInput";
import {LoadingButton} from "../kit/LoadingButton";
import {WhiteContainer} from "./HOCs/WhiteContainer";
import ProfiService from "../../services/ProfiService";
import {Context} from "../../core/Context";

export const Reward = () => {
    const {user, updateBalance, catchPromiseError} = useContext(Context);
    const [loading, setLoading] = useState(false);

    const sendReward = async (ev) => {
        setLoading(true);
        const to = ev.target[0].value;
        const amount = ev.target[0].value;
        await ProfiService.sendReward(user.wallet, to, amount)
            .then(async () => updateBalance())
            .catch(catchPromiseError);
        setLoading(false);
    }

    return (
        <WhiteContainer>
            <h1 className={"text-center"}>Вознаградить</h1>
            <Form onSubmit={sendReward}>
                <FormInput controlId={"form-wallet"} label={'Адрес'} />
                <FormInput controlId={"form-amount"} label={'Количество токенов'} />
                <LoadingButton isLoading={loading} className={'w-100'}>Отправить</LoadingButton>
            </Form>
        </WhiteContainer>
    );
};