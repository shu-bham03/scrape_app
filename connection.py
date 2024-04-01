from pymongo import MongoClient
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# if client is None: print("nothing is there")
# Access database (create if it doesn't exist)
db = client['v-stock']

# Access collection (create if it doesn't exist)
collection = db['mycollection']

# Data to be inserted
# data = {
#     'name': 'John Doe',
#     'age': 30,
#     'email': 'john.doe@example.com'
# }

# Insert a single document into the collection
result = collection.find()

# Iterate over the results
for document in result:
    return document

# Close the connection
client.close()