import { createClient } from "contentful";
import { useQuery } from "react-query";

const fetchVacations = async () => {
  const client = createClient({
    space: "6yu8mnoa9wdc",
    accessToken: "qSxY7HTMgBYn3WQP4bL5svs27iUAQZEM-rauSvhvixg",
  });

  const responce = await client.getEntries({ content_type: "recipe" });
  return responce;
};

export const fetchQuery = () => {
  return useQuery(["vacations"], fetchVacations);
};
