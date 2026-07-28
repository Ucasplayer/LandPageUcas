"use client";

import { useEffect } from "react";

export default function ClientInit() {
  useEffect(() => {
    import("../src/main.js");
  }, []);

  return null;
}
