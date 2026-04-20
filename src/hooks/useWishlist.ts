import { useCallback, useEffect, useState } from "react";

const KEY = "bv:wishlist";

const read = (): string[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

const write = (ids: string[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent("bv:wishlist-change"));
  } catch {
    /* ignore */
  }
};

export const useWishlist = (id: string) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(read().includes(id));
    const onChange = () => setSaved(read().includes(id));
    window.addEventListener("bv:wishlist-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("bv:wishlist-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [id]);

  const toggle = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      const list = read();
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      write(next);
      setSaved(next.includes(id));
    },
    [id]
  );

  return { saved, toggle };
};
