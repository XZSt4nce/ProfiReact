import React, {useContext, useState} from 'react';
import {WhiteContainer} from "./HOCs/WhiteContainer";
import {Context} from "../../core/Context";
import {Button} from "react-bootstrap";
import {BsCopy} from "react-icons/bs";
import {FaEthereum} from "react-icons/fa";
import ProfiService from "../../services/ProfiService";
import {LoadingButton} from "../kit/LoadingButton";

export const Profile = () => {
    const {user, setUserData, balance, lifeTime} = useContext(Context);
    const [loading, setLoading] = useState(false);

    const copyAddress = async () => {
        await navigator.clipboard.writeText(user.wallet);
    }

    const sendRequest = async () => {
        setLoading(true);
        await ProfiService.requestWhitelist(user.wallet)
            .then(() => setUserData({
                ...user,
                requestedWhitelist: true
            }))
            .catch((e) => {
                console.log(e);
                const reason = e.toString().split(': ')[3];
                alert(reason ?? "Потеряно соединение с контрактом!");
            });
        setLoading(false);
    }

    return (
        <WhiteContainer>
            <h1 className={"text-center"}>Личный кабинет</h1>
            <div className={'d-flex gap-2 align-items-center mb-1 overflow-hidden'} style={{whiteSpace: "nowrap", textOverflow: "ellipsis"}}>Адрес: {user.wallet} <Button onClick={copyAddress} variant={'outline-primary'}><BsCopy/></Button></div>
            <p>Логин: {user.login}</p>
            <p>Роль: {user.role === 0 ? 'Владелец' : user.role === 1 ? 'Приватный провайдер' : user.role === 2 ? 'Публичный провайдер' : 'Пользователь'}</p>
            {user.isInWhitelist ? (
                    <p>Вы находитесь в вайтлисте</p>
                ) : user.requestedWhitelist ? (
                    <p>Запрос в вайтлист отправлен</p>
                ) : lifeTime <= 300 && (
                    <LoadingButton className={'w-100'} isLoading={loading} onClick={sendRequest}>Отправить запрос в вайтлист</LoadingButton>
                )
            }
            <h2>Баланс</h2>
            <p>Ether: {balance.ether / 10**18} <FaEthereum/></p>
            <p>Подготовительные токены: {balance.seed / 10**10}</p>
            <p>Приватные токены: {balance.private / 10**10}</p>
            <p>Публичные токены: {balance.public / 10**10}</p>
        </WhiteContainer>
    );
};