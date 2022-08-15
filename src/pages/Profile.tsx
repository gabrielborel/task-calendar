import { SignOut, PencilSimpleLine, X } from "phosphor-react";
import { useTags } from "../contexts/TagsContext";

export default function Profile() {
  const { openEditTagModal, tags, removeTag } = useTags();

  return (
    <section className="px-4">
      <div className="sm:flex justify-between">
        <div>
          <strong className="text-2xl font-semibold">Conta</strong>
          <div className="flex items-center gap-4 mt-4">
            <img
              src="https://i.stack.imgur.com/34AD2.jpg"
              alt="User Gmail Profile Picture"
              className="w-20 h-20 md:w-24 md:h-24 rounded-sm border-2 border-neutral-200"
            />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-xl">Gabriel Borel</span>
              <span className="opacity-70">biel_borel@hotmail.com</span>
              <button className="text-red-500 hover:bg-red-200 font-semibold hover:text-red-600 transition-colors flex items-center gap-2 bg-red-100 w-fit px-2 rounded-sm">
                <SignOut />
                Sair da conta
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-0">
          <strong className="font-semibold text-lg">Estatísticas</strong>
          <ul className="flex flex-col gap-2">
            <li className="bg-neutral-200 px-2 rounded-sm max-w-[300px]">
              <span className="text-lg font-semibold">0</span> tarefas criadas
            </li>
            <li className="bg-neutral-200 px-2 rounded-sm max-w-[300px]">
              <span className="text-lg font-semibold">0</span> tarefas
              completadas
            </li>
            <li className="bg-neutral-200 px-2 rounded-sm max-w-[300px]">
              Dia mais atarefado:{" "}
              <span className="text-lg font-semibold">25/09/2000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full h-[1px] static bg-neutral-300 my-6 opacity-50" />

      <div>
        <strong className="font-semibold text-2xl">Tags</strong>
        <p className="opacity-60">
          Aqui você pode criar, editar e excluir tags!
        </p>

        <div className="grid grid-cols-2 gap-8 md:gap-12 flex-wrap bg-neutral-200 max-w-[350px] p-3 md:p-8 rounded-sm">
          {tags?.map((tag) => (
            <div
              key={tag.id}
              className={`bg-${tag.color} mt-4 md:mt-0 w-fit group relative px-3 py-1 shadow-sm cursor-pointer transition-transform rounded-sm uppercase font-bold opacity-90`}
            >
              {tag.name}

              <div className="flex gap-1 absolute -top-6 -right-6  p-1 rounded-sm shadow-sm ">
                <PencilSimpleLine
                  onClick={() => openEditTagModal(tag)}
                  size={24}
                  className="hover:-translate-y-1 border-2 border-blue-200 transition-transform bg-blue-100 text-blue-500 rounded-sm opacity-90"
                />

                <X
                  size={24}
                  onClick={() => removeTag(tag)}
                  className="hover:-translate-y-1 border-2 border-red-200 transition-transform text-red-500 bg-red-100 opacity-80 rounded-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
