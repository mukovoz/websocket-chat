import {Avatar, List} from "antd";

export default function({messages}){
    return  <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(message, index) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={message.user?.avatar} />}
                    title={message.user?.name}
                    description={message.text}
                />
            </List.Item>
        )}
    />;
}