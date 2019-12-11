import {sortByDistance} from "./ShortestPathUtils"

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

const {mapData} = require("./assets/maps/map");

export function getAllCorners() {
  var corners = [];

  mapData.forEach(aisle => {
    aisle.shelves.forEach(shelf => {
      corners.push({ aisle: aisle.aisle, shelf: shelf.start }, {aisle: aisle.aisle, shelf: shelf.end});
    });
  });

  return corners;
}

export function getMarkerPosition(aisleNo, shelfNo) {
  console.log("map data: ", mapData);

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
    }
  });
  //position.inGray = (aisle.aisle != 0 && (aisle.aisle % 4 == 0 || (aisle.aisle - 1) % 4 == 0));

  return position;
}


export function sortPackagesBySize(packages) {
  //package like :  [{"amount": 1, "id": "002.638.50", "isPicked": false, width: 29, length: 206, height: 13, weight: 36500}]
  if (packages.length < 2) {
    return packages;
  }
  let sortedPackages = deepCopy(packages); //Deep copy of packages
  sortedPackages.sort(sortBySurfaceArea);
  return sortedPackages;
}

export function sortPackagesByWeight(packages){
	if(packages.length < 2) return packages;
	
	var sortedPackages = deepCopy(packages); 
	sortedPackages.sort(sortByWeight);
	return sortedPackages
}

export function sortPackagesByDistance(packages){
  return sortByDistance(packages)
}

function deepCopy(array){
  return JSON.parse(JSON.stringify(array));
}

function surfaceArea(package1) {
  //ignore height, since it doesn't really matter if packages are stacked? 
  return package1.width * package1.length
}

/**
 * Sorting utils
 */
 
 function sortBySurfaceArea(package1, package2){ 
  return surfaceArea(package2)- surfaceArea(package1);
 }
 
 function sortByWeight(package1, package2){
	 return package2.weight - package1.weight;
 }