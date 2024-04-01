import json
from bs4 import BeautifulSoup
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.producthunt.com/all')

content = driver.page_source
soup = BeautifulSoup(content, 'html.parser')

cards = soup.find_all('div', class_='styles_item__Dk_nz')
data = []
for card in cards:
    name = card.find('strong').text
    description = card.find('div', class_='styles_titleTaglineItem__d5Rut').text.strip().replace('\n', '')
    categories = [a.text.strip() for a in card.find_all('a', class_='styles_underlinedLink__MUPq8')]
    
    # Find the image element
    image_element = card.find('img', class_='styles_mediaThumbnail__NCzNO')
    # Extract the image URL if it exists
    image_url = image_element['src'] if image_element and 'src' in image_element.attrs else None

    card_data = {
        'Name': name,
        'Description': description,
        'Categories': categories,
        'ImageURL': image_url
    }
    data.append(card_data)

# Convert the data to JSON format
json_data = json.dumps(data, indent=4)

# Print the JSON data
print(json_data)





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
result = collection.insert_many(data)

# Print the inserted document's ID
print('Inserted document ID:', result.inserted_ids)

# Close the connection
client.close()

driver.quit()
