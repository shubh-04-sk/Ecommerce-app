import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-2 text-slate-600">Your Account details.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Full name</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user?.firstName} {user?.lastName}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Username</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user?.username || "Not available"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user?.email || "Not available"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">User ID</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user?.id || "Not available"}
            </p>
          </div>

          {/* new */}

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Gender</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user?.gender || "Not available"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Age</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user?.age || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
