from boto3.dynamodb.conditions import Key
import boto3
import json

ddb = boto3.resource('dynamodb')
table = ddb.Table('Telekinesis')

books = table.query(KeyConditionExpression=Key('pk').eq('Book')).get('Items')

with open('books.json', 'w') as f:
    f.write(json.dumps(books, indent=2))

reflections = table.query(KeyConditionExpression=Key(
    'pk').eq('Reflection')).get('Items')

with open('reflections.json', 'w') as f:
    f.write(json.dumps(reflections, indent=2))
