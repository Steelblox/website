// Global Variable
let configValueBtn = $(".config-value.single-choice._w-product");
let configDropDownBtn = $(".config-dropdown-btn");
let checkBox = $(".config-value.multi-choice");
let singleChoiceBtn = $(".config-value.single-choice.foundations");
let productHeaderNoSpace = $(".config-header")
  .text()
  .replace(/\s/g, "")
  .toLowerCase();
let shift = productHeaderNoSpace.includes("shift");
let adu = productHeaderNoSpace.includes("model");
// PRICE
let wPriceNoDec = $("#pPrice").text().split(".").shift();
let wPriceNoDoll = formatPrices(wPriceNoDec);
let productPrice = wPriceNoDoll;
let displayedPrice;
let servicePrice = 0;
let foundationPrice = 0;
let totalPrice;

// initialize ADU Page
if (adu) {
  if (productHeaderNoSpace !== "model1" || productHeaderNoSpace !== "model2") {
    $("model-type").text("Single Family Home");
  }
  $(".checkout-btns-container").addClass("display-hidden");
}

// set summary prices if no selections are made
// $("#summ-model-price").text($("#pPrice").text());

// format summary pricing in order to add for total
function formatSummaryPrices() {
  let p = $(".summ_price");
  // console.log("array of summ prices " + p);
  let summArr = [];
  for (let i = 0; i < p.length; i++) {
    summArr.push(formatPrices(p.eq(i).text()));
  }
  console.log(summArr);
  const sum = summArr.reduce((a, b) => a + b, 0);
  console.log(sum);

  $("#summ-total").text(
    sum
      .toLocaleString("en-US", { style: "currency", currency: "USD" })
      .slice(0, -3)
  );
  $("#main-config-price").val(sum);
}

// CALCULATE DELIVERY COST
// add minimum of $2,500

let truckloads;
let deliveryPrice;

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
    $("#distance").text(`Miles: ${milesDistance}`);
  } else {
    $("#distance").text(`Miles: ${milesDistance}`);
  }
}

// Update summary page
$("#summ-model").text($(".config-header").text());

// CHANGE BREEZEWAY PRICE IF MEOU 4
if (window.location.href.indexOf("meou-4") > -1) {
  $("#breezeway").text("$30,000");
}

// FORMAT PRICE TO NOT INLCUDED '$' OR COMMAS
function formatPrices(format) {
  format = format.split("$").pop();
  format = format.replace(/,/g, "");
  format = parseInt(format, 10);
  return format;
}

// SET Price EQUAL TO WEBFLOW ECOMMERCE PRICE TO COMPARE AMOUNT
$(document).ready(function () {
  updateImages();
  $("#price").text(wPriceNoDec);
  $("#price2").text(wPriceNoDec);
  // $("#Configured-Price").val(wPriceNoDec);
  let configPrice = $("input[name='Configured-Price']");
  // console.log(configPrice);
  configPrice.each(function () {
    $(this).val(wPriceNoDec);
  });
  $("#amount").val(wPriceNoDoll);
  setTimeout(function () {
    $("#amount").blur();
  }, 1);
});

function formatPriceToText(num) {
  let price =
    "$" +
    num
      .toString()
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (num === totalPrice) {
    displayedPrice = price;
    $("#price").text(displayedPrice);
    $("#price2").text(displayedPrice);
    $("#Configured-Price").val(displayedPrice);
  } else if (num === productPrice) {
    $("#summ-model-price").text(price);
  } else if (num === foundationPrice) {
    $("#summ-foundation-price").text(price);
  }
}

function calculatePrice() {
  totalPrice = productPrice + servicePrice + foundationPrice;
  // console.log("product price: " + productPrice);
  // console.log("service price: " + servicePrice);
  // console.log("foundation price: " + foundationPrice);

  $("#amount").val(totalPrice);
  setTimeout(function () {
    $("#amount").blur();
    formatPriceToText(totalPrice);
  }, 1);
}

