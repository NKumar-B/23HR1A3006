import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { NotificationsPage } from "./pages/NotificationsPage";

function App() {
  return (
    <>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>

          <NotificationsActiveIcon sx={{ mr: 2 }} />

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Campus Notification System
          </Typography>

        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          py: 4
        }}
      >
        <Container maxWidth="md">
          <NotificationsPage />
        </Container>
      </Box>

    </>
  );
}

export default App;