const apiBase = "http://rainydays.local";
const woocommerceBase = "/wp-json/wc/store";
const productBase = "/products";
const featuredBase = "/products?&featured=true";

const pagesBase = "/wp-json/wp/v2/pages";

const fullPagesURL = apiBase + pagesBase;
const fullProductURL = apiBase + woocommerceBase + productBase;
const fullProductURLExample = "http://rainydays.local/wp-json/wc/store/products";

async function getProducts() {
    const response = await fetch(fullProductURL);
    
    const products = await response.json();
    
    return products
}

async function getProduct(id) {
    const response = await fetch(fullProductURL + `/${id}`);
    
    const result = await response.json();

}

async function getFeaturedProduct(){
    const response = await fetch(apiBase + woocommerceBase + featuredBase);
    const featured = await response.json();
    console.log(featured)
}

function createProductHTML(product) {
    const container = document.querySelector(".container");
  
    const anchorTagWrapper = document.createElement("a");
    anchorTagWrapper.href = `details.html?id=${product.id}`;
  
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


function createProductsHTML(products)  {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        createProductHTML (product)
        }
}

async function productPage() {
    const products = await getProducts()
    createProductsHTML(products)
}

productPage()
getProduct(17)
