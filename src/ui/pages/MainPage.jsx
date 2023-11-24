import React from 'react';
import {Profile} from "../components/Profile";
import {Timers} from "../components/Timers";
import {BuyToken} from "../components/BuyToken";
import {TransferTokens} from "../components/TransferTokens";

const MainPage = () => {
    return (
        <div className={"d-flex flex-wrap flex-grow-1 align-items-center justify-content-center gap-2 p-3"}>
            <Timers/>
            <Profile/>
            <BuyToken/>
            <TransferTokens/>
        </div>
    );
};

export default MainPage;