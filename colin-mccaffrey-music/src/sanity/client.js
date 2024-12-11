import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "p3o500d1",
  dataset: "product",
  // dataset: "development",
  useCdn: true,
  apiVersion: "2022-03-07",
});

export default client;
