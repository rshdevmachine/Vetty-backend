"""Test CoinGecko service."""

from unittest.mock import patch, MagicMock
import requests
import pytest
from fastapi import HTTPException
from app.services.coingecko import CoinGeckoService


def test_get_coins_market_success():
    """Test successful coins market fetch."""
    service = CoinGeckoService()
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_response = MagicMock()
        mock_response.json.return_value = [{"id": "bitcoin"}]
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        result = service.get_coins_market(vs_currency="inr", page=1, per_page=10)
        assert len(result) == 1
        assert result[0]["id"] == "bitcoin"


def test_get_coins_market_failure():
    """Test coins market fetch failure."""
    service = CoinGeckoService()
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_get.side_effect = requests.RequestException("API error")

        with pytest.raises(HTTPException) as exc_info:
            service.get_coins_market()
        assert exc_info.value.status_code == 503


def test_get_categories_success():
    """Test successful categories fetch."""
    service = CoinGeckoService()
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_response = MagicMock()
        mock_response.json.return_value = [{"id": "defi"}]
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        result = service.get_categories()
        assert len(result) == 1
        assert result[0]["id"] == "defi"


def test_get_categories_failure():
    """Test categories fetch failure."""
    service = CoinGeckoService()
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_get.side_effect = requests.RequestException("API error")

        with pytest.raises(HTTPException) as exc_info:
            service.get_categories()
        assert exc_info.value.status_code == 503


def test_get_coin_details_success():
    """Test successful coin details fetch."""
    service = CoinGeckoService()
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_response = MagicMock()
        mock_response.json.return_value = {"id": "bitcoin", "name": "Bitcoin"}
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        result = service.get_coin_details("bitcoin")
        assert result["id"] == "bitcoin"
        assert result["name"] == "Bitcoin"


def test_get_coin_details_failure():
    """Test coin details fetch failure."""
    service = CoinGeckoService()
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_get.side_effect = requests.RequestException("API error")

        with pytest.raises(HTTPException) as exc_info:
            service.get_coin_details("bitcoin")
        assert exc_info.value.status_code == 503
