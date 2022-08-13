import { ArrowLineUp } from "phosphor-react";
import { useState } from "react";

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-10 flex flex-col items-center hover:scale-105 transition-transform font-semibold "
    >
      <ArrowLineUp
        weight="bold"
        className="shadow-md w-10 h-10 bg-neutral-100 p-2 rounded-full"
      />
      Voltar ao topo
    </button>
  );
};
