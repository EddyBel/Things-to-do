import React, { useEffect, useState } from "react";
import { getAbout } from "../services/ApiTasks";

export function About() {
  const [textAbout, setTextAbout] = useState(null);

  useEffect(() => {
    setTextAbout(null);
    getAbout().then((response) => setTextAbout(response.content));
  }, []);

  useEffect(() => {
    console.log(textAbout);
  }, [textAbout]);

  return (
    <div className="p-5">
      {!textAbout ? (
        <h1>Loading ....</h1>
      ) : (
        <>
          <h1 className="text-center mb-5">{textAbout.title}</h1>
          <div className="container-lg">
            {textAbout.body.map((text) => (
              <p key={`paragraph-${Math.random()}`}>{text}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
