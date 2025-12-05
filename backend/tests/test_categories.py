"""Test category endpoints."""

import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


@pytest.fixture
def mock_categories_data():
    """Mock categories data."""
    return [
        {
            "id": "defi",
            "name": "Decentralized Finance (DeFi)",
            "market_cap": 50000000000,
            "content": "DeFi ecosystem",
            "top_3_coins": [
                "https://example.com/coin1.png",
                "https://example.com/coin2.png",
                "https://example.com/coin3.png",
            ],
        }
    ]


def test_get_categories_unauthorized():
    """Test getting categories without authentication."""
    response = client.get("/api/categories")
    assert response.status_code == 401


def test_get_categories_success(auth_headers, mock_categories_data):
    """Test getting categories with authentication."""
    with patch("app.services.coingecko.requests.get") as mock_get:
        mock_response = MagicMock()
        mock_response.json.return_value = mock_categories_data
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        response = client.get("/api/categories", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["id"] == "defi"
        assert data[0]["name"] == "Decentralized Finance (DeFi)"
