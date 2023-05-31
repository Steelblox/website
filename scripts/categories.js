function numWithZero(num) {
  return num < 10 ? "0" + num : num;
}

$(".slider-gallery_component").each(function (index) {
  console.log($(this).find(".swiper-next")[0]);
  let totalSlides = numWithZero(
    $(this).find(".swiper-slide.is-slider-titles").length
  );
  $(".swiper-number-total").text(totalSlides);
  const bgSwiper = new Swiper($(this).find(".swiper.is-slider-bg")[0], {
    slidesPerView: 1,
    speed: 600,
    effect: "fade",
    allowTouchMove: false
  });

  // const thumbsSwiper = new Swiper($(this).find(".swiper.is-slider-thumbs")[0], {
  //   slidesPerView: 1,
  //   speed: 600,
  //   loop: true,
  //   loopedSlides: 8,
  //   slideToClickedSlide: true
  // });

  const textSwiper = new Swiper($(this).find(".swiper.is-slider-titles")[0], {
    slidesPerView: "auto",
    speed: 600,
    loop: true,
    loopedSlides: 8,
    slideToClickedSlide: true,
    mousewheel: true,
    keyboard: true,
    centeredSlides: true,
    slideActiveClass: "active",
    slideDuplicateActiveClass: "active",
    thumbs: {
      swiper: bgSwiper
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0]
    }
  });

  // textSwiper.controller.control = thumbsSwiper;
  // thumbsSwiper.controller.control = textSwiper;

  textSwiper.on("slideChange", function (e) {
    let slideNum = numWithZero(e.realIndex + 1);
    $(".swiper-number-current").text(slideNum);
    $(".model-popup").removeClass("active");
  });
});

// popup

// $(".category_text-link").click(function (e) {
//   e.preventDefault();
//   let popupEl = $(this).siblings($(".model-popup"));
//   popupEl.addClass("active");
// });

// close popup

$(".model-popup_close-btn").click(function () {
  $(".model-popup").removeClass("active");
});
