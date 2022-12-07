const { Given, When, Then } = require('@wdio/cucumber-framework');



When(/^I login with "([^"]*)" and "([^"]*)"$/, async function (username, password) {
    await LoginPage.login(username, password);
});

Then(/^I should see a flash message saying (.*)$/, async function (message) {
    await expect(LoginPage.alertMessage).toBeExisting();
    await expect(LoginPage.alertMessage).toHaveTextContaining(message);
});


Given("I go to the Main page", async function () {
    await browser.maximizeWindow();
    await LoginPage.openMainPage();
});

Then("I go to Login Register page", async function () {
    await LoginPage.goToLoginRegister();

    const title = await browser.getTitle();
    console.log("TITLE :::", title);
    expect (await title).toEqual("Account Login");
});

When("Click the Continue button to make new user", async function () {
    await LoginPage.createUser();

    const title = await browser.getTitle();
    console.log("TITLE 2 :::", title);
    expect (await title).toEqual("Create Account");
});


Then("I create new user with data:", async function (formYaml) {
    const data = YAML.parse(formYaml);
    console.log("TABLE ---> ", { data });
    await Registration.registration(data);

    const title = await browser.getTitle();
    console.log("TITLE :::", title);
    expect(await title).toEqual("Your Account Has Been Created!");
});

Then("I create new user", async function () {
    await Registration.registration(null);
});

Then("Check registration", async function () {
    await Registration.registrationCheck();
    expect (await Registration.mainText.getText()).toEqual('MY ACCOUNT');
});

When('I add some goods to the shoping cart', async function () {
    await Items.addToShopingCart(Items.item1, Items.item2);
});

Then('I check shopping card item image:', async function (table) {
    await browser.logToViewport();

    const data = JSON.parse(table);
    console.log('DATA +++ ', data);

    await LoginPage.cart.click();
    
    const imagesList = await Cart.cartImages;
    console.log('imagesList +++ ', imagesList);
    
    for (const elem of data) {

        const indx = data.indexOf(elem);
        console.log('ELEMENT +++ ', elem);
        console.log('indx +++ ', indx);

        for (const el in elem) {
            console.log('EL === ', el);
            console.log('imagesList[indx] === ', imagesList[indx]);

            const attriubute = await imagesList[indx].getAttribute(el);
            const value = elem[el];
            console.log('attriubute === ', attriubute);
            await expect(attriubute).toEqual(value) ;           
        }
    } 

});


// sprint 6
When('I add {string} and {string}', async function (param1, param2) {
    console.log(this.state)
    let result = Number(param1) + Number(param2);
    return result;
});


// With Cucumber World
When(/^I fill the user form:$/, async function (formYaml) {
    this.state.formYaml = YAML.parse(formYaml);
    // console.log(this.state);
    for (const field in this.state.formYaml ) {
        await $(`#${field}`).setValue(this.state.formYaml[field]);
    }
    await $('//*[@type="submit"][text()[contains(.,"Create")]]').click();
    
});

Then('Check the user data', async function() {
    await $('//*[text()[contains(.,"List of Users")]]').waitForExist({reverse: false, timeout: 5000});
    const url = await browser.getUrl();
    await expect(url).toMatch('https://viktor-silakov.github.io/course-sut/Users.html');

    const email = await $(`//*[text()="${this.state.formYaml.email}"]/..`);
    const emailText = await email.$('(.//div[@class="tabulator-cell"])[1]').getText();
    await expect(this.state.formYaml.email).toEqual(emailText)
    console.log(emailText);

    const address1 = await $(`//*[text()="${this.state.formYaml.address1}"]/..`);
    const address1Text = await address1.$('(.//div[@class="tabulator-cell"])[3]').getText();
    await expect(this.state.formYaml.address1).toEqual(address1Text)
    console.log(address1Text);

    const address2 = await $(`//*[text()="${this.state.formYaml.address2}"]/..`);
    const address2Text = await address2.$('(.//div[@class="tabulator-cell"])[4]').getText();
    await expect(this.state.formYaml.address2).toEqual(address2Text)
    console.log(address2Text);

    const cityData = await $(`//*[text()="${this.state.formYaml.city}"]/..`);
    const cityText = await cityData.$('(.//div[@class="tabulator-cell"])[5]').getText();
    await expect(this.state.formYaml.city).toEqual(cityText)
    console.log(cityText);

    const zipData = await $(`//*[text()="${this.state.formYaml.zip}"]/..`);
    const zipText = await zipData.$('(.//div[@class="tabulator-cell"])[7]').getText();
    await expect(String(this.state.formYaml.zip)).toEqual(zipText)
    console.log(zipText);

    const description = await $(`//*[text()="${this.state.formYaml.description}"]/..`);
    const descriptionText = await description.$('(.//div[@class="tabulator-cell"])[8]').getText();
    await expect(this.state.formYaml.description).toEqual(descriptionText)
    console.log(descriptionText);
});