const PRIORITY = {

    Placement: 3,

    Result: 2,

    Event: 1

};

export function sortPriorityNotifications(notifications) {

    return [...notifications].sort((a, b) => {

        if (PRIORITY[b.Type] !== PRIORITY[a.Type]) {

            return PRIORITY[b.Type] - PRIORITY[a.Type];

        }

        return new Date(b.Timestamp) - new Date(a.Timestamp);

    });

}