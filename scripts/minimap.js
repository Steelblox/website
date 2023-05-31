const ACCESS_TOKEN =
  "pk.eyJ1IjoibWFrYWloYXJyaXMiLCJhIjoiY2xhaXd4NTBlMDZpeDNvc3U2ajNrbndpZyJ9.EkbAtw5NVc6ykNy0eKS4ng";

function expandForm() {
  $("#manual-entry").addClass("display-hidden");
  $(".secondary-inputs").removeClass("display-hidden");
  $("#Project-Address-Full").css("display", "none");
  $("#Project-Address").css("display", "block");
}

// function collapseForm(){
//   $("#manual-entry").removeClass("display-hidden");
//   $(".secondary-inputs").addClass("display-hidden");
// }
// collapseForm();

$("#manual-entry").click(function () {
  expandForm();
});

const script = document.getElementById("search-js");
script.onload = () => {
  // Add search box to input
  const collection = mapboxsearch.autofill({ accessToken: ACCESS_TOKEN });
  collection.theme = {
    variables: {
      unit: ".75rem",
      unitHeader: "1rem",
      padding: "1rem",
      fontFamily: "inherit",
      fontWeightBold: "500",
      fontWeightSemibold: "400",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "4px",
      colorText: "#e1e3df",
      colorPrimary: "#eac493",
      colorSecondary: "#404040",
      colorBackground: "#252525",
      colorBackgroundHover: "rgba(255, 255, 255, 0.08)"
    }
  };

  // Configure minimap
  const minimap = document.querySelector("mapbox-address-minimap");
  minimap.accessToken = ACCESS_TOKEN;
  minimap.defaultMapStyle = ["mapbox", "dark-v11"];
  minimap.theme = {
    variables: {
      borderRadius: "4px",
      fontFamily: "inherit",
      colorPrimary: "#e4a758"
    },
    icons: {
      marker: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="18px" height="18px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M224 115.5V208a16.1 16.1 0 0 1-8.4 14.1a15.3 15.3 0 0 1-7.6 1.9h-48a8 8 0 0 1-8-8v-48a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v48a8 8 0 0 1-8 8H48a15.9 15.9 0 0 1-12-5.4a16.9 16.9 0 0 1-4-11v-92.1a16 16 0 0 1 5.2-11.8l80-72.7a16 16 0 0 1 21.6 0l80 72.7a16 16 0 0 1 5.2 11.8Z"></path></svg>`
    }
  };

  minimap.onSaveMarkerLocation = (coordinate) => {
    console.log(coordinate);
  };
  minimap.feature = {
    type: "Feature",
    geometry: { type: "Point", coordinates: [-73.981872, 40.768037] },
    properties: {}
  };

  // Set minimap feature on search box selection
  collection.addEventListener("retrieve", async (e) => {
    // expandForm();

    if (minimap) {
      minimap.feature = e.detail.features[0];
      console.log(e.detail.features[0]);
      let fullProjectAddress = `${e.detail.features[0].properties.address_line1}, ${e.detail.features[0].properties.address_level2}, ${e.detail.features[0].properties.region} ${e.detail.features[0].properties.postcode}`;
      $("#Project-Address-Full").val(fullProjectAddress);
      if (!$("#manual-entry").hasClass("display-hidden"))
        setTimeout(() => {
          $("#Project-Address-Full").css("display", "block");
          $("#Project-Address").css("display", "none");
        }, 100);
    }
  });
};
