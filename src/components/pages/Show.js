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
      <div className="photo2">
        <div className="name">
          <h1>{show.name || "Not Found"}</h1>
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
        </div>
      </div>

      <div className="fetch-container">
        <div className="six">
          <h4>Summary:</h4>
          <div
            dangerouslySetInnerHTML={{ __html: show.summary || "Not Found" }}
          />
          <div className="show-info">
            Language: {show.language || "Not Found"}
          </div>
          <div className="show-info">Genres: {show.genres || "Not Found"}</div>
          <div className="show-info">
            Shows Status: {show.status || "Not Found"}
          </div>
          <div className="show-info">
            Premiere Date: {show.premiered || "Not Found"}
          </div>
          <div className="show-info">End Date: {show.ended || "Not Found"}</div>
          <div className="show-info">
            Shows Ave Rating: {show.rating?.average || "Not Found"}
          </div>
          <div className="show-info">
            Network: {show.network?.name || "Not Found"}
          </div>
          <div className="show-info">
            Network Country: {show.network?.country.code || "Not Found"}
          </div>
          <div className="show-info">
            Shows Site: {show.officialSite || "Not Found"}
          </div>
        </div>
      </div>
    </div>
  );
}
