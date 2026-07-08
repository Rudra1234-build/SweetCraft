PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE _mocha_migrations (
number     INTEGER UNIQUE,
up_sql     TEXT NOT NULL,
down_sql   TEXT NOT NULL,
applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "_mocha_migrations" ("number","up_sql","down_sql","applied_at") VALUES(1,replace('\nCREATE TABLE reviews (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  recipe_id TEXT NOT NULL,\n  author_name TEXT NOT NULL,\n  rating INTEGER NOT NULL,\n  comment TEXT NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE INDEX idx_reviews_recipe_id ON reviews(recipe_id);\n','\n',char(10)),replace('\nDROP INDEX idx_reviews_recipe_id;\nDROP TABLE reviews;\n','\n',char(10)),'2026-02-02 10:39:32');
CREATE TABLE reviews (
id INTEGER PRIMARY KEY AUTOINCREMENT,
recipe_id TEXT NOT NULL,
author_name TEXT NOT NULL,
rating INTEGER NOT NULL,
comment TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DELETE FROM sqlite_sequence;
CREATE INDEX idx_reviews_recipe_id ON reviews(recipe_id);
