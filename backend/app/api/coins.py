"""Cryptocurrency endpoints."""

from fastapi import APIRouter, Depends, Query
from typing import List, Dict, Any
from app.services.coingecko import coingecko_service
from app.core.security import verify_token

router = APIRouter()


@router.get("", dependencies=[Depends(verify_token)])
async def get_coins(
    page_num: int = Query(1, alias="page_num", ge=1),
    per_page: int = Query(10, alias="per_page", ge=1, le=100),
    vs_currency: str = Query("inr", alias="vs_currency"),
) -> List[Dict[str, Any]]:
    """
    Get paginated list of cryptocurrencies.

    - **page_num**: Page number (default: 1)
    - **per_page**: Items per page (default: 10, max: 100)
    - **vs_currency**: Currency for prices (inr, cad, usd)
    """
    return coingecko_service.get_coins_market(
        vs_currency=vs_currency, page=page_num, per_page=per_page
    )


@router.get("/{coin_id}", dependencies=[Depends(verify_token)])
async def get_coin_details(coin_id: str) -> Dict[str, Any]:
    """
    Get detailed information for a specific cryptocurrency.

    - **coin_id**: CoinGecko coin identifier (e.g., 'bitcoin')
    """
    return coingecko_service.get_coin_details(coin_id)
