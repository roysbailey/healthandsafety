-- docker run --name test-postgress -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=test -d postgres

-- Node vs prostgress SQL


-- Table: public."HealthAndSafetyBookmark"
DROP TABLE public."HealthAndSafetyBookmark";
CREATE TABLE public."HealthAndSafetyBookmark"
(
    "System" character varying COLLATE pg_catalog."default" NOT NULL,
    "LastPollDateTime" timestamp with time zone,
    CONSTRAINT "HealthAndSafetyBookmark_pkey" PRIMARY KEY ("System")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."HealthAndSafetyBookmark"
    OWNER to postgres;

truncate table public."HealthAndSafetyBookmark";
INSERT INTO public."HealthAndSafetyBookmark"
	("System", "LastPollDateTime")
	VALUES ('HealthAndSafety', '2016-01-17 19:05:42.673+00');
    


-- Table: public."HealthAndSafetyIncidents"

DROP TABLE public."HealthAndSafetyIncidents";

CREATE TABLE public."HealthAndSafetyIncidents"
(
    casualty character varying COLLATE pg_catalog."default",
    "createdDateTime" timestamp without time zone,
    "incidentClass" character varying COLLATE pg_catalog."default",
    "incidentDate" character varying COLLATE pg_catalog."default",
    "IncidentID" character varying COLLATE pg_catalog."default" NOT NULL,
    "nameOfSubmitter" character varying COLLATE pg_catalog."default",
    "problemReport" character varying COLLATE pg_catalog."default",
    "Region" character varying COLLATE pg_catalog."default",
    status character varying COLLATE pg_catalog."default",
    "updatedDateTime" timestamp without time zone,
    CONSTRAINT "HealthAndSafetyIncidents_pkey" PRIMARY KEY ("IncidentID")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."HealthAndSafetyIncidents"
    OWNER to postgres;
    

-- Table: public."hasIncidentQueue"

DROP TABLE public."hasIncidentQueue";

CREATE TABLE public."hasIncidentQueue"
(
    taskID SERIAL,
    incident json
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."hasIncidentQueue"
    OWNER to postgres;    