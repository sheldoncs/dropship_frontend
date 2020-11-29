import { gql } from "apollo-boost";
import { userFields } from "../fragments/user";

// export const createUser = gql`
//   mutation($data: User) {
//     addUserInfo(data: $data) {
//       ...userFields
//     }
//   }
//   ${userFields}
// `;

export const createUser = `
  mutation AddUserInfo(
    $username: String!,
    $email: String!,
    $password: String!,
    $firstname: String!,
    $lastname: String!,
    $addr1: String!,
    $addr2: String!,
    $zip: String!,
    $country: String!,
    $isGoogle: Int!
  ) {
    addUserInfo(
      userName: $username,
      email: $email,
      pasword: $password,
      firstname: $firstname,
      lastname: $lastname,
      addr1: $addr1,
      addr2: $addr2,
      zip: $zip,
      country: $country,
      isGoogle: $isGoogle
    ) {
      User {
        id,
        username,
        email,
        password,
        firstname,
        lastname,
        addr1,
        addr2,
        zip,
        country,
        isGoogle
      }
    }
  }
`;
