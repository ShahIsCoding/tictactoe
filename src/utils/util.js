import axios from "axios";

export const changeWinnerColour = (line, boardColor) => {
  const newBoardColor = [...boardColor];
  newBoardColor[line[0]] = "text-teal-200";
  newBoardColor[line[1]] = "text-teal-200";
  newBoardColor[line[2]] = "text-teal-200";
  return newBoardColor;
};
const apiUrl = "https://hiring-react-assignment.vercel.app/api/bot";

export const computePlay = async (
  Board,
  user,
  setBoard,
  setBoardColor,
  setWinner
) => {
  let newBoard = [...Board];
  try {
    const computerMove = await getComputerMove(newBoard);
    if (newBoard[computerMove] === null) {
      newBoard[computerMove] = user === "X" ? "O" : "X";

      setBoard(newBoard);

      const computerWinnerInfo = checkWinner(newBoard);
      if (computerWinnerInfo.isWin) {
        setWinner(computerWinnerInfo.symbol);
        setBoardColor(changeWinnerColour(computerWinnerInfo.line));
      }
    }
  } catch (error) {
    console.error("Error getting computer move:", error);
  }
};
const getComputerMove = async (currentBoard) => {
  const response = await axios.post(apiUrl, JSON.stringify(currentBoard));

  const data = await response.data;
  return data;
};

export const checkWinner = (squares, setWinner) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (
      squares[a] !== " " &&
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      setWinner(squares[a]);
      return { isWin: true, symbol: squares[a], line: [a, b, c] };
    }
  }
  return { isWin: false };
};
