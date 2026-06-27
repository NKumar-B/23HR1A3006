import { Pagination, Stack } from "@mui/material";
import { Log } from "../../../logging-middleware";

export default function PaginationComponent({

    page,

    setPage,

    count

}) {

    async function handleChange(event, value) {

        setPage(value);

        await Log(

            "frontend",

            "info",

            "component",

            `Moved to page ${value}`

        );

    }

    return (

        <Stack
            mt={4}
            alignItems="center"
        >

            <Pagination

                page={page}

                count={count}

                color="primary"

                onChange={handleChange}

            />

        </Stack>

    );

}