CREATE TABLE usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  hash_senha text NOT NULL,
  email_confirmado_em timestamptz,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT usuarios_email_normalizado CHECK (email = lower(btrim(email)))
);

CREATE TABLE tarefas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  texto varchar(100) NOT NULL,
  completa boolean NOT NULL DEFAULT false,
  criada_em timestamptz NOT NULL DEFAULT now(),
  atualizada_em timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT tarefas_texto_nao_vazio CHECK (btrim(texto) <> '')
);

CREATE INDEX tarefas_usuario_criacao_idx
  ON tarefas (usuario_id, criada_em DESC);

CREATE TABLE tokens_autenticacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo text NOT NULL CHECK (tipo IN ('confirmar_email', 'redefinir_senha')),
  token_hash char(64) NOT NULL UNIQUE,
  expira_em timestamptz NOT NULL,
  consumido_em timestamptz,
  criado_em timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX tokens_autenticacao_usuario_tipo_idx
  ON tokens_autenticacao (usuario_id, tipo, expira_em);
