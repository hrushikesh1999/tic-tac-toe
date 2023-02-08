import { Typography } from "@mui/material";

type Props = {
  gameFinishedBy: string;
};

const renderGameFinish = (gameFinishedBy: string) => {
  if (gameFinishedBy) {
    if (gameFinishedBy === "x") {
      return "You Won!";
    } else if (gameFinishedBy === "o") {
      return "You Lose!";
    } else {
      return "Draw!";
    }
  } else {
    return null;
  }
};

const GameFinish = ({ gameFinishedBy }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Typography variant="h5" sx={{ color: "#455a64" }}>
        {renderGameFinish(gameFinishedBy)}
      </Typography>
    </div>
  );
};

export default GameFinish;
