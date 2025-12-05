"""Category endpoints."""

from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.services.coingecko import coingecko_service
from app.core.security import verify_token

router = APIRouter()


@router.get("", dependencies=[Depends(verify_token)])
async def get_categories() -> List[Dict[str, Any]]:
    """
    Get list of cryptocurrency categories.

    Returns category information including market cap and top coins.
    """
    return coingecko_service.get_categories()
