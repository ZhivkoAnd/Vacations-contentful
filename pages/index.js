import { createClient } from "contentful";
import { VacationPanel } from "../components/VacationPanel";
import { useState } from "react";

// We use the getStaticProps to grab any data and then use that data to inject props to our components
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: { recipes: res.items },
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  const [letters, setLetters] = useState("");
  const [filtered, setFiltered] = useState(recipes);

  console.log(letters);
  return (
    <div className="container">
      <input
        value={letters}
        onChange={(e) => setLetters(e.target.value)}
      ></input>
      <div className="row">
        <h1 className="title-main">Vacations</h1>
        <div className="vacation-panels">
          {filtered.map((recipe) => (
            <div className="col-xs-12">
              <VacationPanel key={recipe.sys.id} recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
