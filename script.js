const itemsArr = [
  {
    pairCount: 1,
    discountPercent: "50%",
    currency: "DKK",
    price: "195.00",
    isPopular: false,
    isSelected: false,
    colorArr: ["Red", "green"],
    sizeArr: ["small", "medium"],
  },
  {
    pairCount: 2,
    discountPercent: "40%",
    currency: "DKK",
    price: "345.00",
    oldPrice: "195.00",
    isPopular: true,
    isSelected: true,
    colorArr: ["Red", "green"],
    sizeArr: ["small", "medium"],
  },
  {
    pairCount: 3,
    discountPercent: "60%",
    currency: "DKK",
    price: "528.00",
    isPopular: false,
    isSelected: false,
    colorArr: ["Red", "green"],
    sizeArr: ["small", "medium"],
  },
];

var totalAmount = 0;
var selectedItem = {};

function generateItemBoxes() {
  const itemBoxesContainer = document.querySelector(".itemsContainer");
  itemBoxesContainer.innerHTML = ""; // Clear existing content

  for (let i = 0; i < itemsArr.length; i++) {
    var item = itemsArr[i];
    const itemBox = document.createElement("div");
    // if selected adding class for it , so we can handle selected css cases
    if (item.isSelected) {
      itemBox.classList.add("itemBoxSelected");
    }

    itemBox.classList.add("itemBox");
    // adding click event ,to select items
    itemBox.addEventListener("click", function () {
      handleSelection(i);
    });
    // Item first row
    const itemFirstRow = document.createElement("div");
    itemFirstRow.classList.add("itemfirstRow");

    // Checkbox container
    const checkboxCont = document.createElement("div");
    checkboxCont.classList.add("checkboxCont");

    const checkOutCircle = document.createElement("div");
    checkOutCircle.classList.add("checkOutCircle");

    const checkInCircle = document.createElement("div");
    checkInCircle.classList.add("checkInCircle");

    checkOutCircle.appendChild(checkInCircle);
    checkboxCont.appendChild(checkOutCircle);
    itemFirstRow.appendChild(checkboxCont);

    // Item details container
    const itemDetailsCont = document.createElement("div");
    itemDetailsCont.classList.add("itemDetailsCont");

    // Pair price
    const pairPrice = document.createElement("div");
    pairPrice.classList.add("pairPrice");

    const pair = document.createElement("div");
    pair.classList.add("pair");
    pair.textContent = `${item.pairCount} Pair`;

    const price = document.createElement("div");
    price.classList.add("price");
    price.textContent = item.currency + " " + item.price;

    pairPrice.appendChild(pair);
    pairPrice.appendChild(price);
    itemDetailsCont.appendChild(pairPrice);

    // Old price
    if (item.isPopular) {
      const oldPrice = document.createElement("div");
      oldPrice.classList.add("oldPrice");
      oldPrice.textContent = `${item.currency} ${item.price}`;
      itemDetailsCont.appendChild(oldPrice);
    }

    // Discount column box
    const discountColBox = document.createElement("div");
    discountColBox.classList.add("discountColBox");
    // if Most popular then show text for Most popular
    if (item.isPopular) {
      const popularText = document.createElement("div");
      popularText.classList.add("PopularText");
      popularText.textContent = "Most Popular";
      discountColBox.appendChild(popularText);
    } else {
      // if Most Popular not there then adding this style
      discountColBox.style.justifyContent = "center";
      discountColBox.style.fontSize = "14px";
    }

    const discount = document.createElement("div");
    discount.classList.add("discount");
    discount.textContent = `${item.discountPercent} OFF`;
    discountColBox.appendChild(discount);
    itemDetailsCont.appendChild(discountColBox);

    itemFirstRow.appendChild(itemDetailsCont);

    itemBox.appendChild(itemFirstRow);

    // if selected showing color size selections table
    if (item.isSelected) {
      // Item size and color row
      const itemSizeColorRow = document.createElement("div");
      itemSizeColorRow.classList.add("itemSizeColorRow");
      // Adding an event to stop propagation
      itemSizeColorRow.addEventListener("click", function (event) {
        // Stop the click event propagation
        event.stopPropagation();
      });

      // Table
      const table = document.createElement("table");

      // Table header
      const tableHeader = document.createElement("tr");

      const th1 = document.createElement("th");
      const th2 = document.createElement("th");
      const th3 = document.createElement("th");

      th1.textContent = "";
      th2.textContent = "Size";
      th3.textContent = "Color";

      tableHeader.appendChild(th1);
      tableHeader.appendChild(th2);
      tableHeader.appendChild(th3);

      table.appendChild(tableHeader);

      // as we have two rows for size and column
      for (let j = 0; j < 2; j++) {
        // Table row for size and color details
        const tableRow = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("tableFirstrow");
        td1.textContent = `#${j + 1}`;

        const td2 = document.createElement("td");
        const sizeSelect = document.createElement("select");
        sizeSelect.name = `size${j}`;
        sizeSelect.id = `size${j}`;
        // for adding options
        const sizeOption1 = document.createElement("option");
        sizeOption1.selected = true;
        sizeOption1.textContent = "Size";
        sizeSelect.appendChild(sizeOption1);
        // options from item data
        item.sizeArr.forEach((eachSize) => {
          const sizeOption2 = document.createElement("option");
          sizeOption2.value = eachSize;
          sizeOption2.textContent = eachSize;
          sizeSelect.appendChild(sizeOption2);
        });
        // appending in td
        td2.appendChild(sizeSelect);

        const td3 = document.createElement("td");
        const colorSelect = document.createElement("select");
        colorSelect.name = `color${j}`;
        colorSelect.id = `color${j}`;
        const colorOption1 = document.createElement("option");
        colorOption1.selected = true;
        colorOption1.textContent = "Color";
        colorSelect.appendChild(colorOption1);
        item.colorArr.forEach((eachColor) => {
          const colorOption2 = document.createElement("option");
          colorOption2.value = eachColor;
          colorOption2.textContent = eachColor;
          colorSelect.appendChild(colorOption2);
        });
        // appending in td
        td3.appendChild(colorSelect);

        tableRow.appendChild(td1);
        tableRow.appendChild(td2);
        tableRow.appendChild(td3);

        table.appendChild(tableRow);
      }

      itemSizeColorRow.appendChild(table);
      itemBox.appendChild(itemSizeColorRow);
    }

    itemBoxesContainer.appendChild(itemBox);

    // calculating total amount & saving selectedItem
    if (item.isSelected) {
      // saving item selected:
      selectedItem = item;

      // calculating totalAmount
      let priceAsFloat = parseFloat(item.price);

      // Check if (not NaN)
      if (!isNaN(priceAsFloat)) {
        totalAmount = item.pairCount * priceAsFloat;
        // to have two decimal places
        totalAmount = totalAmount.toFixed(2);
        var totalSum = document.getElementsByClassName("totalSum")[0];
        totalSum.innerHTML = "";
        var amountdiv = document.createElement("span");
        amountdiv.textContent = "Total : " + totalAmount;
        totalSum.appendChild(amountdiv);
      }
    }
  }
}

// added dummy submit alert
var addToCartButton = document.getElementsByClassName("addToCartButton")[0];
addToCartButton.addEventListener("click", function () {
  alert(
    "Added To Cart: selectedItem: " +
      JSON.stringify(selectedItem) +
      " Total Amount : " +
      totalAmount
  );
});

function handleSelection(selectedIndex) {
  // if clicked ,then making it selected
  itemsArr.forEach((item, i) => {
    if (selectedIndex === i) {
      item.isSelected = true;
    } else {
      item.isSelected = false;
    }
  }); // Settin only selected item as true
  console.log("selectedItem: ", selectedItem);

  generateItemBoxes(); // Rerendering with updated state
}

// adding items
generateItemBoxes();
