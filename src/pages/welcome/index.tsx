import React from 'react';
import logo from '@/assets/logo.svg';
import './index.scss';
import {useSelector} from "react-redux";
import {RootState} from "@/store/Redux";
import {PageContainer} from "@ant-design/pro-components";
import Access from "@/components/Assess";

const Index = () => {

    const counter = useSelector((state: RootState) => state.counter.value);

    return (
        <PageContainer>

            <Access hasRole={['ROLE_ADMIN']}>
                hi, admin manager
            </Access>

            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Redux counter: {counter}
                    </p>
                </header>
            </div>
        </PageContainer>
    );
}

export default Index;
