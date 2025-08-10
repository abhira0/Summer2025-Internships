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

trap 'log_error "Start failed at line ${BASH_LINENO[0]}."' ERR

# -----------------------------
# Resolve paths
# -----------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VENV_DIR="$SCRIPT_DIR/venv"
ENV_FILE="$SCRIPT_DIR/.env"

log_info "Preparing to start backend"
echo "  Script dir:   $SCRIPT_DIR"
echo "  Project root: $PROJECT_ROOT"
echo "  Venv:         $VENV_DIR"

# -----------------------------
# Pre-flight checks
# -----------------------------
if [[ ! -d "$VENV_DIR" ]]; then
  log_error "Virtual environment not found at $VENV_DIR"
  echo "Run setup first: ${BOLD}bash $SCRIPT_DIR/setup.sh${RESET}"
  exit 1
fi

if [[ ! -x "$VENV_DIR/bin/uvicorn" ]]; then
  log_error "uvicorn not found in venv. Installing dependencies..."
  "$VENV_DIR/bin/pip" install -U pip >/dev/null
  "$VENV_DIR/bin/pip" install -r "$SCRIPT_DIR/requirements.txt"
fi

if [[ ! -f "$ENV_FILE" ]]; then
  log_error "Env file not found: $ENV_FILE"
  echo "Create it or re-run: ${BOLD}bash $SCRIPT_DIR/setup.sh${RESET}"
  exit 1
fi

# -----------------------------
# Load environment and compute settings
# -----------------------------
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

# Ensure Python can import the top-level 'backend' package
export PYTHONPATH="$PROJECT_ROOT${PYTHONPATH:+:$PYTHONPATH}"

PORT_VALUE="${SERVER_PORT:-8000}"
HOST_VALUE="${SERVER_HOST:-0.0.0.0}"

echo
log_info "Environment"
echo "  SERVER_HOST: ${HOST_VALUE}"
echo "  SERVER_PORT: ${PORT_VALUE}"
echo "  PYTHONPATH:  ${PYTHONPATH}"
[[ -n "${MONGODB_URL:-}" ]] && echo "  MONGODB_URL: ${MONGODB_URL}"

echo
log_info "Starting FastAPI (reload enabled)"
echo "  Docs:   ${BOLD}http://localhost:${PORT_VALUE}/docs${RESET}"
echo "  Health: ${BOLD}http://localhost:${PORT_VALUE}/health${RESET}"

exec "$VENV_DIR/bin/uvicorn" backend.main:app \
  --host "$HOST_VALUE" \
  --port "$PORT_VALUE" \
  --app-dir "$PROJECT_ROOT" \
  --reload "$@"
