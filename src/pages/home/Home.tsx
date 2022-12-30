import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useEffect, useState } from "react";
import { MatrixItem } from "../../types/matrix-item";
import { MatrixPosition } from "../../types/matrix-position";

const Item = styled(Box)(({ theme }) => ({
  height: "100px",
  width: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  border: "2px solid #0277bd",
}));

const renderIcon = (value: MatrixItem) => {
  if (value === "x") {
    return <CloseOutlinedIcon />;
  } else if (value === "o") {
    return <CircleOutlinedIcon />;
  } else {
    return null;
  }
};

const selectRandomPosition = (rows: MatrixItem[][]): MatrixPosition | null => {
  const arr: Array<MatrixPosition> = [];
  rows.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === undefined) {
        arr.push({ rowIndex, colIndex });
      }
    });
  });
  if (arr.length > 0) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return null;
};

const identifyHorizontal = (rows: MatrixItem[][]): boolean => {
  let isgameFinished = false;
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[x].length - 1; y++) {
      if (!rows[x][y] || !rows[x][y + 1] || rows[x][y] !== rows[x][y + 1]) {
        isgameFinished = false;
        break;
      }
      isgameFinished = true;
    }
    if (isgameFinished) break;
  }
  return isgameFinished;
};

const identifyVertical = (rows: MatrixItem[][]): boolean => {
  let isgameFinished = false;
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[x].length - 1; y++) {
      if (!rows[y][x] || !rows[y + 1][x] || rows[y][x] !== rows[y + 1][x]) {
        isgameFinished = false;
        break;
      }
      isgameFinished = true;
    }
    if (isgameFinished) break;
  }
  return isgameFinished;
};

const identifyInclined1 = (rows: MatrixItem[][]): boolean => {
  let isgameFinished = false;
  for (let i = 0; i < rows.length - 1; i++) {
    if (
      !rows[i][i] ||
      !rows[i + 1][i + 1] ||
      rows[i][i] !== rows[i + 1][i + 1]
    ) {
      isgameFinished = false;
      break;
    }
    isgameFinished = true;
  }
  return isgameFinished;
};

const identifyInclined2 = (rows: MatrixItem[][]): boolean => {
  let isgameFinished = false;
  for (let x = 0, y = rows.length - 1; x < rows.length - 1 && y > 0; x++, y--) {
    if (
      !rows[x][y] ||
      !rows[x + 1][y - 1] ||
      rows[x][y] !== rows[x + 1][y - 1]
    ) {
      isgameFinished = false;
      break;
    }
    isgameFinished = true;
  }
  return isgameFinished;
};

const identifyGameFinish = (rows: MatrixItem[][]): boolean => {
  return (
    identifyHorizontal(rows) ||
    identifyVertical(rows) ||
    identifyInclined1(rows) ||
    identifyInclined2(rows)
  );
};

const Home = () => {
  const [rows, setRows] = useState<MatrixItem[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [switchPlayer, setSwitchPlayer] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    if (identifyGameFinish(rows)) setIsGameFinished(true);
  }, [rows]);

  useEffect(() => {
    console.log(isGameFinished);
    if (!switchPlayer && !isGameFinished) {
      const matrixPosition = selectRandomPosition(rows);
      if (matrixPosition !== null) {
        const { rowIndex, colIndex } = matrixPosition;
        setTimeout(() => {
          setRows((prevState) => {
            let newRows = [...prevState];
            newRows[rowIndex][colIndex] = "o";
            return newRows;
          });
        }, 500);
        setSwitchPlayer((prevState) => !prevState);
      }
    }
  }, [switchPlayer, isGameFinished]);

  const handleItemClick =
    (rowIndex: number, colIndex: number, value: MatrixItem) => () => {
      if (switchPlayer && value === undefined && !isGameFinished) {
        setRows((prevState) => {
          let newRows = [...prevState];
          newRows[rowIndex][colIndex] = "x";
          return newRows;
        });
        setSwitchPlayer((prevState) => !prevState);
      }
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {rows.map((row, rowIndex) => (
        <Grid container>
          {row.map((col, colIndex) => (
            <Grid item>
              <Item onClick={handleItemClick(rowIndex, colIndex, col)}>
                {renderIcon(col)}
              </Item>
            </Grid>
          ))}
        </Grid>
      ))}
      <h3>{isGameFinished ? "Game Over" : null}</h3>
    </Box>
  );
};

export default Home;
