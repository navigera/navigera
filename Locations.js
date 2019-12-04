const locations = [
  {
    name: "Stockholm Kungens Kurva",
    no: "012",
    lat: 59.271155,
    long: 17.916201
  },
  {
    name: "Göteborg Kållered",
    no: "014",
    lat: 57.60379,
    long: 12.048397
  },
  {
    name: "Linköping",
    no: "017",
    lat: 58.433189,
    long: 15.58755
  },
  {
    name: "Stockholm Barkarby",
    no: "019",
    lat: 59.420331,
    long: 17.857064
  },
  {
    name: "Västerås",
    no: "020",
    lat: 59.607596,
    long: 16.456017
  },
  {
    name: "Uddevalla",
    no: "053",
    lat: 58.355878,
    long: 11.818371
  },
  {
    name: "Uppsala",
    no: "070",
    lat: 59.847755,
    long: 17.692156
  },
  {
    name: "Örebro",
    no: "106",
    lat: 59.211089,
    long: 15.134397
  },
  {
    name: "Jönköping",
    no: "109",
    lat: 57.77267,
    long: 14.205751
  },
  {
    name: "Gävle",
    no: "122",
    lat: 60.633906,
    long: 16.989895
  },
  {
    name: "Borlänge",
    no: "248",
    lat: 60.482664,
    long: 15.421457
  },
  {
    name: "Älmhult",
    no: "268",
    lat: 56.550534,
    long: 14.161674
  },
  {
    name: "Göteborg Bäckebol",
    no: "398",
    lat: 57.771771,
    long: 11.999672
  },
  {
    name: "Umeå",
    no: "416",
    lat: 63.80771,
    long: 20.25501
  },
  {
    name: "Malmö",
    no: "445",
    lat: 55.552634,
    long: 12.986215
  },
  {
    name: "Sundsvall",
    no: "467",
    lat: 62.444195,
    long: 17.334119
  },
  {
    name: "Helsingborg",
    no: "468",
    lat: 56.092426,
    long: 12.760899
  },
  {
    name: "Kalmar",
    no: "469",
    lat: 56.68556,
    long: 16.321199
  },
  {
    name: "HaparandaTornio",
    no: "470",
    lat: 65.842982,
    long: 24.13192
  },
  {
    name: "Karlstad",
    no: "471",
    lat: 59.378797,
    long: 13.41966
  }
];

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

  locations.map(location => {
    var dif = PythagorasEquirectangular(
      latitude,
      longitude,
      location.lat,
      location.long
    );
    if (dif < minDif) {
      closest = index;
      minDif = dif;
    }
    index++;
  });

  console.log("Closest warehouse: ", locations[closest]);
  return locations[closest].name;
}
