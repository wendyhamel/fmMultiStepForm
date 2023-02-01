window.multiSteps = function () {
    return {
        steps : [
            {id: 1, title: 'Your info', completed: false},
            {id: 2, title: 'Select plan', completed: false},
            {id: 3, title: 'Add-ons', completed: false},
            {id: 4, title: 'Summary', completed: false},
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
        currentStep : 4,
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
            })
        },
        getOrderedAddons(addonIds) {
            let addonIdsArray = Object.values(addonIds)
            return this.addons.filter((addon) => {
                return addonIdsArray.includes(addon.id);
            })
        },
        total() {
            let orderedPlan = this.getOrderedPlan(this.selectedPlan)
            // let addonsArray = this.getOrderedAddons(this.order.addons)
            // let addonTotal
            // if(this.billingYearly) {
            //     for (let i = 0 ; i < addonsArray.length ; i++) {
            //         for (let item in addonsArray) {
            //             addonTotal = addonTotal + item.priceYearly
            //         }
            //     }
            //     this.order.total = orderedPlan.priceYearly + addonTotal
            // } else {
            //     for (let i = 0 ; i < addonsArray.length ; i++) {
            //         for (let item in addonsArray) {
            //             addonTotal = addonTotal + Number(item.priceMonthly)
            //         }
            //     }
            //     this.order.total = Number(orderedPlan.priceMonthly) + addonTotal
            // }
            console.log('selected ' + this.selectedPlan)
            console.log('order ' + this.order.plan)
            console.log( 'local ' + orderedPlan)
            // console.log(Number(orderedPlan.priceMonthly))
            // console.log(Number(addonTotal))
            // console.log(this.order.total)
            // return this.order.total

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
                    if(this.selectedPlan != null) {
                        this.order.plan = this.selectedPlan
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
                        this.order.addons = this.selectedAddons
                        this.currentStep = 4
                    }
                    break;
            }
        }
    }
}