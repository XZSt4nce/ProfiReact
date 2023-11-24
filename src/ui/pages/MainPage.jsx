import React, {useContext} from 'react';
import {Profile} from "../components/Profile";
import {Timers} from "../components/Timers";
import {BuyToken} from "../components/BuyToken";
import {TransferTokens} from "../components/TransferTokens";
import {Context} from "../../core/Context";
import {Requests} from "../components/Requests";
import {Whitelist} from "../components/Whitelist";
import {GetBalance} from "../components/GetBalance";
import {Reward} from "../components/Reward";

const MainPage = () => {
    const {user} = useContext(Context);

    return (
        <div className={"d-flex flex-wrap flex-grow-1 align-items-start justify-content-center gap-2 p-3"}>
            <Timers/>
            <Profile/>
            <BuyToken/>
            <TransferTokens/>
            {user.role === "1" && (
                <>
                    <Requests/>
                    <Whitelist/>
                </>
            )}
            {user.role !== "3" && <GetBalance/>}
            {user.role === "2" && <Reward/>}
        </div>
    );
};

export default MainPage;