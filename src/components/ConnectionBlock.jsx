import { BoxStyled } from "./Styled";
import { TextField, Button, Typography, Box } from "@mui/material";

export const ConnectionBlock = ({ setName, name, connect }) => {
  return (
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
  );
};
