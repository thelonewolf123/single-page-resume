import { useCallback, useEffect, useState } from "react";

export function useApiKey() {
  const [apiKey, setApiKey] = useState("");
  useEffect(() => {
    setApiKey(localStorage.getItem("genai_api_key") || "");
  }, []);
  const saveApiKey = useCallback((key: string) => {
    localStorage.setItem("genai_api_key", key);
  }, []);
  return { apiKey, setApiKey, saveApiKey };
}
