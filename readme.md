# Consultor API Scraper

## Descripción

Esta API permite realizar consultas enviando una solicitud `GET` al endpoint `/api/`. Los parámetros necesarios para la consulta deben enviarse a través del cuerpo de la solicitud (`BODY`) en formato `FORM URL ENCODED`.

## Parámetros Esperados

Se esperan los siguientes parámetros en el cuerpo de la solicitud:

- **cedula**: (string) Número de cédula del usuario.
- **pass**: (string) Contraseña asociada a la cédula.

## Ejemplo de Solicitud

### Solicitud `GET` a `/api/`

**Parámetros en el cuerpo de la solicitud (`FORM URL ENCODED`):**

| Parámetro | Tipo   | Descripción                        |
|-----------|--------|------------------------------------|
| cedula    | string | Número de cédula del usuario.      |
| pass      | string | Contraseña asociada a la cédula.   |

### Ejemplo usando `curl`:

```bash
curl -X GET http://localhost:3000/api/ 
-H "Content-Type: application/x-www-form-urlencoded" 
-d "cedula=miCedula&pass=miContraseña"
```
