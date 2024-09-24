// AngularJS Application
var app = angular.module('shoppingApp', []);

// Controller for Product Page
app.controller('ProductController', function($scope) {
    // Check if cart exists in localStorage
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Sample products
    $scope.products = [
        { name: 'Nikon Camera D3500 24MP', description: 'Best Camera under 30000', price: 29000, image: 'a.jpg', quantity: 1 },
        { name: '4k video rec camera', description: 'Best Camera under 50000', price: 49000, image: 'abc.jpeg', quantity: 1 },
        { name: 'Nikon D56000', description: 'Best Camera under 59999', price: 56000, image: 'c.webp', quantity: 1 },
        { name: 'Children Video Rec Camera', description: 'Child friendly UI camera', price: 45000, image: 'bbc.jpeg', quantity: 1 },
        { name: 'Xaomi 4K Vlogging Camera', description: 'Best in segment camera', price: 42044, image: 'dds.jpeg', quantity: 1 },
        { name: 'Photography Kit with All Accessories Inc.', description: 'Camera | tripod | Gimbal | Remote', price: 53000, image: 'ccc.jpeg', quantity: 1 }
    ];

    // Add to Cart function
    $scope.addToCart = function(product) {
        var found = false;
        $scope.cart.forEach(function(item) {
            if (item.name === product.name) {
                item.quantity++;
                found = true;
            }
        });
        if (!found) {
            $scope.cart.push(angular.copy(product));
        }
        saveCart();
    };

    // Get total price
    $scope.getTotal = function() {
        return $scope.cart.reduce(function(total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    };

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    }

    // Proceed to checkout
    $scope.checkout = function() {
        window.location.href = "checkout.html";
    };
});

// Controller for Checkout Page
app.controller('CheckoutController', function($scope) {
    // Load cart from localStorage
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];

    // User information
    $scope.user = {
        name: '',
        address: '',
        phone: ''
    };

    // Update Cart Quantity
    $scope.updateCart = function(item) {
        if (item.quantity <= 0) {
            $scope.removeFromCart(item);
        }
        saveCart();
    };

    // Remove Item from Cart
    $scope.removeFromCart = function(item) {
        var index = $scope.cart.indexOf(item);
        if (index !== -1) {
            $scope.cart.splice(index, 1);
        }
        saveCart();
    };

    // Calculate Total Price
    $scope.getTotal = function() {
        return $scope.cart.reduce(function(total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    };

    // Save cart to localStorage after updating
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    }

    // Place Order
    $scope.placeOrder = function() {
        if ($scope.user.name && $scope.user.address && $scope.user.phone) {
            alert('Order Placed Successfully!\nTotal: ₹' + $scope.getTotal());
            $scope.cart = [];
            saveCart();  // Clear the cart after placing the order
            window.location.href = "index.html";
        } else {
            alert('Please fill out your details.');
        }
    };
});

// Controller for Contact Page
app.controller('ContactController', function($scope) {
    $scope.authors = [
        { 
            name: 'Simon Khemali', 
            email: 'simon.khemali@christcollegepune.org', 
        },
        { 
            name: 'Brisan george', 
            email: 'boban.george@christcollegepune.org', 
          
        }
       
    ];
});

