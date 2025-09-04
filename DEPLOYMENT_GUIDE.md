# 🚀 Deployment Guide - Moroccan University Teachers Union Platform

## 📋 Pre-Deployment Checklist

### Server Requirements
- **Operating System**: Ubuntu 20.04+ LTS or CentOS 8+
- **CPU**: 2+ cores (4+ recommended for production)
- **RAM**: 4GB minimum (8GB+ recommended)
- **Storage**: 50GB+ SSD
- **Network**: Static IP address with domain name
- **SSL Certificate**: Required for HTTPS

### Software Dependencies
- **Node.js**: v18+ LTS
- **MySQL**: 8.0+ or PostgreSQL 13+
- **Nginx**: Latest stable version
- **PM2**: Process manager for Node.js
- **Redis**: For session management (optional but recommended)

## 🛠️ Step-by-Step Deployment

### 1. Server Preparation

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Install MySQL 8.0
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install Nginx
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# Install PM2 globally
sudo npm install -g pm2

# Install Redis (optional)
sudo apt install redis-server -y
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### 2. Database Setup

#### MySQL Setup
```bash
# Login to MySQL
sudo mysql -u root -p

# Create database and user
CREATE DATABASE moroccan_university_union CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'union_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON moroccan_university_union.* TO 'union_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Import database schema
mysql -u union_user -p moroccan_university_union < database/schema.sql
```

#### PostgreSQL Setup (Alternative)
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Switch to postgres user and create database
sudo -u postgres psql

CREATE DATABASE moroccan_university_union WITH ENCODING 'UTF8';
CREATE USER union_user WITH PASSWORD 'secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE moroccan_university_union TO union_user;
\q

# Import schema
sudo -u postgres psql moroccan_university_union < database/postgresql_schema.sql
```

### 3. Application Deployment

```bash
# Create application directory
sudo mkdir -p /var/www/moroccan-university-union
cd /var/www/moroccan-university-union

# Clone repository (replace with your actual repository)
git clone https://github.com/your-org/moroccan-university-union.git .

# Install dependencies
npm ci --production

# Build the application
npm run build

# Set proper permissions
sudo chown -R www-data:www-data /var/www/moroccan-university-union
sudo chmod -R 755 /var/www/moroccan-university-union

# Create uploads directory
sudo mkdir -p /var/www/uploads
sudo chown -R www-data:www-data /var/www/uploads
sudo chmod -R 755 /var/www/uploads

# Create logs directory
sudo mkdir -p /var/log/university-union
sudo chown -R www-data:www-data /var/log/university-union
```

### 4. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

**Required Environment Variables:**
```env
# Application
NODE_ENV=production
PORT=3001
APP_URL=https://university-union.ma

# Database
DATABASE_URL=mysql://union_user:secure_password_here@localhost:3306/moroccan_university_union

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
SESSION_SECRET=your-session-secret-key

# File Upload
UPLOAD_PATH=/var/www/uploads
MAX_FILE_SIZE=10485760

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@university-union.ma
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@university-union.ma

# Security Settings
BCRYPT_ROUNDS=12
CORS_ORIGIN=https://university-union.ma
```

### 5. Nginx Configuration

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/university-union
```

**Nginx Configuration:**
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name university-union.ma www.university-union.ma;
    return 301 https://$server_name$request_uri;
}

