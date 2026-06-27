import {
    Card,
    CardContent,
    Chip,
    Stack,
    Typography
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

import { Log } from "../../../logging-middleware";

function getChipColor(type) {

    switch (type) {

        case "Placement":
            return "success";

        case "Result":
            return "primary";

        case "Event":
            return "warning";

        default:
            return "default";
    }

}

function getIcon(type) {

    switch (type) {

        case "Placement":
            return <WorkIcon />;

        case "Result":
            return <SchoolIcon />;

        case "Event":
            return <EventIcon />;

        default:
            return <EventIcon />;
    }

}

export function NotificationCard({ notification }) {

    async function handleClick() {

        await Log(
            "frontend",
            "info",
            "component",
            `Opened notification ${notification.ID}`
        );

    }

    return (

        <Card
            sx={{
                mb: 2,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-3px)"
                }
            }}
            onClick={handleClick}
        >

            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Chip

                        icon={getIcon(notification.Type)}

                        label={notification.Type}

                        color={getChipColor(notification.Type)}

                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >

                        {notification.Timestamp}

                    </Typography>

                </Stack>

                <Typography
                    variant="h6"
                    mt={2}
                >

                    {notification.Message}

                </Typography>

            </CardContent>

        </Card>

    );

}