const header = document.querySelector("#header");

window.onscroll = handleScroll;
document.onload = handleScroll;

function handleScroll() {
  //   console.log(window.scrollY);
  if (window.scrollY == 0) {
    header.classList.remove("float");
  } else if (window.scrollY > 0) {
    header.classList.add("float");
  }
}
