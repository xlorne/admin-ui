import React from "react";
import {GithubFilled, InfoCircleFilled, QuestionCircleFilled} from "@ant-design/icons";


export const loadHeaderAction = (props: any) => {
    if (props.isMobile) return [];
    return [
        <InfoCircleFilled key="InfoCircleFilled"/>,
        <QuestionCircleFilled key="QuestionCircleFilled"/>,
        <GithubFilled key="GithubFilled"/>,
    ];
}

