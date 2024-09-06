let productsArray = [];

async function fetchData() {
    try {
        const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
        const data = await response.json();
        productsArray = data;
        console.log('Fetched Products:', productsArray);

        displayProducts(productsArray);
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
 }

function displayProducts(products) {
  const galleryContainer = document.querySelector('.gallery-container');
  galleryContainer.innerHTML = '';  //Clearing existing products to dynamically add new

products.forEach(({ id, title, image }) => {
  const productElement = document.createElement('div');
  productElement.classList.add('gallery');
  productElement.innerHTML = `
            <a href="customize.html?id=${id}">
                <img class="rain-jacket" src="${image}" alt="${title}">
            </a>
            <div class="description">
                <h1>${title}</h1>
            </div>
        `;
        galleryContainer.appendChild(productElement);
});

}

function filterProducts(gender) {
  if (gender === 'all') {
    displayProducts(productsArray);
  } else {
    const filterProducts = productsArray.filter(product => product.gender.toLowerCase() === gender.toLowerCase());
    displayProducts(filterProducts);
  }
}



document.getElementById('filter-male').addEventListener('click', () => filterProducts('male'));
document.getElementById('filter-female').addEventListener('click', () => filterProducts('female'));
document.getElementById('filter-all').addEventListener('click', () => filterProducts('all'));

fetchData()