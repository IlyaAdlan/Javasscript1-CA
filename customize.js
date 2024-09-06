async function fetchProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    try {
        const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
        const products = await response.json();

        const product = products.find(p => p.id === productId);  // Dont really understand this part

        if (product) {
            displayProductsDetails(product);
        } else {
            document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
        }
        
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
  }

  function displayProductsDetails(product) {
    const productDetailContainer = document.getElementById('product-details');
    productDetailContainer.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h1>${product.title}</h1>
    <p>${product.description}</p>
    <p>Price: ${product.price}kr</p>
    <p>Sizes: ${product.sizes.join(', ')}</p>
    <p>Base Color: ${product.baseColor}</p>
    `;

    document.getElementById('add-to-basket').addEventListener('click', () => {
      addToBasket(product);
    });
  }

  function addToBasket(product) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    basket.push({ id: product.id, name: product.title}); // adding items
    localStorage.setItem('basket', JSON.stringify(basket)); // saves to localStorage(i think?)

    alert(`${product.title} has been added to your basket.`);
  }

  fetchProductDetails();