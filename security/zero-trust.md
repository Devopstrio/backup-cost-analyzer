# 🔐 BCA Zero Trust Security Architecture

## 1. Core Principles
The Backup Cost Analyzer implements a **Zero Trust** security model for all multi-cloud operations. No entity—service, user, or connector—is trusted by default, regardless of its position relative to the network perimeter.

## 2. Identity & Access
- **SSO Authentication**: Mandatory integration with Entra ID (Azure AD) or Okta using OIDC.
- **Service-to-Service**: All internal API calls are authenticated via JWT (JSON Web Tokens).
- **Least Privilege (RBAC)**:
  - `FinOps Viewer`: Read-only access to spend dashboards.
  - `FinOps Analyst`: Can generate reports and trigger optimization simulations.
  - `Platform Admin`: Full access to connectors, vault credentials, and system settings.

## 3. Data Protection
- **Encryption at Rest**: PostgreSQL database volumes are encrypted using Provider-Managed Keys (PMK) by default.
- **Encryption in Transit**: TLS 1.2+ is enforced for all external and internal traffic (via Istio sidecars in K8s).
- **Secret Management**: All cloud credentials (Service Principals, IAM Keys) are stored in **Azure Key Vault** / **AWS Secrets Manager** and injected as environment variables at runtime.

## 4. Compliance & Audit
- **Audit Logs**: Every API request and configuration change is logged to a write-only immutable table in PostgreSQL and streamed to Azure Monitor Logs.
- **Security Scans**: CI/CD pipelines include mandatory SAST (Static Analysis Security Testing) and container vulnerability scanning.
