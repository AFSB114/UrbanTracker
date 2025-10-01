-- Script de inicialización para PostgreSQL
-- Crear base de datos UrbanTracker si no existe
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'UrbanTracker') THEN
      PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE "UrbanTracker"');
   END IF;
END
$$;

-- Conectar a la base de datos UrbanTracker
\c UrbanTracker;

-- Crear esquemas necesarios
CREATE SCHEMA IF NOT EXISTS monitoring;
CREATE SCHEMA IF NOT EXISTS reports;
CREATE SCHEMA IF NOT EXISTS routes;
CREATE SCHEMA IF NOT EXISTS security;
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS vehicles;

-- Crear usuario de aplicación si no existe
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'urbantracker_user') THEN
      CREATE USER urbantracker_user WITH PASSWORD '3427';
      GRANT ALL PRIVILEGES ON DATABASE "UrbanTracker" TO urbantracker_user;
      GRANT ALL ON SCHEMA monitoring, reports, routes, security, users, vehicles TO urbantracker_user;
   END IF;
END
$$;