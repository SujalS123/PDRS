# Deployment Documentation

## Production Environment Setup

### Server Requirements
- Node.js v16 or higher
- MongoDB v4.4 or higher
- 2GB RAM minimum
- 20GB storage minimum
- Ubuntu 20.04 LTS or higher

### Environment Variables
Create `.env.production`:
```env
NODE_ENV=production
PORT=3000

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/dietrium?retryWrites=true&w=majority

# JWT
JWT_SECRET=<strong_secret_key>
JWT_EXPIRE=30d

# Security
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# CORS
CLIENT_URL=https://your-frontend-domain.com

# File Upload
MAX_FILE_SIZE=5000000
UPLOAD_PATH=/var/www/dietrium/uploads

# Email (Optional)
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
```

## Deployment Methods

### 1. Manual Deployment

#### Setup Server
```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
sudo apt install -y mongodb

# Install PM2
sudo npm install -g pm2

# Create app directory
sudo mkdir -p /var/www/dietrium
sudo chown -R $USER:$USER /var/www/dietrium
```

#### Deploy Application
```bash
# Clone repository
cd /var/www/dietrium
git clone <repository-url> .

# Install dependencies
npm install --production

# Build application (if needed)
npm run build

# Start application with PM2
pm2 start ecosystem.config.js
```

### 2. Docker Deployment

#### Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

#### docker-compose.yml
```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/dietrium
    depends_on:
      - mongo

  mongo:
    image: mongo:4.4
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

#### Deployment Commands
```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f
```

### 3. Kubernetes Deployment

#### Deployment YAML
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dietrium-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dietrium-api
  template:
    metadata:
      labels:
        app: dietrium-api
    spec:
      containers:
      - name: dietrium-api
        image: your-registry/dietrium-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: dietrium-secrets
              key: mongodb-uri
```

#### Service YAML
```yaml
apiVersion: v1
kind: Service
metadata:
  name: dietrium-api
spec:
  selector:
    app: dietrium-api
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## Production Best Practices

### 1. Security
- Use HTTPS
- Enable CORS properly
- Implement rate limiting
- Use secure headers
- Regular security audits

### 2. Performance
- Enable compression
- Implement caching
- Use proper indexes
- Monitor memory usage
- Load balancing

### 3. Monitoring
- Set up logging
- Monitor errors
- Track performance
- Alert on issues
- Regular backups

### 4. Maintenance
- Regular updates
- Security patches
- Database maintenance
- Log rotation
- Backup verification

## PM2 Configuration

### ecosystem.config.js
```javascript
module.exports = {
  apps: [{
    name: 'dietrium-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

### PM2 Commands
```bash
# Start application
pm2 start ecosystem.config.js

# Monitor application
pm2 monit

# View logs
pm2 logs

# Restart application
pm2 restart dietrium-api

# Stop application
pm2 stop dietrium-api
```

## Nginx Configuration

### /etc/nginx/sites-available/dietrium
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # SSL configuration
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;
}
```

## SSL Setup

### Let's Encrypt
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Backup Strategy

### Database Backup
```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/var/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)

mongodump --uri="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/dietrium" --out="$BACKUP_DIR/$DATE"

# Cleanup old backups
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;
```

### Automated Backup
```bash
# Add to crontab
0 0 * * * /path/to/backup-script.sh
```

## Monitoring Setup

### New Relic Configuration
```javascript
require('newrelic');

// In your main application file
const newrelic = require('newrelic');
```

### PM2 Monitoring
```bash
# Install PM2 monitoring
pm2 install pm2-logrotate
pm2 install pm2-server-monit
```

## Scaling Strategy

### Horizontal Scaling
- Use PM2 cluster mode
- Implement load balancing
- Use MongoDB replica sets
- Cache frequently accessed data

### Vertical Scaling
- Optimize database queries
- Implement proper indexing
- Use connection pooling
- Enable compression

## Disaster Recovery

### Backup Plan
1. Daily database backups
2. Weekly full system backups
3. Monthly backup verification
4. Quarterly disaster recovery testing

### Recovery Steps
1. Restore latest backup
2. Verify data integrity
3. Test application functionality
4. Update DNS if needed
5. Monitor system health

## Maintenance Schedule

### Daily Tasks
- Check error logs
- Monitor system resources
- Verify backups
- Review security logs

### Weekly Tasks
- Update dependencies
- Clean up old logs
- Verify SSL certificates
- Check disk space

### Monthly Tasks
- Security audit
- Performance review
- Backup verification
- Update documentation 