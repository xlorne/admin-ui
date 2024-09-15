import React, {Suspense, useEffect, useState} from "react";
import {Button, Space, Spin} from "antd";
import {ModalForm, PageContainer, ProForm, ProFormText} from "@ant-design/pro-components";
import ProFormUploader from "@/components/ProFormUploader";
import {loadRemoteComponent, loadZipJsFileScript} from "@/utils/dynamicLoader";
import {useNavigate} from "react-router";
import {BugFilled} from "@ant-design/icons";
import {useRoutesContext} from "@/config/RoutesProvider";


const Test2 = () => {
    const [RemoteTestComponent, setRemoteTestComponent] = useState<React.ComponentType<any> | null>(null);

    const {addMenu} = useRoutesContext();

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState('zip' as 'zip' | 'menu');

    const [form] = ProForm.useForm();


    useEffect(() => {
        if(visible){
            form.setFieldsValue({
                scope: "MircoApp",
                module: "./Header",
            })
        }
    }, [visible]);

    const loadComponent = (values: any) => {
        return new Promise((resolve, reject) => {
            const base64 = values.component;
            const scope = values.scope;
            const module = values.module;
            loadZipJsFileScript(base64).then(() => {
                loadRemoteComponent(scope, module).then((ComponentModule: any) => {
                    const Component = ComponentModule.default || ComponentModule;
                    resolve(Component);
                }).catch(e => {
                    reject(e);
                });
            });
        });
    }

    const handlerLoadComponent = async (values: any) => {
        loadComponent(values).then((Component:any) => {
            if(Component) {
                if (mode === 'menu') {
                   addMenu({
                        path: '/test',
                        name:'测试页面',
                        icon: <BugFilled/>,
                        routes:[
                            {
                                path: '/test/test1',
                                element: <Component/>,
                                name:'测试页面',
                                icon: <BugFilled/>,
                            }
                        ]
                    });
                }else{
                    setRemoteTestComponent(() => Component);
                }
            }
            setVisible(false);
        });
    }

    return (
        <PageContainer>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                    gap: '50px',
                }}
            >
                Dynamic Load Zip Component Page

                {RemoteTestComponent && (
                    <Suspense fallback={<Spin tip={"Loading"} size={"large"}/>}>
                        <RemoteTestComponent
                            title={"Remote Component Header"}
                            onClick={() => {
                                alert('click');
                            }}
                        />
                    </Suspense>
                )}
                <Space>
                    <Button
                        onClick={() => {
                            setMode('zip');
                            setVisible(true);
                        }}
                    >
                        upload zip component
                    </Button>

                    <Button
                        onClick={() => {
                            setMode('menu');
                            setVisible(true);
                        }}
                    >
                        upload menu component
                    </Button>

                    <Button
                        onClick={() => {
                            navigate('/test');
                        }}
                    >
                        go test
                    </Button>

                </Space>


                <ModalForm
                    form={form}
                    title={"upload component"}
                    open={visible}
                    modalProps={{
                        onCancel: () => {
                            setVisible(false);
                        },
                        destroyOnClose: true
                    }}
                    onFinish={handlerLoadComponent}
                >
                    <ProFormText
                        name={"component"}
                        hidden={true}
                    />

                    <ProFormText
                        name={"scope"}
                        label={"scope"}
                        rules={[
                            {
                                required: true,
                                message: "scope is required"
                            }
                        ]}
                    />

                    <ProFormText
                        name={"module"}
                        label={"module"}
                        rules={[
                            {
                                required: true,
                                message: "module is required"
                            }
                        ]}
                    />

                    <ProFormUploader
                        label={"component zip file"}
                        name={"upload"}
                        max={1}
                        accept={".zip"}
                        onChange={({file}) => {
                            if (file.response) {
                                form.setFieldValue('component', file.response);
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: "upload zip file"
                            }
                        ]}
                    />

                </ModalForm>
            </div>
        </PageContainer>
    )
}

export default Test2;
