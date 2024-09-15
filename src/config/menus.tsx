import {CrownFilled, SmileFilled} from "@ant-design/icons";

const menus = [
    {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileFilled/>,
        page: 'Welcome',
    },
    {
        path: '/admin',
        name: '管理页',
        icon: <CrownFilled/>,
        access: 'canAdmin',
        routes: [
            {
                path: '/admin/test',
                name: '测试页面',
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                page: 'Test',
            },
        ],
    },
]

export default menus;