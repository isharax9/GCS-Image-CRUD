module.exports = {
  apps: [
    {
      name: 'gcs-backend',
      script: 'main.py',
      interpreter: 'python3',
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
      args: 'dist -s -l 3000',
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
