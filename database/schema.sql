set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"email" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	"modifiedAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."listings" (
	"listingId" serial NOT NULL,
	"userId" integer NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"price" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"condition" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	"modifiedAt" timestamptz NOT NULL default now(),
	CONSTRAINT "listings_pk" PRIMARY KEY ("listingId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."savedItems" (
	"listingId" integer NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamptz NOT NULL default now()
) WITH (
  OIDS=FALSE
);




ALTER TABLE "listings" ADD CONSTRAINT "listings_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "savedItems" ADD CONSTRAINT "savedItems_fk0" FOREIGN KEY ("listingId") REFERENCES "listings"("listingId");
ALTER TABLE "savedItems" ADD CONSTRAINT "savedItems_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
