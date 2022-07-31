import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

import { client, TABLE_NAME } from "./ddb.js";

const parser = new XMLParser({ ignoreAttributes: false });

export const getBooksByDDC = async (fromDDC, toDDC) => {
  if (!fromDDC) fromDDC = "0";
  if (!toDDC) toDDC = "1000";
  const params = {
    KeyConditionExpression: "pk = :pk AND sk BETWEEN :from AND :to",
    ExpressionAttributeValues: {
      ":pk": { S: "book" },
      ":from": { S: fromDDC },
      ":to": { S: toDDC },
    },
    TableName: TABLE_NAME,
  };
  const data = await client.send(new QueryCommand(params));
  return data.Items.map((item) => unmarshall(item));
};

export const getBooksByDate = async (fromDate, toDate) => {
  if (!fromDate) fromDate = "0000-00-00";
  if (!toDate) toDate = "9999-12-31T23:59:99";
  const params = {
    KeyConditionExpression: "pk = :pk",
    FilterExpression: "#date BETWEEN :from AND :to",
    ExpressionAttributeNames: {
      "#date": "date",
    },
    ExpressionAttributeValues: {
      ":pk": { S: "book" },
      ":from": { S: fromDate },
      ":to": { S: toDate },
    },
    TableName: TABLE_NAME,
  };
  const data = await client.send(new QueryCommand(params));
  return data.Items.map((item) => unmarshall(item));
};

export const putBook = async (book) => {
  const params = {
    TableName: TABLE_NAME,
    Item: book,
  };
  await client.send(new PutCommand(params));
};

export const getBookFromIsbn = async (isbn) => {
  const res = await axios(
    `http://classify.oclc.org/classify2/Classify?isbn=${isbn}&summary=true&maxRecs=1`
  );

  let resJson = parser.parse(res.data);
  if (resJson.classify.workCount !== undefined) {
    const owi = resJson.classify.works.work["@_owi"];
    const owiRes = await axios(
      `http://classify.oclc.org/classify2/Classify?owi=${owi}&summary=true&maxRecs=1`
    );
    resJson = parser.parse(owiRes.data);
  }

  if (resJson.classify.work === undefined) return {};

  const book = {
    title: resJson.classify.work["@_title"],
    author: resJson.classify.work["@_author"],
    ddc: resJson.classify.recommendations.ddc.mostPopular["@_sfa"],
  };
  return book;
};
