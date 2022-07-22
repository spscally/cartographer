import { QueryCommand } from "@aws-sdk/client-dynamodb"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { client, TABLE_NAME } from "./ddb.js"

export const getReflectionsByDate = async (category, fromDate, toDate) => {
    if (!fromDate) fromDate = "0000-00-00"
    if (!toDate) toDate = "9999-12-31T23:59:99"
    console.log(category, fromDate, toDate)
    const params = {
        KeyConditionExpression: "pk = :pk AND sk = :category AND #date BETWEEN :from AND :to",
        // TODO: figure out how to use LSK/GSK here
        ExpressionAttributeNames: {
            "#date": "date"
        },
        ExpressionAttributeValues: {
            ":pk": { S: "reflection" },
            ":category": { S: category },
            ":from": { S: fromDate },
            ":to": { S: toDate }
        },
        TableName: TABLE_NAME
    }
    const data = await client.send(new QueryCommand(params))
    return data.Items
}

export const putReflection = async (reflection) => {
    const params = {
        TableName: TABLE_NAME,
        Item: reflection
    }
    await client.send(new PutCommand(params))
}