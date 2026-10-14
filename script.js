// Мобильное меню и интерактивная подготовка письма.
// Форма не отправляет данные на сервер: она открывает почтовое приложение пользователя.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector(".menu-label").textContent = isOpen ? "Закрыть" : "Меню";
    menuToggle.querySelector(".menu-icon").textContent = isOpen ? "×" : "☰";
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector(".menu-label").textContent = "Меню";
      menuToggle.querySelector(".menu-icon").textContent = "☰";
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector(".menu-label").textContent = "Меню";
      menuToggle.querySelector(".menu-icon").textContent = "☰";
      document.body.classList.remove("menu-open");
    }
  });
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Запрос на дизайн от ${name}`);
    const body = encodeURIComponent(
      `Здравствуйте, Дарья!\n\n${message}\n\nИмя: ${name}\nEmail для ответа: ${email}`
    );

    // Замените адрес-заглушку на реальный адрес перед публикацией.
    const designerEmail = "hello@example.com";
    formStatus.textContent = "Открываем почтовую программу. Если она не запустилась, проверьте настройки браузера.";
    window.location.href = `mailto:${designerEmail}?subject=${subject}&body=${body}`;
  });
}
