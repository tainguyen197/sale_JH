function createUuid() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}

  
class User {
    constructor() {
      this.id = create_UUID();
      this.buyItems = [];
    }
  
    isDuplicate(product) {
      return this.buyItems.some(item => {
        if (product.id === item.product.id) { return true};
      });
    };
  
    addCart(productObj) {
      //check is duplicate item
      if (this.isDuplicate(productObj)) {
        this.buyItems.forEach(item => {
          if (item.product === productObj) this.updateNumberItem(item, 1);
        });
      } else {
        const item = {
          id: create_UUID(),
          number: 1,
          product: productObj
        };
        this.buyItems.push(item);
      }
  
    //   updatePriceItem(item);
    };
  
    updateNumberItem(item, number) {
      if (item.number <= 1 && number < 0) {
        this.buyItems.some((itemCart, index) => {
          if (itemCart.id === item.id) {
            this.buyItems.splice(index, 1);
            return true;
          }
        });
      }
      item.number += number;
    }

    toTalPrice(){
        const sellPrice = this.buyItems.reduce((pre,cusor,index,arr)=>{
            return pre.product.price.sellPrice*pre.number + cusor.product.price.sellPrice*cusor.number;
        })
        return new Money(0,sellPrice,0);
    }
  }
  
  class Money {
    constructor(receivePrice, sellPrice, discount) {
      this.receivePrice = receivePrice || 0;
      this.sellPrice = sellPrice || 0;
      this.discount = discount || 0;
    }
  
    getFinalSellPrice(){
      return this.sellPrice - this.sellPrice*discount;
    }
  }
  
  class Product {
    constructor(name, describe, receivePrice, sellPrice, discount) {
      this.id = create_UUID();
      this.name = name || "Name";
      this.describe = describe || "Describe";
      this.price = new Money(receivePrice, sellPrice, discount);
    }
  
    setProductMoney(receivePrice, sellPrice, discount){
      if (this.price) {
        this.price.receivePrice = receivePrice;
        this.price.sellPrice = sellPrice;
        this.price.discount = discount;
      }
    };
  
    isDuplicate(product) {
      return this.id === product.id;
    };
  
  
  }
  
class Commission{
    constructor(comission){
        this.comission = comission;
    }

    setComission(value){
        this.comission = value;
    }
}

main = () =>{

    const listItem = [
      new Product('Dress','This is test',10000,34000,0.15),
      new Product('Dress1','This is test 1',12000,34000,0.15)
    ]
  
    const Customer = new User();
    const commissionForProvider = new Commission(0.15);

    Customer.addCart(listItem[0]);
    Customer.addCart(listItem[0]);
    Customer.addCart(listItem[1]);

    const totalPrice = Customer.toTalPrice();
    
    const totalPriceForSaler = totalPrice.sellPrice - totalPrice.sellPrice*commissionForProvider.comission;
  }
  
  
  main();
  