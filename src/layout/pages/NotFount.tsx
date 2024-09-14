import React from "react";
import {PageContainer} from "@ant-design/pro-components";

const NotFount = () => {
    window.document.title = '404 Not Found';

    return (
        <PageContainer>
            <h3>Error 404 ,Page Not Found</h3>
        </PageContainer>
    )
}

export default NotFount;
