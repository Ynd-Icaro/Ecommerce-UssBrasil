#!/bin/bash
# Script para iniciar JSON Server
echo "Iniciando JSON Server na porta 3003..."
npx json-server --watch db.json --port 3003 --delay 1000 --cors
