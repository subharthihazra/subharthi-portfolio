require("dotenv").config();
const { createClient } = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

async function getPosts() {
  const data = await client.fetch('*[_type == "skills"]');
  return data
    .map((item) =>
      (({ name, level, color, imgUrl, priority }) => ({
        name,
        level,
        color,
        priority,
        imgUrl: imgUrl ? urlFor(imgUrl).width(200).url() : "",
      }))(item)
    )
    .sort((a, b) => {
      return (b.priority ? b.priority : 0) - (a.priority ? a.priority : 0); // sorting priority wise
    });
  //   return data.map((item) => ({ name: item.name, level: item.level }));
}

module.exports = { getPosts };
