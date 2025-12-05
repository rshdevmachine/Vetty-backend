# Vetty Intern - Python API Technical Exercise

A cryptocurrency market data REST API built with FastAPI, integrating with the CoinGecko API.

## Features

- ✅ HTTP REST API with FastAPI
- ✅ JWT-based authentication
- ✅ Pagination support (default 10 items, customizable via `per_page` parameter)
- ✅ Multi-currency support (INR, CAD, USD)
- ✅ Comprehensive API documentation (Swagger/OpenAPI)
- ✅ PostgreSQL database integration
- ✅ Docker containerization
- ✅ Unit tests with >80% coverage
- ✅ PEP-8 compliant code
- ✅ Linting and code quality tools

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── api/                    # API endpoints
│   │   ├── __init__.py
│   │   ├── auth.py            # Authentication endpoints
│   │   ├── coins.py           # Cryptocurrency endpoints
│   │   └── categories.py      # Category endpoints
│   ├── core/                   # Core configuration
│   │   ├── __init__.py
│   │   ├── config.py          # Settings management
│   │   └── security.py        # JWT & security utilities
│   ├── db/                     # Database layer
│   │   ├── __init__.py
│   │   ├── database.py        # Database connection
│   │   └── models.py          # SQLAlchemy models
│   └── services/               # Business logic
│       ├── __init__.py
│       └── coingecko.py       # CoinGecko API integration
├── tests/                      # Unit tests
│   ├── __init__.py
│   ├── conftest.py            # Pytest fixtures
│   ├── test_main.py
│   ├── test_auth.py
│   ├── test_coins.py
│   ├── test_categories.py
│   └── test_security.py
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
├── requirements.txt            # Production dependencies
├── requirements-dev.txt        # Development dependencies
├── pytest.ini                  # Pytest configuration
├── .flake8                     # Flake8 linting config
├── pyproject.toml             # Black/Pylint/MyPy config
└── README.md                   # This file
```

## Installation

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements-dev.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Run database migrations** (if applicable)
```bash
# Create database tables
python -c "from app.db.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

6. **Run the application**
```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Docker Deployment

1. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the application is running, visit:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## API Endpoints

### Authentication
- `POST /api/auth/token` - Generate JWT token

### Coins
- `GET /api/coins` - List all coins with pagination
  - Query parameters:
    - `page_num`: Page number (default: 1)
    - `per_page`: Items per page (default: 10)
    - `vs_currency`: Currency (inr, cad, usd)
- `GET /api/coins/{coin_id}` - Get specific coin details

### Categories
- `GET /api/categories` - List all cryptocurrency categories

### Health & Version
- `GET /health` - Health check endpoint
- `GET /version` - Version information

## Authentication

All API endpoints (except `/health` and `/version`) require JWT authentication.

1. **Get a token:**
```bash
curl -X POST http://localhost:8000/api/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

2. **Use the token in requests:**
```bash
curl http://localhost:8000/api/coins \
  -H "Authorization: Bearer <your-token>"
```

## Testing

Run tests with coverage:
```bash
pytest
```

Generate coverage report:
```bash
pytest --cov=app --cov-report=html
```

View coverage report:
```bash
open htmlcov/index.html
```

## Code Quality

### Format code with Black
```bash
black app tests
```

### Lint with Flake8
```bash
flake8 app tests
```

### Type checking with MyPy
```bash
mypy app
```

### Lint with Pylint
```bash
pylint app
```

## Configuration

All configuration is managed through environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT secret key
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time (default: 30)
- `COINGECKO_API_URL`: CoinGecko API base URL
- `CACHE_TTL_SECONDS`: Cache TTL in seconds (default: 300)

## Best Practices Implemented

✅ **PEP-8 Compliance**: Code follows Python style guidelines
✅ **DRY Principle**: No code duplication
✅ **KISS Principle**: Simple, readable code
✅ **Zen of Python**: Pythonic patterns throughout
✅ **Proper Structure**: Clear separation of concerns
✅ **Secure Configuration**: Environment variables for sensitive data
✅ **Comprehensive Tests**: >80% test coverage
✅ **API Documentation**: Auto-generated Swagger docs
✅ **Type Hints**: Type annotations for better IDE support
✅ **Error Handling**: Proper exception handling
✅ **Docker Ready**: Containerized for easy deployment

## License

MIT
