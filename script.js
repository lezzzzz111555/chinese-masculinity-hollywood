const films = [
  {
    keyword: "Threat",
    title: "The Mask of Fu Manchu (1932)",
    director: "Charles Brabin",
    image: "images/fu-manchu.jpg",
    alt: "The Mask of Fu Manchu film image",
    synopsis:
      "A notorious villain seeks ancient power, while Western characters frame him as a racial and civilizational threat.",
    matters:
      "This film marks an early Hollywood image of Chinese masculinity as dangerous, excessive, and racially feared. The Chinese male figure is not allowed interiority or romance; he appears as a threat to be contained."
  },
  {
    keyword: "Body",
    title: "Enter the Dragon (1973)",
    director: "Robert Clouse",
    image: "images/enter-the-dragon.jpg",
    alt: "Enter the Dragon film image",
    synopsis:
      "A martial artist enters a deadly tournament, turning the Chinese male body into a source of global spectacle and cinematic power.",
    matters:
      "Bruce Lee transformed the visibility of Chinese masculinity in Hollywood. Yet this visibility was largely attached to physical discipline, speed, and martial spectacle rather than romantic or emotional centrality."
  },
  {
    keyword: "Fantasy",
    title: "M. Butterfly (1993)",
    director: "David Cronenberg",
    image: "images/m-butterfly.jpg",
    alt: "M. Butterfly film image",
    synopsis:
      "A French diplomat becomes absorbed in a fantasy of the East, misrecognising both gender and cultural identity through his own Orientalist desires.",
    matters:
      "The film complicates representation by showing how Chinese masculinity can be feminized, disguised, and misread through Western fantasy. It is not a simple stereotype, but a more unstable drama of desire, performance, and misrecognition."
  },
  {
    keyword: "Denied Intimacy",
    title: "Romeo Must Die (2000)",
    director: "Andrzej Bartkowiak",
    image: "images/romeo-must-die.jpg",
    alt: "Romeo Must Die film image",
    synopsis:
      "A Chinese action hero becomes central to the narrative through combat, loyalty, and sacrifice, but the film limits the full expression of interracial romance.",
    matters:
      "The film shows that Hollywood could make a Chinese male hero powerful and likeable while still restricting his romantic desirability. Action becomes visible, but intimacy remains conditional."
  },
  {
    keyword: "Negotiated Visibility",
    title: "Shang-Chi and the Legend of the Ten Rings (2021)",
    director: "Destin Daniel Cretton",
    image: "images/shang-chi.jpg",
    alt: "Shang-Chi and the Legend of the Ten Rings film image",
    synopsis:
      "A young man confronts family history, inherited power, and personal identity while entering the centre of a global superhero franchise.",
    matters:
      "Shang-Chi offers a more emotionally legible and central Chinese/Asian male hero. However, this does not mean representation is fully resolved. His visibility is expanded, but still shaped by blockbuster conventions, market conditions, and negotiated cultural expectations."
  }
];

document.documentElement.classList.add("js");

const stageCard = document.querySelector("#stage-card");
const stageImage = document.querySelector("#stage-image");
const stageKeyword = document.querySelector("#stage-keyword");
const stageTitle = document.querySelector("#stage-film-title");
const stageDirector = document.querySelector("#stage-director");
const stageSynopsis = document.querySelector("#stage-synopsis");
const stageMatters = document.querySelector("#stage-matters");
const timelineNodes = document.querySelectorAll(".timeline-node");
const previousButton = document.querySelector("#prev-film");
const nextButton = document.querySelector("#next-film");

let activeFilm = 0;

function updateStage(index) {
  activeFilm = (index + films.length) % films.length;
  const film = films[activeFilm];

  stageCard.classList.add("is-changing");

  window.setTimeout(() => {
    stageImage.src = film.image;
    stageImage.alt = film.alt;
    stageKeyword.textContent = film.keyword;
    stageTitle.textContent = film.title;
    stageDirector.textContent = `Director: ${film.director}`;
    stageSynopsis.textContent = film.synopsis;
    stageMatters.textContent = film.matters;

    timelineNodes.forEach((node, nodeIndex) => {
      const isActive = nodeIndex === activeFilm;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-selected", String(isActive));
    });

    stageCard.classList.remove("is-changing");
  }, 170);
}

timelineNodes.forEach((node) => {
  node.addEventListener("click", () => {
    updateStage(Number(node.dataset.index));
  });
});

previousButton.addEventListener("click", () => {
  updateStage(activeFilm - 1);
});

nextButton.addEventListener("click", () => {
  updateStage(activeFilm + 1);
});

const reflectionForm = document.querySelector("#reflection-form");
const reflectionMessage = document.querySelector("#reflection-message");

reflectionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  reflectionMessage.hidden = false;
});

// Mark missing local images so the designed placeholders remain presentable on GitHub Pages.
document.querySelectorAll(".poster-shell img").forEach((image) => {
  image.addEventListener("error", () => {
    image.closest(".poster-shell").classList.add("is-missing");
  });
});

// Small reveal animation for section content, with regular content visible as the fallback.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}
