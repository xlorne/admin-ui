import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '@/store/CounterSlice';
import {RootState} from "@/store/Redux";
import {Link, useNavigate} from "react-router-dom";
import {Button, Space} from "antd";
import {PageContainer} from "@ant-design/pro-components";

const Test2 = () => {
    const counter = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <PageContainer>
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
        </PageContainer>
    );
}

export default Test2;