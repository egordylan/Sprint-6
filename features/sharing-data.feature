Feature: Scenarios will share some date between each other

    Scenario: Addition of two numbers
        When I add '2' and '2'


    Scenario: Assertion of the sum
        Then The sum was '4'


# npx wdio -f cucumber --spec features/sharing-data.feature