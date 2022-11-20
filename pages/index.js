import { createClient } from "contentful";
import { VacationPanel } from "../components/VacationPanel";

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
  return (
    <div className="container">
      <div className="row">
        <h1 className="title-main">Vacations</h1>
        <div className="vacation-panels">
          {recipes.map((recipe) => (
            <VacationPanel key={recipe.sys.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
