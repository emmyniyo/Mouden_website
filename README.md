# Moroccan University Teachers Union Platform

A comprehensive, multilingual web platform designed specifically for university teachers' unions in Morocco, supporting Arabic, French, and English languages with full RTL support.

## 🎯 Overview

This platform serves the Moroccan university education community by providing:
- Public information dissemination about union activities
- Secure member-only document access and resources
- News and event management system
- Member interaction and feedback mechanisms
- Administrative tools for union management

## 🌍 Multilingual Support

- **Arabic (العربية)**: Primary language with full RTL support
- **French (Français)**: Secondary official language
- **English**: International communication
- Extensible i18n system for additional languages

## 🏗️ Architecture & Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive, RTL-compatible styling
- **Framer Motion** for smooth animations and transitions
- **React Router** for client-side routing
- **React Hook Form** with Yup validation
- **Recharts** for data visualization in admin dashboard
- **Lucide React** for consistent iconography

### Backend Requirements
- **Node.js** (v18+) or **PHP** (v8.1+)
- **MySQL** or **PostgreSQL** database
- **Redis** for session management (recommended)
- **File storage** system (local or cloud)

### Security Features
- JWT-based authentication
- Role-based access control (RBAC)
- HTTPS encryption
- Input validation and sanitization
- File upload security
- CSRF protection

## 📊 Database Schema

### Complete MySQL Database Setup

```sql
-- Create database
CREATE DATABASE moroccan_university_union CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE moroccan_university_union;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    member_id VARCHAR(50) UNIQUE,
    role ENUM('admin', 'editor', 'member', 'visitor') DEFAULT 'visitor',
    university VARCHAR(255),
    department VARCHAR(255),
    position VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_member_id (member_id),
    INDEX idx_role (role)
);

-- Categories table for documents and news
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_ar VARCHAR(255) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type ENUM('document', 'news') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_slug (slug)
);

-- Documents table
CREATE TABLE documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(500) NOT NULL,
    title_fr VARCHAR(500) NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    category_id INT,
    is_public BOOLEAN DEFAULT FALSE,
    download_count INT DEFAULT 0,
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_public (is_public),
    INDEX idx_category (category_id),
    INDEX idx_created (created_at),
    FULLTEXT idx_search_ar (title_ar, description_ar),
    FULLTEXT idx_search_fr (title_fr, description_fr),
    FULLTEXT idx_search_en (title_en, description_en)
);

-- News articles table
CREATE TABLE news_articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(500) NOT NULL,
    title_fr VARCHAR(500) NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    excerpt_ar TEXT,
    excerpt_fr TEXT,
    excerpt_en TEXT,
    content_ar LONGTEXT NOT NULL,
    content_fr LONGTEXT NOT NULL,
    content_en LONGTEXT NOT NULL,
    featured_image VARCHAR(500),
    category_id INT,
    author_id INT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    publish_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_published (is_published),
    INDEX idx_featured (is_featured),
    INDEX idx_publish_date (publish_date),
    FULLTEXT idx_search_ar (title_ar, content_ar),
    FULLTEXT idx_search_fr (title_fr, content_fr),
    FULLTEXT idx_search_en (title_en, content_en)
);

-- Events table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(500) NOT NULL,
    title_fr VARCHAR(500) NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    event_date DATETIME NOT NULL,
    end_date DATETIME,
    location_ar VARCHAR(255),
    location_fr VARCHAR(255),
    location_en VARCHAR(255),
    event_type ENUM('meeting', 'workshop', 'conference', 'social', 'strike', 'assembly') NOT NULL,
    max_participants INT,
    registration_required BOOLEAN DEFAULT FALSE,
    registration_deadline DATETIME,
    created_by INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_event_date (event_date),
    INDEX idx_type (event_type),
    INDEX idx_active (is_active)
);

-- Event registrations table
CREATE TABLE event_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered',
    notes TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (event_id, user_id),
    INDEX idx_status (status)
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    user_id INT NULL,
    status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    assigned_to INT NULL,
    response TEXT,
    responded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_created (created_at)
);

-- System settings table
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_key (setting_key),
    INDEX idx_public (is_public)
);

-- User sessions table (for enhanced security)
CREATE TABLE user_sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_expires (expires_at)
);

-- Audit log table
CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_table (table_name),
    INDEX idx_created (created_at)
);

-- Insert default categories
INSERT INTO categories (name_ar, name_fr, name_en, slug, type) VALUES
-- Document categories
('الاتفاقيات والعقود', 'Accords et Contrats', 'Agreements and Contracts', 'agreements', 'document'),
('المزايا والحقوق', 'Avantages et Droits', 'Benefits and Rights', 'benefits', 'document'),
('المعايير المهنية', 'Normes Professionnelles', 'Professional Standards', 'standards', 'document'),
('الرواتب والأجور', 'Salaires et Rémunérations', 'Salaries and Compensation', 'salary', 'document'),
('الحوكمة والإدارة', 'Gouvernance et Administration', 'Governance and Administration', 'governance', 'document'),
('النماذج والطلبات', 'Formulaires et Demandes', 'Forms and Applications', 'forms', 'document'),
-- News categories
('أخبار النقابة', 'Actualités Syndicales', 'Union News', 'union-news', 'news'),
('الإعلانات الرسمية', 'Annonces Officielles', 'Official Announcements', 'announcements', 'news'),
('الفعاليات والأنشطة', 'Événements et Activités', 'Events and Activities', 'events-news', 'news'),
('التطوير المهني', 'Développement Professionnel', 'Professional Development', 'professional-dev', 'news'),
('الأخبار الأكاديمية', 'Actualités Académiques', 'Academic News', 'academic-news', 'news');

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, role, university, department, position, is_active, email_verified) VALUES
('admin@university-union.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'المدير', 'العام', 'admin', 'جامعة محمد الخامس', 'الإدارة', 'مدير النقابة', TRUE, TRUE),
('editor@university-union.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'محرر', 'المحتوى', 'editor', 'جامعة الحسن الثاني', 'الآداب', 'محرر', TRUE, TRUE);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description_ar, description_fr, description_en, is_public) VALUES
('site_name_ar', 'نقابة أساتذة الجامعات المغربية', 'string', 'اسم الموقع بالعربية', 'Nom du site en arabe', 'Site name in Arabic', TRUE),
('site_name_fr', 'Syndicat des Professeurs Universitaires Marocains', 'string', 'اسم الموقع بالفرنسية', 'Nom du site en français', 'Site name in French', TRUE),
('site_name_en', 'Moroccan University Teachers Union', 'string', 'اسم الموقع بالإنجليزية', 'Nom du site en anglais', 'Site name in English', TRUE),
('contact_email', 'contact@university-union.ma', 'string', 'البريد الإلكتروني للاتصال', 'Email de contact', 'Contact email', TRUE),
('contact_phone', '+212 5 37 XX XX XX', 'string', 'رقم الهاتف للاتصال', 'Numéro de téléphone', 'Contact phone', TRUE),
('address_ar', 'الرباط، المغرب', 'string', 'العنوان بالعربية', 'Adresse en arabe', 'Address in Arabic', TRUE),
('address_fr', 'Rabat, Maroc', 'string', 'العنوان بالفرنسية', 'Adresse en français', 'Address in French', TRUE),
('address_en', 'Rabat, Morocco', 'string', 'العنوان بالإنجليزية', 'Adresse en anglais', 'Address in English', TRUE),
('max_file_size', '10485760', 'number', 'الحد الأقصى لحجم الملف (بايت)', 'Taille maximale de fichier (octets)', 'Maximum file size (bytes)', FALSE),
('allowed_file_types', '["pdf","doc","docx","xls","xlsx","ppt","pptx","txt","jpg","jpeg","png"]', 'json', 'أنواع الملفات المسموحة', 'Types de fichiers autorisés', 'Allowed file types', FALSE);
```

