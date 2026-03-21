# Stage 1: Build Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Stage 2: Build Backend Dependencies
FROM python:3.11-slim AS backend-builder
WORKDIR /app
COPY backend/requirements.txt ./backend/
RUN pip install --user --no-cache-dir -r backend/requirements.txt

# Stage 3: Final Runtime Image
FROM python:3.11-slim
WORKDIR /app

# Install Node.js and Supervisor
RUN apt-get update && apt-get install -y curl supervisor \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy backend dependencies
COPY --from=backend-builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Copy backend code
COPY backend/ ./backend/

# Copy frontend code and build output
COPY --from=frontend-builder /app/frontend ./frontend

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set Environment Variables
ENV SERVER_PORT=5174
ENV SERVER_HOST=0.0.0.0
ENV API_PROXY_TARGET=http://localhost:5174
ENV PORT=5173
ENV PYTHONPATH=/app

# Expose Next.js port
EXPOSE 5173

# Start Supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
