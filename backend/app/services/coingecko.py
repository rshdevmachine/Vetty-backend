"""CoinGecko API service."""

import requests
from typing import List, Dict, Any
from fastapi import HTTPException
from app.core.config import settings


class CoinGeckoService:
    """Service for interacting with CoinGecko API."""

    def __init__(self):
        """Initialize service."""
        self.base_url = settings.COINGECKO_API_URL

    def get_coins_market(
        self, vs_currency: str = "inr", page: int = 1, per_page: int = 10
    ) -> List[Dict[str, Any]]:
        """Fetch coins market data from CoinGecko API."""
        try:
            url = f"{self.base_url}/coins/markets"
            params = {
                "vs_currency": vs_currency,
                "order": "market_cap_desc",
                "per_page": per_page,
                "page": page,
                "sparkline": True,
            }
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise HTTPException(
                status_code=503, detail=f"CoinGecko API unavailable: {str(e)}"
            )

    def get_categories(self) -> List[Dict[str, Any]]:
        """Fetch categories from CoinGecko API."""
        try:
            url = f"{self.base_url}/coins/categories"
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise HTTPException(
                status_code=503, detail=f"CoinGecko API unavailable: {str(e)}"
            )

    def get_coin_details(self, coin_id: str) -> Dict[str, Any]:
        """Fetch detailed coin information from CoinGecko API."""
        try:
            url = f"{self.base_url}/coins/{coin_id}"
            params = {
                "localization": False,
                "tickers": False,
                "market_data": True,
                "community_data": False,
                "developer_data": False,
                "sparkline": True,
            }
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise HTTPException(
                status_code=503, detail=f"CoinGecko API unavailable: {str(e)}"
            )


coingecko_service = CoinGeckoService()
