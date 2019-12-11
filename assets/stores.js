export const Stores = 
[
    {
        id: 1,
        name: "Stockholm Kungens Kurva",
        no: "012",
        address: "Modulvägen 1, 141 08 Kungens Kurva",
        latitude: 59.271155,
        longitude: 17.916201,
        isActive: false,
    },
    {
        id: 2,
        name: "Göteborg Kållered",
        no: "014",
        address: "Ekenleden 2, 428 36 Kållered",
        latitude: 57.60379,
        longitude: 12.048397,
        isActive: false,
    },
    {
        id: 3,
        name: "Linköping",
        no: "017",
        address: "Västra Svedengatan 7, 581 28 Linköping",
        latitude: 58.433189,
        longitude: 15.58755,
        isActive: false,
    },
    {
        id: 4,
        name: "Stockholm Barkarby",
        no: "019",
        address: "Folkungavägen 50, 177 35 Järfälla",
        latitude: 59.420331,
        longitude: 17.857064,
        isActive: false,
    },
    {
        id: 5,
        name: "Västerås",
        no: "020",
        address: "Domkraftsgatan 2, 721 38 Västerås",
        latitude: 59.607596,
        longitude: 16.456017,
        isActive: false,
    },
    {
        id: 6,
        name: "Uddevalla",
        no: "053",
        address: "Östra Torpsvägen 30, 451 76 Uddevalla",
        latitude: 58.355878,
        longitude: 11.818371,
        isActive: false,
    },
    {
        id: 7,
        name: "Uppsala",
        no: "070",
        address: "Rapsgatan 3, 753 23 Uppsala",
        latitude: 59.847755,
        longitude: 17.692156,
        isActive: false,
    },
    {
        id: 8,
        name: "Örebro",
        no: "106",
        address: "Kundvägen 2, 702 31 Örebro",
        latitude: 59.211089,
        longitude: 15.134397,
        isActive: false,
    },
    {
        id: 9,
        name: "Jönköping",
        no: "109",
        address: "A6 Center, Kompanigatan 6, 553 05 Jönköping",
        latitude: 57.77267,
        longitude: 14.205751,
        isActive: false,
    },
    {
        id: 10,
        name: "Gävle",
        no: "122",
        address: "Valbovägen 307, 818 32 Valbo",
        latitude: 60.633906,
        longitude: 16.989895, 
        isActive: false,
    },
    {
        id: 11,
        name: "Borlänge",
        no: "248",
        address: "norra Backagatan 1, 781 70 Borlänge",
        latitude: 60.482664,
        longitude: 15.421457,
        isActive: false,
    },
    {
        id: 12,
        name: "Älmhult",
        no: "268",
        address: "Handelsvägen 4, 343 33 Älmhult",
        latitude: 56.550534,
        longitude: 14.161674,
        isActive: false,
    },
    {
        id: 13,
        name: "Göteborg Bäckebol",
        no: "398",
        address: "Transportgatan 23, 422 46 Hisings Backa",
        latitude: 57.771771,
        longitude: 11.999672,
        isActive: false,
    },
    {
        id: 14,
        name: "Umeå",
        no: "416",
        address: "Marknadsgatan 1, 904 22 Umeå",
        latitude: 63.80771,
        longitude: 20.25501,
        isActive: false,
    },
    {
        id: 15,
        name: "Malmö",
        no: "445",
        address: "Kulthusgatan 1, 215 86 Malmö",
        latitude: 55.552634,
        longitude: 12.986215,
        isActive: false,
    },
    {
        id: 16,
        name: "Sundsvall",
        no: "467",
        address: "Gesällvägen 3, 857 53 Sundsvall",
        latitude: 62.444195,
        longitude: 17.334119,
        isActive: false,
    },
    {
        id: 17,
        name: "Helsingborg",
        no: "468",
        address: "Marknadsvägen, Väla Centrum 7, 260 36 Ödåkra",
        latitude: 56.092426,
        longitude: 12.760899,
        isActive: false,
    },
    {
        id: 18,
        name: "Kalmar",
        no: "469",
        address: "Bilbyggarvägen 6, 395 56 Kalmar",
        latitude: 56.68556,
        longitude: 16.321199,
        isActive: false,
    },
    {
        id: 19,
        name: "HaparandaTornio",
        no: "470",
        address: "norrmalmsvägen 2, 953 36 Haparanda",
        latitude: 65.842982,
        longitude: 24.13192,
        isActive: false,
    },
    {
        id: 20,
        name: "Karlstad",
        no: "471",
        address: "Bergviksvägen 43, 653 46 Karlstad",
        latitude: 59.378797,
        longitude: 13.41966,
        isActive: false,
    },

];

function GetStores(){
    return Stores;
}
  
  function Deg2Rad(deg) {
    return (deg * Math.PI) / 180;
  }
  
  function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = lat2 - lat1;
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
  }
  
  export function NearestCity(latitude, longitude) {
    var minDif = 99999;
    var closest;
    var index = 0;
    
    console.log('stores: ' + Stores);
  
    Stores.map(location => {
      var dif = PythagorasEquirectangular(
        latitude,
        longitude,
        location.latitude,
        location.longitude
      );
      if (dif < minDif) {
        closest = index;
        minDif = dif;
      }
      index++;
    });
  
    console.log("Closest warehouse: ", Stores[closest]);
    return Stores[closest];
  }
  