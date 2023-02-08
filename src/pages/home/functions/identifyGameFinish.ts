import { MatrixItem } from "../../../types/matrix-item";

const identifyHorizontal = (rows: MatrixItem[][]): string => {
  let finishedBy = "";
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[x].length - 1; y++) {
      if (!rows[x][y] || !rows[x][y + 1] || rows[x][y] !== rows[x][y + 1]) {
        finishedBy = "";
        break;
      }
      finishedBy = rows[x][y] as string;
    }
    if (finishedBy) break;
  }
  return finishedBy;
};

const identifyVertical = (rows: MatrixItem[][]): string => {
  let finishedBy = "";
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[x].length - 1; y++) {
      if (!rows[y][x] || !rows[y + 1][x] || rows[y][x] !== rows[y + 1][x]) {
        finishedBy = "";
        break;
      }
      finishedBy = rows[y][x] as string;
    }
    if (finishedBy) break;
  }
  return finishedBy;
};

const identifyInclined1 = (rows: MatrixItem[][]): string => {
  let finishedBy = "";
  for (let i = 0; i < rows.length - 1; i++) {
    if (
      !rows[i][i] ||
      !rows[i + 1][i + 1] ||
      rows[i][i] !== rows[i + 1][i + 1]
    ) {
      finishedBy = "";
      break;
    }
    finishedBy = rows[i][i] as string;
  }
  return finishedBy;
};

const identifyInclined2 = (rows: MatrixItem[][]): string => {
  let finishedBy = "";
  for (let x = 0, y = rows.length - 1; x < rows.length - 1 && y > 0; x++, y--) {
    if (
      !rows[x][y] ||
      !rows[x + 1][y - 1] ||
      rows[x][y] !== rows[x + 1][y - 1]
    ) {
      finishedBy = "";
      break;
    }
    finishedBy = rows[x][y] as string;
  }
  return finishedBy;
};

const identifyGameFinish = (rows: MatrixItem[][]): string => {
  return (
    identifyHorizontal(rows) ||
    identifyVertical(rows) ||
    identifyInclined1(rows) ||
    identifyInclined2(rows)
  );
};

export default identifyGameFinish;
