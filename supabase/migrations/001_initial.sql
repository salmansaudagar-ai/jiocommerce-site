CREATE TABLE content_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL CHECK (action IN ('create', 'update', 'archive')),
  target_schema text NOT NULL,
  target_id text,
  drafted_content jsonb NOT NULL,
  source text NOT NULL,
  source_ref text,
  ai_confidence float NOT NULL CHECK (ai_confidence BETWEEN 0 AND 1),
  ai_reasoning text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'published')),
  approved_by uuid,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  published_at timestamptz
);

CREATE TABLE audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  target_schema text,
  target_id text,
  change_summary text,
  source text NOT NULL,
  ai_confidence float,
  performed_by uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE health_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_at timestamptz DEFAULT now(),
  issues_found int DEFAULT 0,
  issues_fixed int DEFAULT 0,
  issues_flagged int DEFAULT 0,
  details jsonb,
  health_score float CHECK (health_score BETWEEN 0 AND 100)
);

CREATE TABLE research_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL,
  source_url text,
  content_summary text,
  suggestions jsonb,
  cached_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '7 days')
);

CREATE TABLE brand_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

INSERT INTO brand_terms (term) VALUES
  ('Jio'), ('JioMart'), ('JioCommerce'), ('Tira'), ('Netmeds'), ('Ajio'),
  ('Clovia'), ('Zivame'), ('Reliance'), ('Shopsense'), ('StoreOS'), ('Urban Ladder'),
  ('Freshpik'), ('Azorte'), ('Swadesh'), ('RPOS'), ('JCP');

CREATE INDEX idx_content_queue_status ON content_queue(status);
CREATE INDEX idx_content_queue_created_at ON content_queue(created_at);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX idx_audit_log_target ON audit_log(target_schema, target_id);
CREATE INDEX idx_research_cache_expires ON research_cache(expires_at);
CREATE INDEX idx_brand_terms_term ON brand_terms(term);
