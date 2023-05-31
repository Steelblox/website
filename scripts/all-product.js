// Main Accordian Slider Interaction
// const childAccords = document
//   .getElementById("parent-accord")
//   .getElementsByClassName("accordion");
// const $accordSlider = $(".accordion");
// $accordSlider.on("click", slideAccord);

// function slideAccord(e) {
//   e.preventDefault();
//   $(".accordion").removeClass("active");
//   $(this).addClass("active");

//   // get index of clicked accordion
//   const i = $(this).parent().children().index(this);

//   // if copy changes to describe current accordian then click relative copy slide
//   if ($(".lifestyle-nav.w-slider-nav").length) {
//     $(".lifestyle-nav.w-slider-nav").children().eq(i).click();
//   }
// }

$(".plus-btn").on("click", function (e) {
  e.preventDefault();
  $(this).find(".plus-vert").toggleClass("active");
  $(this)
    .closest(".flex-row-middle")
    .siblings(".overflow-hidden")
    .find(".shift-type-details-contain")
    .toggleClass("active");
  $(this)
    .closest(".flex-row-middle")
    .siblings(".divider-line")
    .find(".divider-line.animation")
    .toggleClass("active");
  $(this).closest(".live-work-play-card").toggleClass("active");
});
$("#lightbox-btn").click(function () {
  $(".product-lightbox__link").first().click();
});
