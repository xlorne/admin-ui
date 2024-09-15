import {CrownFilled, SmileFilled} from "@ant-design/icons";

const menus = [
    {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileFilled/>,
        page: 'Welcome',
    },
    {
        path: '/test',
        name: '管理页',
        icon: <CrownFilled/>,
        access: 'canAdmin',
        routes: [
            {
                path: '/test/test1',
                name: '测试页面1',
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                page: 'Test/test1',
            },
            {
                path: '/test/test2',
                name: '测试页面2',
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                page: 'Test/test2',
            },
        ],
    },
]

export default menus;