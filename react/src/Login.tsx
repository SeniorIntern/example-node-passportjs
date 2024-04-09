import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Link
      to="http://localhost:4000/auth/google"
      className="px-8 py-2 rounded-md text-white bg-black"
    >
      Login
    </Link>
  )
}
