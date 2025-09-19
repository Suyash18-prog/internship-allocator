#!/usr/bin/env bash
# Creates a Python virtual environment in ./venv and installs requirements
set -e
PYTHON_BIN=${PYTHON_BIN:-python3}
$PYTHON_BIN -m venv venv
# shellcheck disable=SC1091
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo "Virtualenv created at ./venv and requirements installed."
echo "Activate with: source venv/bin/activate"
