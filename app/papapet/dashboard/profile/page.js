"use client";
import Profile from "@/Components/Setting/Profile";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  return <Profile user={user} />;
}
