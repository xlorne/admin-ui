import React from "react";
import {PageContainer} from "@ant-design/pro-components";
import {Button} from "antd";
import RoleProvider from "src/components/Permission/RoleProvider";


const Role = () => {

    return (
        <RoleProvider>
            <PageContainer>
                <h3 role-key={"title"}>AccessProvider Test Page</h3>

                <div role-key={"roles"}>
                    <Button type="primary">Admin Button</Button>
                </div>
            </PageContainer>
        </RoleProvider>
    )
}

export default Role;