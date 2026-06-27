import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

import { Log } from "../../../logging-middleware";

export default function NotificationFilter({

    notificationType,

    setNotificationType,

    setPage

}) {

    async function handleChange(event) {

        const value = event.target.value;

        setNotificationType(value);

        setPage(1);

        await Log(

            "frontend",

            "info",

            "component",

            `Notification filter changed to ${value || "All"}`

        );

    }

    return (

        <FormControl
            fullWidth
            sx={{ mb: 3 }}
        >

            <InputLabel>
                Notification Type
            </InputLabel>

            <Select

                value={notificationType}

                label="Notification Type"

                onChange={handleChange}

            >

                <MenuItem value="">
                    All
                </MenuItem>

                <MenuItem value="Placement">
                    Placement
                </MenuItem>

                <MenuItem value="Result">
                    Result
                </MenuItem>

                <MenuItem value="Event">
                    Event
                </MenuItem>

            </Select>

        </FormControl>

    );

}