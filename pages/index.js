import { createClient } from "contentful";
import { RecipeCard } from "../components/RecipeCard";

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
  console.log(recipes);
  return (
    <div className="recipe-list a">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </div>
  );
}
