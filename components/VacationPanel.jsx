import React from "react";
import Link from "next/link";
import Image from "next/image";

export const VacationPanel = ({ recipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe.fields;
  return (
    <div className="vacation-panel">
      <Image
        src={`https:${thumbnail.fields.file.url}`}
        width={thumbnail.fields.file.details.image.width}
        height={thumbnail.fields.file.details.image.height}
        className="vacation-panel__image"
      />
      <h3 className="vacation-panel__title"> {title}</h3>
      <p className="vacation-panel__description">{cookingTime}</p>
      <Link href={`/recipes/${slug}`}>
        <a className="btn btn-primary vacation-panel__button">Gallery</a>
      </Link>
    </div>
  );
};
