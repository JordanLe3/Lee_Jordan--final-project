# CSFS1020 - Course Project

# Author: Jordan Lee

## Route Set-up

Before starting, create a `.env` file and copy and paste the contents from `.envfile` into it.

Once npm is started the terminal should read: API server ready on http://localhost:3000

    To test that it is working in postman, use route `GET http://localhost:3000` to get the following response: `Hello World`

1. To add new entry use route `POST /contact_form/entries`
    Request body expected:
    ```json
    {    
        "name": "Jordan Lee",
        "email": "Jordan@Lee.com",
        "phoneNumber": "1234567890",
        "content": "blah blah blah"
    }
    ```
    This will create json file `entries.json` if it does not exist in the data folder and will add the new entry with a random id to the array and return the array with the added entry.
    Response expected:
    ```json
    {
        "id": "3e8fe321-42fe-4957-af68-231295a09851",
        "name": "Jordan Lee",
        "email": "Jordan@Lee.com",
        "phoneNumber": "1234567890",
        "content": "blah blah blah"
    }
    ```
    In the event the body of the request is missing any of the following properties, or these fields have incorrect values: name, email, phoneNumber, content, a Bad Request status will occur and the response will return:
    ```json
    {
        "message": "validation error", 
        "invalid": ["name", "email", "phoneNumber", "content"]  
    }
    ```
    Also if the email is invalid in the body, the error will show "email" as invalid in the response.
2. To add new user use route `POST /users`
    Request body expected:
    ```json
    {
        "name": "Jordan Lee",
        "password": "zxcvasdfqwer",
        "email": "Jordan@Lee.com"
    }
    ```
    This will create json file `users.json` if it does not exist in the data folder and add the new entry with a random id to the array and return the array with the added entry. The password will also be hashed.
    Response expected:
    ```json
    {
        "id": "3e8fe321-42fe-4957-af68-231295a09851",  
        "name": "Jordan Lee",
        "password": "random bycrpt hash password" "==> actual password:  zxcvasdfqwer",
        "email": "Jordan@Lee.com"
    }
    ```
    In the event any of the properties are missing, or the wrong values are provided, alongside the appropriate status code (Bad Request), the response should be in the format of:
    ```json
    {
        "message": "validation error", 
        "invalid": ["name", "password", "email"]  
    }
    ```
    Also if the email is invalid in the body and the password is less than 8 characters, the error will show "email" and "password" as invalid in the response.
3. To obtain a token using jsonwebtoken for users use route `POST /auth`. Please use example below on the condition that the Jordan Lee user has been added to the `users.json` file. 
    Request body expected:
    ```json
    {
        "password": "zxcvasdfqwer",
        "email": "Jordan@Lee.com"
    }
    ```
    This should provide the user with a token
    Response expected: 
    ```json
    {
        "token": "Random token generated"
    }
    ```
    In the event the email and password do not match, the following reponse will show:
    ```json
    {
        "message": "incorrect credentials provided"
    }
    ```
4. To get list of entries using authorization token use route `GET /contact_form/entries` and then under Authorization: bear token use token `testtoken` for now as hardcode token.
    Response Expected:
    ```json
    {
        "id": "3e8fe321-42fe-4957-af68-231295a09851",    
        "name": "Jordan Lee",
        "email": "Jordan@Lee.com",
        "phoneNumber": "1234567890",
        "content": "blah blah blah"
    }
    ```
    If the token is invalid or not provided then the response will be the following:
    ```json
    {
        "message": "token not found"
    }
    ```
5. To get specific entry when using jwt use route `GET /contact_form/entries/:id` and use authorization token: "testtoken"
    Response Expected:
    ```json
    {
        "id": "3e8fe321-42fe-4957-af68-231295a09851",    
        "name": "Jordan Lee",
        "email": "Jordan@Lee.com",
        "phoneNumber": "1234567890",
        "content": "blah blah blah"
    }
    ```
    If id parameter is not found the response will be the following:
    ```json
    {
        "message": "entry da1-c4b2-4 not found"
    }
    ```
    If the token is invalid or not provided then the response will be the following:
    ```json
    {
        "message": "token not found"
    }
    ```
    For the catch all errorHandler if the route does not exist the following message will be:
    ```json
    {
        "message": "not found"
    }
    ```