#! /bin/sh
git pull
npm install
npm run build
cd dist
DATE=`date +%Y-%m-%d`
sudo mv /var/www/html/capability /var/www/html/capability_${DATE}
sudo cp . -R /var/www/html/capability
sudo chmod 755 -R /var/www/html/capability
ls -lh /var/www/html
exit 0