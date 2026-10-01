let products =
    JSON.parse(localStorage.getItem("products")) || [];

let sales =
    JSON.parse(localStorage.getItem("sales")) || [];

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

let loans =
    JSON.parse(localStorage.getItem("loans")) || [];


function saveData() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    localStorage.setItem(
        "loans",
        JSON.stringify(loans)
    );

}


function showPage(pageName) {

    let pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.style.display = "none";
    });

    document.getElementById(pageName).style.display = "block";

    updateDisplay();

}


function addProduct() {

    let name =
        document.getElementById("productName").value.trim();

    let price =
        Number(
            document.getElementById("productPrice").value
        );

    let stock =
        Number(
            document.getElementById("productStock").value
        );


    if (
        name === "" ||
        price <= 0 ||
        stock < 0
    ) {

        alert(
            "Please enter valid product information."
        );

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


function restockProduct() {

    let productIndex =
        document.getElementById(
            "restockProduct"
        ).value;

    let quantity =
        Number(
            document.getElementById(
                "restockQuantity"
            ).value
        );


    if (
        productIndex === "" ||
        quantity <= 0
    ) {

        alert(
            "Please select a product and enter a valid quantity."
        );

        return;
    }


    let product =
        products[productIndex];


    product.stock += quantity;


    saveData();

    document.getElementById(
        "restockQuantity"
    ).value = "";

    updateDisplay();


    alert(
        product.name +
        " restocked successfully!\n" +
        "New stock: " +
        product.stock
    );

}


function recordSale() {

    let productIndex =
        document.getElementById(
            "saleProduct"
        ).value;

    let quantity =
        Number(
            document.getElementById(
                "saleQuantity"
            ).value
        );


    if (
        productIndex === "" ||
        quantity <= 0
    ) {

        alert(
            "Please select a product and enter a quantity."
        );

        return;
    }


    let product =
        products[productIndex];


    if (quantity > product.stock) {

        alert(
            "Not enough stock available."
        );

        return;
    }


    let total =
        product.price * quantity;


    product.stock -= quantity;


    sales.push({

        date: new Date().toLocaleString(),

        product: product.name,

        quantity: quantity,

        total: total

    });


    saveData();


    document.getElementById(
        "saleQuantity"
    ).value = "";


    updateDisplay();


    alert(
        "Sale recorded!\nTotal: ₱" +
        total.toFixed(2)
    );

}


function editProduct(index) {

    let product =
        products[index];


    let newName =
        prompt(
            "Enter new product name:",
            product.name
        );

    if (newName === null) return;


    let newPrice =
        prompt(
            "Enter new price:",
            product.price
        );

    if (newPrice === null) return;


    let newStock =
        prompt(
            "Enter new stock:",
            product.stock
        );

    if (newStock === null) return;


    newPrice = Number(newPrice);
    newStock = Number(newStock);


    if (
        newName.trim() === "" ||
        newPrice <= 0 ||
        newStock < 0
    ) {

        alert(
            "Please enter valid information."
        );

        return;
    }


    product.name =
        newName.trim();

    product.price =
        newPrice;

    product.stock =
        newStock;


    saveData();
    updateDisplay();


    alert(
        "Product updated successfully!"
    );

}


function deleteProduct(index) {

    let product =
        products[index];


    let confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            product.name +
            "?"
        );


    if (!confirmDelete) return;


    products.splice(index, 1);


    saveData();
    updateDisplay();


    alert(
        "Product deleted successfully!"
    );

}


function searchProducts() {

    let searchText =
        document
            .getElementById("searchProduct")
            .value
            .toLowerCase();


    let rows =
        document
            .getElementById("productTable")
            .getElementsByTagName("tr");


    for (
        let i = 0;
        i < rows.length;
        i++
    ) {

        let productName =
            rows[i]
                .getElementsByTagName("td")[0]
                .textContent
                .toLowerCase();


        if (
            productName.includes(searchText)
        ) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }

    }

}


/* =========================
   EXPENSE FUNCTIONS
========================= */

