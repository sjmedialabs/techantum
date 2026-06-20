module.exports = {
  apps: [{
    name: 'techantum',
    script: 'node_modules/.bin/next',
    args: 'start --port 4028',
    cwd: '/var/www/techantum',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4028,
    },
  }],
};
