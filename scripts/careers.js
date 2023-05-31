$(".grid-2-columns.is--career-job-li").hover(
  function (e) {
    e.preventDefault();
    $(this).find(".divider-line.animation").addClass("active");
  },
  function (e) {
    e.preventDefault();
    $(this).find(".divider-line.animation").removeClass("active");
  }
);
