To start mongoDB:
- create directory: D:\mongoDB\data;
open cmd (admin):
- C:\Program Files\MongoDB\Server\3.6\bin> mongod --dbpath=D:\mongoDB\data;
- C:\Program Files\MongoDB\Server\3.6\bin> mongo;
To start app:
- directory-to-app> yarn run serve:ssr
To build app:
- directory-to-app> yarn run build:ssr

working with mongoDB:
use internet_shop
db.createCollection("products");

db.products.insert([{'id': '1000', 'name': 'NewProduct1', 'image': '', 'description': 'Good product', 'price': '30'}])

db.products.find() - get data from the collection.d

show collections - Print a list of all collections for current database.
show dbs - Print a list of all databases on the server.