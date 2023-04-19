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
  const [shows, setShows] = useState([]);

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

    console.log(shows);
    return () => controller.abort();
  }, []);

  return (
    <div>
      <div>{shows.name || "Not Found"}</div>

      {console.log(shows)}
      <img src={shows.image.medium} alt="show images" />
    </div>
  );
}
