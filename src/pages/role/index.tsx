import React from "react";
import {PageContainer} from "@ant-design/pro-components";
import {Button} from "antd";
import AccessProvider from "@/components/AccessProvider";
import Access from "@/components/Access";


const Role = () => {

    return (
        <AccessProvider>
            <PageContainer>
                <h3>AccessProvider Test Page</h3>

                <Access isNotRoles>
                    <p>isNotRoles</p>
                </Access>

                <Access noAnyRoles={['ROLE_ADMIN']}>
                    <p>noAnyRoles={['ROLE_ADMIN']}</p>
                </Access>

                <Access noRoles={['ROLE_ADMIN']}>
                    <p>noRoles={['ROLE_ADMIN']}</p>
                </Access>

                <Access hasRoles={['ROLE_ADMIN']}>
                    <p>hasRoles={['ROLE_ADMIN']}</p>
                </Access>

                <Access hasAnyRoles={['ROLE_ADMIN']}>
                    <p>hasAnyRoles={['ROLE_ADMIN']}</p>
                </Access>

                <div has-roles={['ROLE_ADMIN']}>
                    <Button>Has Roles ['ROLE_ADMIN']</Button>
                    <Button has-any-roles={['ROLE_ADMIN', 'ROLE_USER']}>Has Any Roles ['ROLE_ADMIN','ROLE_USER']</Button>
                    <Button not-roles>no any roles</Button>
                    <Button no-roles={['ROLE_ADMIN']}>No Roles ['ROLE_ADMIN']</Button>
                    <Button no-any-roles={['ROLE_ADMIN', 'ROLE_USER']}>No Any Roles ['ROLE_ADMIN','ROLE_USER']</Button>
                </div>
            </PageContainer>
        </AccessProvider>
    )
}

export default Role;