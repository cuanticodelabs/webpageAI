# 1. Etapa de Construcción (Build Stage)
# Usamos una imagen de Node.js más robusta para compilar
FROM node:20 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para la instalación y el build
COPY package.json pnpm-lock.yaml ./

# Instala dependencias de producción y desarrollo
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile

# Copia el código fuente
COPY . .

# Deshabilita la telemetría de Next.js (opcional)
ENV NEXT_TELEMETRY_DISABLED 1

# Compila la aplicación Next.js
RUN pnpm run build

# 2. Etapa de Producción (Runner Stage)
# Usamos una imagen más ligera (Alpine) para el servidor final
FROM node:20-alpine AS runner

# Deshabilita la telemetría (opcional, pero buena práctica)
ENV NEXT_TELEMETRY_DISABLED 1

# Cloud Run escucha por defecto en el puerto 8080 (o el puerto definido por la variable PORT)
# Next.js por defecto usa 3000, pero debes configurarlo para escuchar la variable PORT.
# Si tu Next.js es antiguo, quizás debas forzar el puerto 8080: -p 8080
ENV PORT 8080 
EXPOSE 8080 

# Copia la aplicación compilada
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
# Copia archivos estáticos extra si los tienes (ej: next.config.js)
COPY --from=builder /app/next.config.mjs ./next.config.mjs 


# El comando de inicio que ejecutará Cloud Run
CMD ["npm", "start"]