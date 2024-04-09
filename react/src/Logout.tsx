import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <Link
      to="http://localhost:4000/auth/logout"
      className="px-8 py-2 rounded-md text-white bg-black"
    >
      Logout
    </Link>
  );
}
