import React, { useState, useEffect } from "react";

const getVideoUrls = async (options) => {
  const response = await fetch(
    `/api/getTwitterHtml/${options.userName}/${options.tweetId}`
  );
  const videoUrls = await response.json();
  return videoUrls;
};

export const UrlLoader = () => {
  const [url, setUrl] = useState("");
  const [videoUrls, setVideoUrls] = useState();

  const [userName, tweetId] = React.useMemo(() => {
    const urlPieces = url.split("/");
    const userName = urlPieces[3];
    const tweetId = urlPieces[5];
    return [userName, tweetId];
  }, [url]);

  // Handle input change
  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    getVideoUrls({ userName, tweetId }).then(setVideoUrls);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ marginBottom: 24 }}>
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Paste URL here"
            style={{ width: "300px", marginRight: "10px" }}
          />
          <button type="submit">Load URL</button>
        </div>

        <div style={{ padding: 12 }}>
          When the video loads, click the three dots at the bottom of it and
          then click download.
        </div>

        {videoUrls && (
          <video controls style={{ maxWidth: 480 }}>
            <source src={videoUrls.HD} type="video/mp4" />
          </video>
        )}
      </form>
    </div>
  );
};
