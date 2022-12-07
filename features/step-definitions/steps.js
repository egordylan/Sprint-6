const { Given, When, Then } = require('@wdio/cucumber-framework');


// sprint 6: task 1--- sharing data between tests
When('I add {string} and {string}', async (param1, param2) => {
    const result = Number(param1) + Number(param2);
    this.result = result;
    // this.state.result = result;
    console.log('RESULT --- ', this.result);
    // console.log(this.state.result);
});

Then('The sum was {string}', async (param) => {
    // console.log(this.result);
    await expect(this.result).toEqual(Number(param));
});

// sprint 6: task 2--- data transformation
When('I create transformation "{data}" string to {string}', async (data, string) => {
    this.string = string;
    this.data = data;
});

Then('I check the transformation', async () => {
    console.log('<current data> ::: ', this.data); 
    console.log('current data ::: ', this.string);
    await expect(this.data).toEqual(this.string);
});
