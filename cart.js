const listItem = [
  {
    id: 1,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      sellPrice: 50000,
      tax: 0.15
    }
  },
  {
    id: 2,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      sellPrice: 60000,
      tax: 0.1
    }
  },
  {
    id: 3,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      sellPrice: 55000,
      tax: 0.15
    }
  },
  {
    id: 4,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      sellPrice: 70000,
      tax: 0.15
    }
  },
  {
    id: 5,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      sellPrice: 50000,
      tax: 0.15
    }
  },
  {
    id: 6,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      sellPrice: 55000,
      tax: 0.15
    }
  },
  {
    id: 7,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      sellPrice: 58000,
      tax: 0.15
    }
  },
  {
    id: 8,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      sellPrice: 59000,
      tax: 0.15
    }
  },
  {
    id: 9,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      sellPrice: 51000,
      tax: 0.15
    }
  },
  {
    id: 10,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      sellPrice: 450000,
      tax: 0.15
    }
  },
  {
    id: 11,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      sellPrice: 650000,
      tax: 0.15
    }
  },
  {
    id: 12,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      sellPrice: 650000,
      tax: 0.15
    }
  }
];

const totalPrice = {
  totalPrice: {
    receivePrice: 0,
    sellPrice: 0,
    discount: 0.15
  },
  commissionForProvider: {
    percent: 0.12,
    successfulCost: 10000
  }
};
const listCart = [];
const listMenu = document.getElementById("list-menu");
listMenu.classList.add("list-menu");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav-icon");
const mainContent = document.getElementById("main-content");

const listCartSaler = document.getElementById("list-cart");
listCartSaler.classList.add("list-menu");

const initItems = function() {
  const mainContain = document.getElementById("list-item");
  listItem.forEach(item => {
    const itemBox = document.createElement("div");
    itemBox.classList.add("item-box");

    const imgItemBox = document.createElement("div");
    imgItemBox.classList.add("img-item-box");

    const img = document.createElement("img");
    img.setAttribute("src", "./img/hotgirl-da-nang.jpg");

    const titleContent = document.createElement("h2");
    titleContent.textContent = item.name;

    const describeContent = document.createElement("p");
    describeContent.textContent = item.describe;

    const itemBoxContent = document.createElement("div");
    itemBoxContent.classList.add("item-box-content");

    const cartItemButton = document.createElement("div");
    cartItemButton.classList.add("cart-item-button");

    const priceItem = document.createElement("p2");
    priceItem.textContent = item.price.sellPrice;

    const buttonCart = document.createElement("button");
    buttonCart.textContent = "Buy";
    mainContain.appendChild(itemBox);

    itemBox.appendChild(imgItemBox);
    imgItemBox.appendChild(img);

    itemBox.appendChild(itemBoxContent);

    itemBoxContent.appendChild(titleContent);
    itemBoxContent.appendChild(describeContent);
    itemBoxContent.appendChild(cartItemButton);

    cartItemButton.appendChild(priceItem);
    cartItemButton.appendChild(buttonCart);

    buttonCart.addEventListener("click", e => addCart(item));
  });
};

const isDuplicate = obj => {
  return listCart.some(item => {
    if (obj === item) return true;
  });
};

updateNumberItem = (item, number) => {
  if (item.number <= 1 && number < 0) {
    listCart.some((itemCart, index) => {
      if (itemCart.id === item.id) {
        listCart.splice(index, 1);
        return true;
      }
    });
    const itemPro = document.getElementById(item.id);
    const itemStore = document.getElementById("itemSaler" + item.id);
    itemPro.classList.add("animation-item-box");
    itemStore.classList.add("animation-item-box");
    setTimeout(() => {
      itemPro.remove();
      itemStore.remove();
    }, 750);
    updatePriceItem();
    return;
  }
  item.number += number;
  //customer
  const inputElement = document.querySelector("#input" + item.id);
  const totalElement = document.querySelector("#total" + item.id);

  inputElement.value = item.number;
  totalElement.textContent =
    item.number * item.price.sellPrice +
    item.price.sellPrice * item.price.tax * item.number +
    "(+" +
    item.price.tax +
    "% tax)";

  //saler
  const numberPro = document.querySelector("#number" + item.id);
  const pricePro = document.querySelector("#pricePro" + item.id);

  numberPro.textContent = item.number;
  pricePro.textContent = item.number * item.price.sellPrice;
  updatePriceItem();
  // console.log(item.number*item.price.sellPrice + item.price.sellPrice*item.price.tax);
};

