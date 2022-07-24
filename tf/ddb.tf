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
    read_capacity = 5
    write_capacity = 5

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

    local_secondary_index {
        name = "date-index"
        range_key = "date"
        projection_type = "ALL"
    }

    point_in_time_recovery {
        enabled = true
    }
}