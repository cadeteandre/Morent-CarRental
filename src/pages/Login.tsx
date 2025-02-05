import { Link } from "react-router";

const Login = () => {
    return (  
        <section className="bg-white p-6">
             <div className="bg-[#F6F7F9] rounded-box p-6 flex flex-col items-center max-w-[390px]">
                <h1 className="text-xl">Login</h1>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center gap-4 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="label">Email:</label>
                        <input type="email" name="email" className="bg-white input self-start rounded-box" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="label">Password:</label>
                        <input type="password" name="password" className="bg-white input self-start rounded-box" />
                    </div>
                    <button className="btn bg-blue-600 text-white w-full">Sign in</button>
                    <p>No Account? <Link className="link" to={'/register'}>Register Here</Link></p>
                    <button className="btn bg-white w-full">Forgot Password?</button>
                </form>
            </div>
        </section>
    );
}

export default Login;