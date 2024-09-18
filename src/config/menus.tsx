import {CrownFilled, SmileFilled} from "@ant-design/icons";
import React from "react";

export const menus = [
    {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileFilled/>,
        page: 'welcome',
    },
    {
        path: '/redux',
        name: '状态管理',
        icon: <CrownFilled/>,
        routes: [
            {
                path: '/redux/test1',
                name: '测试页面1',
                page: 'redux/test1',
                roles: ['ROLE_ADMIN'],
            },
            {
                path: '/redux/test2',
                name: '测试页面2',
                page: 'redux/test2',
            },
        ],
    },
    {
        path: '/dynamic',
        name: '动态加载',
        icon: <CrownFilled/>,
        roles: ['ROLE_ADMIN'],
        routes: [
            {
                path: '/dynamic/test1',
                name: '动态加载1',
                page: 'dynamic/test1',
            },
            {
                path: '/dynamic/test2',
                name: '动态加载2',
                page: 'dynamic/test2',
            },
        ],
    },
]


