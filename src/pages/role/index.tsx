import React from "react";
import {PageContainer} from "@ant-design/pro-components";
import {Button} from "antd";
import AccessProvider from "@/components/AccessProvider";
import Access from "@/components/Access";


const Role = () => {

    return (
        <AccessProvider>
            <PageContainer>
                AccessProvider test <p/>

                <Access hasRole={['ROLE_ADMIN']}>
                    hi, admin manager
                </Access>

                <div>
                    <Button>No Role</Button>
                    <Button access-hasRole={['ROLE_ADMIN2']}>ROLE_ADMIN2</Button>
                </div>

                <Button access-hasRole={['ROLE_ADMIN']}>ROLE_ADMIN</Button>

            </PageContainer>
        </AccessProvider>
    )
}

export default Role;