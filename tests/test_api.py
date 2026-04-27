import pytest
from fastapi.testclient import TestClient
from backend.src.main import app

client = TestClient(app)

def test_health_check():
    """Verifies that the API platform is alive and healthy."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_cost_summary_structure():
    """Ensures the core spend API returns the required FinOps schema."""
    response = client.get("/api/v1/costs/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_spend" in data
    assert "waste_detected" in data
    assert data["currency"] == "USD"

def test_asset_inventory():
    """Validates multi-cloud asset ingestion logic."""
    response = client.get("/api/v1/assets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0
