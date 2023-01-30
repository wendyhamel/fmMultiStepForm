window.multiSteps = function () {
    return {
        steps : Alpine.$persist([
            {id: 1, title: 'Your info', completed: false},
            {id: 2, title: 'Select plan', completed: false},
            {id: 3, title: 'Add-ons', completed: false},
            {id: 4, title: 'Summary', completed: false},
        ]),
        plans : Alpine.$persist([
            {id: 1, name: 'Arcade', priceMonthly : 9, priceYearly : 90, yearlyDiscountDetails: '2 months free', selected: false},
            {id: 2, name: 'Advanced', priceMonthly : 12, priceYearly : 120, yearlyDiscountDetails: '2 months free', selected: false},
            {id: 3, name: 'Pro', priceMonthly : 15, priceYearly : 150, yearlyDiscountDetails: '2 months free', selected: false},
        ]),
        addons : Alpine.$persist([
            {id: 1, name: 'Your info', details: 'Your info', priceMonthly : null, priceYearly : null, selected: false},
            {id: 2, name: 'Select plan', details: 'Select plan', priceMonthly : null, priceYearly : null, selected: false},
            {id: 3, name: 'Add-ons', details: 'Add-ons', priceMonthly : null, priceYearly : null, selected: false},
        ]),
        billingYearly: false,
        currentStep : 2,
        order : {
            name: '',
            email: '',
            phone: '',
            plan: {name: '', details: '', price: null},
            billingYearly: false,
            addons: [],
            total: null
        },

    }
}