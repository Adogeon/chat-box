import React from "react";
import socket from "../adapters/socket";
import { useAuthState } from "../contexts/authContext";

function ChatPage() {
  const authState = useAuthState();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (authState.isAuth) {
      socket.auth = { token: authState.token };
      socket.connect();
      //joining a test room
      socket.emit("room:join", { room: "test-room" });
      //sending message
      socket.on("message", (payload) => {
        console.log("receiving message");
        setMessage((prevMess) => {
          return [...prevMess, payload];
        });
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      socket.emit("room:leave");
      socket.disconnect();
    };
  });

  return (
    <main>
      <h1>Chat Page</h1>
    </main>
  );
}

export default ChatPage;
