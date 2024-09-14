import React from "react";
import {ProForm, ProFormText} from "@ant-design/pro-components";
import {login} from "@/api/account";
import {message} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "@/config/redux";


const Login = () => {

    const counter = useSelector((state: RootState) => state.counter.value);

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
            <h1>
                Login Page Redux:{counter}
            </h1>

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