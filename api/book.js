import { QueryCommand } from "@aws-sdk/client-dynamodb"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { client, TABLE_NAME } from "./ddb.js"

export const getBooksByDDC = async (fromDDC, toDDC) => {
    if (!fromDDC) fromDDC = "0"
    if (!toDDC) toDDC = "1000"
    const params = {
        KeyConditionExpression: "pk = :pk AND sk BETWEEN :from AND :to",
        ExpressionAttributeValues: {
            ":pk": { S: "book" },
            ":from": { S: fromDDC },
            ":to": { S: toDDC }
        },
        TableName: TABLE_NAME
    }
    const data = await client.send(new QueryCommand(params))
    return data.Items
}

export const getBooksByDate = async (fromDate, toDate) => {
    if (!fromDate) fromDate = "0000-00-00"
    if (!toDate) toDate = "9999-12-31T23:59:99"
    const params = {
        KeyConditionExpression: "pk = :pk AND #date BETWEEN :from AND :to",
        ExpressionAttributeNames: {
            "#date": "date"
        },
        ExpressionAttributeValues: {
            ":pk": { S: "book" },
            ":from": { S: fromDate },
            ":to": { S: toDate }
        },
        TableName: TABLE_NAME
    }
    const data = await client.send(new QueryCommand(params))
    return data.Items
}

export const putBook = async (book) => {
    const params = {
        TableName: TABLE_NAME,
        Item: book
    }
    await client.send(new PutCommand(params))
}