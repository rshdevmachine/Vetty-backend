"""Pytest configuration and fixtures."""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_access_token


@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)


@pytest.fixture
def auth_headers():
    """Create authentication headers with valid token."""
    token = create_access_token(data={"sub": "test_user"})
    return {"Authorization": f"Bearer {token}"}