function updateProductPrice() {
  setTimeout(function () {
    productPrice = formatPrices($("#pPrice").text().split(".").shift());
    calculatePrice();
  }, 1);
}

function updateServicePrice(el) {
  let selectedServicePrice = el.find(".multi-choice__value").text();
  if (el.hasClass("active")) {
    servicePrice = servicePrice - formatPrices(selectedServicePrice);
  } else {
    servicePrice = servicePrice + formatPrices(selectedServicePrice);
  }
  calculatePrice();
}

function updateFoundationPrice(el) {
  if (shift) {
    foundationPrice = formatPrices(el.find(".multi-choice__value").text());
  } else if (adu) {
    let addOns = $(".config-value.single-choice.foundations.active");
    let sum = 0;
    for (let i = 0; i < addOns.length; i++) {
      sum += formatPrices(addOns.eq(i).find(".multi-choice__value").text());
    }
    foundationPrice = sum;
  }

  calculatePrice();
}

// when an addon is clicked
// store the sum of all active addons prices

$("#summ_back-btn").click(function () {
  $("#summ-services").children().remove();
});

// append configurator selections as line items in summary slide
function appendToSummary() {
  let sumArr = $(".config-value.single-choice.foundations.active");
  // console.log(sumArr);

  sumArr.each(function () {
    let service = $(this).find(".input__label").text();
    let servicePrice = $(this).find(".multi-choice__value").text();

    $("#summ-services").append(
      `<div class='summary_item-wrap' id='${service}'><div>${service}</div><div class="summ_price">${servicePrice}</div></div>`
    );
  });
  formatSummaryPrices();
}

checkBox.click(function () {
  const el = $(this);
  updateServicePrice(el);

  // remove service from summary page if unselecting field
  let serviceNum = el.index() + 1;
  if (el.hasClass("active")) {
    $("#summ-services .summary_item-wrap").eq(serviceNum).remove();
  }

  el.toggleClass("active");

  // SELECT CHECKBOX WITH SAME INDEX
  const i = checkBox.index(this);
  $("#checkbox-hidden").children().eq(i).click();
});

singleChoiceBtn.click(function () {
  const el = $(this);
  updateFoundationPrice(el);

  // HAVE FIELDS GO ACTIVE ON CLICK
  el.siblings().removeClass("active");
  el.addClass("active");
});

function customFieldSelection() {
  const el = $(this);
  el.siblings().removeClass("active");
  el.addClass("active");
}
function configSelection() {
  updateProductPrice();
  const el = $(this);
  el.siblings().removeClass("active");
  el.addClass("active");

  // update images
  updateImages();

  // Update dropdown names to match selection
  const v = el.find("input[type=radio]").val();
  if (shift) {
    if (el.has("input[name=Shift-Version]").length) {
      $("#shift-type").text(v);
    } else if (el.has("input[name=Lifestyle-Package]").length) {
      $("#shift-lifestyle").text(v);
    }
  } else if (adu) {
    if (el.has("input[name=Lifestyle-Package]").length) {
      $("#adu-lifestyle").text(v);
    }
  }

  // update summary page
  // $("#summ-model-price").text($("#pPrice").text().slice(0, -4));

  $("#summ-lifestyle").text(el.find(".input__label").text());

  let modelPrice = formatPrices($("#summ-model-price").text());
  let lifestylePrice = formatPrices($("#pPrice").text()) - modelPrice;

  $("#summ-lifestyle-price").text(formatToCurrency(lifestylePrice));

  // select webflow product variant
  selectWebProduct(el);
}

