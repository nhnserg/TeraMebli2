import Link from "next/link";
import { useState } from "react";
import {
  useFetchCategoriesQuery,
  useFetchSubcategoriesQuery,
} from "@/api/categoryApi";

interface CategoriesProps {
  onSelectCategory: (categoryId: number) => void;
  currentLanguage: "UA" | "RU";
}

const Categories = ({ currentLanguage }: CategoriesProps) => {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useFetchCategoriesQuery();

  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const handleToggle = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="p-4">
      {categoriesLoading && (
        <p className="text-gray-500">Загрузка категорий...</p>
      )}
      {categoriesError && (
        <p className="text-red-500">
          Ошибка при загрузке категорий:
          {typeof categoriesError === "object" && "data" in categoriesError
            ? String(categoriesError.data)
            : String(categoriesError)}
        </p>
      )}
      {categories && (
        <ul className="space-y-2">
          {categories.map((category) => {
            const [uaName, ruName] = category.name.split("_");

            return (
              <li key={category.id} className="border-b pb-2">
                <div className="flex items-center justify-between">
                  <Link href={`/category/${category.id}`}>
                    <span className="cursor-pointer font-bold text-blue-600 hover:underline">
                      {currentLanguage === "UA" ? uaName : ruName}
                    </span>
                  </Link>
                  <button
                    className="ml-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => handleToggle(category.id)}
                  >
                    {expandedCategories.includes(category.id) ? "-" : "+"}
                  </button>
                </div>
                {expandedCategories.includes(category.id) && (
                  <Subcategories
                    parentId={category.id}
                    currentLanguage={currentLanguage}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const Subcategories = ({
  parentId,
  currentLanguage,
}: {
  parentId: number;
  currentLanguage: "UA" | "RU";
}) => {
  const {
    data: subcategories,
    error: subcategoriesError,
    isLoading: subcategoriesLoading,
  } = useFetchSubcategoriesQuery(parentId);

  return (
    <div className="ml-4">
      {subcategoriesLoading && (
        <p className="text-gray-500">Загрузка подкатегорий...</p>
      )}
      {subcategoriesError && (
        <p className="text-red-500">
          Ошибка при загрузке подкатегорий:
          {typeof subcategoriesError === "object" &&
          "data" in subcategoriesError
            ? String(subcategoriesError.data)
            : String(subcategoriesError)}
        </p>
      )}
      {subcategories && (
        <ul className="space-y-1">
          {subcategories.map((sub) => {
            const [uaName, ruName] = sub.name.split("_");

            return (
              <li key={sub.id} className="border-l pl-4">
                <Link href={`/category/${sub.id}`}>
                  <span className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline">
                    {currentLanguage === "UA" ? uaName : ruName}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Categories;
