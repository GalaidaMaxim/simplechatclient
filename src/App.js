import { useState } from "react";
import { MainPage } from "./components/MainPage";
import { SeccondPage } from "./components/SeccondPage";
import { Chat } from "./components/Chat";
import { Routes, Route } from "react-router";

function App() {
  const [name, setName] = useState("");
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [requestUser, setRequestUser] = useState("");
  const [requestTo, setRequestTo] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              name={name}
              setName={setName}
              socket={socket}
              setSocket={setSocket}
              users={users}
              setUsers={setUsers}
              requestUser={requestUser}
              setRequestUser={setRequestUser}
              requestTo={requestTo}
              setRequestTo={setRequestTo}
            />
          }
        />
        <Route element={<SeccondPage />} path="sp" />
        <Route element={<Chat />} path="chat" />
      </Routes>
    </div>
  );
}

export default App;
