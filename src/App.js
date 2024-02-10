import { useState } from "react";
import TicTacToe from "./components/TicTacToe";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App h-screen w-screen bg-slate-800">
      {user === null ? (
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="bg-slate-200 flex flex-col rounded p-3">
            <h1 className="text-4xl">Choose a Symbol!</h1>
            <div className="flex flex-row w-full justify-center cursor-pointer">
              <div
                className="border bg-slate-500 p-4 m-2 rounded"
                onClick={() => setUser("X")}
              >
                <h1 className="text-2xl">X</h1>
              </div>
              <div
                className="border bg-slate-500 p-4 m-2 rounded"
                onClick={() => setUser("O")}
              >
                <h1 className="text-2xl">O</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TicTacToe user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
