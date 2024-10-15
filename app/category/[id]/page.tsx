"use client";

import { useCategoryData } from "@/hooks/useCategoryData";
import Pagination from "@/components/Pagination";
import { Product } from "@/types/redux";
import { CrumbsLinks } from "@/components/CrumbsLinks";
import { ProductListItem } from "@/components/ProductListItem";

const CategoryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const {
    categoryData,
    categoryDetails,
    error,
    categoryError,
    isLoading,
    categoryLoading,
    isFetching,
    setPage,
  } = useCategoryData(id);

  if (isLoading || categoryLoading)
    return <p className="text-gray-500">Загрузка продуктов...</p>;
  if (error)
    return (
      <p className="text-red-500">
        Ошибка при загрузке продуктов: {JSON.stringify(error)}
      </p>
    );
  if (categoryError)
    return (
      <p className="text-red-500">
        Ошибка при загрузке категории: {JSON.stringify(categoryError)}
      </p>
    );
  if (!categoryData || !categoryDetails)
    return <p className="text-gray-500">Нет данных для отображения.</p>;

  const { category, products, totalPages, currentPage } = categoryData;
  const parentId = categoryDetails.parentId;
  const parentCategory = parentId ? categoryDetails : null;

  return (
    <div className="container mx-auto p-6">
      <CrumbsLinks
        categoryName={parentCategory ? parentCategory.name : category.name}
        categoryId={
          parentCategory ? parentCategory.id.toString() : category.id.toString()
        }
      />
      {isFetching && <p className="text-gray-400">Обновление данных...</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product: Product) => (
          <ProductListItem key={product.offerId} product={product} />
        ))}
      </ul>

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
