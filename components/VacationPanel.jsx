import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export const VacationPanel = ({ vacation }) => {
  const { title, slug, thumbnail, date } = vacation.fields;

  const [newDate, setNewDate] = useState();

  useEffect(() => {
    setNewDate(new Date(date).toLocaleDateString());
  }, []);

  return (
    <div className="vacation-panel">
      <Image
        src={`https:${thumbnail.fields.file.url}`}
        width={thumbnail.fields.file.details.image.width}
        height={thumbnail.fields.file.details.image.height}
        className="vacation-panel__image"
      />
      <h2 className="vacation-panel__title"> {title}</h2>
      <h3 className="vacation-panel__date"> {newDate}</h3>
      <Link href={`/recipes/${slug}`}>
        <a className="btn btn-primary vacation-panel__button">Gallery</a>
      </Link>
    </div>
  );
};
