"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from "@/store/selectors";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";
import Link from "next/link";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const handleRemove = (offerId: string) => {
    dispatch(removeFromCart(offerId));
  };

  const handleQuantityChange = (offerId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ offerId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0)
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Корзина</h1>
        <p>Ваша корзина пуста.</p>
        <Link href="/" className="text-blue-600 underline">
          Перейти к покупкам
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>
      <button
        onClick={handleClearCart}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Очистить корзину
      </button>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.offerId}
            className="flex items-center justify-between bg-white p-4 shadow rounded"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.ModelName}</h2>
              <p>Артикул: {item.Articul}</p>
              <p>
                Цена: {item.RetailPriceWithDiscount} {item.currencyId}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.offerId, parseInt(e.target.value))
                }
                className="w-16 border rounded px-2 py-1"
              />
              <button
                onClick={() => handleRemove(item.offerId)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl">
          Всего товаров: <strong>{itemCount}</strong>
        </p>
        <p className="text-xl">
          Общая сумма: <strong>{total.toFixed(2)} ₽</strong>
        </p>
      </div>
      <div className="mt-6">
        <Link
          href="/checkout"
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Оформить заказ
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
