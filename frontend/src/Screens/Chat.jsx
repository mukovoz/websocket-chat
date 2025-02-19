import {useEffect, useState} from "react";
import Messages from "../Components/Messages.jsx";
import MessageInput from "../Components/MessageInput.jsx";
import {Flex} from "antd";
import useWebSocket from "react-use-websocket";

export default function ({user}) {

    const [messages, setMessages] = useState([]);
    const {sendMessage, lastMessage} = useWebSocket("ws://localhost:5000");

    useEffect(() => {
       lastMessage && setMessages([...messages, ...JSON.parse(lastMessage.data)]);
    }, [lastMessage]);

    const addNewMessage = (text) => {
        sendMessage(JSON.stringify({
            text,
            user
        }));
    }

    return <div>
        <Flex vertical={true} style={{height: '100vh'}}>
            <Flex vertical={true} flex={1}>
                <Messages messages={messages}/>
            </Flex>
            <>
                <MessageInput onAdd={addNewMessage}/>
            </>
        </Flex>
    </div>
}