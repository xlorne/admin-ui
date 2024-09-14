import React, { Suspense, lazy } from 'react';

export const loadPage = (pageName: string) => {
    const PageComponent = lazy(() => import(`@/pages/${pageName}`));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageComponent />
        </Suspense>
    );
};
