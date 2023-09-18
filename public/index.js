const header = document.querySelector("#header");
const pointer_circle = document.querySelector("#pointer_circle");
const pic_layer = document.querySelector("#first_banner #pic_layer");

window.onscroll = function (e) {
  handleHeader(e);
  // handleKinet(e);
};
document.onload = handleHeader;
document.addEventListener("mousemove", function (e) {
  handleKinet(e);
  handlePicColorChange(detectMouseSpeed(e));
});
document.addEventListener("mousedown", () => {
  pointer_circle.classList.add("clicked");
  pic_layer.querySelector("canvas").style.backgroundColor = "#000b65";
});

document.addEventListener("mouseup", () => {
  pointer_circle.classList.remove("clicked");
  pic_layer.querySelector("canvas").style.backgroundColor = "black";
});

function handleHeader() {
  //   console.log(window.scrollY);
  if (window.scrollY == 0) {
    header.classList.remove("float");
  } else if (window.scrollY > 0) {
    header.classList.add("float");
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
let aaa;
// call kinet animate method on mousemove
function handleKinet(event) {
  kinet.animate(
    "x",
    window.scrollX + event.clientX - document.body.clientWidth / 2
  );
  kinet.animate("y", window.scrollY + event.clientY - window.innerHeight / 2);
  aaa = event;
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
  backgroundColor: 0x000b65,
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
  pic_layer.querySelector("canvas").style.backgroundColor = "#000b65" + col;
}
