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
                    isNotRoles
                </Access>

                <Access noAnyRoles={['ROLE_ADMIN']}>
                    noAnyRoles={['ROLE_ADMIN']}
                </Access>

                <Access noRoles={['ROLE_ADMIN']}>
                    noRoles={['ROLE_ADMIN']}
                </Access>

                <Access hasRoles={['ROLE_ADMIN']}>
                    hasRoles={['ROLE_ADMIN']}
                </Access>

                <Access hasAnyRoles={['ROLE_ADMIN']}>
                    hasAnyRoles={['ROLE_ADMIN']}
                </Access>

                <Button has-roles={['ROLE_ADMIN']}>Has Roles ['ROLE_ADMIN']</Button>
                <Button has-any-roles={['ROLE_ADMIN', 'ROLE_USER']}>Has Any Roles ['ROLE_ADMIN','ROLE_USER']</Button>
                <Button not-roles>no any roles</Button>
                <Button no-roles={['ROLE_ADMIN']}>No Roles ['ROLE_ADMIN']</Button>
                <Button no-any-roles={['ROLE_ADMIN', 'ROLE_USER']}>No Any Roles ['ROLE_ADMIN','ROLE_USER']</Button>
            </PageContainer>
        </AccessProvider>
    )
}

export default Role;