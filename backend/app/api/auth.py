"""Authentication endpoints."""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.core.security import create_access_token


router = APIRouter()


class TokenRequest(BaseModel):
    """Token request model."""

    username: str
    password: str


class TokenResponse(BaseModel):
    """Token response model."""

    access_token: str
    token_type: str


@router.post("/token", response_model=TokenResponse)
async def login(request: TokenRequest):
    """Generate JWT token for authentication."""
    if request.username == "admin" and request.password == "admin123":
        access_token = create_access_token(data={"sub": request.username})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
