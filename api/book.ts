import { PutCommand } from "@aws-sdk/lib-dynamodb"
import { client, TABLE_NAME } from "./ddb.js"
import { Book } from "../model/book"

export const putBook = async (book: Book) => {
    const params = {
        TableName: TABLE_NAME,
        Item: book
    }
    try {
        const data = await client.send(new PutCommand(params))
        console.log("Success!")
    } catch (err) {
        console.log("Error", err.stack)
    }
}