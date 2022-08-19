import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

export default function NavAuth() {
  return (
    <nav className="nav-auth">
      <Logo />
      <div className="nav-auth__links">
        <Link to="/signup" className="nav-auth__reg-link">
          Регистрация
        </Link>
        <Link to="/signin" className="nav-auth__auth-link">
          Войти
        </Link>
      </div>
    </nav>
  );
}
