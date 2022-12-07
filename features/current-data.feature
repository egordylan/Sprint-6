Feature: Using data transformation for parameter type, create transformation "<current data>" string to current data

    Scenario: Addition of two numbers
        When I create transformation "<current data>" string to "current data"
        Then I check the transformation



# npx wdio -f cucumber --spec features/current-data.feature