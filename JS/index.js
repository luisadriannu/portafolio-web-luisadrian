// Menu
const d = document,
  w = window,
  $btnMenu = d.querySelector(".menu-btn"),
  $menu = d.querySelector(".menu");

$btnMenu.addEventListener("click", (e) => {
  $btnMenu.firstElementChild.classList.toggle("none");
  $btnMenu.lastElementChild.classList.toggle("none");
  $menu.classList.toggle("is-active");
});

d.addEventListener("click", (e) => {
  if (!e.target.matches(".menu a")) return false;

  $btnMenu.firstElementChild.classList.remove("none");
  $btnMenu.lastElementChild.classList.add("none");
  $menu.classList.remove("is-active");
});

// Typed
const typed = new Typed(".typed", {
  strings: [
    `<i class="dev">FrontEnd Developer.</i>`,
    `<i class="dev">Freelancer.</i>`,
    `<i class="dev">Frontend Junior.</i>`,
    `<i class="dev">Autodidact.</i>`,
    `<i class="dev">Web Programmer.</i>`,
    `<i class="dev">LuizackJS.</i>`,
  ],

  typeSpeed: 75,
  startDelay: 300,
  backSpeed: 75,
  smartBackspace: true,
  shuffle: false,
  backDelay: 1500,
  loop: true,
  loopCount: false,
  showCursor: true,
  cursorChar: "|",
  contentType: "html",
});

// Show Elements
const $header = d.querySelector(".header"),
  $indicador = d.querySelector(".indicador"),
  $scroll = d.querySelector(".btn-scroll-top");

w.addEventListener("scroll", (e) => {
  if (scrollY >= 300) {
    $header.classList.remove("hidde");
  } else {
    $header.classList.add("hidde");
  }
  if (scrollY >= 1800) {
    $scroll.classList.remove("hidde");
  } else {
    $scroll.classList.add("hidde");
  }
});

setTimeout(() => {
  $indicador.classList.add("slideDownFadeIn");
  setTimeout(() => {
    $indicador.classList.add("none");
    $indicador.classList.remove("slideUpFadeIn");
  }, 1500);
}, 2000);

$scroll.addEventListener("click", (e) => {
  w.scrollTo({
    behavior: "smooth",
    top: 0,
  });
});

// DarkMode
const $btnDarkMode = d.querySelector(".btn-dark-mode"),
  $portfolioModal = d.querySelectorAll(".portfolio-modal"),
  $contactFormResponse = d.querySelector(".contact-form-response"),
  ls = localStorage;

const lightMode = () => {
  d.body.classList.remove("dark-mode");
  d.body.classList.add("light-mode");
  d.querySelector(".header").style.backgroundColor = "var(--white-color)";
  d.querySelector(".menu").style.backgroundColor = "var(--white-color)";
  $portfolioModal.forEach(
    (ele) => (ele.style.backgroundColor = "var(--white-color)")
  );
  $contactFormResponse.style.backgroundColor = "var(--white-color)";
  $btnDarkMode.firstElementChild.classList.toggle("none");
  $btnDarkMode.lastElementChild.classList.toggle("none");
  ls.setItem("theme", "light");
};

const darkMode = () => {
  d.body.classList.remove("light-mode");
  d.body.classList.add("dark-mode");
  d.querySelector(".header").style.backgroundColor = "var(--second-color)";
  // d.querySelector(".header a").style.color = "var(--white-color)";
  d.querySelector(".menu").style.backgroundColor = "var(--second-color)";
  $portfolioModal.forEach(
    (ele) => (ele.style.backgroundColor = "var(--second-color)")
  );
  $contactFormResponse.style.backgroundColor = "var(--second-color)";
  $btnDarkMode.insertAdjacentElement = ` `;
  // $contactInputs.style.color = "white";
  $btnDarkMode.firstElementChild.classList.toggle("none");
  $btnDarkMode.lastElementChild.classList.toggle("none");
  ls.setItem("theme", "dark");
};

$btnDarkMode.addEventListener("click", (e) => {
  if (d.body.classList.contains("light-mode")) {
    darkMode();
  } else {
    lightMode();
  }
});

d.addEventListener("DOMContentLoaded", (e) => {
  if (ls.getItem("theme") === null) ls.setItem("theme", "light");
  if (ls.getItem("theme") === "light") lightMode();
  if (ls.getItem("theme") === "dark") {
    darkMode();
    $btnDarkMode.firstElementChild.classList.toggle("none");
    $btnDarkMode.lastElementChild.classList.toggle("none");
  }
});

// Contact Form
const $form = d.querySelector(".contact-form"),
  $loader = d.querySelector(".contact-form-loader"),
  $response = d.querySelector(".contact-form-response");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $loader.classList.remove("none");
  fetch("https://formsubmit.co/ajax/luisadriannu13@gmail.com", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((json) => {
      console.log(json);
      location.hash = "#gracias";
      $form.reset();
    })
    .catch((err) => {
      console.log(err);
      let message =
        err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
      $response.querySelector(
        "h3"
      ).innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(() => {
      $loader.classList.add("none");
      setTimeout(() => {
        location.hash = "#close";
      }, 3000);
    });
});
