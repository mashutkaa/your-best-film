async function loadNav() {
  const response = await fetch("nav.html");
  const navHTML = await response.text();
  document.getElementById("nav-container").innerHTML = navHTML;


  const script = document.createElement("script");
  script.src = "./js/login-window.js";
  document.body.appendChild(script);
}
document.addEventListener("DOMContentLoaded", loadNav);
