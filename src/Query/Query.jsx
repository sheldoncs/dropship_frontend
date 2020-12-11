export const categoryQuery = `query  {
    getAllCategories {
      id
      category
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
