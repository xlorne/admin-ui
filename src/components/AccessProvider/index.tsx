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
        const roles = child.props['has-role'];
        if (roles) {
            if (RoleControl.hasRole(roles)) {
                return child;
            }
        } else {
            // @ts-ignore
            if (child.props.children) {
                return React.cloneElement(child, {
                    ...child.props,
                    // @ts-ignore
                    children: React.Children.map(child.props.children, (item: any) => {
                        return renderWithAccess(item);
                    })
                });
            }
            return child;
        }
    }
    return null;
};

const AccessProvider: React.FC<AccessProviderProps> = (props) => {
    const {children} = props;
    return React.Children.map(children, child => renderWithAccess(child));
};

export default AccessProvider;