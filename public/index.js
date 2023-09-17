const header = document.querySelector("#header");
const pointer_circle = document.querySelector("#pointer_circle");

window.onscroll = function (e) {
  handleHeader(e);
  // handleKinet(e);
};
document.onload = handleHeader;
document.addEventListener("mousemove", handleKinet);
document.addEventListener("mousedown", () => {
  pointer_circle.classList.add("clicked");
});

document.addEventListener("mouseup", () => {
  pointer_circle.classList.remove("clicked");
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
var kinet = new Kinet({
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
