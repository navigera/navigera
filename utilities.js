export async function GetProduct(id) {
  if (id.length == 10) {
    let response = await (
      await fetch(
        "https://europe-west2-ikea-mau-eu.cloudfunctions.net/api/getProduct/" +
          id
      )
    ).json();

    if (response) {
      let product = response.product;
      if (!product.error) {
        return product;
      }
    }
  }
}

export async function GetSearchResult(query) {
  if (!query || query.length < 1) {
    return null;
  }
  console.log("Searching for ", query);
  let response = await (
    await fetch(
      "https://europe-west2-ikea-mau-eu.cloudfunctions.net/api/search/" + query
    )
  ).json();
  console.log("Search complete, found " + response.length + " results");

  if (response.length) {
    console.log(`Search successful, found ${response.length} matches.`);
    return response;
  }
}

export const globalStyles = {
  bold: {
    fontFamily: "NotoIKEAArabic-Bold" // light gray
  },
  regular: {
    fontFamily: "NotoIKEAArabic-Regular" // light gray
  }
};
