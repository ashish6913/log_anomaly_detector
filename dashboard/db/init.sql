CREATE TABLE PREDICTED_NORMAL_1 (
    spanId TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    movieId TEXT NOT NULL,
    comment TEXT,
    status TEXT,
    comment_date TEXT
)
;

COPY PREDICTED_NORMAL_1(spanId,userId,movieId,comment,status,comment_date) 
FROM '/docker-entrypoint-initdb.d/dashboard_data.csv' 
WITH CSV HEADER
;