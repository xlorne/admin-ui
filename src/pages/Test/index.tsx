import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '@/config/counterSlice';
import {RootState} from "@/config/redux";
import {Link, useNavigate} from "react-router-dom";
import {Button, Space} from "antd";

const Test = () => {
    const counter = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                textAlign: 'center',
                marginBottom: 20,
            }}>
                <h1>Counter: {counter}</h1>

                <Link onClick={goBack} to={{}}>Go Home</Link>
            </div>

            <Space>
                <Button onClick={() => dispatch(increment())}>Increment</Button>
                <Button onClick={() => dispatch(decrement())}>Decrement</Button>
            </Space>
        </div>
    );
}

export default Test;