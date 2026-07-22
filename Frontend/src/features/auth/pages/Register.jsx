import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister({
      fullname: formData.fullname,
      contact: formData.contact,
      email: formData.email,
      password: formData.password,
      isSeller: formData.isSeller,
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col lg:flex-row">
      {/* ================= LEFT PANEL ================= */}

      <section
        className="relative hidden lg:flex lg:w-1/2 min-h-screen overflow-hidden bg-cover bg-top"
        style={{
          backgroundImage: "url('./register.png')",
        }}
      >
        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/45"></div>

        {/* Top Text */}

        <div className="absolute top-5 left-8 z-20">
          <p className="tracking-[0.55em] uppercase text-sm text-zinc-200">
            Volume 01 // Aesthetic
          </p>
        </div>

        {/* Logo */}

        <div className="absolute left-14 top-1/2 -translate-y-1/2 z-20">
          <h1 className="text-7xl font-black tracking-tight">SNITCH</h1>

          <div className="flex gap-6 mt-8">
            <div className="w-[2px] bg-white"></div>

            <div>
              <p className="italic text-md text-zinc-200">
                Unapologetically Minimal.
              </p>

              <p className="italic text-md text-zinc-200">
                Redefining Streetwear.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="absolute bottom-8 left-14 flex items-center gap-8 z-20">
          <div className="w-14 h-[2px] bg-white"></div>

          <p className="tracking-[0.35em] uppercase text-sm text-zinc-300">
            Built For The Underground
          </p>
        </div>
      </section>

      {/* ================= RIGHT PANEL ================= */}

      <section className="flex-1 flex flex-col min-h-screen bg-[#141414]">
        {/* Navbar */}

        <header className="h-20 px-10 lg:px-20 flex items-center justify-end">
          <nav className="flex gap-12 text-sm uppercase tracking-[0.28em]">
            <a href="#" className="text-zinc-300 hover:text-white duration-300">
              Explore
            </a>

            <a href="#" className="text-zinc-300 hover:text-white duration-300">
              Showcase
            </a>

            <a href="#" className="font-bold text-white">
              Sign In
            </a>
          </nav>
        </header>

        {/* Form */}

        <div className="flex-1 flex justify-center items-center px-8 py-5">
          <div className="w-full max-w-xl">
            {/* Heading */}

            <h2 className="text-4xl font-semibold">Join the Collective</h2>

            <p className="text-zinc-400 mb-7 text-sm">
              Register below to access exclusive drops.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}

              <div>
                <label className="block uppercase tracking-[0.4em] text-xs mb-4 text-zinc-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Julian Vossen"
                  className="w-full h-10 rounded bg-white text-black px-6 text-lg placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              {/* Contact + Email */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block uppercase tracking-[0.4em] text-xs mb-4 text-zinc-300">
                    Contact
                  </label>

                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+1 (555)"
                    className="w-full h-10 rounded bg-white text-black px-6 text-lg placeholder:text-zinc-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-[0.4em] text-xs mb-4 text-zinc-300">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@aura.com"
                    className="w-full h-10 rounded bg-white text-black px-6 text-lg placeholder:text-zinc-400 focus:outline-none"
                  />
                </div>
              </div>
              {/* Password */}

              <div>
                <label className="block uppercase tracking-[0.4em] text-xs mb-4 text-zinc-300">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full h-10 rounded bg-white text-black px-6 pr-16 text-lg placeholder:text-zinc-400 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black transition"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              {/* Seller */}

              <div className="flex items-center gap-2">
                <input
                  id="seller"
                  name="isSeller"
                  type="checkbox"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="h-4 w-4 accent-white cursor-pointer"
                />

                <label
                  htmlFor="seller"
                  className="text-zinc-300 text-sm cursor-pointer opacity-60"
                >
                  Apply for seller status
                </label>
              </div>

              {/* Button */}

              <button
                type="submit"
                className="w-full h-10 px-4 py-2.5 rounded cursor-pointer bg-white text-black     text-sm font-semibold hover:bg-zinc-200 transition-all duration-300"
              >
                Register Account
              </button>

              <ContinueWithGoogle />

              {/* Login */}

              <p className="text-center text-zinc-400 text-md pt-8">
                Already part of the collective?{" "}
                <a
                  href="/login"
                  className="font-semibold text-white hover:underline"
                >
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}

        <footer className="border-t border-zinc-800">
          <div className="px-8 lg:px-20 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm tracking-[0.25em] uppercase text-zinc-500">
              © 2024 SNITCH / Archive 01
            </p>

            <div className="flex gap-10 uppercase tracking-[0.25em] text-sm text-zinc-500">
              <a href="#" className="hover:text-white transition">
                Legal
              </a>

              <a href="#" className="hover:text-white transition">
                Privacy
              </a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Register;
