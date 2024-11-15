import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "p3o500d1",
  dataset: "product",
  useCdn: false,
  apiVersion: "2022-03-07",
});

export default client;
