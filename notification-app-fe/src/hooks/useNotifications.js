import { useEffect, useState, useCallback } from "react";
import { getNotifications } from "../api/notifications";
import { Log } from "../../../logging-middleware";

export default function useNotification() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [notificationType, setNotificationType] = useState("");

    const fetchNotifications = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            await Log(
                "frontend",
                "info",
                "hook",
                `Fetching notifications Page=${page} Type=${notificationType || "All"}`
            );

            const data = await getNotifications(
                page,
                limit,
                notificationType
            );

            setNotifications(data);

        } catch (err) {

            setError(err);

            await Log(
                "frontend",
                "error",
                "hook",
                err.message
            );

        } finally {

            setLoading(false);

        }

    }, [page, limit, notificationType]);

    useEffect(() => {

        Log(
            "frontend",
            "info",
            "page",
            "Notifications page loaded"
        );

        fetchNotifications();

    }, [fetchNotifications]);

    return {

        notifications,

        loading,

        error,

        page,

        setPage,

        notificationType,

        setNotificationType,

        refresh: fetchNotifications

    };

}