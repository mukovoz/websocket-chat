import {Button, Form, Input} from "antd";

export default function ({onAdd}) {

    return <Form onFinish={values => onAdd(values.text)} layout={'vertical'}>
        <Form.Item name={"text"}>
            <Input.TextArea autoSize={true}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType={'submit'}>Send</Button>
        </Form.Item>
    </Form>
}