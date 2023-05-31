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
