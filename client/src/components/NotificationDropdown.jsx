
import { useNotifications } from "../context/NotificationContext.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state } = useNotifications();

  const { notifications } = state;

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "45px",
        width: "320px",
        background: "#fff",
        color: "#222",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3>Notifications</h3>
        <button onClick={onClose}>✕</button>
      </div>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              background: notification.isRead ? "#fff" : "#eef5ff",
            }}
          >
            {notification.message}
          </div>
        ))
      )}
    </div>
  );
}
