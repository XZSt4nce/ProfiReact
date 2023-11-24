import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../core/Context";
import {WhiteContainer} from "./HOCs/WhiteContainer";
import {Form} from "react-bootstrap";
import {FormInput} from "../kit/FormInput";
import {LoadingButton} from "../kit/LoadingButton";
import ProfiService from "../../services/ProfiService";

export const BuyToken = () => {
    const {lifeTime, user, tokenPrice, transactionLimit, setTokenPrice, setTransactionLimit, updateBalance} = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [phase, setPhase] = useState(lifeTime > 900 ? 2 : lifeTime > 300 ? 1 : 0);
    const [buyDisallowed, setBuyDisallowed] = useState(phase !== 2);

    const buyTokens = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const amount = ev.target[0].value;
        const value = amount * tokenPrice;
        if (amount > transactionLimit) {
            alert("Вы превысили лимит покупки за одну транзакцию");
        } else {
            await ProfiService.getTokenPrice()
                .then(setTokenPrice)
                .catch((e) => {
                    console.log(e);
                    const reason = e.toString().split(': ')[3];
                    alert(reason ?? "Потеряно соединение с контрактом!");
                });
            if (window.confirm(`Купить ${amount} токенов за ${value / 10**18} ETH?`)) {
                await ProfiService.buyToken(user.wallet, amount, value)
                    .then(async () => {
                        await updateBalance();
                    })
                    .catch((e) => {
                        console.log(e);
                        const reason = e.toString().split(': ')[3];
                        alert(reason ?? "Потеряно соединение с контрактом!");
                    });
            }
        }
        setLoading(false);
    }

    const updatePhase = async () => {
        setLoading(true);
        await ProfiService.updatePhase(user.wallet)
            .then(setPhase)
            .catch((e) => {
                console.log(e);
                const reason = e.toString().split(': ')[3];
                alert(reason ?? "Потеряно соединение с контрактом!");
            });
        setLoading(false);
    }

    useEffect(() => {
        if (phase !== 2 && lifeTime > 300) {
            if (lifeTime > 900) {
                setPhase(2);
                setBuyDisallowed(false);
            } else if (phase !== 1) {
                setPhase(1);
                setBuyDisallowed(!user.isInWhitelist);
            }
        }
    }, [lifeTime, phase, user]);

    useEffect(() => {
        (async () => {
            await ProfiService.getTokenPrice()
                .then(setTokenPrice)
                .catch((e) => {
                    console.log(e);
                    const reason = e.toString().split(': ')[3];
                    alert(reason ?? "Потеряно соединение с контрактом!");
                });
            await ProfiService.getTransactionLimit()
                .then(setTransactionLimit)
                .catch((e) => {
                    console.log(e);
                    const reason = e.toString().split(': ')[3];
                    alert(reason ?? "Потеряно соединение с контрактом!");
                });
        })();
    }, [phase]);

    return (
        <WhiteContainer>
            <h1 className={"text-center"}>Купить токены</h1>
            <p>Цена токена: {tokenPrice / 10**18}</p>
            <p>Лимит транзакции: {transactionLimit}</p>
            {phase !== 2 && <LoadingButton isLoading={loading} className={'w-100'} onClick={updatePhase}>Обновить фазу</LoadingButton>}
            <Form onSubmit={buyTokens}>
                <FormInput controlId={"form-amount"} label={'Количество токенов'} />
                <LoadingButton isLoading={loading} className={'w-100'} disabled={buyDisallowed}>Купить</LoadingButton>
            </Form>
        </WhiteContainer>
    );
};