// Global Variable
let configValueBtn = $(".config-value.single-choice._w-product");
let configDropDownBtn = $(".config-dropdown-btn");
let checkBox = $(".config-value.multi-choice");
let foundBox = $(".config-value.single-choice.foundations");

// PRICE
let wPriceNoDec = $("#pPrice").text().split(".").shift();
let wPriceNoDoll = formatPrices(wPriceNoDec);
let productPrice = wPriceNoDoll;
let displayedPrice;
let servicePrice = 0;
let foundationPrice = 0;
let totalPrice;

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
  $("#Configured-Price").val(wPriceNoDec);
  $("#amount").val(wPriceNoDoll);
  setTimeout(function () {
    $("#amount").blur();
  }, 1);
});

function formatPriceToText(num) {
  displayedPrice =
    "$" +
    num
      .toString()
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  $("#price").text(displayedPrice);
  $("#price2").text(displayedPrice);
  $("#Configured-Price").val(displayedPrice);
}

function calculatePrice() {
  totalPrice = productPrice + servicePrice + foundationPrice;
  // console.log(
  //   "total price: " + totalPrice,
  //   "product price: " + productPrice,
  //   "service price: " + servicePrice,
  //   "foundation price: " + foundationPrice
  // );
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
  foundationPrice = formatPrices(el.find(".multi-choice__value").text());
  calculatePrice();
}

checkBox.click(function () {
  const el = $(this);
  updateServicePrice(el);

  el.toggleClass("active");

  // SELECT CHECKBOX WITH SAME INDEX
  const i = checkBox.index(this);
  $("#checkbox-hidden").children().eq(i).click();
});

foundBox.click(function () {
  const el = $(this);
  updateFoundationPrice(el);

  // HAVE FIELDS GO ACTIVE ON CLICK
  el.siblings().removeClass("active");
  el.addClass("active");
});

function configSelection() {
  updateProductPrice();
  const el = $(this);
  el.siblings().removeClass("active");
  el.addClass("active");

  // update images
  updateImages();

  // Update dropdown names to match selection
  const v = el.find("input[type=radio]")[0].id;
  if (el.has("input[name=Shift-Version]").length) {
    $("#shift-type").text(v);
  } else if (el.has("input[name=Lifestyle-Package]").length) {
    $("#shift-lifestyle").text(v);
  }

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

  let superParent = el.closest(".w-dropdown");
  let parentIndex = superParent.index();

  let elParent = el;
  let configIndex = elParent.index();

  $(`div[ecom-btn="true"]:nth-child(${parentIndex + 1})`)
    .find(
      `div[data-node-type='commerce-add-to-cart-pill']:nth-child(${
        configIndex + 1
      })`
    )
    .click();
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
const aduForm = $("#adu-form");
aduForm.validate({
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

// disable form submit with enter key
$(document).keypress(function (event) {
  if (event.which == "13") {
    event.preventDefault();
  }
});

const stepText = {
  step1: "Check Availability",
  step2: "Return Home",
  step3: "Configure Model"
};

$("[form-step]").click(function () {
  // Verify Address
  let projectAddress = $("#Project-Address").val();
  console.log(projectAddress);
  let projectApproved = true;

  // Determine current and next step as int
  let thisStep = parseInt($(this).attr("form-step"), 10);
  let nextStep = 1 + parseInt($(this).attr("form-step"), 10);

  // if user is on first step and project address is approved skip step 2
  if (thisStep === 1 && projectApproved === true) {
    nextStep = 2 + parseInt($(this).attr("form-step"), 10);
  }

  // Validate form
  if (aduForm.valid() === true) {
    // Continue to Next Step
    $(`.config-slider-nav.w-slider-nav div:nth-child(${nextStep})`).trigger(
      "tap"
    );

    // change element attribute step
    $(this).attr("form-step", `${nextStep}`);
    // change button text
    let btnText = Object.values(stepText).at(nextStep - 1);
    $(this).find("div").text(`${btnText}`);
    if (nextStep > 3) {
      $(this).addClass("display-hidden");
      $("#buy-now").removeClass("display-hidden");
    }
  }
});

$("[form-button='configure']").click(function () {
  if (shiftForm.valid() === true) {
    $(".form-step-1").addClass("display-hidden");
    $(".config-slider-nav.w-slider-nav div:nth-child(2)").trigger("tap");
    $("#buy-now").removeClass("display-hidden");
    $("#product-price-bottom").addClass("display-hidden");
    $("[form-button='get-quote']").removeClass("display-hidden");
    $(this).addClass("display-hidden");
    $("#header-btn-quote").removeClass("display-hidden");
    $("#header-btn").addClass("display-hidden");
    $(".product-page__step-wrap").removeClass("active");
    $("#conf-step-2").addClass("active");
  }
});

$("[form-button='get-quote']").click(function () {
  if (window.location.href.indexOf("shift") > -1) {
    $("#config-btn-submit").click();
  } else if (window.location.href.indexOf("meou") > -1) {
    $("#config-btn-submit2").click();
  }
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
  }

  let href = this.href;

  window.location = href;
});

$("[form-slider='back-btn']").click(function (e) {
  e.preventDefault();
  $("#buy-now").addClass("display-hidden");
  $("[form-slider='step-2']").addClass("display-hidden");
  $("[form-button='configure']").removeClass("display-hidden");
  $("[form-button='get-quote']").addClass("display-hidden");
  $(".config-slider-nav.w-slider-nav div:nth-child(1)").trigger("tap");
  $("#header-btn-quote").addClass("display-hidden");
  $("#header-btn").removeClass("display-hidden");
  $("#product-price-bottom").removeClass("display-hidden");
});

$("[form-slider='back-btn']").hover(
  function (e) {
    e.preventDefault();
    $(this)
      .siblings(".arrow-figure")
      .find(".arrow-wing-bot")
      .addClass("active");
    $(this)
      .siblings(".arrow-figure")
      .find(".arrow-wing-top")
      .addClass("active");
  },
  function (e) {
    e.preventDefault();
    $(this)
      .siblings(".arrow-figure")
      .find(".arrow-wing-bot")
      .removeClass("active");
    $(this)
      .siblings(".arrow-figure")
      .find(".arrow-wing-top")
      .removeClass("active");
  }
);

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
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
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
  $("#Project-Location").find(`option[value="${state}"]`).attr("selected", "");
}
if (params.has("preConfigured")) {
  let preConfigured = params.get("preConfigured");
  if (preConfigured === "true") {
    setTimeout(() => {
      $("[form-button='configure']").click();
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
  updateUrl();
}, 5);

let myUrl;

function updateUrl() {
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
  updateUrl();
});

$(".config-value").on("click", function () {
  updateUrl();
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
  side: "",
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
        $(imgs[i]).css("background-image", `url("${imageUrl[url]}")`);
        // $(imgs[i]).attr("src", imageUrl[url]);
      }
    }
  }
}
