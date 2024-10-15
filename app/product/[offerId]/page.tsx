"use client";

import { useProductData } from "@/hooks/useProductData";
import { CrumbsLinks } from "@/components/CrumbsLinks";
import ProductCard from "@/components/Cart/ProductCard";
import Image from "next/image";
import { useFetchProductImagesQuery } from "@/api/categoryApi";

const ProductDetails = ({ params }: { params: { offerId: string } }) => {
  const { offerId } = params;

  const { product, error, isLoading } = useProductData(offerId);
  const {
    data: images,
    error: imageError,
    isLoading: imageLoading,
  } = useFetchProductImagesQuery(offerId);

  if (isLoading) return <p className="text-gray-500">Загрузка...</p>;
  if (error)
    return (
      <p className="text-red-500">
        Ошибка при загрузке: {JSON.stringify(error)}
      </p>
    );
  if (!product) return <p className="text-gray-500">Товар не найден</p>;

  const fullCategorySync = product.params["Розділ синхронізації повністю"];
  const categoryParts = fullCategorySync ? fullCategorySync.split(";") : [];

  const mainCategory = categoryParts[0]?.split("=")[1]?.trim() || "Не указано";
  const mainCategoryId =
    categoryParts[0]?.split("=")[0]?.trim() || "Не указано";

  let subCategory = "";
  let subCategoryId = "";

  if (categoryParts.length > 1) {
    subCategory = categoryParts[1].split("=")[1]?.trim() || "";
    subCategoryId = categoryParts[1].split("=")[0]?.trim() || "";
  }

  return (
    <div className="container mx-auto p-6">
      <CrumbsLinks
        categoryName={mainCategory}
        categoryId={mainCategoryId}
        subcategoryName={subCategory}
        subcategoryId={subCategoryId}
        productName={product.params.ModelName}
      />
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        {imageLoading && (
          <p className="text-gray-400">Загрузка изображения...</p>
        )}
        {imageError && (
          <p className="text-red-500">Ошибка загрузки изображения</p>
        )}
        {images && images.length > 0 && (
          <div className="flex space-x-4 mb-4">
            {images.map((image, index) => (
              <Image
                key={index}
                src={`data:image/jpeg;base64,${image.buffer}`}
                alt={`${product.params.ModelName} Image ${index + 1}`}
                width={300}
                height={300}
                className="object-cover rounded-md"
              />
            ))}
          </div>
        )}
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Полное описание:</span>{" "}
          {product.params["Опис текст(сайт)"] ?? "Описание отсутствует"}
        </p>
        <ProductCard key={product.offerId} product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
