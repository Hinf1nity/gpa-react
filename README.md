# Sistema de Licencias y Puntos GPA - Ingeniería Mecatrónica (UCB)

Este repositorio contiene el código fuente de la página web para la gestión de licencias y asignación de puntos GPA para la carrera de Ingeniería Mecatrónica en la Universidad Católica Boliviana (UCB). La aplicación está desarrollada utilizando Django Rest Framework para el backend y React para el frontend.

## Características

- **Gestión de Licencias:** Los estudiantes pueden solicitar y gestionar licencias académicas.
- **Puntos GPA:** Registro y seguimiento de puntos obtenidos por actividades extracurriculares.
- **Interfaz de Usuario:** Interfaz construida con React.
- **API RESTful:** Backend desarrollado con Django Rest Framework, ofreciendo endpoints para gestionar licencias y puntos.
- **Autenticación y Autorización:** Sistema seguro de autenticación con JWT (JSON Web Tokens).
- **Subir archivos de excel:** El formato para subir los puntos de GPA con un archivo excel se encuentra en el archivo [PruebaGPA](../../PruebaGPA.xlsx). El formato para subir información de los estudiantes [PruebaEstudiantes](PruebaEstudiantes.xlsx)

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de iniciar:

- Python 3.11.4
- Django 4.0.1 y Django Rest Framework
- Node.js 18.18.0 y npm (gestor de paquetes de Node.js)
- DBsqlite3 o cualquier otra base de datos compatible con Django para pruebas en desarrollo

## Instalación

Sigue los pasos a continuación para configurar el proyecto en tu entorno local:

### Backend (Django Rest Framework)

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Hinf1nity/gpa-react.git
    cd gpa-react
    ```

2. Crea y activa un entorno virtual:

    ```bash
    python -m venv env
    source env/bin/activate   # En Windows: `env\Scripts\activate`
    ```

3. Instala las dependencias del backend:

    ```bash
    pip install -r requirements.txt
    ```

4. Configura la base de datos en `settings.py` y aplica las migraciones necesarias:

    ```bash
    python manage.py migrate
    ```

5. Crea un superusuario para acceder al panel de administración de Django:

    ```bash
    python manage.py createsuperuser
    ```

6. Inicia el servidor de desarrollo del backend:

    ```bash
    python manage.py runserver
    ```

### Frontend (React)

1. Navega a la carpeta del frontend:

    ```bash
    cd ../frontend
    ```

2. Instala las dependencias del frontend:

    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo de React:

    ```bash
    npm run dev
    ```

4. Accede a la aplicación desde tu navegador en `http://localhost:5173/cidimec/gpa-imt` para el frontend y `http://localhost:8000/` para el backend.

## Estructura del Proyecto

- **Backend (Django Rest Framework):**
  - `licencias/`: Aplicación principal para la gestión de licencias de los estudiantes.
  - `gpa/`: Aplicación donde se encuentran las configuraciones y urls principales de la pagina.
  - `gestion/`: Aplicación para el director de carrera, donde se tiene la autenticación, las licencias pedidas, las actividades extracurriculares creadas y la pagina para crear nuevos estudiantes en la base de datos.
  - `users/`: Aplicación de únicamente envio de datos al frontend con información de los estudiantes, sus licencias y putnos GPA.
  - `docentes/`: Apliación para docentes, donde se devuelve las licencias de los estudiantes.
  - `requirements.txt`: Lista de dependencias del backend.

- **Frontend (React):**
  - `frontend/`: Contiene el código del frontend desarrollado en React.
  - `src/`: Componentes y lógica de la interfaz de usuario.
  - `public/`: Archivos estáticos para el frontend.
  - `package.json`: Dependencias y scripts del proyecto de React.

## Cosas por hacer

1. Revisar la funcionalidad de la pagina de frontend de licencias en dispositivos Apple.
2. Aumentar un boton en la página de gestión para subir las materias del semestre.
3. Añadir la funcionalidad de mandar correos a los estudiantes con las respuestas de sus licencias.