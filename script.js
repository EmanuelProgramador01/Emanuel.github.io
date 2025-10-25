const LESMAS = [
  {
    name:"Infurnus",
    type:"Fogo",
    habitat:"Cavernas de magma",
    desc:"Uma das lesmas mais poderosas, domina o fogo com intensidade.",
    skills:"Explosão de magma, Lança-chamas",
    rarity:"Lendária",
    imageNormal:"https://static.wikia.nocookie.net/slugterra/images/3/3f/BurpySlug.png",
    imageTransform:"https://static.wikia.nocookie.net/slugterra/images/4/48/Burpy_Slug_Transform.png",
    imageMegamorfoNormal:"https://static.wikia.nocookie.net/slugterra/images/0/0b/Burpy_Megamorfo.png",
    imageMegamorfoTransform:"https://static.wikia.nocookie.net/slugterra/images/1/15/Burpy_Megamorfo_Transform.png"
  },
  {
    name:"Molenoid",
    type:"Água",
    habitat:"Rios subterrâneos",
    desc:"Lesma rápida, controla água e correntes.",
    skills:"Jato d'água, Hidroescudo",
    rarity:"Rara",
    imageNormal:"https://static.wikia.nocookie.net/slugterra/images/f/f1/Pronto_Slug.png",
    imageTransform:"https://static.wikia.nocookie.net/slugterra/images/5/5e/Pronto_Transform.png",
    imageMegamorfoNormal:"https://static.wikia.nocookie.net/slugterra/images/d/d3/Pronto_Megamorfo.png",
    imageMegamorfoTransform:"https://static.wikia.nocookie.net/slugterra/images/2/24/Pronto_Megamorfo_Transform.png"
  },
  {
    name:"Terra",
    type:"Terra",
    habitat:"Túneis e cavernas",
    desc:"Fortemente blindada, resistente a ataques físicos.",
    skills:"Mordida pesada, Terremoto",
    rarity:"Comum",
    imageNormal:"https://static.wikia.nocookie.net/slugterra/images/2/28/Chomper_Slug.png",
    imageTransform:"https://static.wikia.nocookie.net/slugterra/images/3/30/Chomper_Transform.png",
    imageMegamorfoNormal:"https://static.wikia.nocookie.net/slugterra/images/5/55/Chomper_Megamorfo.png",
    imageMegamorfoTransform:"https://static.wikia.nocookie.net/slugterra/images/7/7c/Chomper_Megamorfo_Transform.png"
  }
];

const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalType = document.getElementById("modal-type");
const modalHabitat = document.getElementById("modal-habitat");
const modalDesc = document.getElementById("modal-desc");
const modalSkills = document.getElementById("modal-skills");
const modalRarity = document.getElementById("modal-rarity");
const btnNormalTransform = document.getElementById("btn-normal-transform");
const btnNormalMegamorfo = document.getElementById("btn-normal-megamorfo");
const modalClose = document.getElementById("modal-close");

let currentLesma = null;
let toggleStateNT = false; // Normal/Transformada
let toggleStateNM = false; // Normal/Megamorfo

function renderCatalog(items){
  catalog.innerHTML = "";
  if(items.length === 0){
    catalog.innerHTML = "<p style='color:#A9B2C3;padding:20px'>Nenhuma lesma encontrada.</p>";
    return;
  }
  items.forEach(l => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${l.imageNormal}" alt="${l.name}" />
      <div class="card-body">
        <h3 class="card-title">${l.name}</h3>
        <p class="card-type">${l.type}</p>
      </div>
    `;
    card.addEventListener("click", () => openModal(l));
    catalog.appendChild(card);
  });
}

function openModal(lesma){
  currentLesma = lesma;
  toggleStateNT = false;
  toggleStateNM = false;
  modalImg.src = lesma.imageNormal;
  modalName.textContent = lesma.name;
  modalType.textContent = lesma.type;
  modalHabitat.textContent = lesma.habitat;
  modalDesc.textContent = lesma.desc;
  modalSkills.textContent = lesma.skills;
  modalRarity.textContent = lesma.rarity;
  modal.classList.add("show");
}

modalClose.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if(e.target === modal) modal.classList.remove("show");
});

btnNormalTransform.addEventListener("click", () => {
  if(!currentLesma) return;
  toggleStateNT = !toggleStateNT;
  toggleStateNM = false;
  modalImg.src = toggleStateNT ? currentLesma.imageTransform : currentLesma.imageNormal;
});

btnNormalMegamorfo.addEventListener("click", () => {
  if(!currentLesma) return;
  toggleStateNM = !toggleStateNM;
  toggleStateNT = false;
  modalImg.src = toggleStateNM ? currentLesma.imageMegamorfoTransform : currentLesma.imageMegamorfoNormal;
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = LESMAS.filter(l => l.name.toLowerCase().includes(searchTerm) || l.type.toLowerCase().includes(searchTerm));
  renderCatalog(filtered);
});

// Inicializa o catálogo
renderCatalog(LESMAS);
