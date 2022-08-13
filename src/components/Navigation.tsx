import cx from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-around text-2xl font-semibold">
      <button
        onClick={() => navigate("/home")}
        className={cx({
          "text-blue-400 border-b-2 border-l-2 bg-blue-200 py-1 px-4 rounded-sm border-blue-400 font-bold":
            location.pathname === "/home",
        })}
      >
        HOME
      </button>
      <button
        onClick={() => navigate("/profile")}
        className={cx({
          "text-blue-400 border-b-2 border-r-2 bg-blue-200 py-1 px-4 rounded-sm border-blue-400 font-bold":
            location.pathname === "/profile",
        })}
      >
        PERFIL
      </button>
    </div>
  );
};
