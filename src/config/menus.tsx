import {CrownFilled, SmileFilled} from "@ant-design/icons";

const menus = [
    {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileFilled/>,
        page: 'welcome',
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
                page: 'test/test1',
            },
            {
                path: '/test/test2',
                name: '测试页面2',
                page: 'test/test2',
            },
        ],
    },
    {
        path: '/dynamic',
        name: '动态加载',
        icon: <CrownFilled/>,
        access: 'canAdmin',
        routes: [
            {
                path: '/dynamic/test1',
                name: '动态加载1',
                page: 'dynamic/test1',
            },
            {
                path: '/dynamic/test2',
                name: '动态加载2',
                page: 'dynamic/test2',
            },

        ],
    },
]

export default menus;