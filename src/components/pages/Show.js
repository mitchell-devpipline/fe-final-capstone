import { useEffect, useState } from "react";

export default function Show() {
  return (
    <div className="show">
      <h1>Welcome to Show</h1>
      <div className="display-show">
        <GetShow />
      </div>
    </div>
  );
}

function GetShow() {
  const [show, setShow] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch("https://api.tvmaze.com/shows/1", {
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
      })
      .catch((err) => {
        console.error("Get Show Error: ", err);
      });

    return () => controller.abort();
  }, []);

  return show.map((show) => {
    return (
      <div key={show.id} className="show-wrapper">
        <a href="/show">
          <img src={show.image.medium || "Image Not found"} alt="show images" />
        </a>
        <div>{show.name || "Not Found"}</div>{" "}
        <div>Rating Out of 10: {show.rating["average"] || "Not Found"}</div>
      </div>
    );
  });
}
