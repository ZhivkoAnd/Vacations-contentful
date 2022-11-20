import { createClient } from "contentful";
import Image from "next/image";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Skeleton } from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { recipe: items[0] },
    revalidate: 1,
  };
}

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <Skeleton />;

  const { title, gallery } = recipe.fields;

  return (
    <>
      <div className="banner">
        <h1 className="title-main">{title}</h1>
        {gallery.map((image) => {
          return (
            <Image
              src={`https:${image.fields.file.url}`}
              width={image.fields.file.details.image.width}
              height={image.fields.file.details.image.height}
            />
          );
        })}
      </div>

      {/* <div className="description">
        <div>{documentToReactComponents(description)}</div>
      </div> */}
    </>
  );
}
