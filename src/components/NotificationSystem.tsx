// src/components/NotificationSystem.tsx
"use client";

import { useState } from "react";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  read: boolean;
  timestamp: string;
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
};

const getNotificationBackground = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return "bg-blue-50";
    case "warning":
      return "bg-yellow-50";
    case "success":
      return "bg-green-50";
  }
};

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Tender Assigned",
      message:
        "You have been assigned to evaluate IT Infrastructure Upgrade tender",
      type: "info",
      read: false,
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Evaluation Deadline Approaching",
      message: "Office Supplies Contract evaluation due in 2 days",
      type: "warning",
      read: false,
      timestamp: new Date().toISOString(),
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100">
          <Bell className="h-6 w-6 text-gray-600" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel className="py-3 px-4 text-lg font-semibold">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !notification.read
                  ? getNotificationBackground(notification.type)
                  : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
