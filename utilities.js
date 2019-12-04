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

export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatSingleUnit(x) {
  return x > 10 ? x : "0" + x;
}

export function capitalizeFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}

const mapData = require("./assets/maps/map.json");

export function getAllCorners() {
  var corners = [];

  mapData.forEach(aisle => {
    aisle.shelves.forEach(shelf => {
      corners.push({ aisle: aisle.aisle, shelf: shelf.start }, {aisle: aisle.aisle, shelf: shelf.end});
    });
  });

  return corners;
}

export async function getMarkerPosition(aisleNo, shelfNo) {
  const aisle = mapData.find(e => {
    return aisleNo == e.aisle;
  });

  var position;
  aisle.shelves.forEach(shelf => {
    if (shelfNo >= shelf.start && shelfNo <= shelf.end) {
      const x =
        shelf.startX +
        (shelfNo - shelf.start + 1) *
          ((shelf.endX - shelf.startX) / (shelf.end - shelf.start));
      position = { x: x, y: aisle.y };
      console.log("returning ", position);
    }
  });
  //position.inGray = (aisle.aisle != 0 && (aisle.aisle % 4 == 0 || (aisle.aisle - 1) % 4 == 0));

  return position;
}
