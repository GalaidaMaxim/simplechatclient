import { useState } from "react";
import { MainPage } from "./components/MainPage";
import { Route, Routes } from "react-router-dom";

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
      </Routes>
    </div>
  );
}

export default App;
