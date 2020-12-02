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
