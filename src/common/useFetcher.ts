import { useState, useEffect } from "react";

const cache = new Map<string, unknown>();
// TODO: refactor, do cleanup to avoid memory leaks
// TODO: cache not only Data, but also "Promise of Data" to avoid duplicate fetch

export const useFetcher = <D extends unknown>(
  key: string,
  fetcherFn: () => Promise<D>
) => {
  const [data, setData] = useState<D>(null!);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const cacheData = key ? (cache.get(key) as D) : null;
    if (cacheData) {
      setData(cacheData);
    } else {
      fetcherFn()
        .then((res) => {
          if (key) {
            cache.delete(key);
            cache.set(key, res);
          }
          setData(res);
        })
        .catch(setError);
    }
  }, [key, fetcherFn]);
  return { data, error };
};
