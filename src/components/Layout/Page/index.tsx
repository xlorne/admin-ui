import React from "react";
import RoleProvider from "@/framework/Permission/RoleProvider";
import {PageContainer} from "@ant-design/pro-components";
import {PageContainerProps} from "@ant-design/pro-layout/es/components/PageContainer";


interface PageProps {
    children: React.ReactNode;
    enablePageContainer?: boolean;
    pageContainerProps?: PageContainerProps;
}


const Page: React.FC<PageProps> = (props) => {
    return (
        <RoleProvider>
            {props.enablePageContainer && (
                <PageContainer {...props.pageContainerProps}>
                    {props.children}
                </PageContainer>
            )}
            {!props.enablePageContainer && (
                <>
                    {props.children}
                </>
            )}
        </RoleProvider>
    )
}

export default Page;