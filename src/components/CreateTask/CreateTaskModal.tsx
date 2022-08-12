import { X } from "phosphor-react";

const tags = [
  {
    name: "mercado",
    color: "bg-red-400",
  },
  {
    name: "mercado",
    color: "bg-yellow-400",
  },
  {
    name: "mercado",
    color: "bg-green-400",
  },
  {
    name: "mercado",
    color: "bg-pink-400",
  },
  {
    name: "mercado",
    color: "bg-orange-400",
  },
];

export const CreateTaskModal = () => {
  return (
    <div className="absolute inset-0 bg-overlay w-full h-full flex items-center justify-center">
      <form className="shadow-md w-full max-w-[500px] bg-neutral-50 z-10 rounded-lg py-6 px-4">
        <header className="flex justify-between items-center">
          <strong className="text-2xl">Criar Tarefa</strong>

          <X size={22} className="hover:scale-110 cursor-pointer" />
        </header>

        <main className="mt-6 flex flex-col gap-6">
          <div>
            <label htmlFor="title" className="text-lg">
              Título
            </label>
            <input
              type="text"
              id="title"
              placeholder="Insira o título da sua tarefa"
              className="block bg-neutral-200 px-3 py-2 rounded-lg w-full"
            />
          </div>

          <div>
            <label htmlFor="title" className="text-lg">
              Descrição
            </label>
            <textarea
              placeholder="Insira a descrição da sua tarefa"
              className="block w-full rounded-lg p-2 bg-neutral-200 h-[100px]"
            />
          </div>

          <div className="flex justify-between px-1">
            <div>
              <label htmlFor="title" className="text-lg">
                Data
              </label>
              <input
                type="date"
                className="bg-neutral-200 p-1 rounded-lg block"
              />
            </div>

            <div>
              <label htmlFor="title" className="text-lg">
                Horário
              </label>
              <input
                type="time"
                className="block bg-neutral-200 rounded-lg p-1"
              />
            </div>

            <div>
              <label htmlFor="title" className="text-lg">
                Duração
              </label>
              <input
                type="time"
                className="block bg-neutral-200 rounded-lg p-1"
              />
            </div>
          </div>

          <div>
            <span className="text-lg">Tags</span>
            <div className="bg-neutral-200 p-4 flex flex-wrap gap-8 rounded-lg">
              {tags.map(({ color, name }, id) => (
                <>
                  <input type="checkbox" id={color} />
                  <label
                    htmlFor={color}
                    className={`${color} -ml-6 px-2 py-1 rounded-md uppercase text-sm font-bold opacity-90 hover:opacity-100 transition-opacity`}
                  >
                    {name}
                  </label>
                </>
              ))}
            </div>
          </div>
        </main>

        <footer className="flex items-center justify-center mt-10">
          <button
            type="submit"
            className=" bg-green-300 border-2 border-green-500 hover:bg-green-500 hover:text-neutral-50 transition-colors rounded-lg py-3 w-[70%] font-bold text-xl"
          >
            Criar
          </button>
        </footer>
      </form>
    </div>
  );
};
