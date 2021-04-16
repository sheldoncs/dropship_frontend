import { createApolloFetch } from "apollo-fetch";
const fetch = createApolloFetch({
  uri: "http://localhost:5000/graphql",
  // uri: "https://heroku-seller-app.herokuapp.com/graphql",
  mode: "cors", // no-cors, *cors, same-origin
});

export default fetch;
