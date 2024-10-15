import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/redux";
import { useFetchProductImagesQuery } from "@/api/categoryApi";

interface ProductListItemProps {
  product: Product;
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const {
    data: images,
    error,
    isLoading,
  } = useFetchProductImagesQuery(product.offerId);

  return (
    <li className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
      <Link href={`/product/${product.offerId}`}>
        <div className="flex flex-col space-y-2">
          {isLoading && (
            <p className="text-gray-400">Загрузка изображения...</p>
          )}
          {error && <p className="text-red-500">Ошибка загрузки изображения</p>}
          {images && images.length > 0 && (
            <Image
              src={`data:image/jpeg;base64,${images[0].buffer}`}
              alt={product.params.ModelName}
              width={300}
              height={300}
              className="object-cover rounded-md"
            />
          )}
          <h4 className="text-lg font-bold text-gray-800">
            {product.params.ModelName}
          </h4>
          <p className="text-sm text-gray-600">
            Артикул: {product.params.Articul}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            Цена: {product.params.RetailPrice} {product.currencyId}
          </p>
        </div>
      </Link>
    </li>
  );
};
