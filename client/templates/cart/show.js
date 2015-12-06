Template.cartShow.helpers({
    cart: function () {
        currentCart = Carts.getCart(userKey);
        return currentCart;
    },
    thereAreNo: function (items) {
        return items.length == 0;
    }
});

Template.cartShow.events({
    "click .remove-from-cart": function (ev) {
        ev.preventDefault();
        removeFromCart(this.sku, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                //any items left?
                currentCart = res; //Have to save over currentCart
                if (currentCart.items.length === 0) {
                    Router.go("homeIndex");
                }
            }
        });
    },
    "change .item-qty": function (ev) {
        var newQty = parseInt($(ev.currentTarget).val());
        var name = this.name;
        if (newQty === 0) {
            removeFromCart(this.sku)
        } else {
            this.quantity = parseInt(newQty); // does not change currentCart
            console.log(this.quantity); // updated to new value
            console.log(currentCart); // not changed
            saveCart(currentCart, function (err, res) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("changed data");
                    //alert(name + " updated");
                }
            });
            $(ev.currentTarget).val(newQty);
        }
    }
});