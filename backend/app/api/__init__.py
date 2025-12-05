"""API routes."""

from fastapi import APIRouter
from app.api import auth, coins, categories

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["authentication"])
router.include_router(coins.router, prefix="/coins", tags=["coins"])
router.include_router(categories.router, prefix="/categories", tags=["categories"])
