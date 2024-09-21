import React from "react";
import RoleControl from "@/utils/RoleControl";

export interface AccessProps {
    children?: React.ReactNode;
    hasRole: string[];
}

const Access: React.FC<AccessProps> = (props) => {
    const {hasRole} = props;
    if (RoleControl.hasRole(hasRole)) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return null;
}

export default Access;