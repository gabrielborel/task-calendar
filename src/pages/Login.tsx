import { useState } from "react";
import cx from "classnames";
import { Eye, EyeSlash } from "phosphor-react";
import * as yup from "yup";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Inputs = {
  email: string;
  password: string;
};

const LoginAndSignUpFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um email válido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatório")
    .min(6, "No minímo 6 caracteres"),
});

type Forms = "login" | "signup";

export default function Login() {
  const [selectedForm, setSelectedForm] = useState<Forms>("login");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginAndSignUpFormSchema),
  });

  const handleSubmitLogin: SubmitHandler<Inputs> = (data) => {
    reset();
  };

  const handleSubmitSignup: SubmitHandler<Inputs> = (data) => {
    reset();
  };

  return (
    <section className="grid place-items-center h-screen">
      <form
        onSubmit={
          selectedForm === "login"
            ? handleSubmit(handleSubmitLogin)
            : handleSubmit(handleSubmitSignup)
        }
        className="bg-neutral-100 p-4 rounded-md shadow-md w-[350px]"
      >
        <header className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setSelectedForm("login")}
            className={cx("uppercase font-semibold text-xl pl-8", {
              "text-blue-500": selectedForm === "login",
            })}
          >
            login
          </button>
          <button
            type="button"
            onClick={() => setSelectedForm("signup")}
            className={cx("uppercase font-semibold text-xl pr-8", {
              "text-blue-400": selectedForm === "signup",
            })}
          >
            cadastro
          </button>
        </header>

        <div className="w-full h-[1px] static bg-neutral-300 my-6 opacity-50" />

        <main className="mt-8">
          <div>
            <label htmlFor="title" className="text-lg font-semibold">
              Email
            </label>
            {errors.email && (
              <span className="block text-sm text-red-500">
                {errors.email?.message}
              </span>
            )}
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Insira o seu melhor email"
              className="block bg-neutral-200 px-3 py-2 rounded-sm w-full"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="title" className="text-lg font-semibold">
              Senha
            </label>
            {errors.password && (
              <span className="block text-sm text-red-500">
                {errors.password?.message}
              </span>
            )}
            <div className="flex relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Insira a sua senha"
                className="block bg-neutral-200 px-3 py-2 rounded-sm w-full"
              />
              {showPassword ? (
                <Eye
                  size={18}
                  weight="bold"
                  className="cursor-pointer absolute right-3 top-3"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeSlash
                  size={18}
                  weight="bold"
                  className="cursor-pointer absolute opacity-60 right-3 top-3"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
        </main>

        <footer className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className=" bg-blue-500 text-neutral-50 transition-colors rounded-sm py-3 w-[70%] font-semibold uppercase text-xl"
          >
            {selectedForm === "login" ? "entrar" : "criar conta"}
          </button>
        </footer>
      </form>
    </section>
  );
}
