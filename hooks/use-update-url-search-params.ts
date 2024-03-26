import { usePathname, useRouter } from 'next/navigation';

export const useUrlSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();

  const updateUrlSearchParams = (
    paramsToUpdate: Record<string, string | number | null | undefined>
  ) => {
    const queryParams = new URLSearchParams(window?.location.search);

    Object.keys(paramsToUpdate).forEach((key) => {
      const value = paramsToUpdate[key];
      if (value == null) {
        queryParams.delete(key);
      } else {
        if (queryParams.has(key)) {
          queryParams.set(key, value.toString());
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const newUrl = `${pathname}?${queryParams.toString()}`;

    router.push(newUrl);
  };

  return updateUrlSearchParams;
};
