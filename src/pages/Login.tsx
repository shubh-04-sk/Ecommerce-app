import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res: any = await dispatch(loginUser(form) as any);

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#c8cbd1] px-6 py-10">
      <div className="w-full max-w-[525px] rounded-[24px] bg-white px-10 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:px-12">
        <h1 className="text-[42px] font-bold leading-none text-slate-900">
          Login
        </h1>
        <p className="mt-4 text-[18px] text-slate-600">
          Sign in to access your dashboard
        </p>

        <form className="mt-10 space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-[17px] font-semibold text-slate-900"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={form.username}
              className="mt-3 h-13 w-full rounded-[14px] border border-slate-300 px-4 text-[17px] text-slate-700 outline-none transition focus:border-blue-500"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[17px] font-semibold text-slate-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              className="mt-3 h-13 w-full rounded-[14px] border border-slate-300 px-4 text-[17px] text-slate-700 outline-none transition focus:border-blue-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error ? (
            <p className="text-sm font-medium text-red-600">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-13 w-full rounded-[14px] bg-[#3f7be8] text-[17px] font-semibold text-white transition hover:bg-[#346fe0] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-600">
          <h4>Demo Credentials::</h4>
          <strong>Username:</strong> avat
        </p>
        <p className="text-sm text-slate-600">
          <strong>Password:</strong> avatpass
        </p>
      </div>
    </div>
  );
}
