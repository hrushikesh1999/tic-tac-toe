import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SyntheticEvent } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import SinglePlayer from "./SinglePlayer";
import Multiplayer from "./Multiplayer";

type Props = {
  value: number;
  handleChange: (e: SyntheticEvent, newValue: number) => void;
  room: string;
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const PlayerTabs = ({ value, handleChange, room }: Props) => {
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          borderTopRightRadius: "3px",
          borderTopLeftRadius: "3px",
          bgcolor: "#ffff",
          border: "1px solid #bbdefb",
        }}
      >
        <Tab label={<PersonIcon />} sx={{ width: "50%" }} />
        <Tab label={<PeopleIcon />} sx={{ width: "50%" }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SinglePlayer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Multiplayer room={room} />
      </TabPanel>
    </>
  );
};

export default PlayerTabs;
