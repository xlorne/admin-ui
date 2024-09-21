import React, {lazy, Suspense} from 'react';
import {Spin} from "antd";

export const loadPage = (pageName: string) => {
    const PageComponent = lazy(() => import(`@/pages/${pageName}`));
    return (
        <Suspense fallback={<Spin size="large" tip="Loading"/>}>
            <PageComponent/>
        </Suspense>
    );
};
