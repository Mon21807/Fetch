// Fetch data from JSON Server
function fetchData(endpoint) {
    return fetch(`http://localhost:3000/${endpoint}`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}

// Sign up functionality
function signUp(userData) {
    return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .catch(error => console.error('Error signing up:', error));
}

// Login functionality
function login(userCredentials) {
    return fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email === userCredentials.email && u.password === userCredentials.password);
            return user;
        })
        .catch(error => console.error('Error logging in:', error));
}

// Display products dynamically
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.src}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            <button class="remove-from-cart" data-id="${product.id}" style="display:none;">Remove from Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchData('products').then(products => displayProducts(products));

    // Sign up form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const userData = {
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value
            };
            signUp(userData)
                .then(() => alert('Sign up successful!'))
                .catch(error => console.error('Error signing up:', error));
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const userCredentials = {
                email: event.target.email.value,
                password: event.target.password.value
            };
            login(userCredentials)
                .then(user => {
                    if (user) {
                        localStorage.setItem('loggedInUser', JSON.stringify(user));
                        window.location.href = 'index.html';
                    } else {
                        alert('Invalid email or password. Please try again.');
                    }
                })
                .catch(error => console.error('Error logging in:', error));
        });
    }
});
//Index:
//http://localhost:3000/

//Endpoints:
//http://localhost:3000/users
//http://localhost:3000/products
//http://localhost:3000/allUsersCart