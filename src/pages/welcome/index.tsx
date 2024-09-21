import React from 'react';
import logo from '@/assets/logo.svg';
import './index.scss';
import {useSelector} from "react-redux";
import {RootState} from "@/store/Redux";
import {PageContainer} from "@ant-design/pro-components";
import Access from "@/components/Access";
import AccessProvider from "@/components/AccessProvider";
import {Button} from "antd";

const Index = () => {

    const counter = useSelector((state: RootState) => state.counter.value);

    return (
        <AccessProvider>
            <PageContainer>

                <Access hasRole={['ROLE_ADMIN']}>
                    hi, admin manager
                </Access>

                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p has-role={['ROLE_ADMIN']}>
                            Redux counter: {counter}
                        </p>
                        <Button has-role={['ROLE_ADMIN']}>ROLE_ADMIN</Button>
                    </header>
                </div>
            </PageContainer>
        </AccessProvider>

    );
}

export default Index;
