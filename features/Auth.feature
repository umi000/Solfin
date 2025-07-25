Feature: API Endpoint Verification

  As a QA, I want to ensure that the API server is up and responding correctly with proper authentication. 
           This involves verifying the server's health, successful user login, and handling of invalid login attempts.
 @
  Scenario: Verify custody API'server is up and fetching data successfully via health API
   Description: This scenario ensures that the API server is operational and can respond to basic health checks, indicating its readiness to serve requests.
    Given I have an active API connection to the Custody service
    When I send a "GET" request to "/health"
    Then the response status code should be 200
    And the response body should contain the message "API is running"    
  Scenario: Log in on Custody and get authentication token
    When I send a "POST" request to "/auth/login" with the payload:
      """
      {
        "email": "sovera.production@gmail.com",
        "password": "Test_54321"
      }
      """
    Then the response status code should be 201
    And the response body should contain an authentication token

  Scenario Outline: Verify user login fails with invalid credentials
   Description: This scenario outline tests various invalid login attempts to ensure the API correctly handles erroneous inputs and provides appropriate error messages and status codes.
    When I send a "POST" request to "/auth/login" with the payload:
      """
      {
        "email": "<email>",
        "password": "<password>"
      }
      """
    Then the response status code should be <statusCode>
    And the response body should contain the message "<message>"

    Examples: Invalid Login Scenarios
      | email                       | password      | statusCode | message                                      |
      | sovera.production@gmail.com | WrongPassword | 401        | Invalid email or password                    |
      | invalid.email@sovera.io     | Test_54321    | 400        | Sorry, User with this email does not exists. |
      |                             | Test_54321    | 400        | Email is required                           |
      | sovera.production@gmail.com |               | 400        | Password is required                         |

#     Examples:
#       | endpoint      | status_code |
#       | /users/2      | 200         |
#       | /users/23     | 404         |
#       | /posts/1      | 200         |
