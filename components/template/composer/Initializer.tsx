"use client";
import initialize from "@/utils/compose/initialize";
import getAllCategories from "@/utils/fetch/category/getall";
import getJson from "@/utils/json/get";
import { useEffect } from "react";

const Initializer = () => {
  useEffect(() => {
    initialize();
    // fetch('http://localhost:9998/test/get').then(async (res) => {
    //     console.log(await getJson(res));
    // });
  }, []);

  return null;
}

export default Initializer;