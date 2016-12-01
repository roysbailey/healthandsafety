-- Initialisation SQL which is to be run against a blank postgres DB.  This is automatically run when used with the docker image.

-- Table: public."HealthAndSafetyBookmark"
-- DROP TABLE public."HealthAndSafetyBookmark";
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
    

CREATE TABLE public."hasIncidentsReadView"
(
    "IncidentID" character varying COLLATE pg_catalog."default" NOT NULL,
    "Region" character varying COLLATE pg_catalog."default",
    incident json
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."hasIncidentsReadView"
    OWNER to postgres;

CREATE SEQUENCE public."hasIncidentQueue_taskid_seq"
    INCREMENT 1
    START 4
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public."hasIncidentQueue_taskid_seq"
    OWNER TO postgres;

-- Table: public."hasIncidentQueue"

-- DROP TABLE public."hasIncidentQueue";

CREATE TABLE public."hasIncidentQueue"
(
    taskid integer NOT NULL DEFAULT nextval('"hasIncidentQueue_taskid_seq"'::regclass),
    incident json,
    status character varying(10) COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."hasIncidentQueue"
    OWNER to postgres;