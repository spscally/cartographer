const AWS = require('aws-sdk')
const { Client } = require("@notionhq/client")

AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
})

const DDB = new AWS.DynamoDB();

const NOTION_KEY = ""
const NOTION_DB_ID = ""
const NOTION = new Client({ auth: NOTION_KEY })

async function insertBook(title, author, date, ddc) {
    await NOTION.pages.create({
        parent: {
            database_id: NOTION_DB_ID
        },
        properties: {
            Title: {
                type: 'title',
                title: [
                    {
                        type: 'text',
                        text: {
                            content: title
                        }
                    }
                ]
            },
            Author: {
                type: 'rich_text',
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: author
                        }
                    }
                ]
            },
            Date: {
                type: 'date',
                date: {
                    start: date
                }
            },
            DDC: {
                type: 'rich_text',
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: ddc
                        }
                    }
                ]
            }
        }
    })
}

DDB.scan({ TableName: 'cartographer' }, async (err, data) => {
    if (err) {
        console.error(err)
    } else {
        for (const item of data.Items) {
            const title = item.title.S
            const author = item.author.S
            const date = item.date.S.substring(0, 10)
            const ddc = item.sk.S.split('_')[0]

            await insertBook(title, author, date, ddc)
        }
    }
})