"use client";
import store from "@/redux/store";
import { Provider as ProviderRedux } from "react-redux";

export function Provider({ children }: { children: React.ReactNode }) {
  return <ProviderRedux store={store}>{children}</ProviderRedux>;
}