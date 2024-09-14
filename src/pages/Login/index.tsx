import React from "react";
import {ProForm, ProFormText} from "@ant-design/pro-components";
import {login} from "@/api/account";
import {message} from "antd";


const Login = () => {

    return (
        <ProForm
            onFinish={async (values) => {
                const res = await login(values);
                if(!res.success){
                    message.error(res.errMessage);
                }else{
                    message.success('登录成功');
                }
            }}
        >
            <ProFormText
                name={"username"}
                label={"用户名"}
            />
            <ProFormText
                name={"password"}
                label={"密码"}
            />
        </ProForm>
    )
}

export default Login;