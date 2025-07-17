# ada_fastfood Project

## Overview
The `ada_fastfood` project is a full-stack application that provides a fast food ordering system. It consists of a backend built with TypeScript and Express, and a frontend developed using React. The application adheres to RESTful API principles and is containerized using Docker for easy deployment.

## Project Structure
```
ada_fastfood
├── backend                # Backend application
│   ├── src
│   │   ├── controllers    # Contains API controllers
│   │   ├── routes         # Defines application routes
│   │   ├── models         # Data models for database interactions
│   │   ├── app.ts         # Entry point for the backend application
│   │   └── types          # Type definitions for the backend
│   ├── package.json       # Backend dependencies and scripts
│   ├── tsconfig.json      # TypeScript configuration for the backend
│   ├── swagger.yaml       # API documentation using Swagger
│   └── README.md          # Documentation for the backend
├── frontend               # Frontend application
│   ├── src
│   │   ├── components     # React components
│   │   ├── index.tsx      # Entry point for the frontend application
│   │   └── types          # Type definitions for the frontend
│   ├── package.json       # Frontend dependencies and scripts
│   ├── tsconfig.json      # TypeScript configuration for the frontend
│   └── README.md          # Documentation for the frontend
├── docker-compose.yml     # Docker configuration for services
├── Dockerfile             # Dockerfile for building the application image
└── README.md              # Overall project documentation
```

## Features
- **Backend**: Built with TypeScript and Express, providing a RESTful API for managing fast food orders.
- **Frontend**: Developed using React, offering a user-friendly interface for placing orders.
- **API Documentation**: Automatically generated using Swagger, allowing for easy testing and understanding of the API endpoints.
- **Docker Support**: The application is containerized using Docker, making it easy to deploy and manage.

## Getting Started

### Prerequisites
- Node.js
- Docker
- Docker Compose

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd ada_fastfood
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application
To run the application using Docker, execute the following command in the root directory:
```
docker-compose up
```

### Testing the API
You can use Postman to test the API endpoints defined in the backend. Refer to the `swagger.yaml` file for detailed information on the available endpoints.

### API Documentation
The API documentation is available in the `swagger.yaml` file. You can also access it through Swagger UI if configured.

### Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.