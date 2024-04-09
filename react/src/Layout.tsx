import { Link, Outlet } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";

export default function Layout() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex gap-8 bg-slate-200 px-6 py-4">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/login">Login</Link>
      </nav>

      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </main>
  );
}
