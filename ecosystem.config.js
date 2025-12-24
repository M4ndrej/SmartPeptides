module.exports = {
  apps: [
    {
      name: "peptides",
      script: "./node_modules/.bin/next",
      args: "start -p 4500",
      instances: 12,
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
