import React from "react";
import RoleManager from "@/framework/Permission/RoleProvider/RoleManager";

interface RoleProviderProps {
    children: React.ReactNode;
}

const renderWithAccess = (child: any): any => {
    if (!React.isValidElement(child)) {
        return child;
    }
    if (child.props) {

        // @ts-ignore
        if (child.props.children) {
            child = React.cloneElement(child, {
                ...child.props,
                // @ts-ignore
                children: React.Children.map(child.props.children, (item: any) => {
                    return renderWithAccess(item);
                })
            });
        }

        const roleKey = 'role-key';
        const key = child.props && child.props[roleKey];
        if(key) {
            if (RoleManager.getInstances().hasRole(key)) {
                return child;
            }else {
                return null;
            }
        }
        return child;
    }
    return null;
};

const RoleProvider: React.FC<RoleProviderProps> = (props) => {
    const {children} = props;
    return React.Children.map(children, child => renderWithAccess(child));
};

export default RoleProvider;