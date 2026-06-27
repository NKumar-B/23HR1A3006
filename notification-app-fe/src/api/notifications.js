import api from "../../../logging-middleware/src/api/apiClient";

export async function getNotifications(
    page = 1,
    limit = 10,
    type = ""
) {

    const params = {
        page,
        limit
    };

    if (type) {
        params.notification_type = type;
    }

    const response = await api.get("/notifications", {
        params
    });

    //alert(JSON.stringify(response.data, null, 2));

    return response.data.notifications;
}