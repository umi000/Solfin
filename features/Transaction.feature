Feature: Asset Transactions

  As a user, I want to be able to buy and sell assets securely through the API.

  Background: User is logged in
    Given I have an active API connection to the Custody service
    And I am logged in as "sovera.production@gmail.com" with password "Test_54321"

  Scenario: Successfully buy an asset
    When I place a "buy" order for "BTC" with amount "0.5"
    Then the response status code should be 201
    And the response should contain a transaction confirmation

  Scenario: Successfully sell an asset
    When I place a "sell" order for "ETH" with amount "10"
    Then the response status code should be 201
    And the response should contain a transaction confirmation

  Scenario Outline: Fail to buy an asset due to invalid conditions
    When I place a "buy" order for "<asset>" with amount "<amount>"
    Then the response status code should be <statusCode>
    And the response body should contain the message "<message>"
    Examples: Invalid Buy Orders
      | asset   | amount | statusCode | message                |
      | BTC     | 999999 | 400        | Insufficient funds.    |
      | UNKNOWN | 1      | 404        | Asset not found.       |
      | BTC     | 0      | 400        | Amount must be > 0.    |

#     Examples:
#       | endpoint      | status_code |
#       | /users/2      | 200         |
#       | /users/23     | 404         |
