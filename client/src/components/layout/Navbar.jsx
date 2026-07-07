const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-lg transition-all duration-300">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <div className="flex items-center">
          <h1 className="cursor-pointer text-3xl font-extrabold tracking-tight text-blue-600 transition duration-300 hover:scale-105">
            FixNear
          </h1>
        </div>

        {/* Navigation */}

        <nav className="hidden items-center gap-12 lg:flex">

          <a
            href="#"
            className="relative text-[15px] font-semibold text-blue-600 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-blue-600"
          >
            Home
          </a>

          <a
            href="#"
            className="text-[15px] font-medium text-gray-600 transition-all duration-300 hover:text-blue-600"
          >
            Services
          </a>

          <a
            href="#"
            className="text-[15px] font-medium text-gray-600 transition-all duration-300 hover:text-blue-600"
          >
            How It Works
          </a>

          <a
            href="#"
            className="text-[15px] font-medium text-gray-600 transition-all duration-300 hover:text-blue-600"
          >
            Become a Provider
          </a>

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <button className="text-[15px] font-semibold text-gray-700 transition-all duration-300 hover:text-blue-600">
            Login
          </button>

          <button className="rounded-xl bg-blue-600 px-6 py-3 text-[15px] font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl">
            Register
          </button>

        </div>

      </div>

    </header>
  );
};

export default Navbar;