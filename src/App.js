import { Button, TextField, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { ConnectionBlock } from "./components/ConnectionBlock";
import { UsersList } from "./components/UsersList";

const Background = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled(Box)`
  background-color: white;
  width: 600px;
  min-height: 400px;
  border-radius: 20px;
  box-shadow: 5px 5px 10px black;
  padding: 20px;
`;

function App() {
  const [name, setName] = useState("");
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  console.log(name);

  const connect = () => {
    const socket = new WebSocket(`ws://193.169.241.74:3004?name=${name}`);

    socket.onmessage = (event) => {
      console.log(event.data);
      const message = JSON.parse(event.data);
      if (message.command === "userList") {
        setUsers(message.users);
      }
    };

    socket.onclose = () => {
      setSocket(null);
    };

    setSocket(socket);
  };
  return (
    <div className="App">
      {!socket && (
        <ConnectionBlock setName={setName} name={name} connect={connect} />
      )}
      {socket && <UsersList users={users} socket={socket} />}
      {/* <Background>
        <Modal>
          <Typography variant="h2">Це модалка</Typography>
        </Modal>
      </Background> */}
    </div>
  );
}

export default App;
