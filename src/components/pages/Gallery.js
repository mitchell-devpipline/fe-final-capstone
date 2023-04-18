import { useEffect, useState } from "react";

export default function Gallery() {
  return (
    <div className="gallery-container">
      <h1>Shows</h1>
      <div className="gallery">
        <GetGallery />
      </div>
    </div>
  );
}

function GetGallery() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch("https://api.tvmaze.com/shows", {
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

  return shows.map((show) => {
    return (
      <div key={show.id} className="shows-wrapper">
        <div>{show.name || "Not Found"}</div>{" "}
        <div>Rating Out of 10: {show.rating["average"] || "Not Found"}</div>
        <a href="/show">
          <img src={show.image.medium || "Image Not found"} alt="show images" />
        </a>
      </div>
    );
  });
}
