import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useState } from "react";
import { ScrollToTopButton } from "./ScrollToTop";
import { Navigation } from "./Navigation";
import { TagsProvider } from "../contexts/TagsContext";
import { TasksProvider } from "../contexts/TasksContext";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  const [isVisible, setVisible] = useState(false);

  const toggleScrollToTopButtonVisibilty = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleScrollToTopButtonVisibilty);

  return (
    <section>
      <Toaster />

      <Header />

      <main className="max-w-[900px] h-full mx-2 sm:mx-4 mb-6 custom:mx-auto bg-neutral-50 mt-28 rounded-md pt-12 pb-6 px-2 md:px-6">
        <Navigation />

        <div className="w-full h-[1px] static bg-neutral-300 my-6 opacity-50" />

        <TagsProvider>
          <TasksProvider>
            <Outlet />
          </TasksProvider>
        </TagsProvider>

        {isVisible && <ScrollToTopButton />}
      </main>

      <Footer />
    </section>
  );
}
