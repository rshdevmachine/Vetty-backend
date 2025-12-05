"""Main FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router

app = FastAPI(
    title="Vetty Crypto API",
    description="Cryptocurrency market data API with CoinGecko integration",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": "1.0.0", "service": "vetty-crypto-api"}


@app.get("/version")
async def version():
    """Version information endpoint."""
    return {
        "version": "1.0.0",
        "api_version": "v1",
        "dependencies": {"coingecko_api": "v3"},
    }
