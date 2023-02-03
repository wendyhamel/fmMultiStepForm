window.multiSteps = function () {
    return {
        steps : [
            {id: 1, title: 'Your info'},
            {id: 2, title: 'Select plan'},
            {id: 3, title: 'Add-ons'},
            {id: 4, title: 'Summary'},
        ],
        plans : [
            {id: 'plan1', name: 'Arcade', iconPath: './assets/images/icon-arcade.svg', altText: 'icon-arcade', priceMonthly : 9, priceYearly : 90, yearlyDiscountDetails: '2 months free' },
            {id: 'plan2', name: 'Advanced', iconPath: './assets/images/icon-advanced.svg', altText: 'icon-advanced', priceMonthly : 12, priceYearly : 120, yearlyDiscountDetails: '2 months free' },
            {id: 'plan3', name: 'Pro', iconPath: './assets/images/icon-pro.svg', altText: 'icon-pro', priceMonthly : 15, priceYearly : 150, yearlyDiscountDetails: '2 months free' },
        ],
        addons : [
            {id: 'addon1', name: 'Online service', details: 'Access to multiplayer games', priceMonthly : 1, priceYearly : 10},
            {id: 'addon2', name: 'Larger storage', details: ' Extra 1TB of cloud save', priceMonthly : 2, priceYearly : 20},
            {id: 'addon3', name: 'Customizable Profile', details: 'Custom theme on your profile', priceMonthly : 2, priceYearly : 20},
        ],
        billingYearly: false,
        currentStep : 2,
        finished : false,
        name: '',
        email: '',
        phone: '',
        selectedPlan: '',
        selectedAddons: [],
        order : {
            name: '',
            email: '',
            phone: '',
            plan: '',
            billingYearly: false,
            addons: [],
            total: null
        },
        orderedPlan : {},
        validation: {
            email: {
                rule: {
                    required: function(field){
                        if (field) {
                            return { invalid: false, message: '' }
                        } else {
                            return { invalid: true, message: 'This field is required' }
                        }
                    },
                    email: function (field) {
                        const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
                        if (validEmailRegex.test(field)) {
                            return { invalid: false, message: '' }
                        } else {
                            return { invalid: true, message: 'Please provide a valid email address' }
                        }
                    }
                }
            },
            name: {
                rule: {
                    required: function(field){
                        if (field) {
                            return { invalid: false, message: '' }
                        } else {
                            return { invalid: true, message: 'This field is required' }
                        }
                    },
                }
            },
            phone: {
                rule: {
                    required: function(field){
                        if (field) {
                            return { invalid: false, message: '' }
                        } else {
                            return { invalid: true, message: 'This field is required' }
                        }
                    },
                }
            },
        },
        validate(field) {
            for (const key in this.validation[field].rule) {
                const validationResult = this.validation[field].rule[key](this[field])
                if (validationResult.invalid) {
                    this.validation[field].invalid = true
                    this.validation[field].message = validationResult.message
                    break
                }
                this.validation[field].invalid = false
                this.validation[field].message = ''
            }
        },
        getOrderedPlan(selectedPlanId) {
            return this.orderedPlan = this.plans.filter((plan) => {
                return plan.id === selectedPlanId
            })[0]
        },
        getOrderedAddons(addonIds) {
            let addonIdsArray = Object.values(addonIds)
            return this.addons.filter((addon) => {
                return addonIdsArray.includes(addon.id);
            })
        },
        total() {
            let addonsArray = this.getOrderedAddons(this.order.addons)
            let planPrice = 0
            let addonPrice = 0
            if(this.billingYearly) {
                planPrice = this.order.plan.priceYearly
                addonsArray.forEach(item => {
                    addonPrice = addonPrice + item.priceYearly
                })
            } else {
                planPrice = this.order.plan.priceMonthly
                addonsArray.forEach(item => {
                    addonPrice = addonPrice + item.priceMonthly
                })
            }
            return planPrice + addonPrice
        },
        nextStep() {
            switch (this.currentStep){
                case 1 :
                    if (this.validation['name'].invalid === false && this.validation['email'].invalid === false && this.validation['phone'].invalid === false) {
                        this.order.name = this.name
                        this.order.email = this.email
                        this.order.phone = this.phone
                        this.currentStep = 2
                    }
                    break;
                case 2 :
                    if(this.selectedPlan != '') {
                        this.order.plan = this.getOrderedPlan(this.selectedPlan)
                        this.order.billingYearly = this.billingYearly
                        this.currentStep = 3
                    }
                    break;
                case 3 :
                    if(this.selectedAddons.length > 0) {
                        this.order.addons = this.selectedAddons
                        this.currentStep = 4
                    }
                    break;
                case 4 :
                    if(this.selectedAddons.length > 0) {
                        this.order.total = this.total()
                        this.finished = true
                    }
                    break;
            }
        }
    }
}