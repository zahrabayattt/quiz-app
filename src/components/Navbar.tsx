import Avatar from "../assets/images/avatar.png";
import themetoggle from "../assets/images/theme & profile.png";
import Container from "./Container";
const Navbar = () => {
  return (
    <header className="bg-header-bg py-4">
      <Container className="flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-white">
          Quiz
        </a>
        <div className="flex items-center gap-8">
          <img
            className="object-contain"
            src={themetoggle}
            alt="theme-toggle"
          />
          <img src={Avatar} alt="Avatar" />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
