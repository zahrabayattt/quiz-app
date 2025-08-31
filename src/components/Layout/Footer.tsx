import { AiOutlineHistory, AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="shadow-t-lg fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around bg-foreground md:hidden">
      <button
        className="flex-center inset-x-0 z-50 flex-col text-foreground-tertiary hover:text-my-primary"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome size={24} />
      </button>
      <button
        className="flex-center inset-x-0 z-50 -mt-8 h-16 w-16 rounded-full bg-my-primary text-foreground shadow-lg"
        onClick={() => navigate("/create-quiz")}
      >
        <AiOutlinePlus size={28} />
      </button>
      <button
        className="flex-center inset-x-0 z-50 flex-col text-foreground-tertiary hover:text-my-primary"
        onClick={() => navigate("/")}
      >
        <AiOutlineHistory size={24} />
      </button>
    </div>
  );
};

export default Footer;
