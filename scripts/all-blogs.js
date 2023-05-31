$(".blog-card-wrap").hover(
  function (e) {
    e.preventDefault();
    console.log("oi");
    $(this).next().find(".divider-line.animation").addClass("active");
  },
  function (e) {
    e.preventDefault();
    $(this).next().find(".divider-line.animation").removeClass("active");
  }
);

$(".blog-card-wrap").click(function (e) {
  e.preventDefault();
  const a = $(this).find("a");
  console.log(a);
  a.click();
});

// $(".filter__radio-btn").one("click", function () {
//   if ($(this).hasClass("active")) {
//     $(this).removeClass("active");
//     console.log("remove");
//   } else {
//     $(this).addClass("active");
//     console.log("add");
//   }
// });
