import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import Filter from "../Filter";

// import { Filter } from "../Filter";

export default function Gallery() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSearch(e) {
    setIsSubmitting(e.target.value);
  }

  return (
    <div className="gallery-container">
      <h1>Shows</h1>
      <input
        id="search-bar"
        type="search"
        name="searchbar"
        placeholder="Search"
        onChange={handleSearch}
      />
      <div className="gallery">
        <GetGallery props={isSubmitting} />
      </div>
    </div>
  );
}

function GetGallery(isSubmitting) {
  console.log(isSubmitting);
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
        <Link to={`/show/${show.id}`}>
          <img src={show.image.medium || "Image Not found"} alt="show images" />
        </Link>
      </div>
    );
  });
}
