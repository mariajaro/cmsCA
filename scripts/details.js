const apiBase = "http://rainydays.local";
const woocommerceBase = "/wp-json/wc/store";
const productBase = "/products";
const featuredBase = "/products?&featured=true";

const pagesBase = "/wp-json/wp/v2/pages";

const fullPagesURL = apiBase + pagesBase;
const fullProductURL = apiBase + woocommerceBase + productBase;
const fullProductURLExample = "http://rainydays.local/wp-json/wc/store/products";

const mainWrapper = document.querySelector("main")
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const url = "http://rainydays.local/wp-json/wc/store/products" + id;


async function getProduct(id) {
    const response = await fetch(fullProductURL + `/${id}`);
    
    const result = await response.json();

    return result;
}

function createProductHTML(product) {
    const container = document.querySelector(".container");
  
    const anchorTagWrapper = document.createElement("a");
    anchorTagWrapper.href = `product.html?id=${product.id}`;
  
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.id = product.id;
  
    const title = document.createElement("h2");
    title.innerText = product.name;
    productContainer.append(title);
  
    for (let i = 0; i < product.images.length; i++) {
      const imgData = product.images[i];
      const img = document.createElement("img");
      img.src = imgData.src;
      img.alt = imgData.alt;
  
      productContainer.append(img);
    }
  
    anchorTagWrapper.append(productContainer);
    container.append(anchorTagWrapper);
  }

async function renderProducts() {
    const product = await getProduct(id);
    createProductHTML(product)
}

renderProducts();