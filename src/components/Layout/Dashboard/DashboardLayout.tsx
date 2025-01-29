// src/components/layout/DashboardLayout.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  Users,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-5 h-5" />,
    roles: ["ADMIN", "VENDOR", "EVALUATOR"],
  },
  {
    label: "Tenders",
    href: "/tenders",
    icon: <FileText className="w-5 h-5" />,
    roles: ["ADMIN", "VENDOR", "EVALUATOR"],
  },
  {
    label: "My Bids",
    href: "/bids",
    icon: <ShoppingBag className="w-5 h-5" />,
    roles: ["VENDOR"],
  },
  {
    label: "Users",
    href: "/users",
    icon: <Users className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Settings",
    href: "/profile",
    icon: <Settings className="w-5 h-5" />,
    roles: ["ADMIN", "VENDOR", "EVALUATOR"],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(session?.user?.role as string)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-700 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-indigo-800">
          <span className="text-xl font-semibold text-white">
            E-Procurement
          </span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-indigo-200 rounded-md hover:text-white lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-4 mt-5 space-y-2">
          {filteredNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-indigo-100 rounded-md hover:bg-indigo-600"
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-2 text-indigo-100 rounded-md hover:bg-indigo-600"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`transition-margin duration-200 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <header className="bg-white shadow">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">
                {session?.user?.email} ({session?.user?.role})
              </span>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
