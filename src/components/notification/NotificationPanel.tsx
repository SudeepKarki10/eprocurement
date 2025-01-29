// src/components/notification/NotificationPanel.tsx
"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetTriggerProps,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock notifications - replace with real data
const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "New Tender Assigned",
    message:
      "You have been assigned to evaluate IT Infrastructure Upgrade tender",
    date: "2024-01-28T10:00:00",
    read: false,
  },
  {
    id: "2",
    title: "Evaluation Deadline Reminder",
    message:
      "The evaluation deadline for Office Supplies tender is approaching",
    date: "2024-01-27T15:30:00",
    read: true,
  },
  // Add more mock notifications
];

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            Notifications
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${
                  notification.read ? "bg-gray-50" : "bg-blue-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(notification.date)}
                  </span>
                </div>
                <p className="text-sm mt-1">{notification.message}</p>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