updatePriceItem = item => {
  totalPrice.totalPrice.sellPrice = 0;
  totalPrice.totalPrice.receivePrice = 0;

  listCart.forEach(item => {
    totalPrice.totalPrice.sellPrice +=
      item.number * item.price.sellPrice +
      item.price.tax * item.price.sellPrice * item.number;
    totalPrice.totalPrice.receivePrice += item.number * item.price.sellPrice;
  });

  //customer
  const totalMoney = document.querySelector("#moneyTotal");
  const grossMoney = document.querySelector("#moneyGross");
  const discount = document.querySelector("#discount");

  //saler
  const totalPricePro = document.querySelector("#moneyGrossSaler");
  const commission = document.querySelector("#commission");
  const successfullCost = document.querySelector("#successfulCost");
  const moneySaler = document.querySelector("#moneySaler");

  grossMoney.textContent = totalPrice.totalPrice.sellPrice;
  discount.textContent = totalPrice.totalPrice.discount;
  totalMoney.textContent =
    totalPrice.totalPrice.sellPrice -
    totalPrice.totalPrice.sellPrice * totalPrice.totalPrice.discount;

  totalPricePro.textContent = totalPrice.totalPrice.receivePrice;
  commission.textContent = totalPrice.commissionForProvider.percent;
  successfullCost.textContent = totalPrice.commissionForProvider.successfulCost;
  moneySaler.textContent =
    totalPrice.totalPrice.receivePrice -
    totalPrice.commissionForProvider.percent *
      totalPrice.totalPrice.receivePrice -
    totalPrice.commissionForProvider.successfulCost;
};

const addCart = item => {
  //check is duplicate item
  if (isDuplicate(item)) {
    updateNumberItem(item, 1);
  } else {
    item.number = 1;
    listCart.push(item);

    // customer
    const numberInput = document.createElement("input");
    numberInput.setAttribute("id", "input" + item.id);
    numberInput.setAttribute("readonly", "true");

    const portfoliaMenu = document.createElement("div");
    portfoliaMenu.classList.add("item-box");
    portfoliaMenu.setAttribute("id", item.id);

    const titleMenu = document.createElement("h2");
    titleMenu.textContent = item.name;

    const describeMenu = document.createElement("span");
    describeMenu.textContent = item.describe;

    numberInput.value = "1";
    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";

    const abBtn = document.createElement("button");
    abBtn.textContent = "-";

    const totalMenu = document.createElement("span");
    totalMenu.textContent = "Total";

    const priceMenu = document.createElement("span");
    priceMenu.setAttribute("id", "total" + item.id);
    priceMenu.textContent =
      item.number * item.price.sellPrice +
      item.price.sellPrice * item.price.tax +
      "(+" +
      item.price.tax +
      "% tax)";

    listMenu.appendChild(portfoliaMenu);

    portfoliaMenu.appendChild(titleMenu);
    portfoliaMenu.appendChild(describeMenu);
    portfoliaMenu.appendChild(numberInput);
    portfoliaMenu.appendChild(plusBtn);
    portfoliaMenu.appendChild(abBtn);
    portfoliaMenu.appendChild(totalMenu);
    portfoliaMenu.appendChild(priceMenu);

    plusBtn.addEventListener("click", e => updateNumberItem(item, 1));
    abBtn.addEventListener("click", e => updateNumberItem(item, -1));

    // portfoliaMenu.classList.add('animation-item-box');

    //saler
    const proName = document.createElement("h2");
    proName.textContent = item.name;
    const decriPro = document.createElement("span");
    decriPro.textContent = item.describe;
    const numberPro = document.createElement("span");
    numberPro.setAttribute("id", "number" + item.id);
    numberPro.textContent = item.number;
    const totalPro = document.createElement("span");
    totalPro.textContent = "Total";
    const pricePro = document.createElement("span");
    pricePro.setAttribute("id", "pricePro" + item.id);
    pricePro.textContent = item.price.sellPrice;

    const itemSaler = document.createElement("div");
    itemSaler.classList.add("item-box");
    itemSaler.setAttribute("id", "itemSaler" + item.id);

    listCartSaler.appendChild(itemSaler);

    itemSaler.appendChild(proName);
    itemSaler.appendChild(decriPro);
    itemSaler.appendChild(numberPro);
    itemSaler.appendChild(totalPro);
    itemSaler.appendChild(pricePro);
  }

  updatePriceItem(item);
};

initItems();

const displayMenu = (close) =>{
  if (menu.classList.contains("menu-show")) {
    menu.classList.remove("menu-show");
  }
  else if(close === false)
    menu.classList.add("menu-show");

  if(nav.classList.contains('nav-icon') && !close ){
    nav.classList.remove('nav-icon');
    nav.classList.add('nav-icon-close')
  }
  else{
    nav.classList.add('nav-icon');
    nav.classList.remove('nav-icon-close')
  }
}


nav.addEventListener("click",e=>displayMenu(false));  
mainContent.addEventListener("click",e=>displayMenu(true));
