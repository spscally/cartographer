terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.16"
        }
    }

    required_version = ">= 1.2.0"
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_dynamodb_table" "cartographer_table" {
    name = "cartographer"

    billing_mode = "PROVISIONED"
    read_capacity = 3
    write_capacity = 3

    hash_key = "pk"
    range_key = "sk"

    attribute {
        name = "pk"
        type = "S"
    }

    attribute {
        name = "sk"
        type = "S"
    }

    attribute {
        name = "date"
        type = "S"
    }

    global_secondary_index {
        name = "reflection-category-date-index"
        hash_key = "sk"
        range_key = "date"
        read_capacity = 3
        write_capacity = 3
        projection_type = "INCLUDE"
        non_key_attributes = ["title", "subtitle", "body"]
    }

    local_secondary_index {
        name = "date-index"
        range_key = "date"
        projection_type = "ALL"
    }

    point_in_time_recovery {
        enabled = true
    }
}