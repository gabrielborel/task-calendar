import cx from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-around text-2xl font-semibold">
      <button
        onClick={() => navigate("/home")}
        className={cx("py-1 px-4", {
          "text-blue-400 border-b-2 bg-blue-100 rounded-sm border-blue-400 font-bold uppercase":
            location.pathname === "/home",
        })}
      >
        HOME
      </button>

      <button
        onClick={() => navigate("/profile")}
        className={cx("py-1 px-4", {
          "text-blue-400 border-b-2 bg-blue-100 rounded-sm border-blue-400 font-bold uppercase":
            location.pathname === "/profile",
        })}
      >
        PERFIL
      </button>
    </nav>
  );
};
