import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

type User = {
  name: string;
  email: string;
  avatar: string;
  userId: string;
};

type Session = {
  user: User;
};

interface SessionContextProps {
  session: Session | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const SessionContext = createContext({} as SessionContextProps);

export const SessionProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setSession({ user: JSON.parse(user) });
    }
  }, []);

  const signIn = (user: User) => {
    Cookies.set("user", JSON.stringify(user));
    setSession({ user });
  };

  const signOut = () => {
    Cookies.remove("user");
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ signIn, session, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
