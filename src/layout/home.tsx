import {ProLayout} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Route, Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import menus from "@/config/menus";
import {loadPage} from "@/config/PageLoader";
import AvatarHeader from "@/layout/avatar";
import {loadHeaderAction} from "@/layout/action";
import {config} from "@/config/theme";
import "./home.scss";


const welcomePath = config.welcomePath;
const loginPath = config.loginPath;

const MenuRoutes = () => {

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

    return (
        <Routes>
            {menus.map((menu) => loadMenuRoute(menu))}
        </Routes>
    );
}

const HomeLayout = () => {
    const [pathname, setPathname] = useState(welcomePath);

    const navigate = useNavigate();

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
            <MenuRoutes/>
        </ProLayout>
    );
};

export default HomeLayout;