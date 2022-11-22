import { createClient } from "contentful";
import { VacationPanel } from "../components/VacationPanel";
import { useEffect, useState } from "react";

// We use the getStaticProps to grab any data and then use that data to inject props to our components
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: { vacations: res.items },
    revalidate: 1,
  };
}

export default function Recipes({ vacations }) {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(vacations);

  useEffect(() => {
    const inputCity = vacations.filter((city) => city.fields.title === query);
    if (inputCity.length === 0) {
      setFilteredCities(vacations);
    } else {
      setFilteredCities(inputCity);
    }
  }, [query]);

  return (
    <div className="container">
      <input value={query} onChange={(e) => setQuery(e.target.value)}></input>
      <div className="row">
        <h1 className="title-main">Vacations</h1>
        <div className="vacation-panels">
          {filteredCities.map((recipe) => (
            <div className="col-xs-12">
              <VacationPanel key={recipe.sys.id} recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
