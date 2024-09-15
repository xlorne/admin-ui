import React from "react";
import {PageContainer, ProForm, ProFormText} from "@ant-design/pro-components";
import {initUser, login} from "@/api/account";
import {message} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "@/config/Redux";
import {useNavigate} from "react-router-dom";


const Login = () => {

    const counter = useSelector((state: RootState) => state.counter.value);
    const navigate = useNavigate();

    return (
        <PageContainer>
            <ProForm
                onFinish={async (values) => {
                    const res = await login(values);
                    if (!res.success) {
                        message.error(res.errMessage);
                    } else {
                        message.success('登录成功');
                        initUser(res.data);
                        navigate('/welcome', {replace: true});
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
        </PageContainer>
    )
}

export default Login;