import $ from "jquery";

const carouselText = [
  { text: "User Experiences.", color: "#FF6347" },
  { text: "User Interfaces.", color: "#FFBF47" },
  { text: "Web apps.", color: "#FF4787" },
  { text: "Mobile apps.", color: "#FF47B2" },
  { text: "Websites.", color: "#47C2FF" },
  { text: "Prototypes.", color: "#47E6FF" },
  { text: "Animations.", color: "#47FFC2" },
  { text: "Front ends.", color: "#FF47E6" },
];

const typingTitleText = [
  {
    elementTag: "h2.SectionHeading.PM",
    text: "Personal Mission",
    notloaded: true,
    speed: 100,
  },
  {
    elementTag: "h2.SectionHeading.EX",
    text: "Work Experience",
    notloaded: true,
    speed: 100,
  },
  {
    elementTag: "h2.SectionHeading.PS",
    text: "Personal Skills",
    notloaded: true,
    speed: 100,
  },
  {
    elementTag: "h2.SectionHeading.AM",
    text: "About Me",
    notloaded: true,
    speed: 100,
  },
  {
    elementTag: "h2.SectionHeading.P",
    text: "Projects",
    notloaded: true,
    speed: 100,
  },
  {
    elementTag: "h2.SectionHeading.E",
    text: "Education",
    notloaded: true,
    speed: 100,
  },
  {
    elementTag: "h2.SectionHeading.CM",
    text: "Contact Me",
    notloaded: true,
    speed: 100,
  },
  {
    elementTag: "h2.SectionHeading.ATP",
    text: "About This Page",
    notloaded: true,
    speed: 100,
  },
  {
    elementTag: "p.DQuote1",
    text: '"Design is not just what it looks like and feels like.',
    notloaded: true,
    speed: 50,
  },
  {
    elementTag: "p.DQuote3",
    text: 'Design is how it works."',
    notloaded: true,
    speed: 150,
  },
];

$(async function () {
  var helloElement = $("h1.hello");
  helloElement.html("");
  typeSentence("Hi, im Yuvraj Bajwa", helloElement);
  carousel(carouselText, "#feature-text");
});

async function typeSentence(sentence, eleRef, delay = 100) {
  const letters = sentence.split("");
  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    $(eleRef).append(letters[i]);
    i++;
  }
  return;
}

async function deleteSentence(eleRef) {
  const sentence = $(eleRef).html();
  const letters = sentence.split("");
  while (letters.length > 0) {
    await waitForMs(100);
    letters.pop();
    $(eleRef).html(letters.join(""));
  }
}

async function carousel(carouselList, eleRef) {
  var i = 0;
  while (true) {
    updateFontColor(eleRef, carouselList[i].color);
    await typeSentence(carouselList[i].text, eleRef);
    await waitForMs(1500);
    await deleteSentence(eleRef);
    await waitForMs(500);
    i++;
    if (i >= carouselList.length) {
      i = 0;
    }
  }
}

function updateFontColor(eleRef, color) {
  $(eleRef).css("color", color);
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

var typingTitleLoadCount = 0;
$(window).on("resize scroll", function () {
  if (typingTitleLoadCount < typingTitleText.length) {
    typingTitleText.forEach((element) => {
      if (element.notloaded) {
        if ($(element.elementTag).isInViewport()) {
          $(element.elementTag).html("");
          typeSentence(element.text, $(element.elementTag), element.speed);
          element.notloaded = !element.notloaded;
          typingTitleLoadCount++;
        }
      }
    });
  } else {
    $(window).off("resize scroll");
  }
});
