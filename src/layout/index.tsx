import {GithubFilled, InfoCircleFilled, QuestionCircleFilled,} from '@ant-design/icons';
import {ProLayout} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Route, Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import menus from "@/config/menus";
import {loadPage} from "@/config/PageLoader";


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

export default () => {
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
            avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                title: '七妮妮',
                size: 'small',
            }}
            actionsRender={(props) => {
                if (props.isMobile) return [];
                return [
                    <InfoCircleFilled key="InfoCircleFilled"/>,
                    <QuestionCircleFilled key="QuestionCircleFilled"/>,
                    <GithubFilled key="GithubFilled"/>,
                ];
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