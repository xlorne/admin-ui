import React from 'react';
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'


interface MenuProps {
    icon: string
}

const Menus: React.FC<MenuProps> = (props) => {
    if (props.icon === '-') {
        return <></>
    }

    if (props.icon) {
        // @ts-ignore
        return <Icon component={icons[props.icon]} />
    } else {
        return <></>
    }
}

export async function loadLayoutMenus(response: any) {
    if (response.success) {
        let children = response.data.children;
        if (children === null) {
            return [];
        }
        const fetchMenu = (data: any) => {
            data.icon = <Menus icon={data.icon} />;
            data.children = data.children || [];
            data.children.forEach((item: any) => {
                fetchMenu(item);
            });
            return data;
        }
        children = children.map((item: any) => fetchMenu(item));
        return children;
    } else {
        return [];
    }
}

export async function loadLayoutMenuAuthentications(response: any) {
    if (response.success) {
        let children = response.data.children;
        if (children === null) {
            return [];
        }
        const authorities: string[] = [];
        const fetchAuthorities = (data: any) => {
            authorities.push(data.path);
            if (data.children) {
                data.children.forEach((item: any) => {
                    fetchAuthorities(item);
                });
            }
        }
        children.forEach((element: any) => {
            fetchAuthorities(element);
        });
        return authorities;
    }
    return [];
}
