import { useEffect, useState } from "react";

export default function Show(props) {
  return (
    <div className="show">
      <div className="display-show">
        <GetShows params={props.match.params} />
      </div>
    </div>
  );
}

function GetShows({ params }) {
  const [show, setShows] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`https://api.tvmaze.com/shows/${params.id}`, {
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
      {show.image?.medium ? (
        <img
          className="show-photo"
          src={show.image.original}
          height={700}
          width={500}
          alt="show images"
        />
      ) : (
        "No Image"
      )}
      <div className="name">
        <h1>{show.name || "Not Found"}</h1>
      </div>
      <div className="fetch-container">
        <div className="one">Shows Status: {show.status || "Not Found"}</div>
        <div className="two">Language: {show.language || "Not Found"}</div>
        <div className="three">
          Shows Ave Rating: {show.rating?.average || "Not Found"}
        </div>
        <div className="four">Network: {show.network?.name || "Not Found"}</div>
        <div className="five">
          Shows Site: {show.officialSite || "Not Found"}
        </div>
        <div className="six">
          <h4>Summary:</h4>
          <div
            dangerouslySetInnerHTML={{ __html: show.summary || "Not Found" }}
          />
        </div>
      </div>
    </div>
  );
}
