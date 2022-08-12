import { X } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cx from "classnames";

interface CreateTaskModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

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

type Inputs = {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  tags: {
    name: string;
    color: string;
  };
};

const CreateTaskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Título é obrigatório")
    .min(5, "No mínimo 5 caracteres"),
  description: yup
    .string()
    .required("Descrição é obrigatório")
    .min(10, "No mínimo 10 caracteres"),
  date: yup.string().required("Data é obrigatório"),
  time: yup.string(),
  duration: yup.string(),
  tags: yup.mixed(),
});

export const CreateTaskModal = ({
  isVisible,
  closeModal,
}: CreateTaskModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(CreateTaskSchema),
  });

  const { onChange } = register("tags");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div
      className={cx(
        "inset-0 bg-overlay w-full h-full flex items-center justify-center",
        {
          absolute: isVisible,
          hidden: !isVisible,
        }
      )}
      onClick={closeModal}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-md w-full max-w-[500px] bg-neutral-50 z-10 rounded-lg py-6 px-4"
      >
        <header className="flex justify-between items-center">
          <strong className="text-2xl">Criar Tarefa</strong>

          <X
            onClick={closeModal}
            size={22}
            className="hover:scale-110 cursor-pointer"
          />
        </header>

        <main className="mt-6 flex flex-col gap-6">
          <div>
            <label htmlFor="title" className="text-lg">
              Título
            </label>
            {errors.title && (
              <span className="block text-sm text-red-500">
                {errors.title?.message}
              </span>
            )}
            <input
              {...register("title")}
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
            <span className="block text-sm text-red-500">
              {errors.description?.message}
            </span>
            <textarea
              {...register("description")}
              placeholder="Insira a descrição da sua tarefa"
              className="block w-full rounded-lg p-2 bg-neutral-200 h-[100px]"
            />
          </div>

          <div className="flex justify-between px-1">
            <div>
              <label htmlFor="title" className="text-lg">
                Data
              </label>
              <span className="block text-sm text-red-500">
                {errors.date?.message}
              </span>
              <input
                {...register("date")}
                type="date"
                className="bg-neutral-200 p-1 rounded-lg block"
              />
            </div>

            <div>
              <label htmlFor="title" className="text-lg">
                Horário
              </label>
              <input
                {...register("time")}
                type="time"
                className="block bg-neutral-200 rounded-lg p-1"
              />
            </div>

            <div>
              <label htmlFor="title" className="text-lg">
                Duração
              </label>
              <input
                {...register("duration")}
                type="time"
                className="block bg-neutral-200 rounded-lg p-1"
              />
            </div>
          </div>

          <div>
            <span className="text-lg">Tags</span>
            <div className="bg-neutral-200 p-4 flex flex-wrap gap-8 rounded-lg">
              {/* {tags.map(({ color, name }) => (
                <>
                  <input
                    type="checkbox"
                    id={`${name},${color}`}
                    {...register("tags")}
                    onChange={(e) => {
                      e.target.value = e.target.id;
                      onChange(e);
                    }}
                  />
                  <label
                    htmlFor={`${name},${color}`}
                    className={`${color} -ml-6 px-2 py-1 rounded-md uppercase text-sm font-bold opacity-90 hover:opacity-100 transition-opacity`}
                  >
                    {name}
                  </label>
                </>
              ))} */}
              <p className="block mx-auto text-lg opacity-60 font-semibold">
                Nao há nenhuma task criada =(
              </p>
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
