import React, {useContext, useEffect, useState} from 'react';
import ProfiService from "../../services/ProfiService";
import {WhiteContainer} from "./HOCs/WhiteContainer";
import {IoReload} from "react-icons/io5";
import {Button} from "react-bootstrap";
import {LoadingButton} from "../kit/LoadingButton";
import {Context} from "../../core/Context";

export const Timers = () => {
    const {user, lifeTime, setLifeTime, updatePhase, catchPromiseError} = useContext(Context);
    const [loading, setLoading] = useState(false);

    const updateTime = async () => {
        await ProfiService.getTime().then(async (time) => {
            if (lifeTime < 300 && +time >= 300) {
                await updatePhase(0);
            } else if (lifeTime < 600 && +time >= 600) {
                await updatePhase(1);
            }
            setLifeTime(+time);
        });
    }

    const addMinute = async () => {
        setLoading(true);
        await ProfiService.addMinute(user.wallet)
            .then(async () => {
                await updateTime();
            })
            .catch(catchPromiseError);
        setLoading(false);
    }

    const numberToTime = (num) => {
        const hours = Math.floor(num / 3600);
        const minutes = Math.floor(num % 3600  / 60);
        const seconds = num % 60;

        const hoursString = `${Math.floor(hours / 10)}${hours % 10}`
        const minutesString = `${Math.floor(minutes / 10)}${minutes % 10}`
        const secondsString = `${Math.floor(seconds / 10)}${seconds % 10}`
        return `${hoursString}:${minutesString}:${secondsString}`
    }

    useEffect(() => {
        if (lifeTime === 300 || lifeTime === 900) {
            (async () => {
                await updatePhase(lifeTime === 300 ? 0 : 1);
            })();
        }
        const timeout = setTimeout(() => {
            setLifeTime(lifeTime + 1);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }, [lifeTime]);

    useEffect(() => {
        (async () => {
            await updateTime();
        })();
    }, []);

    return (
        <WhiteContainer>
            <h1 className={"text-center"}>Таймеры <Button className={'rounded-circle'} variant={'outline-primary'} onClick={updateTime}><IoReload/></Button></h1>
            <p>Время системы: {numberToTime(lifeTime)}</p>
            {lifeTime > 300 && lifeTime <= 900 && <p>Длительность приватной фазы: {numberToTime(lifeTime - 300)}</p>}
            {lifeTime > 900 && <p>Длительность свободной покупки: {numberToTime(lifeTime - 900)}</p>}
            <LoadingButton className={'w-100'} isLoading={loading} onClick={addMinute}>Добавить минуту</LoadingButton>
        </WhiteContainer>
    );
};