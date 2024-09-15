import React from "react";
import AccessControl from "@/utils/accessControl";

interface AccessProps {
    children?: React.ReactNode;
    hasRole: string[];
}

const Access: React.FC<AccessProps> = (props) => {
    const {hasRole} = props;
    if (AccessControl.hasRole(hasRole)) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return null;
}

export default Access;