// display product when new variable is selected
let timeoutID;
function selectWebProduct(el) {
  clearTimeout(timeoutID);
  if (typeof el.attr("slide-out") !== "undefined") {
    $(".product-img__slide-out").addClass("active");
    timeoutID = setTimeout(function () {
      $(".product-img__slide-out").removeClass("active");
    }, 3000);
  }

  //When config selection is made, also select WebFlow product option
  let superParent;
  let parentIndex;
  if (shift) {
    superParent = el.closest(".w-dropdown");
    parentIndex = superParent.index();
  } else {
    superParent = el.closest(".w-dropdown");
    parentIndex = 0;
  }

  let elParent = el;
  let configIndex = elParent.index();
  // console.log(configIndex);

  if (shift) {
    // console.log($(`div[ecom-btn="true"]:nth-child(${parentIndex})`));
    $(`div[ecom-btn="true"]:nth-child(${parentIndex})`)
      .find(
        `div[data-node-type='commerce-add-to-cart-pill']:nth-child(${
          configIndex + 1
        })`
      )
      .click();
  } else if (adu) {
    $(`div[ecom-btn="true"]:nth-child(1)`)
      .find(
        `div[data-node-type='commerce-add-to-cart-pill']:nth-child(${configIndex})`
      )
      .click();
  }
}

// Hover and click styling on form dropdowns
function dropDownSelection() {
  $(".dropdown-arrow").removeClass("active");
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).find($(".dropdown-arrow")).removeClass("active");
  } else {
    configDropDownBtn.removeClass("active");
    $(this).addClass("active");
    $(this).find($(".dropdown-arrow")).addClass("active");
  }
}

// Event listeners

configValueBtn.click(configSelection);
configDropDownBtn.click(dropDownSelection);
$(".mobile_config-nav-menu").click(navMenuAnimate);
$(".config-value.is-form-field").click(customFieldSelection);

// mobile config image nav menu animation
function navMenuAnimate() {
  if ($(this).attr("data-menu-state") === "closed") {
    $(".config_tab-link-list").css({
      transform: "translateY(0)",
      opacity: "100"
    });
    $(".icon-embed-xsmall.is-config.is-toggle").eq(0).css("display", "none");
    $(".icon-embed-xsmall.is-config.is-toggle").eq(1).css("display", "flex");
    $(this).attr("data-menu-state", "open");
  } else {
    $(".config_tab-link-list").css({
      transform: "translateY(-20%)",
      opacity: "0"
    });
    $(".icon-embed-xsmall.is-config.is-toggle").eq(1).css("display", "none");
    $(".icon-embed-xsmall.is-config.is-toggle").eq(0).css("display", "flex");
    $(this).attr("data-menu-state", "closed");
  }
}

// form validation
// shift
const shiftForm = $("#shift-form");
shiftForm.validate({
  errorPlacement: function (error, element) {
    error.appendTo(element.closest(".field-wrap"));
  },
  rules: {
    Phone: {
      required: true,
      phoneUS: true
    }
  }
});

// adu
const aduForm = $("#LeadGen-Form");
aduForm.validate({
  errorPlacement: function (error, element) {
    error.appendTo(element.closest(".field-wrap"));
    element.addClass("error");
  },
  rules: {
    Phone: {
      required: true,
      phoneUS: true
    }
  }
});

// disable form submit with enter key
$(document).keypress(function (event) {
  if (event.which == "13") {
    event.preventDefault();
  }
});

// CONFIGURATOR BUTTON TEXT

const stepText = {
  step1: "Configure Model",
  step2: "Summary"
};

const shiftStepText = {
  step1: "Configure Model",
  step2: "step2"
};

let projectAddress;
let projectCity;
let projectState;
let projectZip;
let fullProjectAddress = "";

// Assign number of truckloads

switch (productHeaderNoSpace) {
  case "shift":
    truckloads = 1;
    break;
  case "shift+":
    truckloads = 2;
    break;
  case "model1":
    truckloads = 2;
    break;
  case "model2":
    truckloads = 2;
    break;
  case "model3":
    truckloads = 4;
    break;
  case "model4":
    truckloads = 5;
    break;
  case "model5":
    truckloads = 3;
    break;
  case "model6":
    truckloads = 7;
    break;
  default:
}

// CALCULATE DELIVERY

