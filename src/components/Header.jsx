
import React from "react";
import { Container, Logo, LogoutBtn } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-[#245F73] text-[#F2F0EF] shadow-lg border-b border-[#BBBDBC] sticky top-0 z-50 w-full">
      <Container>
        <nav className="flex flex-col sm:flex-row sm:items-center justify-between w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8  gap-3 sm:gap-0">
          {/* Logo */}
          <Link to="/" className="flex justify-center sm:justify-start">
            <Logo width="60px" className="h-10 sm:h-12" />
          </Link>

          {/* Navigation */}
          <ul className="flex justify-center flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-0">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-3 py-1 text-sm md:text-base font-medium text-[#F2F0EF] hover:bg-[#733E24] hover:text-[#F2F0EF] rounded-full transition-all duration-300 ease-in-out"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="px-3 py-1 sm:py-2 text-sm font-medium text-[#F2F0EF] bg-[#733E24] hover:bg-[#252322] hover:text-[#245F73] rounded-full transition-all duration-300" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
