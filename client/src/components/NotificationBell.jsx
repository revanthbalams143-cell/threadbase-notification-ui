
import { useState, useRef, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationDropdown from "./NotificationDropdown.jsx";

export default function NotificationBell() {
  // 1. Get unread count from context
  const { state } = useNotifications();
  const { unreadCount } = state;

  // 2. Dropdown open/close state
  const [open, setOpen] = useState(false);

  // 3. Reference to outer container
  const containerRef = useRef(null);

  // 4. Click outside dropdown to close
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.3rem",
          color: "#fff",
          position: "relative",
        }}
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        🔔
      </button>

      {/* 5. Unread badge */}
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-8px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "0.7rem",
            fontWeight: "bold",
          }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {/* 6. Notification dropdown */}
      {open && (
        <NotificationDropdown
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
