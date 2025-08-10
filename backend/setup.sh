#!/usr/bin/env bash
set -euo pipefail

# -----------------------------
# Styling helpers
# -----------------------------
if command -v tput >/dev/null 2>&1; then
  BOLD="$(tput bold)"; RESET="$(tput sgr0)"
  RED="$(tput setaf 1)"; GREEN="$(tput setaf 2)"; YELLOW="$(tput setaf 3)"; BLUE="$(tput setaf 4)"
else
  BOLD=""; RESET=""; RED=""; GREEN=""; YELLOW=""; BLUE=""
fi

log_info()    { echo -e "${BLUE}${BOLD}▶${RESET} $*"; }
log_warn()    { echo -e "${YELLOW}${BOLD}!${RESET} $*"; }
log_error()   { echo -e "${RED}${BOLD}✖${RESET} $*"; }
log_success() { echo -e "${GREEN}${BOLD}✔${RESET} $*"; }

trap 'log_error "Setup failed at line ${BASH_LINENO[0]}."' ERR

# -----------------------------
# Resolve directories
# -----------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

VENV_DIR="$SCRIPT_DIR/venv"
REQ_FILE="$SCRIPT_DIR/requirements.txt"
ENV_FILE="$SCRIPT_DIR/.env"

echo
log_info "Backend setup starting"
echo "  Script dir:  $SCRIPT_DIR"
echo "  Project root: $PROJECT_ROOT"
echo

# -----------------------------
# Pre-flight checks
# -----------------------------
if ! command -v python3 >/dev/null 2>&1; then
  log_error "python3 is not installed. Please install Python 3 first."
  exit 1
fi

if [[ ! -f "$REQ_FILE" ]]; then
  log_error "Requirements file not found at: $REQ_FILE"
  exit 1
fi

# -----------------------------
# Virtual environment
# -----------------------------
if [[ ! -d "$VENV_DIR" ]]; then
  log_info "Creating virtual environment at: $VENV_DIR"
  python3 -m venv "$VENV_DIR"
else
  log_info "Using existing virtual environment: $VENV_DIR"
fi

log_info "Upgrading pip and installing dependencies"
"$VENV_DIR/bin/pip" install -U pip >/dev/null
"$VENV_DIR/bin/pip" install -r "$REQ_FILE"
log_success "Dependencies installed"

# -----------------------------
# Environment file
# -----------------------------
if [[ ! -f "$ENV_FILE" ]]; then
  log_info "Creating ${ENV_FILE} with development defaults"
  cat > "$ENV_FILE" <<'EOF'
SECRET_KEY='change-me'
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=129600
MONGODB_URL=mongodb://localhost:27017
SERVER_PORT=5174
FRONTEND_URL=http://localhost:5173
EOF
  log_warn "A fresh .env was created at: $ENV_FILE"
  echo "  - Update SECRET_KEY to a secure value"
  echo "  - Set MONGODB_URL to a reachable MongoDB instance (local or Atlas)"
else
  log_info "Found existing .env at: $ENV_FILE"
fi

# Show key values (if present)
if [[ -f "$ENV_FILE" ]]; then
  ENV_SERVER_PORT=$(grep -E '^SERVER_PORT=' "$ENV_FILE" | sed 's/^SERVER_PORT=//; s/\r$//') || true
  ENV_MONGO_URL=$(grep -E '^MONGODB_URL=' "$ENV_FILE" | sed 's/^MONGODB_URL=//; s/\r$//') || true
  [[ -n "${ENV_SERVER_PORT:-}" ]] && echo "  SERVER_PORT: ${ENV_SERVER_PORT}"
  [[ -n "${ENV_MONGO_URL:-}" ]] && echo "  MONGODB_URL: ${ENV_MONGO_URL}"
fi

echo
log_success "Backend setup complete"
echo
echo "Next steps:"
echo "  1) Edit ${BOLD}$ENV_FILE${RESET} to set your ${BOLD}MONGODB_URL${RESET} (and other secrets)."
echo "  2) Start the API: ${BOLD}bash $SCRIPT_DIR/start.sh${RESET}"

# Compute visit port
VISIT_PORT="${ENV_SERVER_PORT:-5174}"
echo "  3) Once running, visit:"
echo "     - Docs:   ${BOLD}http://localhost:${VISIT_PORT}/docs${RESET}"
echo "     - Health: ${BOLD}http://localhost:${VISIT_PORT}/health${RESET}"
echo
