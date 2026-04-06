import { Button, TextField, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";

const BoxStyled = styled(Box)`
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  box-shadow: 5px 5px 10px gray;
  border-radius: 10px;
`;

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
        <BoxStyled>
          <Typography variant="h3">Введіть ім'я</Typography>
          <TextField
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Box>
            <Button onClick={connect}>Приєднатись</Button>
          </Box>
        </BoxStyled>
      )}
      {socket && (
        <BoxStyled>
          <Typography>Список коритсувачів</Typography>
          {users.map((item) => (
            <Button key={item}>{item}</Button>
          ))}
        </BoxStyled>
      )}
      <Background>
        <Modal>
          <Typography variant="h2">Це модалка</Typography>
        </Modal>
      </Background>
    </div>
  );
}

export default App;
