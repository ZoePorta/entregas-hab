'use strict';

//clase tienda con un inventario de objetos
class Shop {
  inventory;
  constructor(inventory) {
    this.inventory = inventory;
  }
  //metodo para sacar factura por la consola a partir del carrito del usuario
  static checkout(user) {
    //el carrito se pide con el metodo pay de user
    for (const item of user.pay) {
      //saca por consola cada producto, el numero de unidades, el precio por unidad y el total por producto
      console.log(
        `${item.item.name} x ${item.units}_____________u:${item.item.price}€  === ${item.item.price * item.units}€`
      );
    }
    //se aplica reduce para obtener el total y se reduce a dos decimales
    console.log(
      `TOTAL__________________________________${user.pay.reduce(
        (total, item) => Math.round((total + item.item.price * item.units) * 100) / 100,
        0
      )}€`
    );
    return user.pay;
  }
}

//clase objeto, se contruye con nombre y precio
class Item {
  name;
  price;
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

//clase usuario, tiene nombre y un carrito PRIVADO
class User {
  name;
  #cart = [];
  constructor(name) {
    this.name = name;
  }
  //metodo para devolver el valor del carrito, es get porque solo nos interesa leerlo
  get pay() {
    return this.#cart;
  }
  //metodo para comprobar si ya tiene determinado objeto en el carrito
  checkIfRepeated(newItem) {
    for (const itemInCart of this.#cart) {
      if (itemInCart.item.name === newItem.name) {
        return itemInCart;
      }
    }
    return false;
  }
  //metodo para añadir cosas al carrito y añadir o sumar en funcion de si está repetido o no
  addToCart(newItem) {
    if (this.checkIfRepeated(newItem)) {
      this.checkIfRepeated(newItem).increase();
      return this.#cart;
    } else {
      this.#cart.push(new CartItem(newItem));
      return this.#cart;
    }
  }
  //metodo para añadir una cantidad determinada de objetos aleatorios de una tienda al carrito
  fillTheCart(cartSize, shop) {
    for (let i = 0; i < cartSize; i++) {
      this.addToCart(shop.inventory[Math.floor(Math.random() * Math.floor(shop.inventory.length))]);
    }
  }
}

//clase objeto de carrito, tiene un objeto y la cantidad correspondiente
class CartItem {
  item;
  units = 1;
  constructor(item) {
    this.item = item;
  }
  //metodo para aumentar la cantidad de objetos repetidos
  increase() {
    this.units++;
  }
}

//variable para almacenar el inventario (compuesto de objetos)
let inventory = [
  new Item('camisa', 19.99),
  new Item('pantalon', 24.99),
  new Item('calcetines', 4.99),
  new Item('bufanda', 9.99)
];
const myUser = new User('Zoe');
//se crea una tienda con el inventario definido anteriormente
const myShop = new Shop(inventory);

//el usuario llena el carrito con productos de la tienda
myUser.fillTheCart(6, myShop);

//la tienda emite la factura
Shop.checkout(myUser);
