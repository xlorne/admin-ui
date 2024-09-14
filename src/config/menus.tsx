import {CrownFilled, SmileFilled} from "@ant-design/icons";

const menus = [
    {
        path: '/home',
        name: '欢迎',
        icon: <SmileFilled/>,
        page: 'Home',
    },
    {
        path: '/admin',
        name: '管理页',
        icon: <CrownFilled/>,
        access: 'canAdmin',
        routes: [
            {
                path: '/admin/test',
                name: 'Test',
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                page: 'Test',
            },
        ],
    },
]

export default menus;