import { MatrixItem } from "../../../types/matrix-item";

const checkIfAllBoxesSelected = (rows: MatrixItem[][]): boolean =>
  rows.every((row) => row.every((col) => col !== undefined));

export default checkIfAllBoxesSelected;