function calcDelivery(status, miles) {
  deliveryPrice = miles * (7 * truckloads);
  if (deliveryPrice < 2500) {
    $("#summ-freight-price").text("$2,500");
    $("#estimated-delivery").val(2500);
  } else {
    $("#estimated-delivery").val(deliveryPrice.toFixed(2));
    $("#summ-freight-price").text(
      deliveryPrice
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        })
        .slice(0, -3)
    );
  }
  $("#summ-address").text(fullProjectAddress);
}

// FORM SLIDER NAVIGATION

// let projectApproved;

let thisStep = 1;
let nextStep;
let lastStep;

let slides = $(".config-form-slide.w-slide[data-slide-product='adu']");

// SET SLIDE HEIGHTS SO THERE'S NO SPACE BELOW SLIDES
function initSlides() {
  slides.find(".config_slide-wrap").removeClass("active");
  slides.find(".config_slide-wrap").eq(0).addClass("active");
  $(".config_success-msg-wrap").children().css("display", "none");
}
initSlides();

// FORMS

// disable enter button on forms
$(".input-field").on("keypress", function (e) {
  return e.which !== 13;
});

// reset forms
function resetForm(element) {
  // console.log("back button", element);
  let form = element.closest(".form-block.w-form");
  // console.log("form", form);
  form.find($(".form-wrapper")).css("display", "block");
  form.find($(".config_success-msg-wrap")).children().css("display", "none");
  if (thisStep > 1) {
    // disable summary buttons
    $("#endBtnWrap").removeClass("active");
    $("[form-step]").removeClass("display-hidden");

    // enable configurator buttons
    $("#back-btn").addClass("active");
    $(".config_header-wrap").addClass("active");
  }

  if (form.attr("id") === "Configurator-LeadGen") {
    $(".checkout-btns-container").addClass("display-hidden");
  }
}

// event listener for resetting forms
$("[form-back-btn]").click(function () {
  resetForm($(this));
});

// FORM 1 (CONTACT INFO) SUBMITION EVENT
$("#Configurator-LeadGen").submit(function () {
  // console.log("form 1 submitted");
  // copy email to 2nd form
  $("#copied-email").val($("#Adu-Email").val());

  // if contact's state is california
  if ($("#Project-State").val("CA")) {
    // show approved slide
    $("#form1-approved").css("display", "block");
    $(".product-info__section").scrollTop(0);
  } else {
    // show denied slide
    $("#form1-denied").css("display", "block");
  }
  $(".checkout-btns-container").removeClass("display-hidden");
  updateAddress();
});

// FORM 2 (CONFIGURATOR) SUBMITTION EVENT
$("#Configurator-Selections").submit(function () {
  // console.log("form 2 submitted");
  $("#form2-summ").css("display", "flex");

  // Append configurator selections to summary slide
  appendToSummary();

  // enable buttons
  $("[form-step]").addClass("display-hidden");
  $("#endBtnWrap").addClass("active");

  // disable buttons
  $("#back-btn").removeClass("active");
  $(".config_header-wrap").removeClass("active");
});

function handleStepChange() {
  // back buttton state
  if (adu) {
    if (lastStep > 0 && thisStep < 3) {
      $("#back-btn").addClass("active");
    } else {
      $("#back-btn").removeClass("active");
    }
  }

  // if (thisStep === 2 && $("#Project-State").val() !== "CA") {
  //   projectApproved = false;
  // } else if (thisStep === 2 && $("#Project-State").val() === "CA") {
  //   projectApproved = true;
  // }

  // if (thisStep === 2 && projectApproved) {
  //   thisStep = 3;
  //   nextStep = 4;
  //   // lastStep = 1;
  // }

  // if (thisStep === 3 && projectApproved !== true) {
  //   thisStep = 4;
  //   nextStep = 5;
  // }

  if (thisStep === 2) {
    $(".config_header-wrap").addClass("active");
    // submit form 2
    $("#adu-config-btn-1").click(function () {
      // console.log("clicked");
      $("#configurator-submit-btn").click();
    });
  } else {
    $(".config_header-wrap").removeClass("active");
  }

  // hide slides that aren't in view
  slides.find(".config_slide-wrap").each(function (i) {
    if (i === thisStep - 1) {
      $(this).addClass("active");
      // console.log(i, "step equals slide");
    } else if (i !== thisStep - 1) {
      $(this).removeClass("active");
      // console.log(i, "step does not equal slide");
    }
  });
}

