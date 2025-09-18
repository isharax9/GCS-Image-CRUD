# 🖼️ GCS Image CRUD Application

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

A modern, full-stack web application that provides complete CRUD (Create, Read, Update, Delete) operations for image management using Google Cloud Storage. Built with FastAPI backend and React frontend, this application offers a seamless image upload, viewing, and management experience.

## 🎯 Project Overview

This application serves as a proof-of-concept (POC) for integrating Google Cloud Storage with a modern web stack. It demonstrates best practices for:

- **Cloud Storage Integration**: Direct integration with Google Cloud Storage for scalable image storage
- **Modern Web Architecture**: Decoupled frontend and backend architecture
- **Production Deployment**: Complete deployment setup with Docker, PM2, and Nginx
- **Responsive Design**: Mobile-friendly interface with modern CSS styling
- **API Documentation**: RESTful API design with FastAPI automatic documentation

## ✨ Features

### Core Functionality
- 📤 **Image Upload**: Drag-and-drop or click-to-upload images with preview
- 📋 **Image Gallery**: Grid-based responsive gallery view of all uploaded images
- 🔍 **Image Preview**: Real-time preview before upload and full-size viewing
- 📥 **Image Download**: Direct download functionality for stored images
- 🗑️ **Image Deletion**: Secure image removal with confirmation
- 🔄 **Real-time Updates**: Automatic gallery refresh after operations

### Technical Features
- 🛡️ **CORS Protection**: Properly configured cross-origin resource sharing
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Optimized loading with Vite build system
- 🐳 **Containerized**: Full Docker support for easy deployment
- 🔧 **Process Management**: PM2 integration for production process management
- 🌐 **Production Ready**: Nginx configuration for high-performance serving

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  FastAPI Backend│    │ Google Cloud    │
│   (Port 3000)   │◄──►│   (Port 8000)   │◄──►│   Storage       │
│                 │    │                 │    │                 │
│ • Vite Build    │    │ • Python 3.11+  │    │ • Image Storage │
│ • Axios HTTP    │    │ • Uvicorn Server│    │ • Public URLs   │
│ • CSS Grid      │    │ • CORS Enabled  │    │ • Secure Access │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │              ┌─────────────────┐              │
        └─────────────►│  Nginx Reverse  │◄─────────────┘
                       │      Proxy      │
                       │  (Port 80/443)  │
                       └─────────────────┘
```

## 🛠️ Technology Stack

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Uvicorn](https://www.uvicorn.org/)** - ASGI server implementation
- **[Google Cloud Storage](https://cloud.google.com/storage)** - Cloud object storage
- **[Python-multipart](https://github.com/andrew-d/python-multipart)** - File upload handling
- **[Python-dotenv](https://github.com/theskumar/python-dotenv)** - Environment management

### Frontend
- **[React 19+](https://react.dev/)** - Modern UI library
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client
- **[CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)** - Modern layout system

### DevOps & Deployment
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration
- **[PM2](https://pm2.keymetrics.io/)** - Process manager for Node.js
- **[Nginx](https://nginx.org/)** - High-performance web server and reverse proxy

## 🚀 Quick Start

### Prerequisites
- Python 3.11 or higher
- Node.js 18 or higher
- Google Cloud Storage bucket and service account
- Docker (optional, for containerized deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/isharax9/GCS-Image-CRUD.git
cd GCS-Image-CRUD
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp example.env .env
# Edit .env with your GCS credentials
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Build for production (optional)
npm run build
```

### 4. Google Cloud Storage Setup
1. Create a GCS bucket in your Google Cloud Console
2. Create a service account with Storage Admin permissions
3. Download the service account key JSON file
4. Place the key file as `backend/key.json`
5. Update your `.env` file with the bucket name

### 5. Run the Application

#### Development Mode
```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### Production Mode
```bash
# Use the deployment script
chmod +x deploy.sh
./deploy.sh
```

## 🐳 Docker Deployment

### Using Docker Compose
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build
```bash
# Build backend image
cd backend
docker build -t gcs-backend .

# Build frontend image
cd ../frontend
npm run build
docker build -t gcs-frontend .
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# GCP Configuration
GOOGLE_APPLICATION_CREDENTIALS=key.json
BUCKET_NAME=your-gcs-bucket-name

