# eshop
this is an eshop application with a few functionalities

It is assumed that the following software is installed 
* mongodb ( mongosh)
* postman api 

Additional node packages installed :
* nodemon 

Additional functionality implemented 
* whenever an order is placed , the availableItems(stock) quantity is reduced by the quantity of the order
* a check has been put in place to not let the order go through if the quantity is greater than availableItems(stock)

## Sample json payload for each endpoint

- signup - /users

{
    "password": "password",
    "firstName": "firstname",
    "lastName": "lastname",
     "email": "email@something.com",
    "phoneNumber": "1234567890"
}

- login- '/auth'


{
    "email": "email@something.com",
    "password": "password"
}


- Add Address - /addresses


{
    "name": "John Doe",
    "phone": "1234567890",
    "street": "Lorem ipsum",
    "landmark" : "Lorem ipsum",
    "city": "Lorem ipsum",
    "state": "Lorem ipsum",
    "zipcode" : "123456"
}


- Search Product - /products

- Get Product Categories - /products/categories

- Get Product by Product ID - /products/:id

- Save Product - '/products' 


{
    "name": "Lorem ipsum",
    "category": "Lorem ipsum",
    "price": 100,
    "description": "Lorem ipsum",
    "manufacturer": "Lorem ipsum",
    "availableItems": 200,
    "imageUrl": "Lorem ipsum"
}


- Update Product Details- '/products/:id'


{
    	"name": "Lorem ipsum",
        "price": 5600,
        "availableItems": 1000,
        "category": "Lorem ipsum",
        "description": "Lorem ipsum",
        "imageUrl": "Lorem ipsum",
        "manufacturer": "Lorem ipsum"
}


- Delete Product '/products/:id'

- Create Order - '/orders'
 
{
    "addressId": 50,
    "productId": 16,
    "quantity:4"
}

Note : For the endpoints with no json requirements, none is provided

