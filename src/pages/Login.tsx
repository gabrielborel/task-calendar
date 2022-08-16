import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { api } from "../services/api";
import { jwtDecode } from "../utils/jwtDecode";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useSession();

  const handleCallbackResponse = async (response: any) => {
    const user = jwtDecode(response.credential);

    const {
      data: { newUser },
    } = await api.post("/users", {
      name: user.name,
      avatar: user.picture,
      email: user.email,
    });

    signIn({
      name: newUser.name,
      avatar: newUser.avatar,
      email: newUser.email,
      userId: newUser._id,
    });

    navigate("/home");
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE__GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInButton") as HTMLElement,
      {
        size: "large",
        theme: "filled_blue",
        type: "standard",
      }
    );
  }, []);

  return (
    <section className="grid place-items-center h-screen">
      <div className="bg-neutral-100 rounded-md shadow-md p-4 text-center">
        <div className="text-center mb-4">
          <span className="text-3xl">task</span>
          <span className="font-bold text-4xl">Calendar</span>
        </div>
        <p className="font-semibold text-2xl">Entre com sua conta Google</p>
        <div className="mt-4 mx-auto w-fit" id="signInButton" />
      </div>
    </section>
  );
}
