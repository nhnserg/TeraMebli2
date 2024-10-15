"use client";

import { Product } from "@/types/redux";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      offerId: product.offerId,
      ModelName: product.params.ModelName,
      Articul: product.params.Articul,
      RetailPrice: product.params.RetailPrice,
      RetailPriceWithDiscount:
        product.params.RetailPriceWithDiscount || product.params.RetailPrice,
      currencyId: product.currencyId,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-bold">{product.params.ModelName}</h3>
      <p>Артикул: {product.params.Articul}</p>
      <p>
        Цена: {product.params.RetailPrice} {product.currencyId}
      </p>
      {product.params.RetailPriceWithDiscount && (
        <p className="text-green-600">
          Цена со скидкой: {product.params.RetailPriceWithDiscount}{" "}
          {product.currencyId}
        </p>
      )}
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductCard;
