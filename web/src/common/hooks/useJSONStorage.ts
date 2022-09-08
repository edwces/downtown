import { useEffect, useState } from "react";

interface UseJSONStorageArgs {
  key: string;
  initial?: any;
}

export const useJSONStorage = ({ key, initial }: UseJSONStorageArgs) => {
  const getDefaultValue = () => {
    if (typeof window === "undefined") return "";

    const value = localStorage.getItem(key);
    if (value === null || value === "") {
      localStorage.setItem(key, JSON.stringify(initial || {}));
      return initial;
    }

    return JSON.parse(value);
  };

  const [value, setValue] = useState(() => getDefaultValue());

  const setStorageValue = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      setValue(JSON.stringify(event.newValue));
    };

    addEventListener("storage", onStorage);

    return () => {
      removeEventListener("storage", onStorage);
    };
  });

  return [value, setStorageValue];
};
