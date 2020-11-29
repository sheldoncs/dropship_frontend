import { gql } from "apollo-boost";

export const userFields = gql`
  fragment userFields on User {
    id
    username
    password
    firstname
    lastname
    addr1
    addr2
    zip
    country
    isGoogle
  }
`;
