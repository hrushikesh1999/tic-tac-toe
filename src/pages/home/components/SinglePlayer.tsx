import { useEffect, useState } from "react";
import TicTacToeBoard from "./TicTacToeBoard";
import { Box } from "@mui/material";
import selectRandomPosition from "../functions/selectRandomPosition";
import { MatrixItem } from "../../../types/matrix-item";
import checkIfAllBoxesSelected from "../functions/checkIfAllBoxesSelected";
import identifyGameFinish from "../functions/identifyGameFinish";
import GameFinish from "./GameFinish";

const SinglePlayer = () => {
  const initialRows: MatrixItem[][] = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];
  const [rows, setRows] = useState<MatrixItem[][]>(initialRows);
  const [switchPlayer, setSwitchPlayer] = useState(true);
  const [gameFinishedBy, setGameFinishedBy] = useState("");

  useEffect(() => {
    const finishedBy = identifyGameFinish(rows);
    if (finishedBy) {
      setGameFinishedBy(finishedBy);
    } else {
      if (checkIfAllBoxesSelected(rows)) {
        setGameFinishedBy("draw");
      }
    }
  }, [rows]);

  useEffect(() => {
    if (!switchPlayer && !gameFinishedBy) {
      const matrixPosition = selectRandomPosition(rows);
      if (matrixPosition !== null) {
        const { rowIndex, colIndex } = matrixPosition;
        setTimeout(() => {
          setRows((prevState) => {
            let newRows = [...prevState];
            newRows[rowIndex][colIndex] = "o";
            return newRows;
          });
        }, 0);
        setSwitchPlayer((prevState) => !prevState);
      }
    }
  }, [switchPlayer, gameFinishedBy]);

  const handleItemClick = (
    rowIndex: number,
    colIndex: number,
    value: MatrixItem
  ) => {
    if (switchPlayer && value === undefined && !gameFinishedBy) {
      setRows((prevState) => {
        let newRows = [...prevState];
        newRows[rowIndex][colIndex] = "x";
        return newRows;
      });
      setSwitchPlayer((prevState) => !prevState);
    }
  };

  const handleReset = () => {
    setRows(initialRows);
    setGameFinishedBy("");
  };

  return (
    <Box component={"div"} sx={{ flexGrow: 1, mt: 5 }}>
      <TicTacToeBoard
        rows={rows}
        handleItemClick={handleItemClick}
        handleReset={handleReset}
      />
      <GameFinish gameFinishedBy={gameFinishedBy} />
    </Box>
  );
};

export default SinglePlayer;
