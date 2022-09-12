import { useEffect, useState } from "react";

interface UseJSONStorageArgs<T> {
  key: string;
  initial?: T;
}

export const useJSONStorage = <T>({
  key,
  initial,
}: UseJSONStorageArgs<T>): [T, (newValue: T) => void] => {
  const getDefaultValue = () => {
    if (typeof window === "undefined") return "";

    const value = localStorage.getItem(key);
    // when key has not been created yet create one
    if (value === null || value === "") {
      localStorage.setItem(key, JSON.stringify(initial || {}));
      return initial;
    }

    return JSON.parse(value);
  };

  const [value, setValue] = useState<T>(() => getDefaultValue());

  const setStorageValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    // Synchronize parsed state between app
    const onStorage = (event: StorageEvent) => {
      setValue(JSON.parse(event.newValue || "{}"));
    };

    addEventListener("storage", onStorage);

    return () => {
      removeEventListener("storage", onStorage);
    };
  });

  return [value, setStorageValue];
};
