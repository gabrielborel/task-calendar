import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import { PrivateWrapper } from "./components/ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route
            path="home"
            element={
              <PrivateWrapper>
                <Home />
              </PrivateWrapper>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateWrapper>
                <Profile />
              </PrivateWrapper>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
