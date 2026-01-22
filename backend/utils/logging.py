"""
Production-grade logging and monitoring setup
"""
import logging
import logging.handlers
import sys
from pythonjsonlogger import jsonlogger

def setup_logging(app_name: str, level: str = "INFO"):
    """Setup structured JSON logging for production"""
    
    logger = logging.getLogger(app_name)
    logger.setLevel(level)
    
    # Console handler with JSON formatting
    console_handler = logging.StreamHandler(sys.stdout)
    json_formatter = jsonlogger.JsonFormatter(
        fmt='%(asctime)s %(name)s %(levelname)s %(message)s'
    )
    console_handler.setFormatter(json_formatter)
    logger.addHandler(console_handler)
    
    # File handler for errors
    file_handler = logging.handlers.RotatingFileHandler(
        'logs/error.log',
        maxBytes=10485760,  # 10MB
        backupCount=10
    )
    file_handler.setLevel(logging.ERROR)
    file_handler.setFormatter(json_formatter)
    logger.addHandler(file_handler)
    
    return logger
