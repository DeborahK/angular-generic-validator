"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
require('rxjs/add/operator/debounceTime');
var customer_1 = require('./customer');
var generic_validator_1 = require('../shared/generic-validator');
function emailMatcher(c) {
    var emailControl = c.get('email');
    var confirmControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmControl.pristine) {
        return null;
    }
    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}
var CustomerComponent = (function () {
    function CustomerComponent(fb) {
        this.fb = fb;
        this.customer = new customer_1.Customer();
        this.displayMessage = {};
        this.validationMessages = {
            firstName: {
                required: 'Please enter your first name.',
                minlength: 'The first name must be longer than 3 characters.'
            },
            lastName: {
                required: 'Please enter your last name.',
                maxlength: 'The last name must be less than 50 characters.',
            },
            email: {
                required: 'Please enter your email address.',
                pattern: 'Please enter a valid email address.'
            }
        };
        // Create an instance of the generic validator
        this.genericValidator = new generic_validator_1.GenericValidator(this.validationMessages);
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerForm = this.fb.group({
            firstName: [null, [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            lastName: [null, [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: [null, [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: [null, forms_1.Validators.required]
            }, { validator: emailMatcher }),
            phone: null,
            notification: 'email'
        });
        this.customerForm.get('notification').valueChanges.subscribe(function (value) {
            _this.setNotification(value);
        });
        this.customerForm.valueChanges.debounceTime(1000).subscribe(function (value) {
            _this.displayMessage = _this.genericValidator.processMessages(_this.customerForm);
        });
    };
    CustomerComponent.prototype.save = function () {
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
    CustomerComponent.prototype.setNotification = function (notifyVia) {
        var phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(forms_1.Validators.required);
        }
        else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'my-signup',
            templateUrl: './app/customers/customer.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map