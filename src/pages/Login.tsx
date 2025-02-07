import { useRef, useState } from "react";
import { supabase } from "../utils/supabase/setupSupabase";
import { useUserContext } from "../UserContext";
import { Link } from "react-router";

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  //   const [message, setMessage] = useState<string | null>(null);
  //   const [isError, setIsError] = useState<boolean>(false);

  const { setUser } = useUserContext();

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
      <section className="bg-white p-6">
        <div className="bg-[#F6F7F9] rounded-box p-6 flex flex-col items-center max-w-[390px]">
          <h1 className="text-xl">Login</h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="bg-white input self-start rounded-box"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="bg-white input self-start rounded-box"
              />
            </div>
            <button className="btn bg-blue-600 text-white w-full">
              Sign in
            </button>
            <p>
              No Account?{" "}
              <Link className="link" to={"/register"}>
                Register Here
              </Link>
            </p>
            <button className="btn bg-white w-full">Forgot Password?</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
