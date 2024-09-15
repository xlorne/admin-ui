import React from "react";
import {loadPage} from "@/components/Layout/PageLoader";
import {Route} from "react-router";
import {menus} from "@/config/menus";

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

// 菜单路由管理器
export class MenuRouteManager {

    // 单例对象
    private static instance: MenuRouteManager;

    // 本地菜单数据
    menus = [] as any[];

    // 路由数据
    routes = [] as any[];

    // 版本号
    version = 0;

    // 当前版本
    currentVersion = -1;

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
        if(this.currentVersion === this.version) {
            return this.routes;
        }
        this.routes = this.menus.map((menu: any) => loadMenuRoute(menu));
        this.currentVersion = this.version
        return this.routes;
    }

    public getMenus() {
        return this.menus;
    }

    public addMenu(menu: Menu) {
        this.menus.push(menu);
        this.version++;
    }
}
