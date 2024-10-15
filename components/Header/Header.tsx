"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "@/store/selectors";

const Header = () => {
  const itemCount = useSelector(selectCartItemCount);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Мой Магазин
      </Link>
      <Link href="/cart" className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4a1 1 0 001 1.2h12.8a1 1 0 001-1.2L17 13M7 13L5.4 5M17 13l1.2 6.4a1 1 0 01-1 1.2H6.8a1 1 0 01-1-1.2L7 13z"
          />
        </svg>
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;
