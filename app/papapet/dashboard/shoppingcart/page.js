"use client";
import ShoppingCart from "@/Components/Setting/ShoppingCart";
import { useSelector } from "react-redux";

export default function cartPage() {
  const { user } = useSelector((state) => state.auth);
  return <ShoppingCart user={user} />;
}