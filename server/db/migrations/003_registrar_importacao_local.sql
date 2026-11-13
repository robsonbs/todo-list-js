CREATE TABLE importacoes_locais (
  usuario_id uuid PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
  importada_em timestamptz NOT NULL DEFAULT now()
);
