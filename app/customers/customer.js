"use strict";
var Customer = (function () {
    function Customer(firstName, lastName, email, phone, notification) {
        if (firstName === void 0) { firstName = ''; }
        if (lastName === void 0) { lastName = ''; }
        if (email === void 0) { email = ''; }
        if (phone === void 0) { phone = ''; }
        if (notification === void 0) { notification = 'email'; }
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.notification = notification;
    }
    return Customer;
}());
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map