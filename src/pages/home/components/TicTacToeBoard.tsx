import { Button, Grid } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { MatrixItem } from "../../../types/matrix-item";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Item = styled(Box)(({ theme }) => ({
  height: "100px",
  width: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  border: "2px solid rgb(25,118,210)",
  backgroundColor: "#ffff",
  // borderRadius: "2px",
}));

const renderIcon = (value: MatrixItem) => {
  if (value === "x") {
    return <CloseOutlinedIcon sx={{ fontSize: "30px" }} />;
  } else if (value === "o") {
    return <CircleOutlinedIcon sx={{ fontSize: "28px" }} />;
  } else {
    return null;
  }
};

type Props = {
  rows: MatrixItem[][];
  handleItemClick: (
    rowIndex: number,
    colIndex: number,
    value: MatrixItem
  ) => void;
  handleReset: () => void;
};

const TicTacToeBoard = ({ rows, handleItemClick, handleReset }: Props) => {
  return (
    <>
      <div>
        {rows.map((row, rowIndex) => (
          <Grid container key={rowIndex}>
            {row.map((col, colIndex) => (
              <Grid item key={`${rowIndex}-${colIndex}`}>
                <Item onClick={() => handleItemClick(rowIndex, colIndex, col)}>
                  {renderIcon(col)}
                </Item>
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
      <Button
        aria-label="restart"
        color="success"
        variant="contained"
        endIcon={<RestartAltIcon />}
        sx={{ textTransform: "none", mt: 2 }}
        size="small"
        onClick={handleReset}
      >
        Restart
      </Button>
    </>
  );
};

export default TicTacToeBoard;
