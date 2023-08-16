// File with locators for links and locators of the elements used in tests 




export const locators = {
    routeToShopBaseURL : 'https://staging.ourx.co/**',
    productPageURL : 'https://staging.ourx.co/products/summer-essentials-trio',

    addToCartButtonTextLocator : '//*[@id="__next"]/div/div[3]/div[1]/div/div[1]/div/div[4]/div/div[2]/div/div[2]/button/div/span',
    addToCartButtonLocator : {
        role :  'button', 
        properties : { name: 'Add to Cart' }
    },

    shoppingCartHeadingLocator : {
        roleCartHeading: 'heading',
        propertiesCartHeading : {name: 'Shopping Cart'}
    },

    checkoutButtonLocator : {
        checkoutButtonRole :  'button', 
        checkoutButtonProperties : {name: 'Checkout'}
    },

    checkoutButtonTextLocator : '.css-4fda2r',

    //CSS functions 
    CSSTextTransform : 'uppercase'

    //

};


