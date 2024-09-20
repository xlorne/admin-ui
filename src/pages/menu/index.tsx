import React, {useEffect, useRef} from "react";
import {
    ActionType,
    ModalForm,
    PageContainer,
    ProCard,
    ProForm,
    ProFormText,
    ProTable
} from "@ant-design/pro-components";
import {MenuRouteManager} from "@/components/Layout/MenuRouteManager";
import {Button, Popconfirm, Tree} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useRoutesContext} from "@/components/Layout/RoutesProvider";
import ProFormIcons from "@/components/Form/ProFormIcons";
import MenuIcon from "@/components/Layout/MenuIcon";

const Menu = () => {

    const [currentMenu, setCurrentMenu] = React.useState<any>(null);

    const tableActionRef = useRef<ActionType>();

    const [root, setRoot] = React.useState<any>(null);

    const [form] = ProForm.useForm();

    const [editorVisible, setEditorVisible] = React.useState(false);

    const {removeMenu, updateMenu} = useRoutesContext();

    const columns = [
        {
            title: '图标',
            dataIndex: 'iconKey',
            key: 'iconKey',
            render: (text: any) => {
                return <MenuIcon icon={text}/>
            }
        },
        {
            title: '菜单名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '路径',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '操作',
            valueType: 'option',
            render: (_: any, record: any) => {
                return [
                    <a
                        key={"editor"}
                        onClick={() => {
                            form.setFieldsValue({
                                ...record,
                                icon: record.iconKey
                            });
                            setEditorVisible(true);
                        }}
                    >编辑</a>,
                    <Popconfirm
                        key={"delete"}
                        title={"确认删除吗？"}
                        onConfirm={() => {
                            removeMenu(record.path);
                            refreshData();
                        }}
                    >
                        <a>删除</a>
                    </Popconfirm>
                ]
            }
        }
    ]

    const refreshData = () => {
        setCurrentMenu(null);
        loadTrees();
        tableActionRef.current?.reload();
    }

    const loadTrees = () => {
        const fetchMenu = (item: any) => {
            if (item.name) {
                item.title = item.name;
            }
            if (item.icon) {
                item.iconKey = item.icon;
                item.icon = <MenuIcon icon={item.icon}/>
            }
            if (item.routes) {
                item.routes.map(fetchMenu);
                item.children = item.routes;
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
            <MenuIcon icon={"MenuOutlined"}/>
            <ProCard
                split={'vertical'}
                bordered
                headerBordered
            >
                <ProCard
                    colSpan={8}
                    title={"菜单列表"}
                >
                    {root && (
                        <Tree
                            showIcon
                            defaultExpandAll
                            switcherIcon={<DownOutlined/>}
                            treeData={[root]}
                            onSelect={(selectRows, {selected, node}) => {
                                if (selected) {
                                    setCurrentMenu(node);
                                } else {
                                    setCurrentMenu(null);
                                }
                                tableActionRef.current?.reload();
                            }}
                        />
                    )}

                </ProCard>

                <ProCard
                    title={"菜单表格"}
                    colSpan={16}
                >
                    <ProTable
                        rowKey={"path"}
                        search={false}
                        optionsRender={() => {
                            return [
                                <Button>新增</Button>
                            ]
                        }}
                        actionRef={tableActionRef}
                        columns={columns}
                        request={async () => {
                            if (currentMenu) {
                                return {
                                    data: currentMenu.children || [],
                                    success: true,
                                };
                            }
                            return {
                                data: root ? root.children : [],
                                success: true,
                            };
                        }}
                    />
                </ProCard>
            </ProCard>

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