import {CrownFilled, SmileFilled} from "@ant-design/icons";
import {loadPage} from "@/config/PageLoader";
import {Route} from "react-router";
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
        access: 'canAdmin',
        routes: [
            {
                path: '/redux/test1',
                name: '测试页面1',
                page: 'redux/test1',
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
        access: 'canAdmin',
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

const loadMenuRoute = (menu: any) => {
    if (menu.page) {
        const element = loadPage(menu.page);
        return (
            <Route
                key={menu.path}
                path={menu.path}
                element={element}
            />
        );
    } else if (menu.routes) {
        return menu.routes.map((route: any) => loadMenuRoute(route));
    }
    return null;
};

export const routes = menus.map((menu) => loadMenuRoute(menu));