# HTTPS Configuration
server {
    listen 443 ssl http2;
    server_name university-union.ma www.university-union.ma;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/university-union.ma.crt;
    ssl_certificate_key /etc/ssl/private/university-union.ma.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Document root
    root /var/www/moroccan-university-union/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if using separate backend)
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # File uploads
    location /uploads {
        alias /var/www/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
        
        # Security for uploaded files
        location ~* \.(php|php3|php4|php5|phtml|pl|py|jsp|asp|sh|cgi)$ {
            deny all;
        }
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~ /(\.env|\.git|node_modules|package\.json|package-lock\.json) {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    location /api {
        limit_req zone=api burst=20 nodelay;
        # ... other proxy settings
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/university-union /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL Certificate Setup

#### Using Let's Encrypt (Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d university-union.ma -d www.university-union.ma

# Test automatic renewal
sudo certbot renew --dry-run
```

#### Using Custom Certificate
```bash
# Copy your certificate files
sudo cp your-certificate.crt /etc/ssl/certs/university-union.ma.crt
sudo cp your-private-key.key /etc/ssl/private/university-union.ma.key
sudo chmod 644 /etc/ssl/certs/university-union.ma.crt
sudo chmod 600 /etc/ssl/private/university-union.ma.key
```

### 7. Process Management with PM2

```bash
# Start application with PM2
cd /var/www/moroccan-university-union
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions provided by the command above

# Monitor application
pm2 status
pm2 logs
pm2 monit
```

### 8. Firewall Configuration

```bash
# Configure UFW firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 3306  # MySQL (if remote access needed)
sudo ufw allow 5432  # PostgreSQL (if remote access needed)
sudo ufw status
```

## 🔒 Security Hardening

### 1. Database Security
```bash
# MySQL security
sudo mysql_secure_installation

# Create backup user
mysql -u root -p
CREATE USER 'backup_user'@'localhost' IDENTIFIED BY 'backup_password';
GRANT SELECT, LOCK TABLES ON moroccan_university_union.* TO 'backup_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. File Permissions
```bash
# Set secure file permissions
sudo find /var/www/moroccan-university-union -type f -exec chmod 644 {} \;
sudo find /var/www/moroccan-university-union -type d -exec chmod 755 {} \;
sudo chmod 600 /var/www/moroccan-university-union/.env
```

### 3. System Updates
```bash
# Setup automatic security updates
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

## 📊 Monitoring & Logging

### 1. Application Monitoring
```bash
# Install monitoring tools
npm install -g pm2-logrotate
pm2 install pm2-server-monit

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true
```

### 2. System Monitoring
```bash
# Install htop for system monitoring
sudo apt install htop -y

# Setup log monitoring
sudo nano /etc/logrotate.d/university-union
```

**Log Rotation Configuration:**
```
/var/log/university-union/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reload ecosystem.config.js
    endscript
}
```

## 💾 Backup Strategy

### 1. Database Backup Script
```bash
# Create backup script
sudo nano /usr/local/bin/backup-university-union.sh
```

```bash
#!/bin/bash
# University Union Backup Script

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/university-union"
DB_NAME="moroccan_university_union"
DB_USER="backup_user"
DB_PASS="backup_password"

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Files backup
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /var/www/uploads

# Application backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /var/www/moroccan-university-union --exclude=node_modules --exclude=.git

# Clean old backups (keep 30 days)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

```bash
# Make script executable
sudo chmod +x /usr/local/bin/backup-university-union.sh

# Setup daily backup cron job
sudo crontab -e
# Add this line:
0 2 * * * /usr/local/bin/backup-university-union.sh >> /var/log/backup.log 2>&1
```

### 2. Automated Offsite Backup
```bash
# Install rclone for cloud backup
curl https://rclone.org/install.sh | sudo bash

# Configure cloud storage (example: Google Drive)
rclone config

# Add to backup script
rclone copy $BACKUP_DIR remote:university-union-backups/
```

## 🔧 Performance Optimization

### 1. Database Optimization
```sql
-- MySQL optimization
SET GLOBAL innodb_buffer_pool_size = 1073741824; -- 1GB
SET GLOBAL query_cache_size = 268435456; -- 256MB
SET GLOBAL max_connections = 200;

-- Add to /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld]
innodb_buffer_pool_size = 1G
query_cache_size = 256M
query_cache_type = 1
max_connections = 200
innodb_log_file_size = 256M
```

### 2. Nginx Optimization
```nginx
# Add to nginx.conf
worker_processes auto;
worker_connections 1024;

# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;

# Enable caching
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=app_cache:10m max_size=1g inactive=60m use_temp_path=off;
```

### 3. Node.js Optimization
```bash
# Optimize PM2 configuration
pm2 start ecosystem.config.js --env production
pm2 set pm2:autodump true
pm2 set pm2:watch true
```

## 📈 Monitoring Setup

### 1. Application Monitoring
```bash
# Install monitoring dashboard
npm install -g pm2-web

# Start monitoring web interface
pm2-web --port 8080
```

### 2. System Monitoring with Prometheus (Optional)
```bash
# Install Node Exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
tar xvfz node_exporter-1.3.1.linux-amd64.tar.gz
sudo cp node_exporter-1.3.1.linux-amd64/node_exporter /usr/local/bin/
sudo useradd --no-create-home --shell /bin/false node_exporter
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. Application Won't Start
```bash
# Check PM2 logs
pm2 logs

# Check system resources
htop
df -h

# Restart application
pm2 restart all
```

#### 2. Database Connection Issues
```bash
# Check MySQL status
sudo systemctl status mysql

# Test database connection
mysql -u union_user -p moroccan_university_union

# Check database logs
sudo tail -f /var/log/mysql/error.log
```

#### 3. File Upload Issues
```bash
# Check upload directory permissions
ls -la /var/www/uploads

# Fix permissions if needed
sudo chown -R www-data:www-data /var/www/uploads
sudo chmod -R 755 /var/www/uploads
```

#### 4. SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in /etc/ssl/certs/university-union.ma.crt -text -noout

# Renew Let's Encrypt certificate
sudo certbot renew

# Test SSL configuration
sudo nginx -t
```

## 📧 Email Configuration

### Gmail SMTP Setup
1. Enable 2-factor authentication on Gmail
2. Generate an App Password
3. Use the App Password in SMTP_PASS environment variable

### Custom SMTP Server
```env
SMTP_HOST=mail.university-union.ma
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@university-union.ma
SMTP_PASS=your-email-password
```

## 🔄 Maintenance Procedures

### Daily Tasks
- Monitor application logs: `pm2 logs`
- Check system resources: `htop`, `df -h`
- Verify backup completion: `ls -la /var/backups/university-union/`

### Weekly Tasks
- Update system packages: `sudo apt update && sudo apt upgrade`
- Review security logs: `sudo tail -f /var/log/auth.log`
- Check SSL certificate expiry: `openssl x509 -in /path/to/cert -noout -dates`

### Monthly Tasks
- Database optimization: `OPTIMIZE TABLE users, documents, news_articles;`
- Clean old log files: `sudo logrotate -f /etc/logrotate.conf`
- Review user accounts and permissions
- Update application dependencies: `npm audit && npm update`

## 🆘 Emergency Procedures

### Application Recovery
```bash
# Stop application
pm2 stop all

# Restore from backup
cd /var/www
sudo rm -rf moroccan-university-union
sudo tar -xzf /var/backups/university-union/app_backup_YYYYMMDD_HHMMSS.tar.gz

# Restore database
mysql -u union_user -p moroccan_university_union < /var/backups/university-union/db_backup_YYYYMMDD_HHMMSS.sql

# Restart application
pm2 start ecosystem.config.js --env production
```

### Database Recovery
```bash
# Create new database
mysql -u root -p
DROP DATABASE IF EXISTS moroccan_university_union;
CREATE DATABASE moroccan_university_union CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Restore from backup
mysql -u union_user -p moroccan_university_union < /var/backups/university-union/db_backup_YYYYMMDD_HHMMSS.sql
```

## 📞 Support Contacts

- **Technical Support**: tech-support@university-union.ma
- **Emergency Hotline**: +212 6 XX XX XX XX
- **System Administrator**: admin@university-union.ma

## 📚 Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Deployment Environment**: Production