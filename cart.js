const listItem = [
  {
    id: 1,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      imporPrice: 40000,
      sellPrice: 50000,
      tax: 0.15
    }
  },
  {
    id: 2,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      imporPrice: 50000,
      sellPrice: 60000,
      tax: 0.1
    }
  },
  {
    id: 3,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      imporPrice: 44000,
      sellPrice: 55000,
      tax: 0.15
    }
  },
  {
    id: 4,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      imporPrice: 40000,
      sellPrice: 70000,
      tax: 0.15
    }
  },
  {
    id: 5,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      imporPrice: 20000,
      sellPrice: 50000,
      tax: 0.15
    }
  },
  {
    id: 6,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      imporPrice: 40000,
      sellPrice: 55000,
      tax: 0.15
    }
  },
  {
    id: 7,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      imporPrice: 40000,
      sellPrice: 58000,
      tax: 0.15
    }
  },
  {
    id: 8,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      imporPrice: 40000,
      sellPrice: 59000,
      tax: 0.15
    }
  },
  {
    id: 9,
    name: "Dress",
    describe: "Awn aywd gyawdgy wada awdv",
    price: {
      imporPrice: 40000,
      sellPrice: 51000,
      tax: 0.15
    }
  },
  {
    id: 10,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      imporPrice: 40000,
      sellPrice: 450000,
      tax: 0.15
    }
  },
  {
    id:11,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      imporPrice: 40000,
      sellPrice: 650000,
      tax: 0.15
    }
  },
  {
    id: 12,
    describe: "Awn aywd gyawdgy wada awdv",
    name: "Dress",
    price: {
      imporPrice: 40000,
      sellPrice: 650000,
      tax: 0.15
    }
  }
];
const listCart = [];
const listMenu = document.getElementById("list-menu");
listMenu.classList.add("list-menu");

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

const updateNumberItem = (number, id) =>{
  const inputElement =  document.querySelector('#input' + id);
  inputElement.value = number;
}

const addCart = item => {
 
  //check is duplicate item
  if(isDuplicate(item)){
    item.number++;
    updateNumberItem(item.number,item.id)

  }
  else{
    item.number = 1;
    listCart.push(item);
   
    const numberInput = document.createElement("input");
    numberInput.setAttribute('id','input'+ item.id)
    const portfoliaMenu = document.createElement("div");
    portfoliaMenu.classList.add("item-box");
    portfoliaMenu.setAttribute('id',item.id)
  
    const titleMenu = document.createElement("h2");
    titleMenu.textContent = item.name;
  
    const describeMenu = document.createElement("span");
    describeMenu.textContent = item.describe;
  
    
    numberInput.value = '1';
    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
  
    const abBtn = document.createElement("button");
    abBtn.textContent = "-";
  
    const totalMenu = document.createElement("span");
    totalMenu.textContent = "Total";
  
    const priceMenu = document.createElement("span");
    priceMenu.textContent = item.price.sellPrice;
  
    listMenu.appendChild(portfoliaMenu);
  
    portfoliaMenu.appendChild(titleMenu);
    portfoliaMenu.appendChild(describeMenu);
    portfoliaMenu.appendChild(numberInput);
    portfoliaMenu.appendChild(plusBtn);
    portfoliaMenu.appendChild(abBtn);
    portfoliaMenu.appendChild(totalMenu);
    portfoliaMenu.appendChild(priceMenu);

  }


 
};

initItems();
