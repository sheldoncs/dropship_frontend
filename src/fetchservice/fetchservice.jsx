import { createApolloFetch } from "apollo-fetch";
const fetch = createApolloFetch({
  uri: "http://localhost:8080/graphql",
});

export default fetch;
