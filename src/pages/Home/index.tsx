import React from 'react';
import logo from '@/assets/logo.svg';
import './index.scss';
import {Link} from "react-router-dom";
import {Space} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "@/config/Redux";

const Index = () => {

    const counter = useSelector((state: RootState) => state.counter.value);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Redux counter:{counter}
                </p>

                <Space>
                    <Link
                        className="App-link"
                        to={"/login"}
                    >
                        go login
                    </Link>

                    |
                    <Link
                        className="App-link"
                        to={"/test"}
                    >
                        go test
                    </Link>
                </Space>
            </header>
        </div>
    );
}

export default Index;
