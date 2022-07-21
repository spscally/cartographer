import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const REGION = "us-east-1"
const ddb = new DynamoDBClient({ region: REGION })

export const TABLE_NAME = "cartographer"
export const client = DynamoDBDocumentClient.from(ddb)