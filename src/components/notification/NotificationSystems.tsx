// src/components/notifications/NotificationSystem.tsx
"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  timestamp: Date;
  read: boolean;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Tender Assigned",
      message:
        "You have been assigned to evaluate IT Infrastructure Upgrade tender",
      type: "info",
      timestamp: new Date(),
      read: false,
    },
    {
      id: "2",
      title: "Evaluation Deadline Approaching",
      message: "The evaluation deadline for Office Supplies tender is tomorrow",
      type: "warning",
      timestamp: new Date(),
      read: false,
    },
    // Add more notifications as needed
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
      >
        <Bell />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear all
              </button>
            </div>
          </div>

          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 ${
                  notification.read ? "bg-white" : "bg-blue-50"
                }`}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">{notification.title}</h4>
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {notification.timestamp.toLocaleDateString()}
                </p>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="p-4 text-center text-gray-600">
                No notifications
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
