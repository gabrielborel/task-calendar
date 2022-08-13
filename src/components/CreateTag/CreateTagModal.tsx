import { X, Check } from "phosphor-react";
import cx from "classnames";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface CreateTagModalProps {
  isVisible: boolean;
  setCreateTagModalStatus: Dispatch<SetStateAction<boolean>>;
}

const colors = [
  "red-400",
  "yellow-400",
  "blue-400",
  "green-400",
  "pink-400",
  "orange-400",
];

export const CreateTagModal = ({
  isVisible,
  setCreateTagModalStatus,
}: CreateTagModalProps) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [nameError, setNameError] = useState("");
  const [colorError, setColorError] = useState("");

  const handleCreateTag = (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      return setNameError("Nome da tag é obrigatório");
    } else {
      setNameError("");
    }
    if (!selectedColor) {
      return setColorError("Cor é obrigatório");
    } else {
      setColorError("");
    }
  };

  const handleCloseModal = () => {
    setName("");
    setSelectedColor("");
    setNameError("");
    setColorError("");
    setCreateTagModalStatus(false);
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
      onClick={handleCloseModal}
    >
      <form
        onSubmit={handleCreateTag}
        onClick={(e) => e.stopPropagation()}
        className="shadow-md w-full max-w-[400px] bg-neutral-50 z-10 rounded-lg py-6 px-4"
      >
        <header className="flex justify-between items-center">
          <strong className="text-2xl">Criar Tag</strong>

          <X
            onClick={handleCloseModal}
            size={22}
            className="hover:scale-110 cursor-pointer"
          />
        </header>

        <main className="mt-6 flex flex-col gap-6">
          <div>
            <label htmlFor="title" className="text-xl font-semibold">
              Nome
            </label>
            {nameError && (
              <span className="block text-sm text-red-400">{nameError}</span>
            )}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Insira o nome da tag"
              className="block bg-neutral-200 rounded-lg px-3 py-2 w-[80%]"
            />
          </div>

          <div>
            <span className="text-xl font-semibold mb-1 block">Cor</span>
            {colorError && (
              <span className="block text-sm text-red-400">{colorError}</span>
            )}
            <div className="flex items-center gap-2 justify-around">
              {colors.map((color, id) =>
                color === selectedColor ? (
                  <button
                    key={id}
                    type="button"
                    className={`w-9 h-9 rounded-2xl border-2 border-neutral-300 bg-${color} flex items-center justify-center`}
                  >
                    <Check size={18} weight="bold" />
                  </button>
                ) : (
                  <button
                    key={id}
                    onClick={() => setSelectedColor(color)}
                    type="button"
                    className={`w-9 h-9 rounded-2xl border-2 border-neutral-200 bg-${color}`}
                  />
                )
              )}
            </div>
          </div>
        </main>

        <footer className="flex items-center justify-center mt-10">
          <button
            type="submit"
            className=" bg-blue-500 text-neutral-50 transition-colors rounded-sm py-3 w-[70%] font-bold text-xl"
          >
            Criar
          </button>
        </footer>
      </form>
    </div>
  );
};