# Server Configuration (optional)
PORT=8000
```

### Frontend Configuration

Update the API base URL in `frontend/src/App.jsx`:

```javascript
const API_BASE = 'http://your-backend-url:8000'
```

## 📡 API Documentation

The application provides a RESTful API with the following endpoints:

### Upload Image
- **POST** `/upload/`
- **Body**: `multipart/form-data` with file
- **Response**: `{"message": "Uploaded", "filename": "image.jpg"}`

### List Images
- **GET** `/list/`
- **Response**: `{"files": ["image1.jpg", "image2.png"]}`

### Download Image
- **GET** `/download/{filename}`
- **Response**: `{"download_url": "https://storage.googleapis.com/..."}`

### Delete Image
- **DELETE** `/delete/{filename}`
- **Response**: `{"message": "Deleted", "filename": "image.jpg"}`

### Interactive API Documentation
When running the backend, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔧 Development

### Frontend Development (React + Vite)

This project uses **React with Vite** for the frontend, providing:

- **Hot Module Replacement (HMR)** for instant updates during development
- **ESLint integration** for code quality
- **Optimized builds** with automatic code splitting

#### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

#### ESLint Configuration
The project includes ESLint configuration for React development. For production applications, consider:

- **TypeScript Integration**: Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
- **Type-aware Rules**: Enable [`typescript-eslint`](https://typescript-eslint.io) for better type checking

#### Vite Plugins
Currently using these official plugins:
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)** - Uses Babel for Fast Refresh
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)** - Alternative using SWC for Fast Refresh

### Backend Development

```bash
# Run with auto-reload
uvicorn main:app --reload

# Run tests (if available)
pytest

# Format code
black .

# Type checking
mypy .
```

### Code Style
- **Frontend**: ESLint configuration for React best practices
- **Backend**: Black formatter for Python code formatting
- **Commit Messages**: Use conventional commit format

## 🚀 Production Deployment

### Using the Deployment Script

The project includes a comprehensive deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script:
1. Installs backend dependencies
2. Builds the frontend for production
3. Configures PM2 for process management
4. Starts both services
5. Provides monitoring commands

### PM2 Process Management

After deployment, use these commands:

```bash
# View all processes
pm2 status

# View logs
pm2 logs                    # All logs
pm2 logs gcs-backend        # Backend logs only
pm2 logs gcs-frontend       # Frontend logs only

# Process control
pm2 restart ecosystem.config.js    # Restart all apps
pm2 stop ecosystem.config.js       # Stop all apps
pm2 delete ecosystem.config.js     # Remove from PM2
```

### Nginx Configuration

For production deployment with Nginx, use the provided `nginx.conf`:

1. Copy configuration to Nginx sites-available
2. Create symbolic link to sites-enabled
3. Test and reload Nginx configuration

```bash
sudo cp nginx.conf /etc/nginx/sites-available/gcs-poc
sudo ln -s /etc/nginx/sites-available/gcs-poc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔍 Troubleshooting

### Common Issues

#### GCS Authentication Error
```bash
# Verify service account key
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/key.json"
gcloud auth application-default print-access-token
```

#### CORS Issues
- Ensure frontend URL is in CORS origins list
- Check that requests are going to correct backend URL

#### File Upload Fails
- Verify GCS bucket permissions
- Check file size limits
- Ensure bucket exists and is accessible

#### PM2 Process Issues
```bash
# Clean restart
pm2 delete all
pm2 start ecosystem.config.js

# Check logs for errors
pm2 logs --lines 100
```

### Development Tips

1. **Environment Setup**: Always activate virtual environment for backend development
2. **Hot Reload**: Use development servers for faster iteration
3. **CORS**: Update CORS origins when changing URLs
4. **Logs**: Monitor both application and server logs
5. **Dependencies**: Keep requirements.txt and package.json updated

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests and linting
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new functionality
- Update documentation for significant changes
- Ensure all tests pass before submitting PR
- Use descriptive commit messages

### Code Review Process
1. All PRs require review before merging
2. Ensure CI/CD checks pass
3. Address review comments promptly
4. Maintain clean git history

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

### Developer Contact
- **Email**: [isharax9@gmail.com](mailto:isharax9@gmail.com)
- **Telegram**: [@mac_knight141](https://t.me/mac_knight141)
- **LinkedIn**: [isharax9](https://www.linkedin.com/in/isharax9/)
- **Instagram**: [@mac_knight141](https://www.instagram.com/mac_knight141/)
- **Twitter**: [@isharax9](https://twitter.com/isharax9)

### Project Links
- **Repository**: [GitHub](https://github.com/isharax9/GCS-Image-CRUD)
- **Issues**: [Report bugs or request features](https://github.com/isharax9/GCS-Image-CRUD/issues)
- **Discussions**: [Community discussions](https://github.com/isharax9/GCS-Image-CRUD/discussions)

### Getting Help
- 📖 Check the documentation first
- 🐛 Search existing issues before creating new ones
- 💬 Use discussions for questions and ideas
- 📧 Contact directly for urgent matters

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star! ⭐**

Made with ❤️ by [isharax9](https://github.com/isharax9)

</div>