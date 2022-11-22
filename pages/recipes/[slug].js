import { createClient } from "contentful";
import Image from "next/image";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Skeleton } from "../../components/Skeleton";
import ImageGallery from 'react-image-gallery';

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

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  if (!recipe) return <Skeleton />;

  const { title, gallery } = recipe.fields;
  console.log(recipe.fields)
  console.log(recipe.fields.thumbnail.fields.file.url)
   const {thumbnail} = recipe.fields.thumbnail.fields.file.url
   console.log(recipe.fields.gallery)

   const img = [
    {
      original: `https:${recipe.fields.gallery}`,
      thumbnail: `https:${recipe.fields.thumbnail.fields.file.url}`
    }
   ]

   console.log(img)

  return (
    <div className="container">
      <ImageGallery items={images}/>
      <h1 className="title-main">{title}</h1>
      <div className="vacation-panels-grid">
        {gallery.map((image,index) => {
          return (
            <div key={index}>
              <Image
                src={`https:${image.fields.file.url}`}
                width={200}
                height={150}
              />
            </div>
          );
        })}
        {/* <div className="description">
        <div>{documentToReactComponents(description)}</div>
      </div> */}
      </div>
    </div>
  );
}
