const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const createNotification = (notification) => {
    return {
        type: 'CREATE_NOTIFICATION',
        data: notification
    }
}

export default notificationReducer
