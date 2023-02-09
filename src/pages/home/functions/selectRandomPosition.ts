import { MatrixItem } from "../../../types/matrix-item";
import { MatrixPosition } from "../../../types/matrix-position";

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

export default selectRandomPosition;
