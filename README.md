## **WeddriverIO/ Cucumber/ Allure Report Practice Tasks**

---

### WebdriverIO + Cucumber + Allure Report:

* The World
* Sharing Data between Scenarios 
* ParameterTypes and Data Transformation
* Integration with Allure Tests Report
* Best Practices of tests solution organisation

---

### Task:

1. Write 2 Cucumber Scenarios what will share some date between each other, e.g.:

Scenario: Add two number
   When I add 2 and 2

Scenario: When I assert the sum
    Then the sum was 4

2. Using data transformation for parameter type, create transormation "<current data>" string to current data;

3. Add Allure Report to your Cucumber solution.

---

### Comments:

- To share Data you can use World object or Shared Store Service to share data between scenario, the first is preferable for the exercise;
- Use the defineParameterType CucumberJS function for data transformation.