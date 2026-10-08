"use client";

import { useEffect } from "react";
import { usePlatformStore } from "@/lib/store";

export function StoreHydration() {
  useEffect(() => {
    usePlatformStore.persist.rehydrate();
  }, []);
  return null;
}
