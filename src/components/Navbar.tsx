import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const cart = useSelector((state: any) => state.cart.items);

  const navItems = [
    { label: "My Profile", to: "/profile" },
    { label: "Products", to: "/products" },
    { label: `Cart${cart.length ? ` (${cart.length})` : ""}`, to: "/cart" },
  ];

  const displayName = user?.firstName || user?.username || "User";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <NavLink
          to="/"
          className="text-[22px] font-bold tracking-tight text-indigo-600"
        >
          Product-App
        </NavLink>

        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-8 text-[17px] text-slate-900">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-indigo-600"
                    : "transition hover:text-indigo-600"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="text-[17px] text-slate-700">Hi, {displayName}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
