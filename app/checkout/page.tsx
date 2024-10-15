"use client";

import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "@/store/selectors";
import { useState } from "react";
import { clearCart } from "@/store/cartSlice";
import Link from "next/link";

const BASE_URL = "https://teramebli-api.onrender.com/api";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          items: cartItems,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при оформлении заказа");
      }

      setSubmitSuccess(true);
      dispatch(clearCart());
    } catch (error: any) {
      setSubmitError(error.message || "Неизвестная ошибка");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess)
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Заказ оформлен!</h1>
        <p>Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
        <Link href="/" className="text-blue-600 underline">
          Вернуться на главную
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Имя</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Телефон</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Адрес</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
        {submitError && <p className="text-red-500">{submitError}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Оформление..." : "Оформить заказ"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
