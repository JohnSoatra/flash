"use client";
import initialize from "@/utils/compose/initialize";
import { useEffect } from "react";

const Initializer = () => {
  useEffect(() => {
    initialize();
  }, []);

  return null;
}

export default Initializer;