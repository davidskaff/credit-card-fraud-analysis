-- This command drops the table name Credit_Card_Fraud if it already exists
DROP TABLE IF EXISTS "Credit_Card_Fraud";

-- defining table schema
CREATE TABLE "Credit_Card_Fraud" (
    "number_id" INT PRIMARY KEY NOT NULL,
    "province" VARCHAR(25)   NOT NULL,
    "category" VARCHAR(60)   NOT NULL,
    "solicitation_method" VARCHAR(25)   NOT NULL,
    "gender" VARCHAR(6)   NOT NULL,
    "victim_age_range" VARCHAR(10)   NOT NULL,
    "dollar_loss" FLOAT NOT NULL    
);

--Displaying top 5 records
SELECT * FROM "Credit_Card_Fraud"
LIMIT 5;

