#!/bin/bash

echo "Running consolidate for update..."
python3 consolidate.py -n update update

echo -e "\nRunning consolidate for backend..."
python3 consolidate.py -n backend backend

echo -e "\nMerging files..."
cat update.md backend.md > code_base.md
rm update.md backend.md
echo "Created consolidated.md with all changes"
