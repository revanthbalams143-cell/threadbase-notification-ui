
export const initialState = {
  notifications: [],
  unreadCount: 0,
};

export function notificationReducer(state, action) {
  switch (action.type) {

    case "ADD_NOTIFICATION": {
      return {
        ...state,
        notifications: [
          action.payload,
          ...state.notifications,
        ].slice(0, 50),
        unreadCount: state.unreadCount + 1,
      };
    }

    case "MARK_READ": {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );

      if (!notification || notification.isRead) {
        return state;
      }

      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload
            ? { ...n, isRead: true }
            : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    }

    case "MARK_ALL_READ": {
      return {
        ...state,
        notifications: state.notifications.map((n) => ({
          ...n,
          isRead: true,
        })),
        unreadCount: 0,
      };
    }

    case "LOAD_NOTIFICATIONS": {
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter(
          (n) => !n.isRead
        ).length,
      };
    }

    default:
      return state;
  }
}
