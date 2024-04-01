from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in the app

# Define API endpoints
client = MongoClient('mongodb://localhost:27017/')
db = client['v-stock']
collection = db['mycollection']

@app.route('/api/products')
def get_products():
    # Retrieve data from MongoDB
    products = list(collection.find())

    # Convert ObjectId to string for JSON serialization
    for product in products:
        product['_id'] = str(product['_id'])

    # Close MongoDB connection
    # client.close()

    # Return JSON response
    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)

