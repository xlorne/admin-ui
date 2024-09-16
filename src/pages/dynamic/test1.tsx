import React, {Suspense, useState} from "react";
import {Button, Col, Input, Row, Select, Spin} from "antd";
import Editor from "@/components/Editor";
import {PageContainer} from "@ant-design/pro-components";
import loadComponent from "@/components/Layout/DynamicCode";

const Test1 = () => {

    const [RemoteTestComponent, setRemoteTestComponent] = useState<React.ComponentType<any> | null>(null);

    const defaultCode =
`
    const Test = () => {
        return (
            <div>
                <h1>Test</h1>
                <Button onClick={() => alert('Hello!')}>Click Me</Button>
                <Input placeholder="Enter text" />
                <Select defaultValue="option1" style={{ width: 120 }}>
                    <Select.Option value="option1">Option 1</Select.Option>
                    <Select.Option value="option2">Option 2</Select.Option>
                </Select>
            </div>
        );
    };
    callback(Test);
`;
    const [code, setCode] = useState(defaultCode); // 直接在代码中返回 Test 组件实例

    const executeCode = (codeStr: string) => {
        loadComponent(codeStr, [
            Button,
            Input,
            Select
        ]).then((Component) => {
            setRemoteTestComponent(() => Component);
        }).catch((error) => {
            console.error(error);
        });
    };


    return (
        <PageContainer
            title={"动态加载代码"}
            extra={(
                <Button
                    type={"primary"}
                    onClick={() => {
                        executeCode(code);
                    }}
                >
                    Run Code
                </Button>
            )}
        >
            <Row>
                <Col span={12}>
                    <Editor
                        value={code}
                        style={{
                            height: 500,
                        }}
                        language={"javascript"}
                        onChange={(value) => {
                            setCode(value);
                        }}
                    />
                </Col>
                <Col span={12}>
                    {RemoteTestComponent && (
                        <Suspense fallback={<Spin tip={"Loading"} size={"large"}/>}>
                            <RemoteTestComponent/>
                        </Suspense>
                    )}
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Test1;