import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Gallery() {
  return (
    <div className="gallery">
      <GetGallery />
    </div>
  );
}

function GetGallery() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setFilteredShows(
      shows?.filter((show) => {
        return show.name.toLowerCase().includes(filter.toLocaleLowerCase());
        // ||
        // show.id.includes(filter)
      })
    );
  }, [shows, filter]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch("https://api.tvmaze.com/shows", {
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
        setFilteredShows(data);
      })
      .catch((err) => {
        console.error("Get Shows Error: ", err);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="gallery-wrapper">
      <div className="filter">
        <input
          className="search-bar"
          placeholder="Filter results"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="all-shows-wrapper">
        {filteredShows.map((show) => {
          return (
            <div key={show.id} className="shows-wrapper">
              <div>{show.name || "Not Found"}</div>
              <div>
                Rating Out of 10: {show.rating["average"] || "Not Found"}
              </div>
              <Link to={`/show/${show.id}`}>
                <img
                  src={show.image.medium || "Image Not found"}
                  alt="show images"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
