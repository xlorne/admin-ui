import {ProLayout} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Route, Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import menus from "@/config/menus";
import {loadPage} from "@/config/PageLoader";
import AvatarHeader from "@/layout/avatar";
import {loadHeaderAction} from "@/layout/action";
import {config} from "@/config/theme";

const MenuRoutes = () => {

    const loadMenuRoute = (menu: any) => {
        if (menu.page) {
            const element = loadPage(menu.page);
            return (
                <Route
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
    const [pathname, setPathname] = useState('/welcome');

    const navigate = useNavigate();

    return (
        <ProLayout
            siderWidth={216}
            layout={"mix"}
            route={{
                routes: menus,
            }}
            location={{
                pathname,
            }}
            title={config.title}
            logo={config.logo}
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
            menuItemRender={(item, dom) => (
                <div
                    onClick={() => {
                        const currentPath = item.path || '/welcome'
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