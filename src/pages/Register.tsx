import { useRef, useState, FormEvent } from "react";
import { supabase } from "../utils/supabase/setupSupabase";
import { useUserContext } from "../UserContext";
import { useNavigate } from "react-router";

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
  const { setUser } = useUserContext();
  const [isPasswordMismatch, setIsPasswordMismatch] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
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
    } else {
      setUser(result.data.user);
      navigate("/");
    }
  };

  return (
    <section className="pt-8 pb-16">
      <fieldset className="fieldset  shadow-lg  rounded-lg  mx-auto p-8 flex items-center justify-center flex-col w-sm mb-32 font-Jakarta-Regular">
        <h3 className="text-2xl font-Jakarta-Regular font-semibold pb-8 text-center">
          Create a new account
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
            <label className="text-sm" htmlFor="firstname">
              First Name
            </label>
            <input
              className="w-full input"
              type="text"
              id="firstname"
              ref={firstNameRef}
              placeholder="Vorname"
            />
          </div>
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="w-full input"
              type="text"
              id="lastname"
              ref={lastNameRef}
              placeholder="Nachname"
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
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="confirm_password">
              Confirm Password
            </label>
            <input
              className="w-full input"
              type="password"
              id="confirm_password"
              ref={confirmPasswordRef}
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary py-3.5 text-base font-Jakarta-SemiBold "
          >
            Register
          </button>{" "}
          {isPasswordMismatch && (
            <p className="text-red-500">Passwords do not match.</p>
          )}
          {isError && <p className="text-red-500">Registeration failed.</p>}
        </form>
      </fieldset>
    </section>
  );
};

export default Register;
