"""Test database models and connections."""

from app.db.database import get_db, Base, engine
from app.db.models import CachedCoin, CachedCategory


def test_get_db():
    """Test database session generator."""
    db_gen = get_db()
    db = next(db_gen)
    assert db is not None
    try:
        next(db_gen)
    except StopIteration:
        pass


def test_cached_coin_model():
    """Test CachedCoin model structure."""
    assert hasattr(CachedCoin, "id")
    assert hasattr(CachedCoin, "symbol")
    assert hasattr(CachedCoin, "name")
    assert hasattr(CachedCoin, "image")
    assert hasattr(CachedCoin, "current_price_inr")
    assert hasattr(CachedCoin, "current_price_cad")
    assert hasattr(CachedCoin, "current_price_usd")
    assert hasattr(CachedCoin, "market_cap_rank")
    assert hasattr(CachedCoin, "market_cap")
    assert hasattr(CachedCoin, "price_change_percentage_24h")
    assert hasattr(CachedCoin, "market_data")
    assert hasattr(CachedCoin, "cached_at")
    assert hasattr(CachedCoin, "updated_at")
    assert CachedCoin.__tablename__ == "cached_coins"


def test_cached_category_model():
    """Test CachedCategory model structure."""
    assert hasattr(CachedCategory, "id")
    assert hasattr(CachedCategory, "name")
    assert hasattr(CachedCategory, "market_cap")
    assert hasattr(CachedCategory, "content")
    assert hasattr(CachedCategory, "top_3_coins")
    assert hasattr(CachedCategory, "cached_at")
    assert hasattr(CachedCategory, "updated_at")
    assert CachedCategory.__tablename__ == "cached_categories"


def test_base_metadata():
    """Test that Base has metadata."""
    assert Base.metadata is not None


def test_engine_connection():
    """Test database engine exists."""
    assert engine is not None
