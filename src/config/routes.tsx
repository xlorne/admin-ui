import React, {createContext, lazy, Suspense, useContext, useState} from 'react';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from '@/pages/Home';
import {loadRemoteComponent, loadRemoteScript} from "@/utils/dynamicLoader";
import {loadPage} from "@/config/PageLoader";
import NotFount from "@/layout/NotFount";
import Login from "@/pages/Login";
import Test from "@/pages/Test";

const RouteContext = createContext<any>(null);

export const useRoutesContext = () => useContext(RouteContext);

interface Router {
    path: string,
    element: React.ReactNode
}

interface PageRouter {
    path: string,
    pageName: string
}

interface DynamicComponentRouter {
    path: string,
    remoteUrl: string,
    scope: string,
    module: string
}

const RoutesProvider: React.FC = () => {
    const [routes, setRoutes] = useState<Router[]>([
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/test',
            element: <Test/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
        {
            path: '*',
            element: <NotFount/>,
        }
    ]);

    const addRoute = (newRoute: Router) => {
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    };

    const removeRoute = (path: string) => {
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.path !== path));
    };

    const addPageRoute = (router: PageRouter) => {
        const newRoute = {
            path: router.path,
            element: loadPage(router.pageName),
        };
        addRoute(newRoute);
    }

    const addDynamicComponentRoute = (router: DynamicComponentRouter) => {
        const dynamicLoadComponent = (remoteUrl: string, scope: string, module: string): Promise<React.ComponentType<any>> => {
            return new Promise((resolve, reject) => {
                loadRemoteScript(remoteUrl).then(() => {
                    loadRemoteComponent(scope, module).then((ComponentModule: any) => {
                        resolve(ComponentModule.default || ComponentModule);
                    });
                }).catch(ignore => {
                });
            })
        }
        const NewPage = lazy(async () => {
            const Component = await dynamicLoadComponent(router.remoteUrl, router.scope, router.module);
            return {default: Component};
        });
        const newRoute = {
            path: router.path,
            element: (
                <Suspense fallback={"loading"}>
                    <NewPage/>
                </Suspense>
            ),
        };
        addRoute(newRoute);
    }

    const hashRoutes = createHashRouter(routes);

    return (
        <RouteContext.Provider value={{addRoute, removeRoute, addDynamicComponentRoute, addPageRoute}}>
            <RouterProvider
                router={hashRoutes}
            />
        </RouteContext.Provider>
    );
};

export default RoutesProvider;
