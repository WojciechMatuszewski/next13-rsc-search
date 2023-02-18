"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

interface SearchProps {
  defaultValue: string | undefined;
}

export function Search({ defaultValue = "" }: SearchProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const handleOnChange = useCallback(
    (normalizedSearchValue: string) => {
      const url = new URL("/", window.location.origin);

      if (normalizedSearchValue === "") {
        url.searchParams.delete("name");
      } else {
        url.searchParams.append("name", normalizedSearchValue);
      }

      if (normalizedSearchValue === defaultValue) {
        return;
      }

      startTransition(() => {
        router.replace(`${pathname}?${url.searchParams.toString()}`);
      });
    },
    [defaultValue, pathname, router]
  );

  const debouncedOnChange = useDebouncedCallback(
    handleOnChange,
    [handleOnChange],
    200
  );

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        onChange={e => {
          const normalizedSearchValue = e.currentTarget.value.trim();

          debouncedOnChange(normalizedSearchValue);
        }}
        id="search"
        type="search"
        placeholder="Search for the user"
        defaultValue={defaultValue}
      />
      {isPending ? <span>Loading...</span> : null}
    </div>
  );
}
