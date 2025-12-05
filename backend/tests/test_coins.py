"""Test coin endpoints."""

import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


@pytest.fixture
def mock_coins_data():
    """Mock coins data."""
    return [
        {
            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "image": "https://example.com/btc.png",
            "current_price": 50000,
            "market_cap_rank": 1,
            "market_cap": 1000000000,
            "price_change_percentage_24h": 2.5,
        }
    ]


@pytest.fixture
def mock_coin_detail():
    """Mock coin detail data."""
    return {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": {"large": "https://example.com/btc.png"},
        "market_cap_rank": 1,
        "categories": ["Cryptocurrency"],
        "description": {"en": "Bitcoin is a cryptocurrency"},
        "links": {
            "homepage": ["https://bitcoin.org"],
            "twitter_screen_name": "bitcoin",
            "repos_url": {"github": ["https://github.com/bitcoin"]},
        },
        "market_data": {
            "current_price": {"inr": 4000000, "cad": 60000, "usd": 50000},
            "market_cap": {"inr": 80000000000, "cad": 1200000000, "usd": 1000000000},
            "total_volume": {"inr": 2000000000, "cad": 30000000, "usd": 25000000},
            "high_24h": {"inr": 4100000, "cad": 61000, "usd": 51000},
            "low_24h": {"inr": 3900000, "cad": 59000, "usd": 49000},
            "price_change_percentage_24h": 2.5,
            "circulating_supply": 19000000,
            "total_supply": 21000000,
        },
    }


def test_get_coins_unauthorized():
    """Test getting coins without authentication."""
    response = client.get("/api/coins")
    assert response.status_code == 401


def test_get_coins_success(auth_headers, mock_coins_data):
    """Test getting coins with authentication."""
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_response = MagicMock()
        mock_response.json.return_value = mock_coins_data
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        response = client.get("/api/coins", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["id"] == "bitcoin"


def test_get_coins_with_pagination(auth_headers, mock_coins_data):
    """Test getting coins with pagination parameters."""
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_response = MagicMock()
        mock_response.json.return_value = mock_coins_data
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        response = client.get(
            "/api/coins?page_num=2&per_page=20&vs_currency=cad", headers=auth_headers
        )
        assert response.status_code == 200


def test_get_coin_details_success(auth_headers, mock_coin_detail):
    """Test getting coin details."""
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_response = MagicMock()
        mock_response.json.return_value = mock_coin_detail
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        response = client.get("/api/coins/bitcoin", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == "bitcoin"
        assert data["name"] == "Bitcoin"


def test_get_coin_details_unauthorized():
    """Test getting coin details without authentication."""
    response = client.get("/api/coins/bitcoin")
    assert response.status_code == 401
