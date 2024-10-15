"use client";

import { useState } from "react";
import Categories from "@/components/Categories";

const Home = () => {
  const [_, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="flex flex-row justify-center p-5 max-w-[1200px] mx-auto">
      <div className="w-1/3 mr-5 p-5 bg-gray-100 text-gray-800 rounded-lg shadow-md">
        <h3 className="mb-2 font-bold">Категории</h3>
        <Categories onSelectCategory={handleSelectCategory} />
      </div>
    </div>
  );
};

export default Home;
