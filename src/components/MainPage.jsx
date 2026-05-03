import { Button, TextField, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

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

export const MainPage = ({
  name,
  setName,
  socket,
  setSocket,
  users,
  setUsers,
  requestUser,
  setRequestUser,
  requestTo,
  setRequestTo,
}) => {
  const connect = () => {
    const socket = new WebSocket(`ws://193.169.241.74:3004?name=${name}`);

    socket.onmessage = (event) => {
      console.log(event.data);
      const message = JSON.parse(event.data);
      if (message.command === "userList") {
        setUsers(message.users);
      } else if (message.command === "requestConnectionWith") {
        setRequestUser(message.user);
      } else if (message.command === "roomCreationRejected") {
        setRequestUser("");
        setRequestTo("");
      }
    };

    socket.onclose = () => {
      setSocket(null);
    };

    setSocket(socket);
  };

  const onUserClick = (username) => {
    setRequestTo(username);
    socket.send(
      JSON.stringify({
        command: "createRoomWith",
        username,
      })
    );
  };

  const onReject = (username) => {
    socket.send(
      JSON.stringify({
        command: "createRoomReject",
        username,
      })
    );
  };

  const onAccept = (username) => {
    socket.send(
      JSON.stringify({
        command: "createRoomAccept",
        username,
      })
    );
  };

  return (
    <div>
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
            <Button onClick={() => onUserClick(item)} key={item}>
              {item}
            </Button>
          ))}
        </BoxStyled>
      )}
      {requestUser && (
        <Background>
          <Modal>
            <Typography variant="h2">
              Запит приєднання коритсувача {requestUser}
              <Box>
                <Button onClick={() => onAccept(requestUser)}>Прийняти</Button>
                <Button onClick={() => onReject(requestUser)}>Відхилити</Button>
              </Box>
            </Typography>
          </Modal>
        </Background>
      )}

      {requestTo && (
        <Background>
          <Modal>
            <Typography variant="h2">
              Приєднатись до коритсувача{requestTo}
              <Box>
                <Button onClick={() => onReject(requestTo)}>Відхилити</Button>
              </Box>
            </Typography>
          </Modal>
        </Background>
      )}
    </div>
  );
};
