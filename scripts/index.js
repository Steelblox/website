$(".product-card").hover(
  function () {
    $(this).find(".divider-line.animation").addClass("active");
    $(this).find(".product_wireframe-img").addClass("active");
    $(this).find(".arrow-wing-bot").addClass("active");
    $(this).find(".arrow-wing-top").addClass("active");
  },
  function () {
    $(this).find(".divider-line.animation").removeClass("active");
    $(this).find(".product_wireframe-img").removeClass("active");
    $(this).find(".arrow-wing-bot").removeClass("active");
    $(this).find(".arrow-wing-top").removeClass("active");
  }
);

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
