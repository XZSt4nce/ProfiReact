import React, {createContext, useState} from 'react';
import ProfiService from "../services/ProfiService";

export const Context = createContext({});

export const ContextWrapper = ({children}) => {
    const initUser = {
        wallet: "",
        login: "",
        role: 3,
        balanceSeed: 0,
        balancePrivate: 0,
        balancePublic: 0,
        requestedWhitelist: false,
        isInWhitelist: false
    };

    const initBalance = {
        ether: 0,
        seed: 0,
        private: 0,
        public: 0
    };

    const [user, setUser] = useState(initUser);
    const [balance, setBalance] = useState(initBalance);
    const [lifeTime, setTime] = useState(0);
    const [tokenPrice, setPrice] = useState(0);
    const [transactionLimit, setLimit] = useState(0);
    const [whitelist, setWhitelist] = useState([]);

    const setUserData = (data) => {
        setUser(data);
    };

    const setLifeTime = (time) => {
        setTime(time);
    };

    const setTokenPrice = (price) => {
        setPrice(price);
    };

    const setTransactionLimit = (limit) => {
        setLimit(limit);
    };

    const logout = () => {
        setUser(initUser);
    };

    const setWhitelistData = (data) => {
        setWhitelist(data);
    }

    const updateBalance = async () => {
        await ProfiService.getBalance(user.wallet)
            .then((data) => {
                const balances = {
                    ether: +data[0],
                    seed: +data[1],
                    private: +data[2],
                    public: +data[3]
                };
                setBalance(balances);
            })
            .catch((e) => {
                console.log(e);
                const reason = e.toString().split(': ')[3];
                alert(reason ?? "Потеряно соединение с контрактом!");
            });
    }

    const values = {
        user,
        balance,
        lifeTime,
        tokenPrice,
        transactionLimit,
        whitelist,
        setUserData,
        setLifeTime,
        setTokenPrice,
        setTransactionLimit,
        logout,
        updateBalance,
        setWhitelistData
    }

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    );
};