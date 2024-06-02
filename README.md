# Covid Data Service

Este proyecto es un servicio web desarrollado con Node.js y TypeScript que consume una API externa de datos de COVID-19 y almacena la información en una base de datos MongoDB. Además, proporciona un endpoint para consultar los datos almacenados.

## Tecnologías Utilizadas

- Node.js
- TypeScript
- Express.js
- Mongoose
- Axios
- Jest
- MongoDB

## Descripción del Proyecto

El objetivo de este proyecto es:

1. Consumir la API de datos de COVID-19 desde la siguiente URL: `https://www.datos.gov.co/resource/prrv-jnta.json`.
2. Almacenar los datos de departamentos y cantidad de dosis aplicadas en una base de datos MongoDB.
3. Implementar un endpoint para almacenar los datos obtenidos de COVID-19 en MongoDB.
4. Implementar un endpoint para obtener el listado de todos los departamentos y sus dosis aplicadas, con la opción de filtrar por departamento.

## Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/Jonny-Start/covid-data-service.git
   cd covid-data-service
   ```

1. Instalar las dependencias:

   ```sh
   npm install
   ```

## Configuración

1. Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

```env
 MONGO_URI=your-mongodb-uri
 PORT=3000
```

2. Reemplazar your-mongodb-uri con la URI de tu instancia de MongoDB.

## Ejecución del Proyecto

1. Iniciar el servidor:

   ```sh
   npm start
   ```

   El servidor estará disponible en http://localhost:3000.

## Endpoints

1. GET /api/update

Este endpoint consume la API externa y almacena los datos en MongoDB.

- URL: /api/update

- Método: GET

- Respuesta:

```json
{
  "message": "Data updated successfully"
}
```

2. GET /api/vacunas

Este endpoint obtiene el listado de todos los departamentos y sus dosis aplicadas.

- URL: /api/vacunas

- Método: GET

  - Parámetros de consulta:

- departamento (opcional): Nombre del departamento para filtrar los datos.

- Respuesta:

```json
[
  {
    "departamento": "Antioquia",
    "dosis_aplicadas": 12345
  },
  {
    "departamento": "Bogotá",
    "dosis_aplicadas": 23456
  }
  ...
]
```

## Pruebas

Las pruebas están escritas con Jest.

1. Ejecutar las pruebas:

```sh
npm test
```

## Estructura del Proyecto

El proyecto sigue una arquitectura por capas para garantizar la separación de preocupaciones y la escalabilidad del código:

- Controlador: Maneja las solicitudes HTTP y las respuestas.
- Dominio: Contiene la lógica de negocio de la aplicación.
- Servicio: Proporciona funcionalidades específicas para conexión con servicios externos.
- Repositorio: Gestiona la interacción con la base de datos.

```
covid-data-service/
├── src/
│   ├── controllers/
│   │   └── covidController.ts
│   ├── domain/
│   │   └── covidDomain.ts
│   ├── repositories/
│   │   └── covidRepository.ts
│   ├── services/
│   │   └── covidService.ts
│   ├── models/
│   │   └── covidData.ts
│   └── app.ts
├── tests/
│   └── covidController.test.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de jonnyalejandro.ca0910@gmail.com
