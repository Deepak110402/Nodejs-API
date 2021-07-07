Api name: add-admin
    Method: Post
    Requested data: {
        "Name":"Enter your name"
        "Email":"Enter your email",
        "Password":"Enter Password"
        }
    response: 
        Status code: 200
        Message: Success
    Description: This API is used to add a new admin to the database.

Api name: login
    Method: Post
    Requested data: {
        "Email":"Enter your email",
        "Password":"Enter Password"
        }
    response: 
        Status code: 200
        Message: Success
    Description: This API is used to log in. So that we can identify the user whether it is an admin or a normal user.

Api name: logout
    Method: GET
    Requested data: None
    response: 
        Status code: 200
        Message: Success
    Description: This API is used to logout. 

Api name: getdata
    Method: GET
    Requested data: None
    response: It returns the whole table of Animals which is stored in the database.
    Description: This API is used to get all the details of Animals Present in database.

Api name: add-animal
    Method: Post
    Requested data: It requests all details of animal which a user wants to insert in the database.
    response: 
        Status code: 200
        Message: Success
    Description: This API is used to add a new animal to the database.

Api name: delete
    Method: Post
    Requested data: {
        "CommonName":"Enter the name of animal"
        }
    response: 
        Status code: 200
        Message: Success
    Description: This API is used to delete animal details in the database.

Api name: update
    Method: Post
    Requested data: It requests the common name of that animal which the user wants to update the details and also requests details that the user wants to change.
    response: 
        Status code: 200
        Message: Success
    Description: This API is used to update animals details in the database.