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

async function getSkills() {
  try {
    const data = await client.fetch('*[_type == "skills"]');
    return data
      .map((bundle) => ({
        group_name: bundle.group_name,
        group_prio: bundle.group_prio,
        group_elms: bundle.group_elms
          .map((item) =>
            (({
              name = "",
              level,
              color = "",
              imgUrl = "",
              priority,
              meta = [],
            }) => ({
              name,
              level,
              color,
              priority,
              imgUrl: imgUrl ? urlFor(imgUrl).width(200).url() : "",
              meta,
            }))(item)
          )
          .sort((a, b) => {
            return (
              (b.priority ? b.priority : 0) - (a.priority ? a.priority : 0)
            ); // sorting priority wise
            //   return data.map((item) => ({ name: item.name, level: item.level }));
          }),
      }))
      .sort((a, b) => {
        return (
          (b.group_prio ? b.group_prio : 0) - (a.group_prio ? a.group_prio : 0)
        ); // sorting group priority wise
      });
  } catch (err) {
    return {};
  }
}

async function getProjects() {
  try {
    const data = await client.fetch('*[_type == "projects"]');
    return data
      .map((item) =>
        (({
          name = "",
          description = "",
          livelink = "",
          githublink = "",
          videolink = "",
          bloglink = "",
          tag = "",
          techstacks = [],
          color = "",
          imgUrl = "",
          priority,
          meta = [],
        }) => ({
          name,
          description,
          livelink,
          githublink,
          videolink,
          bloglink,
          tag,
          techstacks,
          color,
          priority,
          imgUrl: imgUrl ? urlFor(imgUrl).width(500).url() : "",
          meta,
        }))(item)
      )
      .sort((a, b) => {
        return (b.priority ? b.priority : 0) - (a.priority ? a.priority : 0); // sorting priority wise
        //   return data.map((item) => ({ name: item.name, level: item.level }));
      });
  } catch (err) {
    return {};
  }
}

async function getDatas() {
  let data2send = {};
  data2send.skills = await getSkills();
  data2send.projects = await getProjects();
  return data2send;
}

module.exports = { getDatas };
