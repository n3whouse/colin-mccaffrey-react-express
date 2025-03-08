import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "p3o500d1",
  dataset: "product",
  useCdn: true,
});

const useSanity = () => {
  const [data, setData] = useState({
    paypalButtonCode: "",
    hostedButtonId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `*[_type == 'release']{
    releaseList[]{
    _key,
      hostedButtonId,
      }
    }`;

    client
      .fetch(query)
      .then((result) => {
        if (result && result.length > 0) {
          // Find the first non-null hostedButtonId
          const firstValidButton = result[1]?.releaseList?.find(
            (item) => item.hostedButtonId
          );
          if (firstValidButton) {
            setData({
              hostedButtonId: firstValidButton.hostedButtonId,
              paypalButtonCode: `<div id="paypal-container-${firstValidButton.hostedButtonId}"></div>`,
            });
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useSanity;
