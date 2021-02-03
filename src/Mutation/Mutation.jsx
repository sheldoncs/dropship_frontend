export const creatUser = `
mutation userInfo (
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
$admin:Int!
) {
addUserInfo (
 username: $username,
 email: $email,
 password: $password,
 firstname: $firstname,
 lastname: $lastname,
 addr1: $addr1,
 addr2: $addr2,
 zip: $zip,
 country: $country,
 isGoogle: $isGoogle,
 admin:$admin,
) {
 User{
   username,
   email,
   password,  
   firstname,
   lastname,
   addr1,
   addr2,
   zip,
   country,
   isGoogle,
   admin,
  }
 }
}
`;
export const resetMainPhoto = `mutation resetMainPhoto($categoryid: Int){
  resetMainPhoto(categoryid:$categoryid){
    Category {
      categoryid
    }
  }
}`;

export const updateMainPhoto = `mutation updateMainPhoto($itemid: Int){
updateMainPhoto(itemid:$itemid){
  UpdateItem {
    itemid
  }
}
}`;
