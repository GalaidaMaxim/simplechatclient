import { Button, Typography } from "@mui/material";
import { BoxStyled } from "./Styled";

export const UsersList = ({ users, socket, setRequestTo }) => {
  const createRoomWith = (username) => {
    return () => {
      socket.send(
        JSON.stringify({
          command: "createRoomWith",
          username,
        })
      );
      setRequestTo(username);
    };
  };
  return (
    <BoxStyled>
      <Typography>Список коритсувачів</Typography>
      {users.map((item) => (
        <Button onClick={createRoomWith(item)} key={item}>
          {item}
        </Button>
      ))}
    </BoxStyled>
  );
};
