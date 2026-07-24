import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await handleLogin({
      email: formData.email,
      password: formData.password,
    });

    if (user.role === "buyer") {
      navigate("/");
    } else if (user.role === "seller") {
      navigate("/seller/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      {/* ================= NAVBAR ================= */}

      <header className="border-b border-zinc-800">
        <div className="h-17 px-8 lg:px-10 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Snitch</h1>

          <nav className="flex items-center gap-10 text-md">
            <a href="#" className="text-zinc-300 hover:text-white duration-300">
              Explore
            </a>

            <a href="#" className="text-zinc-300 hover:text-white duration-300">
              Collective
            </a>

            <a href="#" className="font-semibold">
              Sign In
            </a>
          </nav>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* ================= LEFT ================= */}

        <section
          className="hidden lg:block lg:w-1/2 relative bg-cover bg-top"
          style={{
            backgroundImage: "url('./login.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/35"></div>

          <div className="absolute left-14 top-1/2 -translate-y-1/2 z-20">
            <h2 className="text-7xl font-black tracking-tight">SNITCH</h2>

            <p className="mt-5 uppercase tracking-[0.4em] text-sm text-zinc-300">
              Access The Collective
            </p>
          </div>
        </section>

        {/* ================= RIGHT ================= */}

        <section className="flex-1 bg-[#111111] flex items-center justify-center px-8 py-6">
          <div className="w-full max-w-lg">
            {/* Heading */}

            <h2 className="text-5xl font-semibold">Identity Verification</h2>

            <p className="text-zinc-400 mt-3 text-sm mb-7">
              Provide credentials to initialize your secure session.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EMAIL */}

              <div>
                <label className="block uppercase tracking-[0.35em] text-xs text-zinc-400 mb-4">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="identity@collective.aura"
                  className="w-full h-10 rounded bg-transparent border border-zinc-700 px-6 text-lg placeholder:text-zinc-500 focus:outline-none focus:border-white transition"
                />
              </div>

              {/* PASSWORD */}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="uppercase tracking-[0.35em] text-xs text-zinc-400">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-zinc-400 hover:text-white"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full h-10 rounded bg-transparent border border-zinc-700 px-6 pr-16 text-lg placeholder:text-zinc-500 focus:outline-none focus:border-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}

              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-white text-black uppercase rounded active:scale-95 text-sm font-semibold hover:bg-zinc-200 transition duration-300"
              >
                Initialize Session
              </button>

              <ContinueWithGoogle />

              {/* Divider */}

              <div className="border-t border-zinc-800 pt-10">
                <p className="text-lg text-zinc-400">
                  New operative?{" "}
                  <a
                    href="/register"
                    className="font-semibold text-white hover:underline"
                  >
                    Register Membership
                  </a>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-zinc-800">
        <div className="px-8 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-zinc-400">
            © 2024 Aura Essentialist. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-8 text-sm text-zinc-400">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>

            <a href="#" className="hover:text-white transition">
              Help Center
            </a>

            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
