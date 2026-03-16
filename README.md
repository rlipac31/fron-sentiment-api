# 🎭 Sentiment Analysis Interface (Fron-Sentiment-API)

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-LTS-green)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black)

**Fron-Sentiment-API** es una interfaz web moderna y de alto rendimiento diseñada para interactuar con servicios de análisis de sentimientos. Permite procesar texto en tiempo real para determinar tonos emocionales (positivo, negativo, neutral) utilizando un stack tecnológico de vanguardia.

---

## 🚀 Características Principales

* **Análisis en Tiempo Real:** Interfaz optimizada para obtener resultados instantáneos mediante peticiones asíncronas.
* **UI/UX Profesional:** Diseño minimalista y responsivo construido con **Tailwind CSS 4**, enfocado en la legibilidad de datos.
* **Integración de API:** Consumo eficiente de endpoints de Node.js/Python para el procesamiento de Lenguaje Natural (NLP).
* **Arquitectura Escalable:** Estructura basada en Next.js *App Router* para un renderizado óptimo y SEO friendly.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | [Next.js 15](https://nextjs.org/) (React 19) |
| **Estilos** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Backend** | Node.js / Express (Consumo de API de Sentimientos) |
| **Despliegue** | Vercel |

---

## 📦 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/rlipac31/fron-sentiment-api.git](https://github.com/rlipac31/fron-sentiment-api.git)
   cd fron-sentiment-api

2. **Instalar dependencias**   
   
   ````
    npm install
        # o
    yarn install

   ````

3. **Configurar variables de entorno:**
    Crea un archivo .env.local en la raíz y añade la URL de tu API:
    ````
    NEXT_PUBLIC_API_URL=[https://tu-api-de-sentimientos.com](https://tu-api-de-sentimientos.com)

    ````
 4. **Iniciar el servidor de desarrollo:**

 ````
  pnpm run dev 
   #o 
  npm run dev

 ````    
   ### Accede a http://localhost:3000 para ver el resultado.

  ## ⚙️ Estructura del Proyecto
  ````
    ├── app/                # App Router (Pages, Layouts)
    ├── components/         # Componentes UI reutilizables
    ├── public/             # Assets estáticos (imágenes, iconos)
    ├── styles/             # Configuraciones de Tailwind 4
    └── utils/              # Funciones auxiliares y llamadas a la API

  ```` 
  ## 📄 
  
  ##### Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente para fines personales o comerciales.