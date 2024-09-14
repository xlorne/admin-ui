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
            return loadPage(menu.page);
        } else {
            if (menu.routes) {
                const children = menu.routes.map((route: any) => {
                    return (
                        <Route
                            path={route.path}
                            element={loadMenuRoute(route)}/>
                    );
                });
                return (
                    <Route
                        path={menu.path}
                        children={(
                            <>
                                {children && children.map((child: any) => child)}
                            </>
                        )}/>
                )
            }
        }
    }

    return (
        <Routes>
            {menus.map((menu) => {

                const element = loadMenuRoute(menu);

                if (menu.page) {
                    return (
                        <Route element={element} path={menu.path}/>
                    )
                } else {
                    if (menu.routes) {
                        const children = menu.routes.map((route: any) => {
                            return <Route element={loadMenuRoute(route)} path={route.path}/>;
                        });
                        return (
                            <Route children={(
                                <>
                                    {children && children.map((child: any) => child)}
                                </>
                            )} path={menu.path}/>
                        )
                    }
                }
            })}
        </Routes>
    )
}

export default () => {
    const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');

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
                        // setPathname(item.path || '/welcome');
                        navigate(item.path || '/welcome');
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