// ======= Меню =======
const menuBtn = document.getElementById("menuToggle");
const mainDropdown = document.getElementById("mainDropdown");

// Відкриття/закриття головного меню по кліку
menuBtn.addEventListener("click", e => {
  e.stopPropagation();
  mainDropdown.style.display = mainDropdown.style.display === "block" ? "none" : "block";
});

// Підменю: відкриття по кліку
document.querySelectorAll(".submenu-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const targetId = btn.dataset.target;
    const submenu = document.getElementById(targetId);
    if (submenu) {
      // Ховаємо всі інші підменю на цьому рівні
      const parent = btn.closest(".dropdown, .submenu");
      parent.querySelectorAll(".submenu").forEach(sm => {
        if (sm !== submenu) sm.style.display = "none";
      });
      // Перемикаємо поточне підменю
      submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    }
  });
});

// Leaf-кнопка закриває все меню
document.querySelectorAll(".leaf").forEach(btn => {
  btn.addEventListener("click", e => {
    mainDropdown.style.display = "none";
    document.querySelectorAll(".submenu").forEach(sm => sm.style.display = "none");
    console.log("Обрано:", e.target.textContent);
  });
});

// Закриття меню при кліку поза меню
document.addEventListener("click", e => {
  if (!e.target.closest(".menu")) {
    mainDropdown.style.display = "none";
    document.querySelectorAll(".submenu").forEach(sm => sm.style.display = "none");
  }
});

// ======= Вибір мови =======
const languageWidget = document.getElementById("languageWidget");
const mainFlag = document.getElementById("mainFlag");
const languageDropdown = document.getElementById("languageDropdown");
let langOpen = false;

// Відкриття/закриття списку мов по кліку
mainFlag.addEventListener("click", e => {
  e.stopPropagation();
  langOpen = !langOpen;
  languageDropdown.style.display = langOpen ? "block" : "none";
});

// Вибір мови
languageDropdown.querySelectorAll(".flag-option").forEach(flag => {
  flag.addEventListener("click", e => {
    mainFlag.textContent = e.target.textContent;
    languageDropdown.style.display = "none";
    langOpen = false;
  });
});

// Закриття при кліку поза віджетом
document.addEventListener("click", e => {
  if (!e.target.closest("#languageWidget")) {
    languageDropdown.style.display = "none";
    langOpen = false;
  }
});

// ======= Тема =======
const themeCheckbox = document.getElementById("themeCheckbox");
themeCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeCheckbox.checked);
});
