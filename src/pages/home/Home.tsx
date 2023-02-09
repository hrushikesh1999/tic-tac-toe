import Box from "@mui/material/Box";
import JoinRoomModal from "./components/JoinRoomModal";
import { SyntheticEvent, useEffect, useState } from "react";
import PlayerTabs from "./components/PlayerTabs";
import socket from "../../config/socket";

const Home = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [openJoinRoomModal, setOpenJoinRoomModal] = useState(false);
  const [room, setRoom] = useState("");

  const handleSelectedPlayer = (e: SyntheticEvent, newValue: number) => {
    if (newValue === 1) {
      setOpenJoinRoomModal(true);
    } else {
      setSelectedPlayer(newValue);
    }
  };

  const handleOpenJoinRoomModal = (open: boolean) => {
    setOpenJoinRoomModal(open);
  };

  const handleJoinRoom = (roomId: string) => {
    setRoom(roomId);
    if (roomId) {
      socket.connect();
      socket.emit("join_room", roomId);
      setSelectedPlayer(1);
      setOpenJoinRoomModal(false);
    }
  };

  return (
    <Box
      component={"div"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div style={{ marginTop: "3rem" }}>
        <PlayerTabs
          value={selectedPlayer}
          handleChange={handleSelectedPlayer}
          room={room}
        />
        <JoinRoomModal
          open={openJoinRoomModal}
          handleOpenJoinRoomModal={handleOpenJoinRoomModal}
          handleJoinRoom={handleJoinRoom}
        />
      </div>
    </Box>
  );
};

export default Home;
