import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const BoxStyled = styled(Box)`
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  box-shadow: 5px 5px 10px gray;
  border-radius: 10px;
`;

export const Background = styled(Box)`
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

export const Modal = styled(Box)`
  background-color: white;
  width: 600px;
  min-height: 400px;
  border-radius: 20px;
  box-shadow: 5px 5px 10px black;
  padding: 20px;
`;
