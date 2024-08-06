import downloader from "nayan-media-downloader"; // v2.4.5 working

export const getTweetVideoUrls = async (options) => {
  const output = await downloader.twitterdown(
    `https://x.com/${options.userName}/status/${options.tweetId}`
  );
  return output.data;
};
