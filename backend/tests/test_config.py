"""Test configuration."""

from app.core.config import Settings, get_settings


def test_settings_defaults():
    """Test default settings."""
    settings = Settings()
    assert settings.ALGORITHM == "HS256"
    assert settings.ACCESS_TOKEN_EXPIRE_MINUTES == 30
    assert settings.COINGECKO_API_URL == "https://api.coingecko.com/api/v3"
    assert settings.CACHE_TTL_SECONDS == 300


def test_get_settings_cached():
    """Test settings caching."""
    settings1 = get_settings()
    settings2 = get_settings()
    assert settings1 is settings2
