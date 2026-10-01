let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("sales", JSON.stringify(sales));
}

function showPage(pageName) {
    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.style.display = "none";
    });

    document.getElementById(pageName).style.display = "block";

    updateDisplay();
}

function addProduct() {

    let name = document.getElementById("productName").value;
    let price = Number(document.getElementById("productPrice").value);
    let stock = Number(document.getElementById("productStock").value);

    if (name === "" || price <= 0 || stock < 0) {
        alert("Please enter valid product information.");
        return;
    }

    products.push({
        name: name,
        price: price,
        stock: stock
    });

    saveData();

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productStock").value = "";

    updateDisplay();

    alert("Product added successfully!");
}

function recordSale() {

    let productIndex =
        document.getElementById("saleProduct").value;

    let quantity =
        Number(document.getElementById("saleQuantity").value);

    if (productIndex === "" || quantity <= 0) {
        alert("Please select a product and enter a quantity.");
        return;
    }

    let product = products[productIndex];

    if (quantity > product.stock) {
        alert("Not enough stock available.");
        return;
    }

    let total = product.price * quantity;

    product.stock -= quantity;

    sales.push({
        date: new Date().toLocaleString(),
        product: product.name,
        quantity: quantity,
        total: total
    });

    saveData();

    document.getElementById("saleQuantity").value = "";

    updateDisplay();

    alert(
        "Sale recorded!\nTotal: ₱" +
        total.toFixed(2)
    );
}

function updateDisplay() {

    let productTable =
        document.getElementById("productTable");

    productTable.innerHTML = "";

    products.forEach(function(product) {

        let status = "Available";

        if (product.stock === 0) {
            status = "Out of Stock";
        }
        else if (product.stock <= 5) {
            status = "Low Stock";
        }

        productTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>₱${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>${status}</td>
            </tr>
        `;
    });


    let saleProduct =
        document.getElementById("saleProduct");

    saleProduct.innerHTML =
        '<option value="">Select Product</option>';

    products.forEach(function(product, index) {

        saleProduct.innerHTML += `
            <option value="${index}">
                ${product.name} - ₱${product.price}
            </option>
        `;
    });


    let salesTable =
        document.getElementById("salesTable");

    salesTable.innerHTML = "";

    sales.forEach(function(sale) {

        salesTable.innerHTML += `
            <tr>
                <td>${sale.date}</td>
                <td>${sale.product}</td>
                <td>${sale.quantity}</td>
                <td>₱${sale.total.toFixed(2)}</td>
            </tr>
        `;
    });


    let totalProducts = products.length;

    let totalStock = products.reduce(
        (sum, product) => sum + product.stock,
        0
    );

    let lowStock = products.filter(
        product => product.stock > 0 && product.stock <= 5
    ).length;

    let totalSales = sales.reduce(
        (sum, sale) => sum + sale.total,
        0
    );

    document.getElementById("totalProducts").textContent =
        totalProducts;

    document.getElementById("totalStock").textContent =
        totalStock;

    document.getElementById("lowStock").textContent =
        lowStock;

    document.getElementById("totalSales").textContent =
        "₱" + totalSales.toFixed(2);
}

updateDisplay();