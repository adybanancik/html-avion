import headerAnimation from "../../modules/header/headerAnimation";
import "./../scss/style.scss";

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".my-header");
  if (header) {
    headerAnimation();
  }
});
