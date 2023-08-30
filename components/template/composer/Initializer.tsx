"use client";
import initial from "@/utils/compose/initial";
import { useEffect } from "react";

const Initializer = () => {
  useEffect(() => {
    initial();
  }, []);

  return null;
}

export default Initializer;