import { useRef, useState } from "react";
import { supabase } from "../utils/supabase/setupSupabase";
import { useUserContext } from "../UserContext";
import { Link, useNavigate } from "react-router";

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const [isError, setIsError] = useState<boolean>(false);

  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (result.data.user) {
      setUser(result.data.user);
      navigate("/");
    } else {
      console.error(result.error);
      setIsError(true);
    }
  };

  return (
    <section className="pt-8 pb-16">
      <fieldset className="fieldset  shadow-lg  rounded-lg  mx-auto p-8 flex items-center justify-center flex-col w-sm mb-32 font-Jakarta-Regular">
        <h3 className="text-2xl font-Jakarta-Regular font-semibold pb-8 text-center">
          Login
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="emailInput">
              Email
            </label>
            <input
              className="w-full input"
              type="email"
              id="emailInput"
              ref={emailRef}
              placeholder="email@morent.com"
            />
          </div>
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="w-full input"
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary py-3.5 text-base font-Jakarta-SemiBold "
          >
            Sign in
          </button>{" "}
          {isError ? <p>Login failed.</p> : ""}
          <p className="text-base mt-10 text-center">
            No account? Register{" "}
            <Link className="text-info" to={"/register"}>
              Here
            </Link>
          </p>
          <button
            type="button"
            className="btn btn-outline py-3.5 text-xs font-Jakarta-SemiBold w-full"
          >
            Forgot Password?
          </button>
        </form>
      </fieldset>
    </section>
  );
};

export default Login;
