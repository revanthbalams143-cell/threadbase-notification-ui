
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";
import apiClient from "../services/apiClient";

export function NotificationItem({ notification, onClose }) {
  const { dispatch } = useNotifications();
  const navigate = useNavigate();

  const { mutate: markRead } = useMutation({
    mutationFn: (id) =>
      apiClient.patch(`/api/notifications/${id}/read`),

    onMutate: async (id) => {
      dispatch({
        type: "MARK_READ",
        payload: id,
      });
    },

    onError: (error, id) => {
      console.error("Mark as read failed:", error);

      // Reload notifications to restore correct server state
      apiClient
        .get("/api/notifications")
        .then((res) => {
          dispatch({
            type: "LOAD_NOTIFICATIONS",
            payload: res.data,
          });
        })
        .catch((err) => {
          console.error("Rollback failed:", err);
        });
    },
  });

  function handleClick() {
    if (!notification.isRead) {
      markRead(notification.id);
    }

    navigate(`/threads/${notification.threadId}`);

    if (onClose) {
      onClose();
    }
  }

  return (
    <li
      onClick={handleClick}
      style={{
        padding: "0.85rem 1rem",
        borderBottom: "1px solid #f3f4f6",
        cursor: "pointer",
        background: notification.isRead ? "#ffffff" : "#eff6ff",
        display: "flex",
        gap: "0.75rem",
      }}
    >
      {!notification.isRead && (
        <span
          style={{
            marginTop: 6,
            flexShrink: 0,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#3b82f6",
          }}
        />
      )}

      <div>
        <p style={{ margin: "0 0 2px", fontSize: "0.875rem" }}>
          {notification.message}
        </p>

        <time style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
          {new Date(notification.timestamp).toLocaleString()}
        </time>
      </div>
    </li>
  );
}
