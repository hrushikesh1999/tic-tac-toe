import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogTitle, IconButton, TextField } from "@mui/material";
import { ChangeEvent, forwardRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  handleOpenJoinRoomModal: (open: boolean) => void;
  handleJoinRoom: (roomId: string) => void;
};

const JoinRoomModal = ({
  open,
  handleOpenJoinRoomModal,
  handleJoinRoom,
}: Props) => {
  const [roomId, setRoomId] = useState("");

  const handleRoomId = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleOpenJoinRoomModal(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ backgroundColor: "#fafafa", mb: 5, height: "1.5rem" }}>
        Join room
        {handleOpenJoinRoomModal ? (
          <IconButton
            aria-label="close"
            onClick={() => handleOpenJoinRoomModal(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent sx={{ py: 5, px: 6 }}>
        <DialogContentText id="alert-dialog-slide-description">
          <TextField
            variant="filled"
            placeholder="Room ID"
            size="small"
            type={"number"}
            value={roomId}
            onChange={handleRoomId}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mb: 2, px: 3 }}>
        <Button
          onClick={() => handleJoinRoom(roomId)}
          variant="contained"
          disabled={!(roomId && roomId.length > 3)}
          endIcon={<ArrowForwardIcon />}
        >
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinRoomModal;
