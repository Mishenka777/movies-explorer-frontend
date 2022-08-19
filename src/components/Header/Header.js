import NavAuth from "../NavAuth/NavAuth";
import Navigation from "../Navigation/Navigation";

export default function Header({ loggedIn }) {
  return (
    <header className={`header ${!loggedIn ? "header_type_auth" : ""}`}>
      {loggedIn ? <Navigation /> : <NavAuth />}
    </header>
  );
}
