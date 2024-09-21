import React from "react";
import {accessHandlers} from "@/components/AccessProvider/handler";

interface AccessProviderProps {
    children: React.ReactNode;
}

const renderWithAccess = (child: any): any => {
    if (!React.isValidElement(child)) {
        return child;
    }
    if (child.props) {

        for (let i = 0; i < accessHandlers.length; i++) {
            if (accessHandlers[i].match(child)) {
                return accessHandlers[i].handle(child);
            }
        }

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
    return null;
};

const AccessProvider: React.FC<AccessProviderProps> = (props) => {
    const {children} = props;
    return React.Children.map(children, child => renderWithAccess(child));
};

export default AccessProvider;