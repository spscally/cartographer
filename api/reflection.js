import { GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

import { client, TABLE_NAME } from "./ddb.js";

export const getReflectionsByDate = async (category, fromDate, toDate) => {
  if (!fromDate) fromDate = "0000-00-00";
  if (!toDate) toDate = "9999-12-31T23:59:99";
  const params = {
    KeyConditionExpression: "pk = :pk AND sk BETWEEN :sk_start AND :sk_end",
    ExpressionAttributeValues: {
      ":pk": { S: "reflection" },
      ":sk_start": { S: `${category}_${fromDate}` },
      ":sk_end": { S: `${category}_${toDate}` },
    },
    TableName: TABLE_NAME,
  };
  const data = await client.send(new QueryCommand(params));
  return data.Items.map((item) => unmarshall(item));
};

export const getAllReflectionsByDate = async (fromDate, toDate) => {
  if (!fromDate) fromDate = "0000-00-00";
  if (!toDate) toDate = "9999-12-31T23:59:99";
  const params = {
    KeyConditionExpression: "pk = :pk",
    FilterExpression: "#date BETWEEN :from AND :to",
    ExpressionAttributeNames: {
      "#date": "date",
    },
    ExpressionAttributeValues: {
      ":pk": { S: "reflection" },
      ":from": { S: fromDate },
      ":to": { S: toDate },
    },
    TableName: TABLE_NAME,
  };
  const data = await client.send(new QueryCommand(params));
  return data.Items.map((item) => unmarshall(item));
};

export const putReflection = async (reflection) => {
  const params = {
    TableName: TABLE_NAME,
    Item: reflection,
  };
  await client.send(new PutCommand(params));
};

export const getReflectionCategories = async () => {
  const params = {
    Key: {
      pk: { S: "category" },
      sk: { S: "reflection" },
    },
    TableName: TABLE_NAME,
  };
  const data = await client.send(new GetItemCommand(params));
  return unmarshall(data.Item).categories;
};
