import {useState} from 'react'
import Welcome from "./Screens/Welcome.jsx";
import Chat from "./Screens/Chat.jsx";

function App() {

    const [user, setUser] = useState(null);

    return <>
        {user ? <Chat user={user} /> : <Welcome onJoin={setUser}/>}
    </>;
}
export default App
