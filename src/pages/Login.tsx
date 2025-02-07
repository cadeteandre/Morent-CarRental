import { useContext, useRef, useState } from "react";
import { supabase } from "../utils/supabase/setupSupabase";
// import { useUserContext } from "../UserContext";
import { Link } from "react-router";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  //   const [message, setMessage] = useState<string | null>(null);
  //   const [isError, setIsError] = useState<boolean>(false);

  const { user, setUser } = useContext(mainContext) as {user: User, setUser: React.Dispatch<React.SetStateAction<User>>}

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    console.dir(result);

    if (result.data.user) {
      setUser(result.data.user);

      //   setMessage("Du bist eingeloggt.");
      //   setIsError(false);
    } else {
      console.error(result.error);
      //   setMessage("Login fehlgeschlagen.");
      //   setIsError(true);
    }
  };
  console.log(user);
  return (
    <section className="bg-white p-6">
      <div className="bg-slate-100 rounded-xl shadow-lg overflow-hidden w-72 mx-auto p-8">
        <h3 className="text-xl font-semibold pb-2 text-center">Login</h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="label">Email:</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="Email"
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="label">Password:</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              ref={passwordRef}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="btn bg-blue-600 text-white w-full mb-6">
              Sign in
            </button>
            <p className="text-black">
              No account? Register{" "}
              <Link className="text-blue-500" to={"/register"}>
                Here
              </Link>
            </p>
            <button className="btn bg-white w-full">
              Forgot Password?
            </button>
          </div>
        </form>
        {/* {message && (
          <p className={`${isError ? "text-red-800" : "text-blue-700"}`}>
            {message}
          </p>
        )} */}
      </div>
    </section>
  );
};

export default Login;
