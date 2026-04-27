-- BCA Enterprise Database Schema
-- Version: 1.0.0
-- Target: PostgreSQL 13+

CREATE TABLE IF NOT EXISTS tenants (
    tenant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    billing_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(tenant_id),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS cloud_accounts (
    account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(tenant_id),
    provider VARCHAR(50) NOT NULL, -- Azure, AWS, GCP
    external_id VARCHAR(255) NOT NULL,
    credentials_secret_id VARCHAR(255),
    last_sync_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS backup_assets (
    asset_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES cloud_accounts(account_id),
    external_resource_id TEXT UNIQUE NOT NULL,
    name VARCHAR(255),
    region VARCHAR(100),
    resource_type VARCHAR(100), -- Snapshot, Vault, Replica
    size_gb NUMERIC(15, 2) DEFAULT 0.00,
    tier VARCHAR(50) DEFAULT 'Hot',
    is_orphaned BOOLEAN DEFAULT FALSE,
    monthly_cost_usd NUMERIC(15, 2) DEFAULT 0.00,
    tags JSONB
);

CREATE TABLE IF NOT EXISTS spend_history (
    history_id BIGSERIAL PRIMARY KEY,
    asset_id UUID REFERENCES backup_assets(asset_id),
    timestamp DATE NOT NULL,
    daily_cost_usd NUMERIC(15, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS recommendations (
    rec_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID REFERENCES backup_assets(asset_id),
    category VARCHAR(50) NOT NULL, -- Waste, Tiering, Retention
    potential_savings NUMERIC(15, 2),
    confidence_score FLOAT,
    suggested_action TEXT,
    implemented BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_asset_provider ON backup_assets(account_id);
CREATE INDEX idx_spend_timestamp ON spend_history(timestamp);
CREATE INDEX idx_asset_tags ON backup_assets USING gin(tags);
