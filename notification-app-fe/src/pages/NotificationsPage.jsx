import { useMemo, useState } from "react";

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

import NotificationFilter from "../components/NotificationFilter";
import { NotificationCard } from "../components/NotificationCard";
import useNotifications from "../hooks/useNotifications";

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

  const unreadCount = notifications.length;

  const priorityNotifications = useMemo(() => {

    const priorityWeight = {

      Placement: 3,

      Result: 2,

      Event: 1,

    };

    return [...notifications].sort((a, b) => {

      const priorityDiff =
        (priorityWeight[b.Type] || 0) -
        (priorityWeight[a.Type] || 0);

      if (priorityDiff !== 0) {

        return priorityDiff;

      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );

    });

  }, [notifications]);

  async function handleFilterChange(value) {

    setFilter(value);

    setPage(1);

    await Log(

      "frontend",

      "info",

      "component",

      `Notification filter changed to ${value || "All"}`

    );

  }

  async function handlePageChange(event, value) {

    setPage(value);

    await Log(

      "frontend",

      "info",

      "component",

      `Moved to page ${value}`

    );

  }

  return (

    <Box

      sx={{

        maxWidth: 850,

        mx: "auto",

        px: 2,

        py: 4,

      }}

    >

      <Stack

        direction="row"

        spacing={2}

        alignItems="center"

        mb={3}

      >

        <Badge

          badgeContent={unreadCount}

          color="primary"

          max={99}

        >

          <NotificationsIcon

            sx={{ fontSize: 32 }}

          />

        </Badge>

        <Typography

          variant="h4"

          fontWeight="bold"

        >

          Campus Notifications

        </Typography>

      </Stack>

      <Divider sx={{ mb: 3 }} />

      <NotificationFilter

        value={filter}

        onChange={handleFilterChange}

      />

      {loading && (

        <Box

          sx={{

            display: "flex",

            justifyContent: "center",

            py: 6,

          }}

        >

          <CircularProgress />

        </Box>

      )}

      {!loading && error && (

        <Alert severity="error">

          {error || "Failed to load notifications."}

        </Alert>

      )}

      {!loading &&

        !error &&

        priorityNotifications.length === 0 && (

          <Alert severity="info">

            No notifications available.

          </Alert>

        )}

      {!loading &&

        !error &&

        priorityNotifications.length > 0 && (

          <Stack spacing={2}>

            {priorityNotifications.map((notification) => (

              <NotificationCard

                key={notification.ID}

                notification={notification}

              />

            ))}

          </Stack>

        )}

      {!loading && totalPages > 1 && (

        <Box

          sx={{

            display: "flex",

            justifyContent: "center",

            mt: 4,

          }}

        >

          <Pagination

            page={page}

            count={totalPages}

            color="primary"

            shape="rounded"

            showFirstButton

            showLastButton

            onChange={handlePageChange}

          />

        </Box>

      )}

    </Box>

  );

}