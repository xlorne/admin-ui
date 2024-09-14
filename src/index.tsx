import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN';
import RoutesProvider from "@/config/RoutesProvider";
import {Provider} from "react-redux";
import store from "@/config/Redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <RoutesProvider/>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
