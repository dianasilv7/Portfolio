function enterSite() {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  // Efeito de zoom antes de desaparecer
  intro.classList.add("zoom-out");

  setTimeout(() => {
    intro.style.display = "none";
    main.classList.add("visible");
    document.body.style.overflow = "auto";
  }, 1200); // mesmo tempo da transição
}