function addExpense() {

    let description =
        document
            .getElementById("expenseDescription")
            .value
            .trim();


    let category =
        document
            .getElementById("expenseCategory")
            .value
            .trim();


    let amount =
        Number(
            document.getElementById(
                "expenseAmount"
            ).value
        );


    if (
        description === "" ||
        category === "" ||
        amount <= 0
    ) {

        alert(
            "Please enter valid expense information."
        );

        return;
    }


    expenses.push({

        date: new Date().toLocaleString(),

        description: description,

        category: category,

        amount: amount

    });


    saveData();


    document.getElementById(
        "expenseDescription"
    ).value = "";

    document.getElementById(
        "expenseCategory"
    ).value = "";

    document.getElementById(
        "expenseAmount"
    ).value = "";


    updateDisplay();


    alert(
        "Expense recorded successfully!"
    );

}


function deleteExpense(index) {

    let confirmDelete =
        confirm(
            "Delete this expense record?"
        );


    if (!confirmDelete) return;


    expenses.splice(index, 1);

    saveData();

    updateDisplay();

}


/* =========================
   LOAN FUNCTIONS
========================= */

function addLoan() {

    let person =
        document
            .getElementById("loanPerson")
            .value
            .trim();


    let amount =
        Number(
            document.getElementById(
                "loanAmount"
            ).value
        );


    let dueDate =
        document.getElementById(
            "loanDueDate"
        ).value;


    let type =
        document.getElementById(
            "loanType"
        ).value;


    if (
        person === "" ||
        amount <= 0 ||
        dueDate === "" ||
        type === ""
    ) {

        alert(
            "Please complete all loan information."
        );

        return;
    }


    loans.push({

        date: new Date().toLocaleDateString(),

        person: person,

        type: type,

        amount: amount,

        dueDate: dueDate,

        status: "Unpaid"

    });


    saveData();


    document.getElementById(
        "loanPerson"
    ).value = "";

    document.getElementById(
        "loanAmount"
    ).value = "";

    document.getElementById(
        "loanDueDate"
    ).value = "";

    document.getElementById(
        "loanType"
    ).value = "";


    updateDisplay();


    alert(
        "Loan record added successfully!"
    );

}


function markLoanPaid(index) {

    loans[index].status = "Paid";

    saveData();

    updateDisplay();


    alert(
        "Loan marked as paid!"
    );

}


function deleteLoan(index) {

    let confirmDelete =
        confirm(
            "Delete this loan record?"
        );


    if (!confirmDelete) return;


    loans.splice(index, 1);

    saveData();

    updateDisplay();

}


/* =========================
   UPDATE DISPLAY
========================= */

