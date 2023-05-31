const steps = document.getElementsByName("step__btn");
$(".walkthrough__step-btn-wrap").on("click", ".step__btn", function (e) {
  e.preventDefault();

  let i = $(this).index();
  const lastClass = $("#step-line").attr("class").split(" ").pop();

  // style step__btn
  $(".step__btn").removeClass("active");
  $(this).addClass("active");
  $("#step-line").removeClass(lastClass);
  $("#step-line").addClass(`is--step${i + 1}`);

  // click related slide

  $(`.w-round div:nth-child(${i + 1})`).trigger("tap");
});

// Copyright start
// © Code by T.RICKS, https://www.tricksdesign.com/
// You have the license to use this code in your projects but not redistribute it to others

// Find all text with .tricks class and break each letter into a span
const tricksWord = document.getElementsByClassName("tricks");
for (var i = 0; i < tricksWord.length; i++) {
  var wordWrap = tricksWord.item(i);
  wordWrap.innerHTML = wordWrap.innerHTML.replace(
    /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
    '$1<span class="tricksword">$2</span>'
  );
}

const tricksLetter = document.getElementsByClassName("tricksword");
for (let i = 0; i < tricksLetter.length; i++) {
  const letterWrap = tricksLetter.item(i);
  letterWrap.innerHTML = letterWrap.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );
}
// Copyright end

// Slide In Animation
const slideIn = anime.timeline({
  loop: false,
  autoplay: false
});

slideIn
  .add({
    targets: ".slide-in .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i + 1)
  })
  .add({
    targets: ".slide-in",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Slide Up Animation
const slideUp = anime.timeline({
  loop: false,
  autoplay: false
});

slideUp
  .add({
    targets: ".slide-up .letter",
    translateY: ["1.1em", 0],
    opacity: [0, 1],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  })
  .add({
    targets: ".slide-up",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Fade Up Animation
const fadeUp = anime.timeline({
  loop: false,
  autoplay: false
});

fadeUp.add({
  targets: ".fade-up .letter",
  translateY: [40, 0],
  translateZ: 0,
  opacity: [0, 1],
  easing: "easeOutQuart",
  duration: 400,
  delay: (el, i) => 300 + 10 * i
});
// .add({
//   targets: ".fade-up .letter",
//   translateY: [0, -100],
//   opacity: [1, 0],
//   easing: "easeInExpo",
//   duration: 1200,
//   delay: (el, i) => 100 + 30 * i
// });

// Rotate In Animation
const rotateIn = anime.timeline({
  loop: false,
  autoplay: false
});

rotateIn
  .add({
    targets: ".rotate-in .letter",
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i
  })
  .add({
    targets: ".rotate-in",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Pop In Animation
const popIn = anime.timeline({
  loop: false,
  autoplay: false
});

popIn
  .add({
    targets: ".pop-in .letter",
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i + 1)
  })
  .add({
    targets: ".pop-in",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Play your animation with these
fadeUp.play();
slideUp.play();
slideIn.play();
rotateIn.play();
popIn.play();

// Wait before playing animation
setTimeout(() => {
  // Put the play below this line
}, 800);

// Play animaton when something is clicked
$(".your-button-class").click(function () {
  // Put the play below this line
});

// Play animaton when hovered in
$(".your-button-class").mouseenter(function () {
  // Put the play below this line
});

// Play animation when scrolled into view
$("#heading-container").on("inview", function (event, isInView) {
  if (isInView) {
    // Put the play below this line
  } else {
  }
});
