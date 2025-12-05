"""Application configuration management."""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings."""

    DATABASE_URL: str = "postgresql://user:password@localhost/vetty_crypto"
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    COINGECKO_API_URL: str = "https://api.coingecko.com/api/v3"
    CACHE_TTL_SECONDS: int = 300

    class Config:
        """Pydantic configuration."""

        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


settings = get_settings()
