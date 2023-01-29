//PRODUCTS
var productList = [];
var cart = [];
var isCartOpen = false;

function fetchProducts() {
    const username = document.getElementById("username");
    username.innerHTML = "Welcome, " + window.localStorage.getItem('username');

    fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((data) => {
            productList = data;
            const productsDiv = document.getElementById("products");
            if (data.length > 0) {
                data.forEach(element => {
                    const product = document.createElement("div");
                    const productElement = `
                <div class="login-form-container">
                <form action="">
                    <h3>${element.title}</h3>
                    <img src=${element.img} alt="Product" height="200" width="200"/> 
                    <h4>Description: ${element.desc}</h4>
                    <h4>Price: ${element.price}£</h4>
                    <label for="productQuantity">Quantity</label>
                    <input type="number" id="productQuantity${element._id}" name="Quantity" min="0" max="100" value=1 style="border: 1px solid #000;">
                    <input type="hidden" id="${element._id}" name="custId" value="${element._id}">
                    <button type="button" onclick="addToCart('${element._id}')" class="btn">Add to Cart</button>
                </form>
                </div>
               `;
                    product.innerHTML = productElement;
                    productsDiv.appendChild(product)
                });
            } else {
                productsDiv.innerHTML = `
            <div class="login-form-container">
            <form action="">
                <h3>There are no products available, sorry for the inconvenience</h3>
            </form>
            </div>
           `
            }
            console.log(data);
        });
}

// function for adding products to cart
function addToCart(productID) {
    const selectedProduct = productList.find(element => element._id === productID);
    const productOrder = JSON.parse(JSON.stringify(selectedProduct));
    productOrder["quantity"] = document.getElementById(`productQuantity${productID}`).value;

    if (cart.some(element => element._id === productID)) {
        cart = cart.filter(element => element._id != productID);
    }

    cart.push(productOrder);
    updateCart();
}
//remove items from cart
function removeFromCart(productID) {
    cart = cart.filter(element => element._id != productID);
    updateCart();
}
//update items from cart
function updateCart() {
    const cartNav = document.getElementById("mySidenav");
    cartNav.innerHTML = "<div style='padding-top:100px'></div>";
    cart.forEach(element => {
        const product = document.createElement("div");
        const productElement = `
        <div class="login-form-container">
        <form action="">
            <h3>${element.title}</h3>
            <img src=${element.img} alt="Product" height="60" width="60"/> 
            <h4>Price: ${element.price}£</h4>
            <h4>Quantity: ${element.quantity}</h4>
            <div id="login-btn" onclick="removeFromCart('${element._id}')">
            <button class="btn">Remove from cart</button>
            </div>
        </form>
        </div>
       `;
        product.innerHTML = productElement;
        cartNav.appendChild(product);
    });
    const btn = document.createElement("div");
    btn.innerHTML = `
    <div id="login-btn" style="padding-left:90px">
    <button class="btn">Checkout</button>
    </div>
    `
    cartNav.appendChild(btn);
}

//LOGIN
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    console.log(email);
    console.log(password);

    fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: email, password: password })
        }).then(function(res) {
            if (res.status != 200) {
                alert("Invalid credentials")
                throw new Error("Login unsuccessful");
            }
            return res.json();
        })
        .then(function(data) {
            console.log(JSON.stringify(data));
            window.localStorage.setItem('token', data.accessToken);
            window.localStorage.setItem('userID', data._id);
            window.localStorage.setItem('username', data.username);
            console.log(window.localStorage.getItem('username'))
            window.location.replace("/products.html");
        });
}

//register to the website with a unique username,email,pass
function register() {
    const email = document.getElementById("registerEmail").value;
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password, email: email })
        }).then(function(res) {
            if (res.status != 201) {
                alert("Register unsuccessful. Try Again.")
                throw new Error("Register unsuccessful");
            }
            return res.json();
        })
        .then(function(data) {
            fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: email, password: password })
                }).then(function(res) { return res.json(); })
                .then(function(data) {
                    console.log(JSON.stringify(data));
                    window.localStorage.setItem('token', data.accessToken);
                    window.localStorage.setItem('userID', data._id);
                    window.localStorage.setItem('username', data.username);
                    console.log(window.localStorage.getItem('username'))
                    window.location.replace("/products.html");
                });

        });
}

function openNav() {
    if (isCartOpen) {
        document.getElementById("mySidenav").style.width = "350px";
        updateCart();
        isCartOpen = false;
    } else {
        document.getElementById("mySidenav").style.width = "0";
        isCartOpen = true;
    }


}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

`{
    "title": "Clutch",
    "desc": "Manual shift clutch",
    "img": "static/images/clutch.jpeg",
    "price": 500
}`