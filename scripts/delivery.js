var getDriveDistance = function (destination, driveDistanceCallback) {
  var origin = "2589 Calcite Circle, Newbury Park, CA 91320";
  var metersPerMile = 1609.34;

  function callback(response, status) {
    // console.log(response);
    // console.log(status);
    // console.log(response.rows[0].elements[0].distance.value);

    if (
      response.rows &&
      response.rows[0] &&
      response.rows[0].elements &&
      response.rows[0].elements[0] &&
      response.rows[0].elements[0].status === "OK" &&
      response.rows[0].elements[0].distance.value > 0
    ) {
      var meterDistance = response.rows[0].elements[0].distance.value;
      var milesDistance = meterDistance / metersPerMile;

      driveDistanceCallback("OK", milesDistance);
      return;
    }

    console.error(response);
    driveDistanceCallback("FAILED", "Something went wrong.");
  }

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    },
    callback
  );
};

function distanceCallback(status, milesDistance) {
  if (status === "OK") {
    document.getElementById("distance").innerHTML =
      "<div>Miles: " + milesDistance + "</div>";
  } else {
    document.getElementById("distance").innerHTML =
      "<div>Error: " + milesDistance + "</div>";
  }
}

var destination = "2508 hood dr, thousand oaks, ca";
getDriveDistance(destination, distanceCallback);

// export { getDriveDistance };
