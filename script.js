const toggleSideBar = document.querySelector(".category-toggle");
const sideBar = document.querySelector(".side-bar");
const closeBtn = document.querySelector(".close-btn");
const sideBarList = document.querySelector(".side-bar-list");
const categoryBtn = document.querySelectorAll(".category-btn");
const grid = document.getElementById("productGrid");
const currentYear = document.getElementById("currentYear");

toggleSideBar.addEventListener("click", () => {
  sideBar.classList.add("show-side-bar");
  toggleSideBar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sideBar.classList.remove("show-side-bar");
  toggleSideBar.classList.remove("active");
});

// toggleSideBar.className === "active"
//   ? (toggleSideBar.style.display = "none")
//   : null;

const products = [
  {
    id: 1,
    name: "Modern Oak Cabinet",
    category: "Furniture",
    price: "$299",
    image: "img/cabinet.jpg",
    inStock: true,
    description:
      "A stunning modern cabinet crafted from solid oak wood. Features three spacious compartments with adjustable shelves. Perfect for living rooms, bedrooms, or home offices. Combines minimalist design with natural wood warmth.",
  },
  {
    id: 2,
    name: "Minimalist Desk Lamp",
    category: "Lighting",
    price: "$89",
    image: "img/minimalist-desk-lamp.jpg",
    inStock: false,
    description:
      "Sleek and contemporary desk lamp with soft LED lighting. Adjustable arm and dimmable brightness control. Energy-efficient and reduces eye strain. Perfect for work or study spaces.",
  },
  {
    id: 3,
    name: "Handmade Leather Bag",
    category: "Accessories",
    price: "$159",
    image: "img/handmade-leather-bag.jpg",
    inStock: true,
    description:
      "Premium handcrafted leather bag made from genuine Italian leather. Spacious interior with multiple pockets. Durable hardware and reinforced stitching. A timeless accessory for any occasion.",
  },
  {
    id: 4,
    name: "Scandinavian Armchair",
    category: "Seating",
    price: "$429",
    image: "img/scandinavian-armchair.jpg",
    description:
      "Elegant Scandinavian-inspired armchair with clean lines and comfort. Upholstered in high-quality fabric with wooden legs. Perfect for reading nooks or living spaces. Combines style with comfort.",
  },
  {
    id: 5,
    name: "Soft Cushion Set",
    category: "Decor",
    price: "$69",
    image: "img/soft-cushion-set.jpg",
    inStock: true,
    description:
      "Set of four decorative cushions with soft, premium fabric. Comes in neutral tones that complement any interior. Machine washable covers for easy maintenance. Perfect for sofas or beds.",
  },
  {
    id: 6,
    name: "Wall Art Prints",
    category: "Wall decor",
    price: "$39",
    image: "img/wall-art-prints.jpg",
    inStock: false,
    description:
      "Beautiful modern art prints set of three. High-quality printing on premium matte paper. Perfect for adding character to any room. Ready to frame or display with included hanging hardware.",
  },
  {
    id: 7,
    name: "Ceramic Vase Set",
    category: "Home decor",
    price: "$48",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    description:
      "Set of three handcrafted ceramic vases with unique glaze finishes. Perfect for displaying flowers or as standalone decorative pieces. Each vase is individually crafted, making them unique.",
  },
  {
    id: 8,
    name: "Premium Throw Blanket",
    category: "Lighting",
    price: "$79",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    description:
      "Luxurious throw blanket made from soft, breathable fabric. Generous size perfect for sofas or beds. Temperature-regulating properties for year-round comfort. Machine washable and durable.",
  },
];

function sideBarLists() {
  sideBarList.innerHTML = products
    .map(
      (product) => `
    <a href="#" class="category-btn">${product.category}</a>
  `,
    )
    .join("");
}
sideBarLists();

function renderProducts() {
  grid.innerHTML = products
    .map((product) => {
      return `
    <article class="product-card" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <span class="in-stock" >${product.inStock ? "In Stock" : "Out of Stock"}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">
          <span>${product.price}</span>
          <button class="product-action">Add to cart</button>
        </div>
      </div>
    </article>
  `;
      const inStock = document.querySelector(".in-stock");
      console.log(inStock);
    })
    .join("");

  // if (inStock) {
  //   inStock.style.color = "green";
  // } else {
  //   inStock.style.color = "red";
  // }

  // Add click event listeners to product cards
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.getAttribute("data-product-id");
      openProductModal(productId);
    });
  });
}

const year = new Date().getFullYear();
currentYear.textContent = year;

// Product Modal functionality
const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");

function openProductModal(productId) {
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) return;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalCategoryFull").textContent = product.category;
  document.getElementById("modalPrice").textContent = product.price;
  document.getElementById("modalDescription").textContent = product.description;

  productModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productModal.classList.remove("show");
  document.body.style.overflow = "auto";
}

modalClose.addEventListener("click", closeProductModal);

// Close modal when clicking outside content
productModal.addEventListener("click", (e) => {
  if (e.target === productModal) {
    closeProductModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && productModal.classList.contains("show")) {
    closeProductModal();
  }
});

// Back-to-top button functionality
const backTopBtn = document.querySelector(".back-top");
const heroCopy = document.querySelector(".hero-copy");

// Hide button initially
backTopBtn.style.display = "none";

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
  const heroSectionBottom = heroCopy.offsetHeight;
  if (window.scrollY > heroSectionBottom) {
    backTopBtn.style.display = "block";
  } else {
    backTopBtn.style.display = "none";
  }
});

backTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

renderProducts();
