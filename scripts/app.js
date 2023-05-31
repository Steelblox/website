// New Nav Menu

$(".hamburger_inner-wrap").click(function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(".menu_overlay").removeClass("active");
  } else {
    $(this).addClass("active");
    console.log("clicked");
    $(".menu_overlay").addClass("active");
  }
});

// ==== START button hovers ====
$(".btn-secondary").hover(
  function () {
    $(this).addClass("hover");
    $(this).find(".btn-bar").addClass("hover");
  },
  function () {
    $(this).removeClass("hover");
    $(this).find(".btn-bar").removeClass("hover");
  }
);

$(".btn-tri").hover(
  function () {
    $(this).addClass("hover");
    $(this).find(".btn-bar").addClass("hover");
  },
  function () {
    $(this).removeClass("hover");
    $(this).find(".btn-bar").removeClass("hover");
  }
);

$(".vertical-text.nav").hover(
  function (e) {
    e.preventDefault();
    $(this).children(".nav__cta").addClass("hover");
  },
  function (e) {
    e.preventDefault();
    $(this).children(".nav__cta").removeClass("hover");
  }
);

$(".hamburger").click(function (e) {
  e.preventDefault();
  $(this).toggleClass("active");
});

// NAV CTA HOVER

$(".vertical-text.nav").hover(
  function () {
    $(".nav__cta-hover").addClass("active");
    $(this).find(".text-btn__arrow").addClass("active");
  },
  function () {
    $(".nav__cta-hover").removeClass("active");
    $(this).find(".text-btn__arrow").removeClass("active");
  }
);

// ==== END button hovers ====

// ==== Popups ====
function openPop(popup) {
  $(`.popup__overlay[data-popup-name='${popup}']`).addClass("active");
  $(".close-btn").addClass("active");
  $("html, body").css({
    overflow: "hidden"
  });
  $(".notification-bar").addClass("display-hidden");
}

function closePop() {
  $(".close-btn").removeClass("active");
  $("[data-popup-element='true']").removeClass("active");
  $(".popup__overlay").removeClass("active");
  $("html, body").css({
    overflow: "visible",
    height: "auto"
  });
  $(".notification-bar").removeClass("display-hidden");
}

$(".close-btn").click(function () {
  closePop();
});

$("[tooltip='true']").click(() => {
  openPop();
});

$("[data-popup='true']").click((e) => {
  let popup = e.target.getAttribute("data-popup-name");
  openPop(popup);
});

$("#open-popup").click(() => {
  openPop();
});

$(".popup__overlay").click(function (e) {
  e.stopPropagation();
  closePop();
});

$(".popup__overlay > div").click(function (e) {
  e.stopPropagation();
});

$(".popup__content-wrap").click(function (e) {
  e.stopPropagation();
});

$("#close-popup").click(function () {
  closePop();
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

// FAQs

const faqWrap = $(".faq-question-wrap");
const faqContent = $(".faq-content");

faqWrap.click(function () {
  let faqHeight = $(this).find(".margin-bottom-4").css("height");
  faqContent.css("height", "0px");
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).find(".divider-line.animation").removeClass("active");
    $(this).find(".plus-vert").removeClass("active");
  } else {
    // remove active state from non clicked elements
    faqWrap.removeClass("active");
    faqWrap.find(".plus-vert").removeClass("active");
    faqWrap.find(".divider-line.animation").removeClass("active");
    $(this).addClass("active");
    // add active state to clicked elements
    $(this).find(faqContent).css("height", faqHeight);
    $(this).find(".divider-line.animation").addClass("active");
    $(this).find(".plus-vert").addClass("active");
  }
});

// navbar on scoll event

$(window).on("scroll", function () {
  if ($(this).scrollTop() > 200) {
    if ($(".nav_hori-container").hasClass("active")) {
      $(".nav_hori-container").addClass("active");
    }
  } else {
    if (!$(".nav_hori-container").hasClass("active")) {
      $(".nav_hori-container").removeClass("active");
    }
  }
});

// ==== Custom Cursor ====
// $(document).ready(function () {
//   const cursor = $(".custom-cursor");

//   $(window).mousemove(function (e) {
//     cursor.css({
//       top: e.clientY - cursor.height() / 2,
//       left: e.clientX - cursor.width() / 2
//     });
//   });
//   $(window)
//     .mouseleave(function () {
//       cursor.css({
//         opacity: "0"
//       });
//     })
//     .mouseenter(function () {
//       cursor.css({
//         opacity: "1"
//       });
//     });
//   $(window)
//     .mousedown(function () {
//       cursor.css({
//         transform: "scale(.6)"
//       });
//     })
//     .mouseup(function () {
//       cursor.css({
//         transform: "scale(1)"
//       });
//     });
//   $("a, *[button='true']")
//     .mouseenter(function () {
//       cursor.addClass("active");
//       cursor.css({
//         mixBlendMode: "difference"
//       });
//     })
//     .mouseleave(function () {
//       cursor.removeClass("active");
//       cursor.css({
//         mixBlendMode: "normal"
//       });
//     });
//   $(".product_wireframe-img")
//     .mouseenter(function () {
//       cursor.css({
//         mixBlendMode: "normal"
//       });
//     })
//     .mouseleave(function () {
//       cursor.css({
//         mixBlendMode: "difference"
//       });
//     });

//   $("div").mouseenter(function () {
//     if ($(this).css("background-image") != "none") {
//       $(this)
//         .mouseenter(function () {
//           cursor.css({
//             mixBlendMode: "normal"
//           });
//         })
//         .mouseleave(function () {
//           cursor.css({
//             mixBlendMode: "difference"
//           });
//         });
//     }
//   });
// });