### PostgreSQL Alternative

```sql
-- Create database
CREATE DATABASE moroccan_university_union WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8';

-- Connect to the database
\c moroccan_university_union;

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'member', 'visitor');
CREATE TYPE category_type AS ENUM ('document', 'news');
CREATE TYPE event_type AS ENUM ('meeting', 'workshop', 'conference', 'social', 'strike', 'assembly');
CREATE TYPE registration_status AS ENUM ('registered', 'attended', 'cancelled');
CREATE TYPE message_status AS ENUM ('new', 'in_progress', 'resolved', 'closed');
CREATE TYPE message_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE setting_type AS ENUM ('string', 'number', 'boolean', 'json');

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    member_id VARCHAR(50) UNIQUE,
    role user_role DEFAULT 'visitor',
    university VARCHAR(255),
    department VARCHAR(255),
    position VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_member_id ON users(member_id);
CREATE INDEX idx_users_role ON users(role);

-- Continue with other tables following the same pattern...
-- (Full PostgreSQL schema available on request)
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- MySQL 8.0+ or PostgreSQL 13+
- Web server (Apache/Nginx) for production
- SSL certificate for HTTPS

### Development Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd moroccan-university-union
npm install
```

2. **Database Setup**
```bash
# Create database using the SQL scripts above
mysql -u root -p < database/schema.sql

# Or for PostgreSQL
psql -U postgres -f database/schema.sql
```

3. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env

# Configure your environment variables
DATABASE_URL="mysql://user:password@localhost:3306/moroccan_university_union"
JWT_SECRET="your-super-secret-jwt-key"
UPLOAD_PATH="/var/www/uploads"
MAX_FILE_SIZE=10485760
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

4. **Start Development Server**
```bash
npm run dev
```

### Production Deployment

