import React from 'react';
import logo from '@/assets/logo.svg';
import './index.scss';
import {useSelector} from "react-redux";
import {RootState} from "@/store/Redux";
import {PageContainer} from "@ant-design/pro-components";
import RoleControl from "@/utils/RoleControl";

const Index = () => {

    const counter = useSelector((state: RootState) => state.counter.value);
    const username = localStorage.getItem('username');

    return (
        <PageContainer>

            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        hi {username} , Redux counter: {counter}, Roles: {RoleControl.roles().map(item => (
                        <label
                            key={item}
                            style={{
                                margin: '0 5px',
                                padding: '5px',
                            }}>{item}</label>
                    ))}
                    </p>

                </header>
            </div>
        </PageContainer>

    );
}

export default Index;
