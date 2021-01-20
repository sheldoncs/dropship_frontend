export const categoryQuery = `query  {
    getAllCategories {
      id
      category
    }
  }`;

export const lastIdentityQuery = `query  {
    getMaxIdentity {
      
      maxidentityid
    }
  }`;
export const offers = `query  {
    getAllOffers {
      id
      offer
      itemdetailsid
      offertype
      amount
      condition
      width
      code
      categoryid
    }
  }`;
export const offer = `query ($id:Int)  {
    getOffer(id:$id) {
      id
      offer
      itemdetailsid
      offertype
      amount
      condition
      width
      code
      categoryid
    }
  }`;
export const photosByCategory = `query ($categoryid:Int)  {
    getPhotosByCategory(categoryid:$categoryid) {
      itemid
      option
      photo
      categoryid
      mainphoto
    }
  }`;
export const itemAndCategory = `query ($itemid:Int){
  getItemAndCategory(itemid:$itemid){
    option
    category
  }
}`;

export const options = `query ($categoryid:Int) {
  getOptions(categoryid:$categoryid) {
   id
   title
   option1
   option2
   option3
   option4
  }
}`;

export const pricesByCategory = `query ($categoryid:Int) {
  getPriceOptions(categoryid:$categoryid) {
  id
  hairlength
  categoryid
  price
  }
}`;
export const activeChatters = `query ($active:Int) {
  getActiveChatters(active:$active) {
    id
    name
    email
    isadmin
    active
    socketid
  }
}`;
export const getAllItems = `query  {
  getAllItems {
  id
  option
  photo
  itemid
}
}`;
export const getAllCountries = `query  {
  getAllCountries {
   id
   country_code
   country_name
  }
}`;
export const getNonDiscountOffers = `query  {
  getNonDiscountOffers {
    id
    offer
    itemdetailsid
    offertype
    condition
    amount
    width
    code
    categoryid    
  }
}`;
export const deactivatChatter = `mutation ($socketid:String) {
  deactivateActiveChatter(socketid:$socketid) {
    Socket {
      socketid
    }
  }
}`;
export const addLastIdentity = `mutation addLastIdentity($lastidentityid:Int) {
  addLastIdentity(
    lastidentityid: $lastidentityid
    ) {
    LastIdentity {
      lastidentityid
         }
      }
  }`;
