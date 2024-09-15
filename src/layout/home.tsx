import {ProLayout} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import {menus, routes} from "@/config/menus";
import AvatarHeader from "@/layout/avatar";
import {loadHeaderAction} from "@/layout/action";
import {config} from "@/config/theme";
import "./home.scss";

const welcomePath = config.welcomePath;
const loginPath = config.loginPath;

const HomeLayout = () => {
    const [pathname, setPathname] = useState(welcomePath);

    const navigate = useNavigate();

    useEffect(() => {
        const path = window.location.hash.replace('#', '');
        setPathname(path);
    }, [])

    return (
        <ProLayout
            siderWidth={config.siderWidth}
            layout={config.layout}
            route={{
                routes: menus,
            }}
            location={{
                pathname,
            }}
            title={config.title}
            logo={config.logo}
            waterMarkProps={{
                content: config.waterMark,
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