const {
  PORT = 3000,
  SOURCE_API = "https://cat-fact.herokuapp.com"
} = process.env

export default {
  service: {
    port: PORT,
  },
  source: {
    url: SOURCE_API,
  },
};
