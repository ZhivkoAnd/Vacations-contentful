import Footer from "./Footer";
import Navigation from "./Navigation";
import { createClient } from "contentful";
import { useQuery } from "react-query";

export default function Layout({ children, lightMode, darkMode }) {
  const fetchVacations = async () => {
    const client = createClient({
      space: "6yu8mnoa9wdc",
      accessToken: "qSxY7HTMgBYn3WQP4bL5svs27iUAQZEM-rauSvhvixg",
    });

    const responce = await client.getEntries({ content_type: "recipe" });
    return responce;
  };

  const { data } = useQuery(["vacations"], fetchVacations);

  return (
    <div>
      <Navigation lightMode={lightMode} darkMode={darkMode} data={data} />
      <div className="page-content">{children}</div>
      <Footer />
    </div>
  );
}
