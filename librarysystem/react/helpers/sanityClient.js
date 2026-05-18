import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "37izpt22",
  dataset: "production",
  apiVersion: "2023-10-01",
  token: "skhWM4NIjyEp4J0wkFtDKALlGDcJo9xXGVJRwpSlduy9eDZ5QNvR6qA0ceFQGZKpRjERe5VdSdkcfU8re1xLpO9snqb6nQ4ZfOGimNou8S2YCKXuOZg17bYwoGkaH40CYb84bwzj1YWs4UPBeu0MFuk3FkIRAs2KzkTcS3EAl087Sldu3ocU",
  useCdn: false
});

export default client