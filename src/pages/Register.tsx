import { useRef, useState, FormEvent, useContext } from "react";
import { supabase } from "../utils/supabase/setupSupabase";
import { useNavigate } from "react-router";
import { mainContext } from "../context/MainProvider";
import { User } from "@supabase/supabase-js";

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
  const navigate = useNavigate();
  const { setUser } = useContext(mainContext) as {
    setUser: React.Dispatch<React.SetStateAction<User>>;
  };
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    formRef.current?.reportValidity();

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

    const { data, error } = await supabase.auth.signUp(user);

    if (error) {
      console.error(error);
      setIsError(true);
      return;
    }
    if (data.user) {
      setUser(data.user);
      navigate("/");
    }
  };

  return (
    <section className="pt-8 pb-16">
      <fieldset className="fieldset  shadow-lg  rounded-lg  mx-auto p-8 flex items-center justify-center flex-col w-sm mb-32 font-Jakarta-Regular">
        <h3 className="text-2xl font-Jakarta-Regular font-semibold pb-8 text-center">
          Create a new account
        </h3>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="flex flex-col gap-4 w-full"
        >
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="emailInput">
              Email
            </label>
            <input
              className="w-full input validator"
              type="email"
              id="emailInput"
              ref={emailRef}
              required
              placeholder="email@morent.com"
            />
            <div className="validator-hint">Enter valid email address</div>
          </div>
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="firstname">
              First Name
            </label>
            <input
              className="w-full input validator"
              type="text"
              id="firstname"
              ref={firstNameRef}
              required
              placeholder="Vorname"
            />
            <div className="validator-hint">Enter valid name</div>
          </div>
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="w-full input validator"
              type="text"
              id="lastname"
              ref={lastNameRef}
              placeholder="Nachname"
              required
            />
            <div className="validator-hint">Enter valid name</div>
          </div>
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="w-full input validator"
              type="password"
              id="password"
              required
              ref={passwordRef}
              placeholder="********"
            />
          </div>
          <div className="w-full flex flex-col gap-0.5">
            <label className="text-sm" htmlFor="confirm_password">
              Confirm Password
            </label>
            <input
              className="w-full input validator"
              type="password"
              id="confirm_password"
              required
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
