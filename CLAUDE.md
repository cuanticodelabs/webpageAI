# Agente Claude — CuantiCode Labs

## Proyecto
Automatización e IA para CuantiCode Labs (Concepción, Chile).
Empresa: ingeniería de IA aplicada a negocio. Ver `Cuanticode.md` para posicionamiento completo.

## Infraestructura

### n8n
- URL: https://n8n.cuanticode.com
- MCP configurado en `.mcp.json` (HTTP + Bearer token)
- Carpetas relevantes: `AGENTES/SCOUT_FONDOS`

### MongoDB
- Servidor: 104.198.39.153 (VM en GCP)
- Acceso: SSH tunnel `ssh -L 27018:localhost:27017 hgonzab@104.198.39.153`
- Script tunnel: `/Users/hgonzab/mongo-mcp.sh`
- Credenciales: `admin / WA9qG7?)#@um3-#` (authSource=admin)
- MCP configurado en `.mcp.json` (stdio via bash script)

### Workflows n8n activos
| ID | Nombre | Carpeta |
|---|---|---|
| hRXXsAIOq4RRHYFU | 🔍 Scout de Fondos Concursables Chile | AGENTES/SCOUT_FONDOS |
| lnyImbDNP7jcAUdD | 📋 Generador Kit de Postulación CuantiCode | AGENTES/SCOUT_FONDOS |

### MongoDB — colecciones relevantes
- `cuanticfo_db.oportunidades_fondos` — fondos scrapeados (índice único: nombre+fuente)

## Pendientes de configurar en n8n
1. Credencial **Anthropic API** (key de Anthropic)
2. Credencial **Telegram Bot** (token de BotFather)
3. Nodo "Enviar alerta por Telegram" → reemplazar placeholder `chatId` con el Chat ID real
4. Credencial **MongoDB** → verificar apunta al servidor correcto

## Comportamiento esperado del agente
- Respuestas directas, sin preguntar confirmación para operaciones normales
- Usar MCP de n8n para crear/actualizar workflows sin pedir permiso
- Usar MCP de MongoDB para consultar/escribir datos sin pedir permiso
- Idioma: español