function updateButtonText() {
  let btnText = Object.values(stepText).at(thisStep - 1);
  $("[form-step]").find(".config_btn-text").text(`${btnText}`);
}

$("[back-step]").click(function () {
  $(".product-info__section").scrollTop(0);

  // if project is approved skip over step 2 when going back a step
  if (adu) {
    if (lastStep === 2) {
      lastStep = 1;
    }
  }
  $(`.config-slider-nav.w-slider-nav div:nth-child(${lastStep})`).trigger(
    "tap"
  );

  $("[form-step]").attr("form-step", lastStep);
  thisStep = lastStep;
  nextStep = thisStep + 1;
  lastStep = thisStep - 1;

  handleStepChange();
  updateButtonText();
  // console.log("this step: ", thisStep);
  // console.log("next step: ", nextStep);
  // console.log("last step: ", lastStep);
  // console.log("----------------------");
});

function addressApi() {
  // set PDF btn Link
  let encodeAddress = encodeURIComponent(fullProjectAddress);
  // console.log(encodeAddress);
  let el = $(".pill_list");
  let elI = $("#pdf-report");
  if (elI.length < 1) {
    el.append(
      `<a id="pdf-report" href="http://api.steelblox.com/report-pdf?address=${encodeAddress}" target="_blank" class="pill_item w-inline-block"><div class="pill_icon-wrap is-grey is-download"><div class="icon-embed-xxsmall w-embed"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" class="iconify iconify--ic" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"></path></svg></div></div><div id="standards" class="pill_status-text is-standards">Download Free Feasibility Summary</div></a>`
    );
  }
  // $("#download-report").attr(
  //   "href",
  //   `http://api.steelblox.com/report-pdf?address=${encodeAddress}`
  // );
  // set google map image
  // let mapKey = "AIzaSyDvwya_K9GdP0JFMz0uI2FW59SSofqt5Gk";
  // $(".config_map").append(
  //   `<img src="https://maps.googleapis.com/maps/api/staticmap?size=450x250&zoom=19&maptype=satellite&center=${encodeAddress}&markers=${encodeAddress}&key=${mapKey}">`
  // );

  const apiUrl = `https://api.steelblox.com/data?address=${encodeAddress}`;

  async function getFeasibilityData(url) {
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);
    if (response) {
      // console.log(response);
    }
    updateFeasibilityFields(data);
  }

  function updateFeasibilityFields(data) {
    $("#county").text(data.projectCounty);
    $("#apn").text(data.parcelNumber);
    $("#numAdu").text(data.numDetachedAduAllowed);
    $("#lotArea").text(data.lotArea);
  }

  getFeasibilityData(apiUrl);

  getDriveDistance(fullProjectAddress, calcDelivery);
  $(".summ-freight-price").text(deliveryPrice);
}

function updateAddress() {
  projectAddress = $("#Project-Address").val();
  projectCity = $("#Project-City").val();
  projectState = $("#Project-State").val();
  projectZip = $("#Project-Zip").val();
  fullProjectAddress = [
    projectAddress,
    ", ",
    projectCity,
    ", ",
    projectState,
    " ",
    projectZip
  ].join("");

  // set address text on slide 2
  $("#address").text(fullProjectAddress);
  addressApi();
}

