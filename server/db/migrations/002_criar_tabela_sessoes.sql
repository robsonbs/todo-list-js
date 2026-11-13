CREATE TABLE sessoes_http (
  sid varchar NOT NULL PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
);

CREATE INDEX sessoes_http_expira_em_idx ON sessoes_http (expire);
