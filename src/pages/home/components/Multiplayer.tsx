import { useEffect, useState } from "react";
import TicTacToeBoard from "./TicTacToeBoard";
import { Box } from "@mui/material";
import { MatrixItem } from "../../../types/matrix-item";
import checkIfAllBoxesSelected from "../functions/checkIfAllBoxesSelected";
import identifyGameFinish from "../functions/identifyGameFinish";
import socket from "../../../config/socket";
import { MatrixPosition } from "../../../types/matrix-position";
import GameFinish from "./GameFinish";

type Props = {
  room: string;
};

const Multiplayer = ({ room }: Props) => {
  const initialRows: MatrixItem[][] = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];
  const [rows, setRows] = useState<MatrixItem[][]>(initialRows);
  const [freezeSelection, setFreezeSelection] = useState(false);
  const [gameFinishedBy, setGameFinishedBy] = useState("");

  const resetGame = () => {
    setRows([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    setGameFinishedBy("");
    setFreezeSelection(false);
  };

  useEffect(() => {
    socket.on("receive_position", (matrixPosition: MatrixPosition) => {
      if (!gameFinishedBy) {
        if (matrixPosition !== null) {
          const { rowIndex, colIndex } = matrixPosition;
          setRows((prevState) => {
            let newRows = [...prevState];
            newRows[rowIndex][colIndex] = "o";
            return newRows;
          });
          setFreezeSelection(false);
        }
      }
    });

    socket.on("restart_game", (status: boolean) => {
      if (status) {
        console.log(status);
        resetGame();
      }
    });

    return () => {
      socket.off("receive_position");
      socket.off("restart_game");
    };
  }, []);

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

  const handleItemClick = (
    rowIndex: number,
    colIndex: number,
    value: MatrixItem
  ) => {
    if (!freezeSelection && value === undefined && !gameFinishedBy) {
      socket.emit("send_position", { position: { rowIndex, colIndex }, room });
      setRows((prevState) => {
        let newRows = [...prevState];
        newRows[rowIndex][colIndex] = "x";
        return newRows;
      });
      setFreezeSelection(true);
    }
  };

  const handleReset = () => {
    socket.emit("restart_trigger", { room });
    resetGame();
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

export default Multiplayer;
