import { AiOutlineHistory, AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="shadow-t-lg fixed bottom-0 left-0 flex h-16 w-full items-center justify-around bg-foreground md:hidden">
      {/* Home button */}
      <button
        className="flex-center flex-col text-foreground-tertiary hover:text-my-primary"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome size={24} />
      </button>

      {/* Add button */}
      <button
        className="flex-center -mt-8 h-16 w-16 rounded-full bg-my-primary text-foreground shadow-lg"
        onClick={() => navigate("/create-quiz")}
      >
        <AiOutlinePlus size={28} />
      </button>

      {/* History button */}
      <button
        className="flex-center flex-col text-foreground-tertiary hover:text-my-primary"
        onClick={() => alert("history")}
      >
        <AiOutlineHistory size={24} />
      </button>
    </div>
  );
};

export default Footer;
