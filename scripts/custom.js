$(".slide-out__tab").click(function (e) {
  e.preventDefault();
  $(".project__slide-out").toggleClass("active");
  $(".tab-ham-left").toggleClass("active");
  $(".tab-ham-right").toggleClass("active");
  $(".slide-out__tab").toggleClass("active");
});

$(".other-products-card").hover(
  function () {
    $(this).addClass("active");
    $(this)
      .siblings(".divider-line")
      .find(".divider-line.animation")
      .addClass("active");
  },
  function () {
    $(this).removeClass("active");
    $(this)
      .siblings(".divider-line")
      .find(".divider-line.animation")
      .removeClass("active");
  }
);
