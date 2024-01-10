let isMenuOpen = false;
let mouseSpeed = 0;

let timerPicCol;
/////////////////////////////////////////////////////////////////////////

const header = document.querySelector("#header");
const navbar = document.querySelector("#header #navbar");
const pointer_circle = document.querySelector("#pointer_circle");
const first_banner = document.querySelector("#first_banner");
const pic_layer = document.querySelector("#first_banner #pic_layer");

const sectionElms = document.querySelectorAll("#main .section");
const sectionElmsHid = document.querySelectorAll("#main .section.hidden");

const skillsSection = document.querySelector("#main .section#skills");
const itemsOfSkills = document.querySelectorAll("#main .section#skills .item");

const projectsSection = document.querySelector("#main .section#projects");
const itemsOfProjects = document.querySelectorAll(
  "#main .section#projects .item"
);

const headerMenuButton = document.querySelector("#header #menu_button");
const menu = document.querySelector("#menu");
const menuWrapper = document.querySelector("#menu #wrapper");
let menuLinks = undefined;

const dmForm = document.querySelector(".section#contact form");

////////////////////////////////////////////////////////////////////////
window.onscroll = function (e) {
  handleHeader(e);
  // handleKinet(e);
};
window.onload = function (e) {
  handleHeader(e);
  handleMenuDOM();

  dmForm.addEventListener("submit", sendMsg);
};
document.addEventListener("mousemove", function (e) {
  handleCardGradAnim(e);
});
first_banner.addEventListener("mousemove", function (e) {
  handleKinet(e);
});
first_banner.addEventListener("mousedown", () => {
  pointer_circle.classList.add("clicked");
  pic_layer.querySelector("canvas").style.backgroundColor = "#000000";
});

first_banner.addEventListener("mouseup", () => {
  pointer_circle.classList.remove("clicked");
  pic_layer.querySelector("canvas").style.backgroundColor = "transparent";
});

headerMenuButton.onclick = function () {
  showMenu();
};

// header.onclick = function (e) {
//   if (e.target === header) {
//     wobbleHeader();
//   }
// };
//////////////////////////////////////////////

function sendMsg(e) {
  e.preventDefault();
  console.log(e.target.name.value, e.target.message.value);
  axios
    .post("/sendmessage", {
      name: e.target.name.value,
      message: e.target.message.value,
    })
    .then((response) => {
      // Handle the server's response if needed
      console.log(response.data);
      dmForm.reset();
    })
    .catch((error) => {
      // Handle errors if any
      console.error("Error sending message:", error);
    });
}

//////////////////////////////////////////////////

function handleHeader() {
  //   console.log(window.scrollY);
  if (!isMenuOpen && window.scrollY == 0) {
    header.classList.remove("float");
  } else if (window.scrollY > 0 || isMenuOpen) {
    // console.log(header.classList.contains("float"));
    if (!header.classList.contains("float")) {
      header.classList.add("float");
      // wobbleHeader();
    }
  }
}
////////////////////////////////////////////////////////////////////
function handleMenuDOM() {
  menuWrapper.innerHTML = navbar.innerHTML + menuWrapper.innerHTML;
  menuLinks = menuWrapper.querySelectorAll(".navbar_link");
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].style.setProperty("--link-iterator", i);
    menuLinks[i].addEventListener("click", () => {
      if (isMenuOpen) {
        showMenu();
      }
    });
  }
}
/////////////////////////////////////////////////////////////////////
// create instance of kinet with custom settings
let kinet = new Kinet({
  acceleration: 0.06,
  friction: 0.2,
  names: ["x", "y"],
});

// set handler on kinet tick event
kinet.on("tick", function (instances) {
  pointer_circle.style.transform = `translate3d(${instances.x.current}px, ${
    instances.y.current
  }px, 0) rotateX(${instances.x.velocity / 2}deg) rotateY(${
    instances.y.velocity / 2
  }deg)`;
});
// let aaa;
// call kinet animate method on mousemove
function handleKinet(event) {
  kinet.animate(
    "x",
    window.scrollX + event.clientX - document.body.clientWidth / 2
  );
  kinet.animate("y", window.scrollY + event.clientY - window.innerHeight / 2);
  // aaa = event;
}

// log
kinet.on("start", function () {
  // console.log("start");
});

kinet.on("end", function () {
  // console.log("end");
});

////////////////////////////////////////////////
VANTA.TOPOLOGY({
  el: "#first_banner #pic_layer",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0xed0087,
  backgroundColor: 0x000848,
});

////////////////////////////////////////////////////////////////////////
let timestamp = null;
let lastMouseX = null;
let lastMouseY = null;

function detectMouseSpeed(e) {
  if (timestamp === null) {
    timestamp = Date.now();
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;
    return;
  }

  let now = Date.now();
  let dt = now - timestamp;
  let dx = e.screenX - lastMouseX;
  let dy = e.screenY - lastMouseY;
  let speedX = Math.round((dx / dt) * 100);
  let speedY = Math.round((dy / dt) * 100);

  timestamp = now;
  lastMouseX = e.screenX;
  lastMouseY = e.screenY;

  mouseSpeed = Math.sqrt(speedX * speedX + speedY * speedY);
}
///----------------------------------------------------------------
function handlePicColorChange() {
  // console.log(speed);
  let num = mouseSpeed <= 99 ? mouseSpeed : 99;
  let col = parseInt((num / 99) * 255).toString(16);
  // console.log(num, col);
  if (pic_layer.querySelector("canvas")) {
    pic_layer.querySelector("canvas").style.backgroundColor = "#000000" + col;
  }
}
///////////////////////////////////////////////////////////////////////
const sectionItemOptions = {
  rootMargin: "-51px 0px -51px 0px",
};
const sectionElmObserver = new IntersectionObserver((elms) => {
  for (elm of elms) {
    // console.log(elm.target, elm.intersectionRatio, elm.isIntersecting);

    if (elm.isIntersecting) {
      elm.target.classList.remove("hidden");
    } else {
      elm.target.classList.add("hidden");
    }
  }
}, sectionItemOptions);

sectionElmsHid.forEach((elm) => {
  sectionElmObserver.observe(elm);
});
///////////////////////////////////////////////////////////////////
function handleCardGradAnim(e) {
  for (cardsec of [itemsOfSkills, itemsOfProjects]) {
    for (const card of cardsec) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  }
}
//////////////////////////////////////////////////////////////////
function showMenu() {
  if (!isMenuOpen) {
    header.classList.add("open_menu");
    menu.classList.add("open_menu");
  } else {
    header.classList.remove("open_menu");
    menu.classList.remove("open_menu");
  }
  isMenuOpen = !isMenuOpen;
  handleHeader();
}
/////////////////////////////////////////////////////
// function wobbleHeader() {
//   header.classList.add("wobble");
//   setTimeout(() => {
//     header.classList.remove("wobble");
//   }, 2 * 1000);
// }

/////////////////////////////////////////////////////////
