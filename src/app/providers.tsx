"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init('phc_yE8sDBZQ4pskJMRwjjjcme4o4gSsdeMT6q3ELkzYxqdC', {
      api_host: "https://eu.i.posthog.com",
      defaults: "2026-05-30",
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}