# Stage 1 - Build frontend
FROM node:14 AS frontend
WORKDIR /app
COPY frontend .
RUN npm install
RUN npm run build

# Stage 2 - Build and publish backend
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS backend
WORKDIR /app
COPY backend .
COPY --from=frontend /app/build ./wwwroot
RUN dotnet publish -c Release -o out

# Stage 3 - Final image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=backend /app/out .
ENTRYPOINT ["dotnet", "myapp.dll"]