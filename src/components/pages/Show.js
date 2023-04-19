import { useEffect, useState } from "react";

export default function Show(props) {
  console.log(props);
  return (
    <div className="show">
      <h1>Welcome to Show</h1>
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
      <div>{show.name || "Not Found"}</div>
      {/* {console.log(show)} */}
      {show.image?.medium ? (
        <img src={show.image.original} alt="show images" />
      ) : (
        "No Image"
      )}
      <div>Shows Status: {show.status || "Not Found"}</div>
      <div>Language: {show.language || "Not Found"}</div>
      <div>Shows Ave Rating: {show.rating?.average || "Not Found"}</div>
      <div>Network: {show.network?.name || "Not Found"}</div>
      <div>Shows Site: {show.officialSite || "Not Found"}</div>
      <div>
        <h4>Summary:</h4>{" "}
        <div
          dangerouslySetInnerHTML={{ __html: show.summary || "Not Found" }}
        />
      </div>
    </div>
  );
}
