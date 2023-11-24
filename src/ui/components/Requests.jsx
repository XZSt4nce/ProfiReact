import React, {useState, useEffect, useContext} from 'react';
import {WhiteContainer} from "./HOCs/WhiteContainer";
import {ListGroup} from "react-bootstrap";
import ProfiService from "../../services/ProfiService";
import {Context} from "../../core/Context";
import {LoadingButton} from "../kit/LoadingButton";

export const Requests = () => {
    const {user, whitelist, setWhitelistData} = useContext(Context);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const confirm = async (requestIndex) => {
        setLoading(true);
        await ProfiService.processRequest(user.wallet, requestIndex, true)
            .then(() => {
                const request = requests[requestIndex];
                request.isConfirmed = true;
                setWhitelistData([
                    ...whitelist,
                    request.wallet
                ]);
            })
            .catch((e) => {
                console.log(e);
                const reason = e.toString().split(': ')[3];
                alert(reason ?? "Потеряно соединение с контрактом!");
            });
        setLoading(false);
    }

    const deny = async (requestIndex) => {
        setLoading(true);
        await ProfiService.processRequest(user.wallet, requestIndex, true)
            .then(() => {
                setRequests(requests.map((el) => el !== requests[requestIndex]));
            })
            .catch((e) => {
                console.log(e);
                const reason = e.toString().split(': ')[3];
                alert(reason ?? "Потеряно соединение с контрактом!");
            });
        setLoading(false);
    }

    useEffect(() => {
        (async () => {
            await ProfiService.getRequestList(user.wallet)
                .then((requests) => {
                    setRequests(requests.filter((request) => !request.isConfirmed));
                })
                .catch((e) => {
                    console.log(e);
                    const reason = e.toString().split(': ')[3];
                    alert(reason ?? "Потеряно соединение с контрактом!");
                });
        })();
    }, [user]);

    return (
        <WhiteContainer>
            <h1 className={'text-center'}>Запросы в вайтлист</h1>
            <ListGroup className={'d-flex flex-column gap-2'}>
                {requests.length ? requests.map((request, idx) => (
                    <ListGroup.Item className={'bg-white border-2'} key={idx}>
                        <p className={'text-truncate'}>Адрес: {request.wallet}</p>
                        <p> Логин: {request.login}</p>
                        <div className={'d-flex flex-wrap justify-content-between'}>
                            <LoadingButton variant={'danger'} isLoading={loading} onClick={() => deny(idx)}>Отклонить</LoadingButton>
                            <LoadingButton variant={'success'} isLoading={loading} onClick={() => confirm(idx)}>Принять</LoadingButton>
                        </div>
                    </ListGroup.Item>
                )) : <p className={'w-100 bg-dark text-white text-center p-3 rounded m-0'}>Запросов нет</p>}
            </ListGroup>
        </WhiteContainer>
    );
};