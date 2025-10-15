// script.js

// --- Product dataset (edit / add items here) ---
const PRODUCTS = [
  { id:1, name:"Premium Basmati Rice", price:250, img:"images/Basmati-Rice.avif", category:"Grains", desc:"Finest quality basmati rice — extra-long grains and perfect aroma." },
  { id:2, name:"Shan Biryani Masala", price:120, img:"images/masala1.jpg", category:"Masala", desc:"Authentic biryani masala for rich flavour." },
  { id:3, name:"Olive Oil 400ml", price:1200, img:"images/olive-oil.jpg", category:"Oils", desc:"Cold-pressed olive oil, premium quality." },
  { id:4, name:"Pure Desi Ghee 1kg", price:220, img:"images/ghee.webp", category:"Dry Fruits", desc:"Pure desi ghee made traditionally." },
  { id:5, name:"Almonds 1kg", price:1000, img:"images/almonds.jpg", category:"Dry Fruits", desc:"Fresh premium almonds." },
  { id:6, name:"Honey Pure 500g", price:650, img:"images/honey.jpg", category:"Honey", desc:"Natural honey, pure & raw." },
  { id:7, name:"Brown Bread (loaf)", price:120, img:"images/brown-bread.webp", category:"Bakery", desc:"Soft fresh brown bread." },
  { id:8, name:"Milk 1ltr", price:180, img:"images/milk.jpg", category:"Dairy", desc:"Fresh full-cream milk." }
];

// Populate product grid
function renderProducts(filterCat="All"){
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  const items = filterCat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filterCat);
  if(items.length === 0){
    grid.innerHTML = "<p style='text-align:center;color:#777;padding:30px;'>No products in this category.</p>";
    return;
  }
  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">Rs ${p.price}</div>
      <p style="color:var(--muted);font-size:.95rem;margin-bottom:10px">${p.desc.substring(0,70)}${p.desc.length>70?'...':''}</p>
      <div class="actions">
        <a class="btn view-btn" data-id="${p.id}">View Details</a>
        <a class="btn secondary" href="javascript:void(0)" onclick="shareWhats('${encodeURIComponent(p.name)}')">Order via WhatsApp</a>
      </div>
    `;
    grid.appendChild(div);
  });

  // attach view handlers
  document.querySelectorAll(".view-btn").forEach(b=>{
    b.addEventListener("click", (e)=>{
      const id = Number(b.getAttribute("data-id"));
      const prod = PRODUCTS.find(x=>x.id===id);
      if(prod){
        localStorage.setItem("selectedProduct", JSON.stringify(prod));
        window.location.href = "product.html";
      }
    });
  });
}

function shareWhats(name){
  const msg = `I want to buy ${name} from Ahmed Raza Women's Mart`;
  window.open(`https://wa.me/923331292325?text=${encodeURIComponent(msg)}`, "_blank");
}

// Category buttons
document.addEventListener("DOMContentLoaded", ()=>{
  renderProducts("All");
  document.querySelectorAll(".cat-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const cat = btn.getAttribute("data-cat");
      renderProducts(cat === "All" ? "All" : cat);
      // scroll to products
      document.getElementById("productsSection").scrollIntoView({behavior:"smooth"});
    });
  });
});


// If came from categories page, apply filter on index load
document.addEventListener("DOMContentLoaded", ()=>{
  const cat = localStorage.getItem('categoryScrollTo');
  if(cat){
    renderProducts(cat);
    document.getElementById('productsSection').scrollIntoView({behavior:"smooth"});
    localStorage.removeItem('categoryScrollTo');
  }
});
