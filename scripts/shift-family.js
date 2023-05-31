let ease = "cubic-bezier(0.19,1,0.22,1)";
let easeTime = ".64s";
$(".opportunity_item").on("mouseover", function () {
  let cardIndex = $(".opportunity_item").index(this);

  // check state of background element. If it's 25% run nomrally. If it's 0%, instantly move element to hovered card's x axis
  if ($(".opportunity_card-bg").css("width") === "0px") {
    $(".opportunity_card-bg").css({
      transition: `width ${easeTime} ${ease}, left 0s linear`
    });
  } else {
    $(".opportunity_card-bg").css({
      transition: `width ${easeTime} ${ease}, left ${easeTime} ${ease}`
    });
  }

  $(".opportunity_card-bg").css({
    width: "25%",
    left: `${25 * cardIndex}%`
  });
});

$(".opportunity_list").on("mouseout", function () {
  $(".opportunity_card-bg").css({
    transition: `width ${easeTime} ${ease}, left 0s`,
    width: "0%"
  });
});

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

$(".faq-question-wrap").click(function () {
  $(this).find(".divider-line.animation").toggleClass("active");
  $(this).find(".plus-vert").toggleClass("active");
});

$("#lightbox-btn").click(function () {
  $(".product-lightbox__link").first().click();
});

// hotspots

$(".img_hotspot").click(function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(".img_hotspot").removeClass("active");
    $(this).addClass("active");
  }
});
