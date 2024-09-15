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

export const loadMenuRoute = (menu: any) => {
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
    } else if (menu.element) {
        const element = menu.element;
        return (
            <Route
                key={menu.path}
                path={menu.path}
                element={element}
            />
        );
    }
    return null;
};


export interface Menu {
    path: string,
    element: React.ReactNode,
    name: string,
    icon?: React.ReactNode | string,
    routes?: Menu[]
}

export class MenuRouteManager {

    private static instance: MenuRouteManager;

    menus = [] as any[];

    private constructor(menus: any) {
        this.menus = menus
    }

    public static getInstance() {
        if (!MenuRouteManager.instance) {
            MenuRouteManager.instance = new MenuRouteManager(menus);
        }
        return MenuRouteManager.instance;
    }

    public getRoutes() {
        return this.menus.map((menu: any) => loadMenuRoute(menu));
    }

    public getMenus() {
        return this.menus;
    }

    public addMenu(menu: Menu) {
        this.menus.push(menu);
    }

}

