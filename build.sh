git pull origin main
pm2 delete 24001154-12-rap-nodejsapp-gold
pm2 start main.js -n 24001154-12-rap-nodejsapp-gold