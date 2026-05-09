(function () {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  if (menuToggle && siteNav) {
    const navLinks = siteNav.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      menuToggle.textContent = expanded ? "+" : "x";
      siteNav.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "+";
      });
    });
  }

  const leadForm = document.getElementById("leadForm");
  const formFeedback = document.getElementById("formFeedback");

  if (leadForm && formFeedback) {
    leadForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const dados = new FormData(leadForm);
      const nome = (dados.get("nome") || "").toString().trim();
      const email = (dados.get("email") || "").toString().trim();

      if (!nome || !email.includes("@")) {
        formFeedback.textContent = "Revise os campos obrigatorios antes de enviar.";
        return;
      }

      formFeedback.textContent = "Mensagem enviada com sucesso. Retornaremos em breve.";
      leadForm.reset();
      setTimeout(() => {
        formFeedback.textContent = "";
      }, 4200);
    });
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const processVideo = document.getElementById("processVideo");
  if (processVideo) {
    let hasScrolled = false;

    const startVideo = () => {
      processVideo.currentTime = 0;
      processVideo.play().catch(() => {});
    };

    const stopVideo = () => {
      processVideo.pause();
    };

    processVideo.addEventListener("ended", stopVideo);

    window.addEventListener(
      "scroll",
      () => {
        hasScrolled = true;
      },
      { passive: true },
    );

    const processObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!hasScrolled) return;

        if (entry.isIntersecting) {
          startVideo();
        } else {
          stopVideo();
        }
      },
      { threshold: 0.45 },
    );

    processObserver.observe(processVideo);
  }
})();
