# Demo API test automation with Javascript

### Project idea
Demo basic test automation for APIs with the help of:
- JavaScript
- node.js  
- babel  
- Jest   
- axios   
- ajv  
- libxmljs  
 
TDD methodology is used to write tests first and then write functions to satisfy them. 

### SUT (Software under test)
[Go REST](https://gorest.co.in)  

### Tests demonstrated here
1. `GET` requests 
2. `POST` requests
3. `PUT/PATCH` requests
4. `DELETE` request

### Installation instructions
1. Clone this repository
2. `cd` into the cloned folder 
3. Run `npm install`
4. Open [Go REST](https://gorest.co.in) and generate access token following instructions on the site.
5. Update TOKEN constant in `./src/utils/constants.js` with the token generated in step 4.  
6. Execute tests with `npm run test`

### In case something isn't working after the installation: 
1. Delete `package-lock.json` and `node_modules` folder 
2. Run `npm install` again. 

#### Additional notes
- Some tests (3 at the time of writing this doc) will fail due to actual bugs found by this automation framework.
- Some tests may randomly fail because the API is open for anybody to make changes at any time.

Enjoy! :)