import axios from "axios";
import React, { useEffect, useState } from "react";
import { changeWinnerColour, checkWinner, computePlay } from "../utils/util";

const TicTacToe = ({ user, setUser }) => {
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [boardColor, setBoardColor] = useState(Array(9).fill("text-black"));
  const tictacbox = Array(9).fill(null);

  const handleClick = (index) => {
    if (board[index] !== null || winner !== null) return;
    const newBoard = [...board];
    newBoard[index] = user;
    let userWinnerInfo = checkWinner(newBoard, setWinner);
    if (userWinnerInfo.isWin) {
      setBoardColor(changeWinnerColour(userWinnerInfo.line, boardColor));
    }
    setBoard(newBoard);
    if (!userWinnerInfo.isWin)
      computePlay(newBoard, user, setBoard, setBoardColor, setWinner);
  };

  const Block = ({ id }) => {
    const val = board[id] ? board[id] : " ";
    return (
      <div
        onClick={() => handleClick(id)}
        className={`card ${id} w-24 h-24  bg-slate-400 text-center`}
      >
        <span className={`text-8xl ${boardColor[id]}`}>{val}</span>
      </div>
    );
  };
  const renderBoard = () => (
    <div className="board grid grid-cols-3 gap-2 m-2 rounded">
      {tictacbox.map((item, idx) => (
        <Block id={idx} />
      ))}
    </div>
  );
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {winner !== null && (
        <div className="m-2 bg-slate-300 text-xl p-3 rounded">
          {winner === user
            ? "You Won !!!"
            : winner === "Draw"
            ? winner
            : "Computer Won Try Again!!"}
        </div>
      )}
      <div className="bg-slate-50 w-fit">{renderBoard()}</div>
      <div
        className="bg-slate-200 px-3 py-2 m-3"
        onClick={() => {
          setUser(null);
        }}
      >
        Reset
      </div>
    </div>
  );
};

export default TicTacToe;
