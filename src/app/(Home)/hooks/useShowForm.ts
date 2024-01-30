"use client";
import { useState } from "react";

export default function useShowForm() {
  const [showForm, setShowForm] = useState("join");

  const handleShowFormClick = (formName: "register" | "join") => {
    setShowForm(formName);
  };

  return { handleShowFormClick, showForm };
}
