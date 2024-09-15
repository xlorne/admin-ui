import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from "@/store/Redux";
import {PageContainer} from "@ant-design/pro-components";

const Index = () => {
    const counter = useSelector((state: RootState) => state.counter.value);

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

                </div>

            </div>
        </PageContainer>
    );
}

export default Index;