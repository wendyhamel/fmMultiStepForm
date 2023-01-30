window.multiSteps = function () {
    return {
        steps : [
            {id: 1, title: 'Your info', completed: false},
            {id: 2, title: 'Select plan', completed: false},
            {id: 3, title: 'Add-ons', completed: false},
            {id: 4, title: 'Summary', completed: false},
        ],
        plans : [
            {id: 1, name: 'Arcade', priceMonthly : 9, priceYearly : 90, yearlyDiscountDetails: '2 months free', selected: false},
            {id: 2, name: 'Advanced', priceMonthly : 12, priceYearly : 120, yearlyDiscountDetails: '2 months free', selected: false},
            {id: 3, name: 'Pro', priceMonthly : 15, priceYearly : 150, yearlyDiscountDetails: '2 months free', selected: false},
        ],
        addons : [
            {id: 1, name: 'Online service', details: 'Access to multiplayer games', priceMonthly : 1, priceYearly : 10, selected: false},
            {id: 2, name: 'Larger storage', details: ' Extra 1TB of cloud save', priceMonthly : 2, priceYearly : 20, selected: false},
            {id: 3, name: 'Customizable Profile', details: 'Custom theme on your profile', priceMonthly : 2, priceYearly : 20, selected: false},
        ],
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