function updateDisplay() {

    /* PRODUCTS */

    let productTable =
        document.getElementById(
            "productTable"
        );


    productTable.innerHTML = "";


    products.forEach(
        function(product, index) {

            let status =
                "Available";


            if (
                product.stock === 0
            ) {

                status =
                    "Out of Stock";

            } else if (
                product.stock <= 5
            ) {

                status =
                    "Low Stock";

            }


            productTable.innerHTML += `

                <tr>

                    <td>
                        ${product.name}
                    </td>

                    <td>
                        ₱${product.price.toFixed(2)}
                    </td>

                    <td>
                        ${product.stock}
                    </td>

                    <td>
                        ${status}
                    </td>

                    <td>

                        <button
                            onclick="editProduct(${index})"
                        >
                            Edit
                        </button>

                        <button
                            onclick="deleteProduct(${index})"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }
    );


    /* SALE PRODUCT DROPDOWN */

    let saleProduct =
        document.getElementById(
            "saleProduct"
        );


    saleProduct.innerHTML =
        '<option value="">Select Product</option>';


    products.forEach(
        function(product, index) {

            saleProduct.innerHTML += `

                <option value="${index}">

                    ${product.name}
                    - ₱${product.price}

                </option>

            `;

        }
    );


    /* RESTOCK DROPDOWN */

    let restockProduct =
        document.getElementById(
            "restockProduct"
        );


    restockProduct.innerHTML =
        '<option value="">Select Product</option>';


    products.forEach(
        function(product, index) {

            restockProduct.innerHTML += `

                <option value="${index}">

                    ${product.name}
                    - ₱${product.price}

                </option>

            `;

        }
    );


    /* SALES HISTORY */

    let salesTable =
        document.getElementById(
            "salesTable"
        );


    salesTable.innerHTML = "";


    sales.forEach(
        function(sale) {

            salesTable.innerHTML += `

                <tr>

                    <td>
                        ${sale.date}
                    </td>

                    <td>
                        ${sale.product}
                    </td>

                    <td>
                        ${sale.quantity}
                    </td>

                    <td>
                        ₱${sale.total.toFixed(2)}
                    </td>

                </tr>

            `;

        }
    );


    /* EXPENSE HISTORY */

    let expenseTable =
        document.getElementById(
            "expenseTable"
        );


    expenseTable.innerHTML = "";


    expenses.forEach(
        function(expense, index) {

            expenseTable.innerHTML += `

                <tr>

                    <td>
                        ${expense.date}
                    </td>

                    <td>
                        ${expense.description}
                    </td>

                    <td>
                        ${expense.category}
                    </td>

                    <td>
                        ₱${expense.amount.toFixed(2)}
                    </td>

                    <td>

                        <button
                            onclick="deleteExpense(${index})"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }
    );


    /* LOAN HISTORY */

    let loanTable =
        document.getElementById(
            "loanTable"
        );


    loanTable.innerHTML = "";


    loans.forEach(
        function(loan, index) {

            let actionButton = "";


            if (
                loan.status === "Unpaid"
            ) {

                actionButton = `

                    <button
                        onclick="markLoanPaid(${index})"
                    >
                        Mark Paid
                    </button>

                `;

            }


            actionButton += `

                <button
                    onclick="deleteLoan(${index})"
                >
                    Delete
                </button>

            `;


            loanTable.innerHTML += `

                <tr>

                    <td>
                        ${loan.date}
                    </td>

                    <td>
                        ${loan.person}
                    </td>

                    <td>
                        ${loan.type}
                    </td>

                    <td>
                        ₱${loan.amount.toFixed(2)}
                    </td>

                    <td>
                        ${loan.dueDate}
                    </td>

                    <td>
                        ${loan.status}
                    </td>

                    <td>
                        ${actionButton}
                    </td>

                </tr>

            `;

        }
    );


    /* DASHBOARD CALCULATIONS */

    let totalProducts =
        products.length;


    let totalStock =
        products.reduce(
            (sum, product) =>
                sum + product.stock,
            0
        );


    let lowStock =
        products.filter(
            product =>
                product.stock > 0 &&
                product.stock <= 5
        ).length;


    let totalSales =
        sales.reduce(
            (sum, sale) =>
                sum + sale.total,
            0
        );


    let totalExpenses =
        expenses.reduce(
            (sum, expense) =>
                sum + expense.amount,
            0
        );


    let totalLoans =
        loans
            .filter(
                loan =>
                    loan.status === "Unpaid"
            )
            .reduce(
                (sum, loan) =>
                    sum + loan.amount,
                0
            );


    /* DASHBOARD DISPLAY */

    document.getElementById(
        "totalProducts"
    ).textContent =
        totalProducts;


    document.getElementById(
        "totalStock"
    ).textContent =
        totalStock;


    document.getElementById(
        "lowStock"
    ).textContent =
        lowStock;


    document.getElementById(
        "totalSales"
    ).textContent =
        "₱" +
        totalSales.toFixed(2);


    document.getElementById(
        "totalExpenses"
    ).textContent =
        "₱" +
        totalExpenses.toFixed(2);


    document.getElementById(
        "totalLoans"
    ).textContent =
        "₱" +
        totalLoans.toFixed(2);


    /* EXPENSE TOTAL */

    document.getElementById(
        "expenseTotal"
    ).textContent =
        totalExpenses.toFixed(2);


    /* LOAN TOTAL */

    document.getElementById(
        "loanTotal"
    ).textContent =
        totalLoans.toFixed(2);

}


updateDisplay();
