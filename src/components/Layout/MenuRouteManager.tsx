import React from "react";
import {loadPage} from "@/components/Layout/PageLoader";
import {Route} from "react-router";
import {menus} from "@/config/menus";
import RoleControl from "@/utils/RoleControl";
import {cloneDeep} from 'lodash';
import NotFount from "@/layout/pages/NotFount";
import MenuIcon from "@/components/Layout/MenuIcon";

const loadMenuRoute = (menu: Menu): any => {
    if (menu.roles) {
        if (!RoleControl.menuHasRole(menu)) {
            return null;
        }
    }
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
    routes?: Menu[],
    roles?: string[],
    parentPath?: string
    page?: string
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
        if (this.currentVersion === this.version) {
            return this.routes;
        }
        this.routes = this.menus.map((menu: any) => loadMenuRoute(menu));
        this.routes.push(<Route path={"/*"} key={"404"} element={<NotFount/>}/>)
        this.currentVersion = this.version
        return this.routes;
    }

    public getMenus(mapping: boolean = true) {
        const menuMap = (menu: any) => {
            if (mapping) {
                if (menu.icon) {
                    menu.icon = <MenuIcon icon={menu.icon}/>
                }
                if (menu.routes) {
                    menu.routes = menu.routes.map(menuMap);
                }
            }
            return menu;
        }

        const accessFilter = (menu: any) => {
            if (menu.roles) {
                return RoleControl.menuHasRole(menu);
            }

            if (menu.routes) {
                menu.routes = menu.routes.filter((route: any) => {
                    return accessFilter(route);
                });
                return menu.routes.length > 0;
            }
            return true;
        }
        if (this.menus.length === 0) {
            return [];
        }
        const newMenus = cloneDeep(this.menus);
        return newMenus.map(menuMap).filter((menu: any) => {
            return accessFilter(menu);
        });
    }

    public addMenu(menu: Menu) {
        if (menu.parentPath) {
            const updateMenu = (item: any) => {
                if (item.path === menu.parentPath) {
                    const routes = item.routes || [];
                    if (menu.page) {
                        menu.element = loadPage(menu.page);
                    }
                    routes.push(menu);
                    item = {
                        ...item,
                        routes
                    };
                }
                return item;
            }
            this.menus = this.menus.map(updateMenu);
        } else {
            this.menus.push(menu);
        }
        this.version++;
    }

    public updateMenu(menu: Menu) {
        const updateMenu = (item: Menu) => {
            const newMenu = {
                icon: menu.icon,
                name: menu.name,
                page: menu.page,
            } as any;

            if (menu.page) {
                newMenu.element = loadPage(menu.page);
            }

            if (item.path === menu.path) {
                item = {
                    ...item,
                    ...newMenu
                };
            }
            return item;
        }

        this.menus = this.menus.map(updateMenu);
        this.version++;
    }

    public removeMenu(path: string) {
        const removeMenu = (menu: any) => {
            if (menu.path === path) {
                return false;
            }
            if (menu.routes) {
                menu.routes = menu.routes.filter(removeMenu);
            }
            return true;
        }

        this.menus = this.menus.filter(removeMenu);
        this.version++;
    }

    public refresh() {
        this.version++;
    }
}
