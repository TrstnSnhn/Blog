const navToggle = document.querySelector(".navbar-toggler");
const navMenu = document.querySelector("#navbarNav");

if (navToggle && navMenu) {
  const setNavOpen = (isOpen) => {
    navMenu.classList.toggle("is-open", isOpen);
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  };

  navToggle.addEventListener("click", () => {
    setNavOpen(!navMenu.classList.contains("is-open"));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      setNavOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavOpen(false);
    }
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-link").forEach((link) => {
  const linkTarget = link.getAttribute("href");

  if (linkTarget === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

const searchInput = document.querySelector("#postSearch");
const filterButtons = document.querySelectorAll("[data-filter]");
const postCards = document.querySelectorAll("[data-post-card]");
const postCount = document.querySelector("#postCount");
const emptyState = document.querySelector("#emptyState");
let activeFilter = "all";

function updatePostList() {
  if (!postCards.length) return;

  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  let visibleCount = 0;

  postCards.forEach((card) => {
    const title = card.dataset.title || "";
    const tags = card.dataset.tags || "";
    const author = card.dataset.author || "";
    const matchesQuery = [title, tags, author].join(" ").toLowerCase().includes(query);
    const matchesFilter = activeFilter === "all" || tags.toLowerCase().includes(activeFilter);
    const isVisible = matchesQuery && matchesFilter;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (postCount) {
    postCount.textContent = `${visibleCount} ${visibleCount === 1 ? "story" : "stories"}`;
  }

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", updatePostList);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((item) => item.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    updatePostList();
  });
});

updatePostList();

const readingProgress = document.querySelector("[data-reading-progress]");
const article = document.querySelector("article.post");
let progressTicking = false;

function updateReadingProgress() {
  if (!readingProgress || !article) return;

  const articleTop = article.offsetTop;
  const articleHeight = article.offsetHeight;
  const viewportHeight = window.innerHeight;
  const readableDistance = Math.max(articleHeight - viewportHeight * 0.4, 1);
  const currentDistance = window.scrollY - articleTop + viewportHeight * 0.25;
  const progress = Math.min(Math.max(currentDistance / readableDistance, 0), 1);

  readingProgress.style.transform = `scaleX(${progress})`;
}

function queueReadingProgressUpdate() {
  if (progressTicking) return;

  progressTicking = true;
  window.requestAnimationFrame(() => {
    updateReadingProgress();
    progressTicking = false;
  });
}

if (readingProgress && article) {
  updateReadingProgress();
  window.addEventListener("scroll", queueReadingProgressUpdate, { passive: true });
  window.addEventListener("resize", queueReadingProgressUpdate);
}
