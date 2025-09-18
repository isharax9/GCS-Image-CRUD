module.exports = {
  apps: [
    {
      name: 'gcs-backend',
      script: 'main.py',
      interpreter: 'python3',
      args: '-m uvicorn main:app --host 0.0.0.0 --port 8000',
      cwd: './backend',
      env: {
        NODE_ENV: 'production'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'gcs-frontend',
      script: 'serve',
      args: 'dist -p 3000 -s',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
