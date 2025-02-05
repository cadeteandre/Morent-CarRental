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
    <div className="flex items-center justify-center min-h-screen pb-64">
      <div className="bg-slate-100 rounded-xl shadow-lg overflow-hidden w-72 mx-auto p-8">
        <h3 className="text-xl font-semibold pb-2 text-center">Login</h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            type="text"
            name="Email"
            ref={emailRef}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            type="password"
            name="password"
            ref={passwordRef}
          />
          <div className="flex flex-col items-center">
            <button className="p-2 bg-blue-700 rounded-lg w-full text-center">
              Sign in
            </button>
            <p className="pt-4 text-black">
              No account? Register{" "}
              <Link className="text-blue-500" to={"/register"}>
                Here
              </Link>
            </p>
            <button className="p-2 bg-white rounded-lg w-full text-center">
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
    </div>
  );
};

export default Login;
