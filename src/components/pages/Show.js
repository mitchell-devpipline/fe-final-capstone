import { useEffect, useState } from "react";

export default function Show({ params }) {
  console.log(params);
  return (
    <div className="show">
      <h1>Welcome to Show</h1>
      <div className="display-show">
        <GetGallery params={params} />
      </div>
    </div>
  );
}

function GetGallery({ params }) {
  const [show, setShows] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`https://api.tvmaze.com/shows/1`, {
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
      })
      .catch((err) => {
        console.error("Get Shows Error: ", err);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="show-display">
      <div>{show.name || "Not Found"}</div>
      {/* {console.log(show)} */}
      <img src={show.image.medium} alt="show images" />
      <div>Shows Status: {show.status || "Not Found"}</div>
      <div>Language: {show.language || "Not Found"}</div>
      <div>Shows Ave Rating: {show.rating["average"] || "Not Found"}</div>
      <div>Network: {show.network["name"] || "Not Found"}</div>
      <div>Shows Site: {show.officialSite || "Not Found"}</div>
      <div>
        <h4>Summary:</h4> {show.summary || "Not Found"}
      </div>
    </div>
  );
}
