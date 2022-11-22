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

export default function Vacation({ vacations }) {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(vacations);
  const [noVacationFound, setNoVacationFound] = useState(false)

  useEffect(() => {
    const inputCity = vacations.filter((city) => city.fields.title.toLowerCase().includes(query.toLowerCase()));
    if (inputCity.length) {
      setFilteredCities(inputCity);
      setNoVacationFound(false);
    } else {
      setFilteredCities([]);
      setNoVacationFound(true);
    }
  }, [query]);

  return (
    <div className="container">
      <input value={query} onChange={(e) => setQuery(e.target.value)}></input>
      <div className="row">
        <h1 className="title-main">Vacations</h1>
        {noVacationFound ? <div>NOTHING HERE</div> : ''}
        <div className="vacation-panels">
          {filteredCities.map((vacation) => (
            <div className="col-xs-12" key={vacation.sys.id}>
              <VacationPanel vacation={vacation} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
