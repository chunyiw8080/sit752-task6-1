#!/bin/bash
# deploy.sh

cd /var/www/nodeapp || exit 1

/root/.nvm/versions/node/v20.10.0/bin/npm install --production

/root/.nvm/versions/node/v20.10.0/bin/pm2 restart server || /root/.nvm/versions/node/v20.10.0/bin/pm2 start app.js --name "nodeapp"

/root/.nvm/versions/node/v20.10.0/bin/pm2 ls
