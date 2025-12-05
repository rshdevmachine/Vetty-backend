"""Database models."""

from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.sql import func
from app.db.database import Base


class CachedCoin(Base):
    """Cached cryptocurrency data."""

    __tablename__ = "cached_coins"

    id = Column(String, primary_key=True, index=True)
    symbol = Column(String, index=True)
    name = Column(String)
    image = Column(String)
    current_price_inr = Column(Float)
    current_price_cad = Column(Float)
    current_price_usd = Column(Float)
    market_cap_rank = Column(Integer)
    market_cap = Column(Float)
    price_change_percentage_24h = Column(Float)
    market_data = Column(JSON)
    cached_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class CachedCategory(Base):
    """Cached cryptocurrency category data."""

    __tablename__ = "cached_categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    market_cap = Column(Float)
    content = Column(String)
    top_3_coins = Column(JSON)
    cached_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
