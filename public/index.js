let isMenuOpen = false;
/////////////////////////////////////////////////////////////////////////

const header = document.querySelector("#header");
const navbar = document.querySelector("#header #navbar");
const pointer_circle = document.querySelector("#pointer_circle");
const pic_layer = document.querySelector("#first_banner #pic_layer");
const sectionElms = document.querySelectorAll("#main .section");
const sectionElmsHid = document.querySelectorAll("#main .section.hidden");
const skillsSection = document.querySelector("#main .section#skills");
const itemsOfSkills = document.querySelectorAll("#main .section#skills .item");
const headerMenuButton = document.querySelector("#header #menu_button");
const menu = document.querySelector("#menu");

////////////////////////////////////////////////////////////////////////
window.onscroll = function (e) {
  handleHeader(e);
  // handleKinet(e);
};
window.onload = function (e) {
  handleHeader(e);
  menu.innerHTML = navbar.innerHTML + menu.innerHTML;
};
document.addEventListener("mousemove", function (e) {
  handleKinet(e);
  handlePicColorChange(detectMouseSpeed(e));
  handleCardGradAnim(e);
});
document.addEventListener("mousedown", () => {
  pointer_circle.classList.add("clicked");
  pic_layer.querySelector("canvas").style.backgroundColor = "#000000";
});

document.addEventListener("mouseup", () => {
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

//////////////////////////////////////////////////

function handleHeader() {
  //   console.log(window.scrollY);
  if (window.scrollY == 0) {
    header.classList.remove("float");
  } else if (window.scrollY > 0) {
    // console.log(header.classList.contains("float"));
    if (!header.classList.contains("float")) {
      header.classList.add("float");
      // wobbleHeader();
    }
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

  return { speedX, speedY };
}
///----------------------------------------------------------------
function handlePicColorChange(
  { speedX = 0, speedY = 0 } = { speedX: 0, speedY: 0 }
) {
  let speed = Math.sqrt(speedX * speedX + speedY * speedY);
  // console.log(speed);
  let num = speed <= 99 ? speed : 99;
  let col = parseInt((num / 99) * 255).toString(16);
  // console.log(num, col);
  pic_layer.querySelector("canvas").style.backgroundColor = "#000000" + col;
}
///////////////////////////////////////////////////////////////////////
const sectionElmObserver = new IntersectionObserver((elms) => {
  for (elm of elms) {
    // console.log(elm);
    if (elm.isIntersecting) {
      elm.target.classList.remove("hidden");
    } else {
      elm.target.classList.add("hidden");
    }
  }
});
sectionElmsHid.forEach((elm) => {
  sectionElmObserver.observe(elm);
});
///////////////////////////////////////////////////////////////////
function handleCardGradAnim(e) {
  for (const card of itemsOfSkills) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
}
//////////////////////////////////////////////////////////////////
function showMenu() {
  if (!this.isMenuOpen) {
    header.classList.add("open_menu");
    menu.classList.add("open_menu");
  } else {
    header.classList.remove("open_menu");
    menu.classList.remove("open_menu");
  }
  this.isMenuOpen = !this.isMenuOpen;
}
/////////////////////////////////////////////////////
// function wobbleHeader() {
//   header.classList.add("wobble");
//   setTimeout(() => {
//     header.classList.remove("wobble");
//   }, 2 * 1000);
// }