$("[form-step]").click(function () {
  $(".product-info__section").scrollTop(0);
  // Validate form
  if (aduForm.valid() === true) {
    // console.log("form is valid: ", aduForm.valid());
    // Continue to Next Step
    // Determine current and next step as int
    // 2 = maximum number of slides
    if (thisStep < 2) {
      thisStep = parseInt($(this).attr("form-step"), 10) + 1;
      nextStep = 1 + thisStep;
      lastStep = thisStep - 1;
    }
    handleStepChange();
    updateButtonText();
    // console.log("this step: ", thisStep);
    // console.log("next step: ", nextStep);
    // console.log("last step: ", lastStep);
    // console.log("----------------------");
    $(`.config-slider-nav.w-slider-nav div:nth-child(${nextStep - 1})`).trigger(
      "tap"
    );

    // change element attribute step
    $(this).attr("form-step", `${thisStep}`);
    $("#back-btn").attr("form-step", `${lastStep}`);

    // change button text
  }
});

// SUBMIT FORM

$("[form-button='get-quote']").click(function () {
  if (shift) {
    $("#config-btn-submit").click();
  } else if (window.location.href.indexOf("meou") > -1) {
    $("#config-btn-submit2").click();
  } else if (adu) {
    $("#configurator-submit-btn").click();

  setTimeout(function () {
    if ($("[config-form='success']").is(":visible")) {
      $(".product-price__btn-wrap").addClass("display-hidden");
      $("#redirect").click();
    }
  }, 1000);
});

$("#buy-now").click(function (e) {
  e.preventDefault();

  if (window.location.href.indexOf("shift") > -1) {
    $("#config-btn-submit").click();
  } else if (window.location.href.indexOf("meou") > -1) {
    $("#config-btn-submit2").click();
  } else if (window.location.href.indexOf("model") > -1) {
    $("#adu-form-submit").click();
  }

  let href = this.href;

  window.location = href;
});

// Header btn clicks reservebutton

$("#header-btn").click(function () {
  $("#buy-now").click();
});

// header btn quote clicks quote

$("#header-btn-quote").click(function () {
  $("[form-button='get-quote']").click();
});

// ACORN FINANCING API

function formatToCurrency(amount) {
  return amount
    .toLocaleString("en-US", { style: "currency", currency: "USD" })
    .slice(0, -3);
}

function updateFinancing() {
  let amount = parseFloat($("#amount").val());
  let credentials =
    "Basic dSJXVldALCkxODZhfkRPfWF+RGhIeWlzTWx9XlZbUSg/YEcqeT5xNkxEWltuOGUpfF5KST9+XnsrdERbbjJAOm40QjZqaCwwcXVUZm4wbSZMe1EvJD9dKnA6XS4vQ2lxQn0meD9GYyVXflhqPWQ+eSFSS3UpWD1AalRodFMkNg==";

  let form = {
    d: "SLB-CART",
    loanAmount: amount,
    subPurpose: "Sheds, Garages, %26 Studios",
    utm_content: "SLB-714zdtZTgkiniPLBy8mR4A"
    // firstname: 'First',
    // lastname: 'Last',
    // email: 'testing@test.com',
    // streetaddress: '1001 Main St',
    // city: 'Bountiful',
    // state: 'UT',
    // zipcode: '84010',
    // country: 'United States',
    // phonenumber: '8005551234',
  };

  $.ajax({
    method: "post",
    url: "https://api.acornfinance.com/lowest-payment-amount-link",
    headers: {
      Authorization: credentials,
      ContentType: "application/json"
    },
    data: form,
    success: function (data, status) {
      $("#finance-price").text(data.currency);
      $("#finance-link").attr("href", data.loanAppUrl);
    },
    error: function (request, status, error) {}
  });
}

$(document).ready(function () {
  $("#amount").blur(function () {
    updateFinancing();
  });
});

// scroll animations

let lastScrollTop = 0;
$(".product-info-container").scroll(function (event) {
  let st = $(this).scrollTop();
  if (st > lastScrollTop) {
    $(".product-price__dropdown-grid").addClass("active");
  } else {
    $(".product-price__dropdown-grid").removeClass("active");
  }
  lastScrollTop = st;
});

$(window).scroll(function (event) {
  let st = $(this).scrollTop();
  if (st > lastScrollTop) {
    $(".product-price__dropdown-grid").addClass("active");
  } else {
    $(".product-price__dropdown-grid").removeClass("active");
  }
  lastScrollTop = st;
});

// URL Query Params
const params = new URLSearchParams(window.location.search);
// check if the url contains a certain parameter
if (shift) {
  if (params.has("firstName")) {
    let firstName = params.get("firstName");
    $("#First-Name").val(firstName);
  }
  if (params.has("lastName")) {
    let lastName = params.get("lastName");
    $("#Last-Name").val(lastName);
  }
  if (params.has("email")) {
    let email = params.get("email");
    $("#Email-2").val(email);
  }
  if (params.has("phone")) {
    let phone = params.get("phone");
    $("#Phone").val(phone);
  }
  if (params.has("zip")) {
    let zip = params.get("zip");
    $("#Zip-3").val(zip);
  }
  if (params.has("land")) {
    let ownLand = params.get("land");
    if (ownLand === "true") {
      $("#yesLand").click();
    } else {
      $("#noLand").click();
    }
  }
  if (params.has("state")) {
    let state = params.get("state");
    $("#Project-Location").find("option[selected]").removeAttr("selected");
    $("#Project-Location")
      .find(`option[value="${state}"]`)
      .attr("selected", "");
  }
  if (params.has("preConfigured")) {
    let preConfigured = params.get("preConfigured");
    if (preConfigured === "true") {
      setTimeout(() => {
        $("[form-step]").click();
      }, 1);
    }
  }
  setTimeout(() => {
    if (params.has("type")) {
      let type = params.get("type");
      $(`#${type}`).click();
    }
    if (params.has("lifestyle")) {
      let lifestyle = params.get("lifestyle");
      $(`#${lifestyle}`).click();
      $(`#${lifestyle}`).prop("checked", true);
    }
    if (params.has("setup")) {
      $("#w-node-_5938951b-ec85-ab7e-beb7-60f985625776-96d6997e").click();
    }
    if (params.has("permit")) {
      $("#w-node-a64f14da-195e-5c5f-c1e5-e4123086acb5-96d6997e").click();
    }

    if (params.has("foundation")) {
      let foundation = params.get("foundation");
      $(`#${foundation}`).click();
    }
    shiftUpdateUrl();
  }, 5);
} else if (adu) {
}

let myUrl;

function aduUpdateUrl() {
  let lifestyle;
}

function shiftUpdateUrl() {
  let firstName = $("#First-Name").val();
  let lastName = $("#Last-Name").val();
  let email = $("#Email-2").val();
  let phone = $("#Phone").val();
  let zip = $("#Zip-3").val();
  if ($("#yesLand").is(":checked")) {
    var land = "true";
  } else {
    var land = "false";
  }
  let state = $("#Project-Location").val();
  let type = $(".config-value.single-choice._w-product.active")
    .eq(0)
    .attr("id");
  let lifestyle = $(".config-value.single-choice._w-product.active")
    .eq(1)
    .attr("id");
  let setup = $("#setup").is(":checked");
  let permit = $("#permit").is(":checked");

  let foundation = $(".config-value.single-choice.foundations.active").attr(
    "id"
  );
  myUrl = `https://${
    location.host
  }/product/shift?preConfigured=true&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}&zip=${zip}&land=${land}&state=${state}&type=${type}&lifestyle=${lifestyle}${
    setup ? "&setup" : ""
  }${permit ? "&permit" : ""}&foundation=${foundation}`;
  $("#Configurator-Url").val(myUrl);
}

$(".form-field").on("keyup change", function () {
  shiftUpdateUrl();
});

$(".config-value").on("click", function () {
  shiftUpdateUrl();
});

// Copy to clipboard
// let temp = $("<input>");
// $(".copy-button").on("click", function (e) {
//   e.preventDefault();
//   $(this).find(".btn-text").text("Link copied");
//   $("body").append(temp);
//   temp.val(myUrl).select();
//   document.execCommand("copy");
//   temp.remove();
//   setTimeout(() => {
//     window.location.href = myUrl;
//   }, 1500);
// });

// get varaint image

let imageUrl = {
  // side: "",
  kitchen: "",
  bedroom: "",
  bathroom: ""
};

function getImages() {
  Object.keys(imageUrl).forEach((image, index) => {
    const modString = $(".product-lightbox-img__wrap")
      .eq(index)
      .css("background-image");
    imageUrl[`${image}`] = modString.slice(5, modString.length - 2);
  });
}

function updateImages() {
  getImages();
  let imgs = $("[data-img-name]");
  for (let i = 0; i < imgs.length; i++) {
    let imgName = $(imgs[i]).attr("data-img-name");
    for (const url in imageUrl) {
      if (url === imgName) {
        // $(imgs[i]).css("background-image", `url("${imageUrl[url]}")`);
        $(imgs[i]).attr("src", imageUrl[url]);
        // let prefix = imageUrl[url].slice(0, -5);
        // console.log(prefix);

        // let resBreakpoints = [
        //   "-p-500.webp",
        //   "-p-800.webp",
        //   "-p-1080.webp",
        //   "-p-1600.webp"
        // ];
        // console.log(prefix, resBreakpoints[0]);
        // let srcSetImageUrl = `${prefix}${resBreakpoints[0]} 500w, ${prefix}${resBreakpoints[1]} 800w, ${prefix}${resBreakpoints[2]} 1080w, ${prefix}${resBreakpoints[3]} 1600w, ${prefix}${resBreakpoints[4]} 1920w`;
        // $(imgs[i]).attr("srcset", srcSetImageUrl);
      }
    }
  }
}

// Sitework Pricing

let sitePrice = {
  model1: "$99,943",
  model2: "$123,841",
  model3: "$161,334",
  model4: "$185,232",
  model5: "$160,915",
  model6: "$284,485"
};

$("#sitework-price").text(sitePrice[`${productHeaderNoSpace}`]);

// Additional Option Pricing

let addOnPrice = {
  model1: {
    solarpackage: "$20,500",
    firesuppression: "$5,500",
    sonosentertainment: "$4,995"
  },
  model2: {
    solarpackage: "$24,500",
    firesuppression: "$7,500",
    applianceupgrade: "$6,000",
    sonosentertainment: "$6,995"
  },
  model3: {
    solarpackage: "$28,500",
    firesuppression: "$9,500",
    applianceupgrade: "$8,000",
    sonosentertainment: "$8,995"
  },
  model4: {
    solarpackage: "$30,500",
    firesuppression: "$11,500",
    applianceupgrade: "$8,000",
    sonosentertainment: "$9,995"
  },
  model5: {
    solarpackage: "$30,500",
    firesuppression: "$11,500",
    applianceupgrade: "$8,000",
    sonosentertainment: "$9,995"
  },
  model6: {
    solarpackage: "$30,500",
    firesuppression: "$11,500",
    applianceupgrade: "$8,000",
    sonosentertainment: "$9,995"
  }
};

function assignAddOnPrice() {
  let addOns = $(".config-value[data-addOn]");

  for (let i = 0; i < addOns.length; i++) {
    // get name of clicked add on and reformat to match key name of addOnPrice object
    let addOnText = addOns
      .eq(i)
      .find(".input__label")
      .text()
      .replace(/\s/g, "")
      .toLowerCase();

    addOns
      .eq(i)
      .find(".multi-choice__value")
      .text(addOnPrice[`${productHeaderNoSpace}`][`${addOnText}`]);
  }
  return addOns;
}

if (adu) {
  assignAddOnPrice();
}

// boolean buttons

$("[name='own-land']").click((e) => {
  const el = $(e.target);
  // console.log(el);
  $(".config-value.boolean").removeClass("active");
  el.closest(".config-value.boolean").addClass("active");
});
