import {ActionType, ProLayout} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import {MenuRouteManager} from "@/config/menus";
import AvatarHeader from "@/layout/avatar";
import {loadHeaderAction} from "@/layout/action";
import {config} from "@/config/theme";
import "./home.scss";
import {useSelector} from "react-redux";
import {RootState} from "@/store/Redux";

const welcomePath = config.welcomePath;
const loginPath = config.loginPath;

const HomeLayout = () => {

    const actionRef = useRef<ActionType>();
    const [pathname, setPathname] = useState(welcomePath);

    const menuVersion = useSelector((state: RootState) => state.menu.version);

    const navigate = useNavigate();

    const username = localStorage.getItem('username');

    const [routes, setRoutes] = useState<any[]>([]);
    useEffect(() => {
        console.log(menuVersion);
        actionRef.current?.reload();
        const newRoutes = MenuRouteManager.getInstance().getRoutes();
        setRoutes(newRoutes);
    }, [menuVersion]);

    useEffect(() => {
        const path = window.location.hash.replace('#', '');
        setPathname(path);
    }, []);

    return (
        <ProLayout
            siderWidth={config.siderWidth}
            layout={config.layout}
            location={{
                pathname,
            }}
            route={{
                routes: MenuRouteManager.getInstance().getMenus()
            }}
            postMenuData={(menusData)=>{
                return MenuRouteManager.getInstance().getMenus()
            }}
            title={config.title}
            logo={config.logo}
            actionRef={actionRef}
            waterMarkProps={{
                content: username || config.waterMark,
            }}
            breadcrumbProps={{
                itemRender: (route, params, routes, paths) => {
                    return (
                        <label
                            className={"breadcrumb-item"}
                            onClick={() => {
                                return;
                            }}
                        >{route.breadcrumbName}</label>
                    );
                }
            }}
            avatarProps={{
                render: (props, defaultDom) => {
                    return (
                        <AvatarHeader props={props}/>
                    )
                }
            }}
            actionsRender={(props) => {
                return loadHeaderAction(props);
            }}
            onPageChange={(location) => {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate(loginPath, {replace: true});
                }
            }}
            menuItemRender={(item, dom) => (
                <div
                    onClick={() => {
                        const currentPath = item.path || welcomePath
                        setPathname(currentPath);
                        navigate(currentPath);
                    }}
                >
                    {dom}
                </div>
            )}
        >
            <Routes>
                {routes}
            </Routes>
        </ProLayout>
    );
};

export default HomeLayout;