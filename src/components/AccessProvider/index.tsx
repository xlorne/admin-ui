import React from "react";
import RoleControl from "@/utils/RoleControl";

interface AccessProviderProps {
    children: React.ReactNode;
}

const renderWithAccess = (child: any): any => {

    if (!React.isValidElement(child)) {
        return child;
    }

    if (child.props) {
        // @ts-ignore
        if (Array.isArray(child.props.children)) {
            return React.cloneElement(child, {
                ...child.props,
                // @ts-ignore
                children: React.Children.map(child.props.children, (item: any) => renderWithAccess(item))
            });
        }
        // @ts-ignore
        const roles = child.props['access-hasRole'];
        if (RoleControl.hasRole(roles)) {
            return child;
        }
    }

    return null;
};

const AccessProvider: React.FC<AccessProviderProps> = (props) => {
    const {children} = props;
    return (
        <>
            {React.Children.map(children, child => renderWithAccess(child))}
        </>
    );
};

export default AccessProvider;