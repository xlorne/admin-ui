import React, {useEffect, useRef} from "react";
import {ActionType, ModalForm, PageContainer, ProCard, ProForm, ProFormText} from "@ant-design/pro-components";
import {MenuRouteManager} from "@/components/Layout/MenuRouteManager";
import {Popconfirm, Space, Tree} from "antd";
import {DeleteFilled, DownOutlined, EditFilled} from "@ant-design/icons";
import {useRoutesContext} from "@/components/Layout/RoutesProvider";
import ProFormIcons from "@/components/Form/ProFormIcons";
import MenuIcon from "@/components/Layout/MenuIcon";
import "./index.scss";

const Menu = () => {

    const tableActionRef = useRef<ActionType>();

    const [root, setRoot] = React.useState<any>(null);

    const [form] = ProForm.useForm();

    const [editorVisible, setEditorVisible] = React.useState(false);

    const {removeMenu, updateMenu} = useRoutesContext();

    const refreshData = () => {
        loadTrees();
        tableActionRef.current?.reload();
    }

    const loadTrees = () => {
        const fetchMenu = (item: any) => {
            if (item.icon) {
                item.iconKey = item.icon;
                item.icon = <MenuIcon icon={item.icon}/>
            }
            if (item.routes) {
                item.routes.map(fetchMenu);
                item.children = item.routes;
            }

            if (item.name) {
                item.title = (
                    <Space>
                        {item.name}

                        <EditFilled
                            onClick={() => {
                                form.setFieldsValue(item);
                                form.setFieldValue('icon', item.iconKey);
                                setEditorVisible(true);
                            }}
                        />

                        <Popconfirm title={"确认删除吗?"} onConfirm={() => {
                            removeMenu(item.path);
                            refreshData();
                        }}>
                            <DeleteFilled/>
                        </Popconfirm>
                    </Space>
                );
            }

            return item;
        }

        const menus = MenuRouteManager.getInstance().getMenus(false);
        menus.map(fetchMenu);

        setRoot({
            title: '所有菜单',
            key: 'root',
            children: menus
        });
    };

    useEffect(() => {
        loadTrees();
    }, []);

    return (
        <PageContainer>
            <ProCard
                colSpan={8}
                title={"菜单列表"}
            >
                {root && (
                    <Tree
                        showIcon
                        selectable={false}
                        defaultExpandAll
                        switcherIcon={<DownOutlined/>}
                        treeData={[root]}
                    />
                )}

            </ProCard>

            <ModalForm
                form={form}
                open={editorVisible}
                title={"新增菜单"}
                modalProps={{
                    onCancel: () => {
                        setEditorVisible(false);
                    }
                }}
                onFinish={async (values) => {
                    updateMenu(values);
                    refreshData();
                    setEditorVisible(false);
                    return true;
                }}
            >
                <ProFormText
                    name={"name"}
                    label={"名称"}
                    rules={[
                        {
                            required: true,
                            message: '名称是必填的'
                        }
                    ]}
                />

                <ProFormIcons
                    name={"icon"}
                    label={"图标"}
                />

                <ProFormText
                    name={"path"}
                    label={"路径"}
                    rules={[
                        {
                            required: true,
                            message: '路径是必填的'
                        }
                    ]}
                />

            </ModalForm>

            <ModalForm
                form={form}
                open={editorVisible}
                title={"编辑菜单"}
                modalProps={{
                    onCancel: () => {
                        setEditorVisible(false);
                    }
                }}
                onFinish={async (values) => {
                    updateMenu(values);
                    refreshData();
                    setEditorVisible(false);
                    return true;
                }}
            >
                <ProFormText
                    name={"name"}
                    label={"名称"}
                    rules={[
                        {
                            required: true,
                            message: '名称是必填的'
                        }
                    ]}
                />

                <ProFormIcons
                    name={"icon"}
                    label={"图标"}
                />

                <ProFormText
                    name={"path"}
                    label={"路径"}
                    rules={[
                        {
                            required: true,
                            message: '路径是必填的'
                        }
                    ]}
                />

            </ModalForm>

        </PageContainer>
    )
}

export default Menu;