const { setWorldConstructor, defineParameterType } = require('@wdio/cucumber-framework');

function CustomWorld() {
    this.state = {
        description: 'object to store data between steps',
        checks: [],
    };
}

setWorldConstructor(CustomWorld);

const stringRegexp = /\<([^)]+)\>/;

defineParameterType({
    regexp: stringRegexp,
    name: 'data',
    useForSnippets: true,
    transformer(str) {
        return str;
    },
});
