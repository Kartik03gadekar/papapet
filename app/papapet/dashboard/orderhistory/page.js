"use client";
import Orderhistory from "@/Components/Setting/Orderhistory";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  return <Orderhistory user={user} />;
}
