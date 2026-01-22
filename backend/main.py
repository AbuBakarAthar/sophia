"""
Main entry point for the FastAPI application
"""
from backend.api.app import create_app
from backend.api import routes, admin

# Create the FastAPI app
app = create_app()

# Include routers
app.include_router(routes.router)
app.include_router(admin.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "USA Remote Jobs ML Pipeline API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/admin/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