#### Server Requirements
- **CPU**: 2+ cores
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 50GB+ SSD
- **OS**: Ubuntu 20.04+ or CentOS 8+

#### Deployment Steps

1. **Server Preparation**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install Nginx
sudo apt install nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

2. **Application Deployment**
```bash
# Clone repository
git clone <repository-url> /var/www/moroccan-university-union
cd /var/www/moroccan-university-union

# Install dependencies
npm ci --production

# Build application
npm run build

# Set permissions
sudo chown -R www-data:www-data /var/www/moroccan-university-union
sudo chmod -R 755 /var/www/moroccan-university-union

# Create uploads directory
sudo mkdir -p /var/www/uploads
sudo chown -R www-data:www-data /var/www/uploads
sudo chmod -R 755 /var/www/uploads
```

3. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name university-union.ma www.university-union.ma;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name university-union.ma www.university-union.ma;

    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;

    root /var/www/moroccan-university-union/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Handle React Router
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
    }

    # File uploads
    location /uploads {
        alias /var/www/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **PM2 Process Management**
```bash
# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

## 🔧 Configuration Guide

### Language Configuration
The platform supports dynamic language switching with proper RTL support for Arabic:

```javascript
// Language configuration in src/i18n/index.ts
const resources = {
  ar: { translation: require('./locales/ar.json') },
  fr: { translation: require('./locales/fr.json') },
  en: { translation: require('./locales/en.json') }
};
```

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management, all CRUD operations |
| **Editor** | Content management, document upload, news publishing |
| **Member** | Access to member-only content, document downloads |
| **Visitor** | Public content access only |

### File Upload Configuration
```javascript
// Supported file types
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png'
];

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;
```

## 🔒 Security Guidelines

### Authentication Security
- Passwords hashed using bcrypt with salt rounds ≥ 12
- JWT tokens with short expiration (15 minutes) and refresh tokens
- Account lockout after 5 failed login attempts
- Email verification required for new accounts

### File Upload Security
- File type validation using MIME type checking
- Virus scanning integration recommended
- Files stored outside web root
- Unique filename generation to prevent conflicts

### Database Security
- Prepared statements to prevent SQL injection
- Regular database backups
- Encrypted sensitive data fields
- Database user with minimal required privileges

## 📱 Mobile Responsiveness

The platform is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

RTL layout automatically adjusts for Arabic content with proper text alignment and navigation flow.

## 🌐 SEO & Performance

### SEO Features
- Meta tags in all three languages
- Structured data markup
- XML sitemaps
- Clean URLs with language prefixes
- Open Graph tags for social sharing

### Performance Optimizations
- Code splitting and lazy loading
- Image optimization and lazy loading
- Gzip compression
- Browser caching headers
- CDN integration ready

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Test Coverage Goals
- Unit tests: >90% coverage
- Integration tests for all API endpoints
- E2E tests for critical user journeys
- Accessibility testing with axe-core

## 📊 Monitoring & Analytics

### Recommended Monitoring Tools
- **Application**: PM2 monitoring, New Relic, or DataDog
- **Server**: Prometheus + Grafana
- **Database**: MySQL/PostgreSQL monitoring
- **Logs**: ELK Stack or similar

### Analytics Integration
- Google Analytics 4 ready
- Custom event tracking for user interactions
- Performance monitoring with Core Web Vitals

## 🔄 Backup & Recovery

### Automated Backup Strategy
```bash
#!/bin/bash
# Daily database backup script
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u backup_user -p moroccan_university_union > /backups/db_backup_$DATE.sql
find /backups -name "db_backup_*.sql" -mtime +30 -delete
```

### File Backup
- Daily incremental backups of upload directory
- Weekly full system backups
- Offsite backup storage recommended

## 📚 User Training Materials

### Admin Training Topics
1. User management and role assignment
2. Content creation and publishing workflow
3. Document upload and categorization
4. Event management and registration
5. Contact message handling
6. System settings configuration

### Member Training Topics
1. Account registration and profile setup
2. Document search and download
3. Event registration process
4. Contact form usage
5. Language switching

## 🆘 Support & Maintenance

### Regular Maintenance Tasks
- **Daily**: Monitor system logs, check backup status
- **Weekly**: Update security patches, review user feedback
- **Monthly**: Database optimization, performance review
- **Quarterly**: Security audit, dependency updates

### Support Channels
- Technical support: tech-support@university-union.ma
- User support: support@university-union.ma
- Emergency contact: +212 6 XX XX XX XX

## 📄 License & Credits

This platform is developed specifically for Moroccan university teachers' unions with consideration for:
- Moroccan educational system requirements
- Arabic language and cultural preferences
- French administrative language usage
- Local university structures and hierarchies

### Third-Party Libraries
- React ecosystem (MIT License)
- Tailwind CSS (MIT License)
- Lucide React icons (ISC License)
- Other dependencies as listed in package.json

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Developed for**: Moroccan University Teachers' Unions