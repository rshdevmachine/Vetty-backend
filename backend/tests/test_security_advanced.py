"""Advanced security tests."""

from datetime import timedelta
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
import pytest
from app.core.security import create_access_token, verify_token


def test_verify_token_invalid():
    """Test token verification with invalid token."""
    invalid_creds = HTTPAuthorizationCredentials(
        scheme="Bearer", credentials="invalid_token_here"
    )
    with pytest.raises(HTTPException) as exc_info:
        verify_token(invalid_creds)
    assert exc_info.value.status_code == 401


def test_create_token_with_custom_expiry():
    """Test creating token with custom expiration."""
    data = {"sub": "testuser"}
    token = create_access_token(data, expires_delta=timedelta(minutes=60))
    assert token is not None
