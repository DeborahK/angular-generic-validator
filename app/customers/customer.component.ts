import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

import { Customer } from './customer';
import { GenericValidator } from '../shared/generic-validator';

function emailMatcher(c: AbstractControl) {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');

    if (emailControl.pristine || confirmControl.pristine) {
        return null;
    }

    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    customer: Customer = new Customer();
    displayMessage: { [key: string]: string } = {};
    genericValidator: GenericValidator;

    private validationMessages: { [key: string]: { [key: string]: string} } = {
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

    constructor(private fb: FormBuilder) {
        // Create an instance of the generic validator
        this.genericValidator = new GenericValidator(this.validationMessages);
     }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: [null, [Validators.required, Validators.minLength(3)]],
            lastName: [null, [Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: [null, Validators.required]
            }, { validator: emailMatcher }),
            phone: null,
            notification: 'email'
        });

        this.customerForm.get('notification').valueChanges.subscribe(value => {
            this.setNotification(value);
        });

        this.customerForm.valueChanges.debounceTime(1000).subscribe(value => {
           this.displayMessage = this.genericValidator.processMessages(this.customerForm);
        });
    }

    save(): void {
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setNotification(notifyVia: string): void {
        let phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
}
