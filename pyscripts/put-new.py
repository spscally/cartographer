import boto3
import json

ddb = boto3.resource('dynamodb')
table = ddb.Table('cartographer')

books = {}
with open('books.json') as f:
    books = json.loads(f.read())

reflections = {}
with open('reflections.json') as f:
    reflections = json.loads(f.read())

err = False

for book in books:
    try:
        book['Title']
        book['DDC']
        book['Author']
        book['CompleteDate']
    except:
        print(book)
        err = True

for reflection in reflections:
    try:
        reflection['CreateDate']
        reflection['Title']
        reflection['Subtitle']
        reflection['Type']
        reflection['Body']
    except:
        print(reflection)
        err = True

if err:
    exit()

for b in books:
    book = {
        'pk': 'book',
        'sk': b['DDC'],
        'date': b['CompleteDate'],
        'title': b['Title'],
        'author': b['Author']
    }
    print(f'putting book {book["title"]}')
    table.put_item(Item=book)

categories = []
for r in reflections:
    category = r['Type'].lower()
    if category == 'goal check-in':
        category = 'goal'

    if category not in categories:
        categories.append(category)

    if category != 'goal':
        continue

    reflection = {
        'pk': 'reflection',
        'sk': f'{category}_{r["CreateDate"]}',
        'category': category,
        'date': r['CreateDate'],
        'title': r['Title'],
        'subtitle': r['Subtitle'],
        'body': r['Body']
    }
    print(f'putting reflection {category} {reflection["title"]}')
    table.put_item(Item=reflection)

table.put_item(Item={
    'pk': 'category',
    'sk': 'reflection',
    'categories': categories
})
