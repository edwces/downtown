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
    if (typeof window === "undefined") return initial || {};

    const value = localStorage.getItem(key);
    // when key has not been created yet create one
    if (value === null || value === "") {
      localStorage.setItem(key, JSON.stringify(initial || {}));
      return initial || {};
    }

    return JSON.parse(value);
  };

  const [value, setValue] = useState<T>(() => getDefaultValue());

  const setStorageValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));

    // call event to sychronize beetwen hooks
    const documentStorageEvent = new CustomEvent("document-storage", {
      detail: { newValue: newValue },
    });
    window.dispatchEvent(documentStorageEvent);
  };

  useEffect(() => {
    // Synchronize parsed state between document
    const onStorage = (event: StorageEvent) => {
      setValue(JSON.parse(event.newValue || "{}"));
    };

    const onDocumentStorage = (event: CustomEvent) => {
      setValue(event.detail.newValue || {});
    };

    addEventListener("storage", onStorage);
    addEventListener("document-storage", onDocumentStorage as EventListener);

    return () => {
      removeEventListener("storage", onStorage);
      removeEventListener(
        "document-storage",
        onDocumentStorage as EventListener
      );
    };
  }, []);

  return [value, setStorageValue];
};
