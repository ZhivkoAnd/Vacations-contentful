import React from "react";
import Link from "next/link";
import Image from "next/image";

export const VacationPanel = ({ recipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe.fields;
  return (
    <div className="card">
      <div className="featured">
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          className="card-img-top"
        />
      </div>
      <div className="card-body">
        <div className="info">
          <h4 className="card-title"> {title}</h4>
          <p className="card-text">
            Takes approx: {cookingTime} minutes to make
          </p>
        </div>
        <div className="actions">
          <Link href={`/recipes/${slug}`}>
            <a className="btn btn-primary">Cook this</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
