"use client";
import TrackOrder from "@/Components/Setting/TrackOrder";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  return <TrackOrder user={user} />;
}
