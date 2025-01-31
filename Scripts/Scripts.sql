
-- users table schema
Create Table Users 
(
    id SERIAL PRIMARY key,
    user_name character varying(50),
    password character varying(200),
    Mobile_number character varying(50),
    Bio character varying(1000),
    Availability_from Time Not Null;
    Availability_Till Time Not Null;
)

-- Notification table schema
Create table Notification (
    id SERIAL PRIMARY key,
    notice_content character varying(1000),
    SpecificUser Boolean,
    userId Integer,
    isCritical boolean
)