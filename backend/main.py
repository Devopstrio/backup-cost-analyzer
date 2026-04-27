import os
from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import logging

# Configure Enterprise Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("BCA-API")

app = FastAPI(
    title="Backup Cost Analyzer API",
    description="Enterprise API for Backup Spend Analysis and Waste Detection",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS Configuration for Enterprise Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Schemas ---
class CloudCostSummary(BaseModel):
    provider: str
    total_spend: float
    waste_detected: float
    currency: str = "USD"
    last_updated: str

class WasteItem(BaseModel):
    id: str
    resource_type: str
    description: str
    potential_savings: float

# --- Routes ---
@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "service": "backup-cost-analyzer"}

@app.get("/api/v1/costs/summary", response_model=List[CloudCostSummary])
async def get_cost_summary():
    """Returns summarized cost data across all connected cloud providers."""
    logger.info("Fetching cost summaries...")
    return [
        {
            "provider": "Azure",
            "total_spend": 12450.50,
            "waste_detected": 3200.00,
            "last_updated": "2026-04-27T10:00:00Z"
        },
        {
            "provider": "AWS",
            "total_spend": 8900.20,
            "waste_detected": 1500.00,
            "last_updated": "2026-04-27T10:05:00Z"
        }
    ]

@app.get("/api/v1/waste/active", response_model=List[WasteItem])
async def get_active_waste():
    """Returns list of orphaned or inefficient backup items identified by the engine."""
    return [
        {
            "id": "snap-012345",
            "resource_type": "Azure Snapshot",
            "description": "Orphaned snapshot - Parent disk deleted 30+ days ago",
            "potential_savings": 45.00
        },
        {
            "id": "vol-99881",
            "resource_type": "AWS EBS Backup",
            "description": "Redundant retention - Daily backup kept for 7 years (Policy Audit Fail)",
            "potential_savings": 120.50
        }
    ]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
