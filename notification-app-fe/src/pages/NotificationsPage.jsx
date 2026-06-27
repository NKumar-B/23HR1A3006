import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import NotificationFilter from "../components/NotificationFilter";
import useNotifications  from "../hooks/useNotifications";

import { Log } from "../../../logging-middleware";

export function NotificationsPage() {

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const {
    notifications,
    totalPages,
    loading,
    error,
  } = useNotifications(page, filter);

  useEffect(() => {

    Log(
      "frontend",
      "info",
      "page",
      "Notifications page loaded"
    );

  }, []);

  const unreadCount = notifications.length;

  async function handleFilterChange(newFilter) {

    setFilter(newFilter);

    setPage(1);

    await Log(
      "frontend",
      "info",
      "component",
      `Filter changed to ${newFilter || "All"}`
    );

  }

  async function handlePageChange(event, newPage) {

    setPage(newPage);

    await Log(
      "frontend",
      "info",
      "component",
      `Moved to page ${newPage}`
    );

  }

  return (

    <Box
      sx={{
        maxWidth: 750,
        mx: "auto",
        px: 2,
        py: 4,
      }}
    >

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mb={3}
      >

        <Badge
          badgeContent={unreadCount}
          color="primary"
          max={99}
        >

          <NotificationsIcon
            sx={{ fontSize: 30 }}
          />

        </Badge>

        <Typography
          variant="h4"
          fontWeight={700}
        >

          Campus Notifications

        </Typography>

      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box mb={3}>

        <NotificationFilter

          value={filter}

          onChange={handleFilterChange}

        />

      </Box>

      {loading && (

        <Box
          display="flex"
          justifyContent="center"
          py={6}
        >

          <CircularProgress />

        </Box>

      )}

      {!loading && error && (

        <Alert severity="error">

          Failed to load notifications

        </Alert>

      )}

      {!loading &&
        !error &&
        notifications.length === 0 && (

          <Alert severity="info">

            No notifications available.

          </Alert>

        )}

      {!loading &&
        !error &&
        notifications.length > 0 && (

          <Stack spacing={2}>

            {notifications.map((notification) => (

              <NotificationCard

                key={notification.ID}

                notification={notification}

              />

            ))}

          </Stack>

        )}

      {!loading &&
        totalPages > 1 && (

          <Box
            display="flex"
            justifyContent="center"
            mt={4}
          >

            <Pagination

              page={page}

              count={totalPages}

              color="primary"

              shape="rounded"

              onChange={handlePageChange}

            />

          </Box>

        )}

    </Box>

  );

}