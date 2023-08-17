import { test, expect } from '@playwright/test';
import { locators , textToAssert } from '../Locators';
import dotenv from 'dotenv'

test.describe('Check Summer Essentials Trio Test Suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.route(process.env.STAGING_BASE_URL!, (route, request) => {    // we are routing the requests from this baseURL which can be found in generalLocators.ts file
            route.continue({
                headers: {                                                      
                    ...request.headers(),
                    'x-vercel-protection-bypass' : process.env.VERCEL_PROTECTION_HEADER_VALUE! // we add the headers so we don't have to authenticate
                }
            });
        });
    });

    test('End to End test for Adding a product to cart', async ({ page }) => {   // This is our end to end test on the product page 
        await test.step('Go to staging product page', async () => {
            await page.goto(process.env.STAGING_URL_SUMMER_ESSENTIALS_TRIO!)
        })


        await test.step('STEP 1 -> Check page heading to be "Summer Essentials Trio" ',async () => {  // STEP 1 - we check the Heading on the product page 
            const summerEssentialsTrioHeading = await page.getByText(textToAssert.summerEssentialsTrioHeadingText).nth(1) // Locator for the Page Heading
            await expect(summerEssentialsTrioHeading).toContainText(textToAssert.summerEssentialsTrioHeadingText) // Checking heading to contain our title

        })


        await test.step('STEP 2 -> Check Add to Cart Button Text',async () => { // STEP 2 - We check the text on the Add to Cart Button to be uppercase 
            //locators for Add to Cart button
            const addToCartButtonText = await page.locator(locators.addToCartButtonTextLocator)

            // Pulling information about CSS functions used
            const displayedText = await addToCartButtonText.evaluate(el => el.innerHTML)
            const addToCartButtonTextTransform = await addToCartButtonText.evaluate(el => {
                return getComputedStyle(el).textTransform;  // Here we get the text-transform used in CSS
            })


            //Assertions
            await expect(addToCartButtonTextTransform).toEqual(locators.CSSTextTransform) // We assert that the text-transform function from CSS is uppercase 
            await expect(displayedText).toBe(textToAssert.addToCartText) // We assert that the displayedText is Add to Cart which in combination with assertion above results that our text in Button is ADD TO CART
        }) 
        
        
        await test.step('STEP 3 -> Check Add to Cart Functionality',async () => {  // STEP 3 : We perform the click action on the Add To Cart Button and we check that the Shopping Cart drawer is open
            const { role, properties } = locators.addToCartButtonLocator
            const {roleCartHeading, propertiesCartHeading } = locators.shoppingCartHeadingLocator
            const addToCartButton = await  page.getByRole(role as 'button', properties)
            const shoppingCartHeading = await page.getByRole(roleCartHeading as 'heading', propertiesCartHeading)
            
            //Performing click action on Add to Cart button and checking the drawer is open
            await addToCartButton.click()
            await expect(shoppingCartHeading).toContainText(textToAssert.shoppingCartText)
        })    


        await test.step('STEP 4 -> Check Data Inside Add to cart drawer ',async () => { // We check data inside the Add to cart drawer 


            const {checkoutButtonRole, checkoutButtonProperties} = locators.checkoutButtonLocator
            const checkoutButton = await page.getByRole(checkoutButtonRole as 'button', checkoutButtonProperties)
            const checkoutButtonText = await page.locator(locators.checkoutButtonTextLocator).nth(1)

            const displayedText = await checkoutButtonText.evaluate(el => el.innerHTML)
            const checkoutButtonTextTransform = await checkoutButtonText.evaluate(el => {
                return getComputedStyle(el).textTransform;  // Here we get the text-transform used in CSS
            })


            await expect(checkoutButtonTextTransform).toEqual(locators.CSSTextTransform) // We assert that the text-transform function from CSS is uppercase 
            await expect(displayedText).toBe(textToAssert.checkoutText) // We assert that the displayedText is Add to Cart which in combination with assertion above results that our text in Button is ADD TO CART
            await expect(checkoutButton).toBeVisible()
            await expect(checkoutButton).toContainText(textToAssert.checkoutText)
            
        })
            
            
            
        })    
            
               
        
        
    });






