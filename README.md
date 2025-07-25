# 📋 Task Manager API

Aplicación full-stack para la gestión de tareas, desarrollada con React, Node.js y MongoDB. Permite a los usuarios crear, leer, actualizar y eliminar tareas, así como marcar su estado de completado.

## 🚀 Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Gestión de Estado**: React Query
- **Estilos**: Tailwind CSS
- **Notificaciones**: Toasts personalizados
- **Control de Errores**: Middleware de Express y validaciones personalizadas

## 📁 Estructura del Proyecto
 ```bash
Task-Manager-API/
├── client/                 # Aplicación frontend (React + Vite)
│   ├── public/             # Archivos estáticos públicos
│   ├── src/                # Código fuente de la aplicación
│   │   ├── components/     # Componentes reutilizables
│   │   ├── hooks/          # Custom hooks (e.g., useGetTasks, useUpdateTask)
│   │   ├── pages/          # Páginas principales
│   │   ├── types/          # Definiciones de tipos TypeScript
│   │   └── main.tsx        # Punto de entrada de la aplicación
│   ├── index.html          # Archivo HTML principal
│   ├── package.json        # Dependencias y scripts del frontend
│   └── vite.config.ts      # Configuración de Vite
├── server/                 # Aplicación backend (Node.js + Express)
│   ├── controllers/        # Controladores de rutas
│   ├── models/             # Modelos de Mongoose
│   ├── routes/             # Definición de rutas
│   ├── middlewares/        # Middlewares personalizados
│   ├── utils/              # Funciones utilitarias
│   ├── index.js            # Punto de entrada del servidor
│   ├── package.json        # Dependencias y scripts del backend
├── .gitignore              # Archivos y carpetas ignorados por Git
└── README.md               # Documentación del proyecto
