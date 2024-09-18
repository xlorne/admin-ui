import React from "react";
import ProFormIcons from "src/components/Form/ProFormIcons";
import {ProForm} from "@ant-design/pro-components";

const Test1 = () => {

    return (
        <ProForm
            onFinish={async (values) => {
                console.log(values);
            }}
        >
            <ProFormIcons
                name={"icon"}
                label={"Icon"}
            />
        </ProForm>
    )
}

export default Test1;