import React, {useContext, useEffect} from 'react';
import {ListGroup} from "react-bootstrap";
import {WhiteContainer} from "./HOCs/WhiteContainer";
import {Context} from "../../core/Context";
import ProfiService from "../../services/ProfiService";

export const Whitelist = () => {
    const {user, whitelist, setWhitelistData, catchPromiseError} = useContext(Context);

    useEffect(() => {
        (async () => {
            await ProfiService.getWhitelist(user.wallet)
                .then(setWhitelistData)
                .catch(catchPromiseError);
        })();
    }, [user]);

    return (
        <WhiteContainer>
            <h1 className={'text-center'}>Вайтлист</h1>
            <ListGroup className={'d-flex flex-column gap-2'}>
                {whitelist.length ? whitelist.map((wallet, idx) => (
                    <ListGroup.Item className={'bg-white border-2'} key={idx}>
                        <p className={'text-truncate m-0'}>Адрес: {wallet}</p>
                    </ListGroup.Item>
                )) : <p className={'w-100 bg-dark text-white text-center p-3 rounded m-0'}>Адресов нет</p>}
            </ListGroup>
        </WhiteContainer>
    );
};