import { Outlet, Link } from "react-router-dom";
import Sidebar from "../utils/Sidebar";

export default function DashboardLayout() {
  return (
     <div className="flex min-h-screen">
      {/* Sticky Sidebar */}
      <div className="w-64 sticky top-16 h-[calc(100vh-64px)] bg-white shadow-md border-r">
        <div className="h-full overflow-hidden">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
