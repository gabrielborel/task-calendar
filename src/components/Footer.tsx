export const Footer = () => {
  return (
    <div className="group border-t-2 absolute bottom-screen bg-neutral-50 w-full shadow-md text-center py-3">
      Feito com <span className="group-hover:animate-pulse">💙</span> por{" "}
      <a
        href="https://github.com/gabrielborel"
        className="text-blue-500 hover:text-blue-600 transition-colors font-semibold text-lg"
      >
        Gabriel Borel
      </a>
    </div>
  );
};
