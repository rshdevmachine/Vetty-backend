"""Test authentication endpoints."""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_login_success():
    """Test successful login."""
    response = client.post(
        "/api/auth/token", json={"username": "admin", "password": "admin123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_credentials():
    """Test login with invalid credentials."""
    response = client.post(
        "/api/auth/token", json={"username": "admin", "password": "wrong"}
    )
    assert response.status_code == 401
    data = response.json()
    assert data["detail"] == "Incorrect username or password"


def test_login_missing_fields():
    """Test login with missing fields."""
    response = client.post("/api/auth/token", json={"username": "admin"})
    assert response.status_code == 422
