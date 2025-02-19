import {Button, Form, Input} from "antd";

export default function ({onJoin = v => null}) {
    return <Form onFinish={values => {
        onJoin({...values, avatar: "https://i.pravatar.cc/150"});
    }} layout={'vertical'}>
        <Form.Item label={'Enter your name'} name={'name'}>
            <Input/>
        </Form.Item>
        <Form.Item>
            <Button htmlType={'submit'} type={'primary'}>Join</Button>
        </Form.Item>
    </Form>
}