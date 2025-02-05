import { useRef, useState, FormEvent } from "react";
import { supabase } from "../utils/supabase/setupSupabase";

type TUser = {
  email: string;
  password: string;
  options: {
    data: {
      firstname: string;
      lastname: string;
    };
  };
};

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const firstNameRef = useRef<HTMLInputElement>(null!);
  const lastNameRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const confirmPasswordRef = useRef<HTMLInputElement>(null!);

  const [isPasswordMismatch, setIsPasswordMismatch] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setIsPasswordMismatch(true);
      return;
    }

    const user: TUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      options: {
        data: {
          firstname: firstNameRef.current.value,
          lastname: lastNameRef.current.value,
        },
      },
    };

    const result = await supabase.auth.signUp(user);

    if (result.error) {
      console.error(result.error);
      setIsError(true);
      return;
    }

    const userId = result.data.user?.id;

    if (userId) {
      //   const { data, error } = await supabase
      //     .from("profiles")
      //     .update({
      //       firstname: firstNameRef.current.value,
      //       lastname: lastNameRef.current.value,
      //     })
      //     .eq("id", userId);
      //   console.log(data);
      //   console.log(error);
      //   if (error) {
      //     console.error(error);
      //     setIsError(true);
      //     return;
      //   }
      //   setIsError(false);
      // } else {
      //   setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pb-32">
      <div className="bg-slate-100 rounded-xl shadow-lg overflow-hidden w-72 mx-auto p-8">
        <h3 className="text-xl font-semibold pb-2 text-center">
          Create new Account
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              ref={emailRef}
              placeholder="email@mail.com"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="firstname">
              First Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="firstname"
              ref={firstNameRef}
              placeholder="Vorname"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="lastname"
              ref={lastNameRef}
              placeholder="Nachname"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="********"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="confirm_password">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="confirm_password"
              ref={confirmPasswordRef}
              placeholder="********"
            />
          </div>
          {isPasswordMismatch && (
            <p className="text-red-500">Passwords do not match.</p>
          )}
          {isError && <p className="text-red-500">Registration failed.</p>}
          <button
            type="submit"
            className="p-2 bg-blue-700 rounded-lg w-full text-center"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
