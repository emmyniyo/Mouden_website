-- Moroccan University Teachers Union Database Schema
-- MySQL 8.0+ Compatible
-- Character Set: UTF8MB4 for full Unicode support including Arabic

-- Create database with proper character set and collation
CREATE DATABASE IF NOT EXISTS moroccan_university_union 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE moroccan_university_union;

-- Users table - Core user management
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
    specialization VARCHAR(255),
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP NULL,
    last_login TIMESTAMP NULL,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_member_id (member_id),
    INDEX idx_role (role),
    INDEX idx_university (university),
    INDEX idx_active (is_active),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Categories table for organizing content
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_ar VARCHAR(255) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type ENUM('document', 'news', 'event') NOT NULL,
    parent_id INT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_type (type),
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id),
    INDEX idx_active (is_active),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Documents table - File management system
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
    mime_type VARCHAR(100) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    category_id INT,
    is_public BOOLEAN DEFAULT FALSE,
    requires_membership BOOLEAN DEFAULT TRUE,
    download_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    uploaded_by INT NOT NULL,
    approved_by INT NULL,
    approved_at TIMESTAMP NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_public (is_public),
    INDEX idx_membership (requires_membership),
    INDEX idx_category (category_id),
    INDEX idx_featured (is_featured),
    INDEX idx_created (created_at),
    INDEX idx_expires (expires_at),
    FULLTEXT idx_search_ar (title_ar, description_ar),
    FULLTEXT idx_search_fr (title_fr, description_fr),
    FULLTEXT idx_search_en (title_en, description_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- News articles table
CREATE TABLE news_articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(500) NOT NULL,
    title_fr VARCHAR(500) NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt_ar TEXT,
    excerpt_fr TEXT,
    excerpt_en TEXT,
    content_ar LONGTEXT NOT NULL,
    content_fr LONGTEXT NOT NULL,
    content_en LONGTEXT NOT NULL,
    featured_image VARCHAR(500),
    image_alt_ar VARCHAR(255),
    image_alt_fr VARCHAR(255),
    image_alt_en VARCHAR(255),
    category_id INT,
    author_id INT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_breaking BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    publish_date TIMESTAMP NULL,
    meta_title_ar VARCHAR(255),
    meta_title_fr VARCHAR(255),
    meta_title_en VARCHAR(255),
    meta_description_ar TEXT,
    meta_description_fr TEXT,
    meta_description_en TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_published (is_published),
    INDEX idx_featured (is_featured),
    INDEX idx_breaking (is_breaking),
    INDEX idx_publish_date (publish_date),
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    FULLTEXT idx_search_ar (title_ar, content_ar),
    FULLTEXT idx_search_fr (title_fr, content_fr),
    FULLTEXT idx_search_en (title_en, content_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    address TEXT,
    event_type ENUM('meeting', 'workshop', 'conference', 'social', 'strike', 'assembly', 'training', 'ceremony') NOT NULL,
    max_participants INT,
    current_participants INT DEFAULT 0,
    registration_required BOOLEAN DEFAULT FALSE,
    registration_deadline DATETIME,
    registration_fee DECIMAL(10,2) DEFAULT 0.00,
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    featured_image VARCHAR(500),
    is_public BOOLEAN DEFAULT TRUE,
    requires_approval BOOLEAN DEFAULT FALSE,
    created_by INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_cancelled BOOLEAN DEFAULT FALSE,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_event_date (event_date),
    INDEX idx_end_date (end_date),
    INDEX idx_type (event_type),
    INDEX idx_public (is_public),
    INDEX idx_active (is_active),
    INDEX idx_cancelled (is_cancelled),
    INDEX idx_registration_deadline (registration_deadline)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Event registrations table
CREATE TABLE event_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('registered', 'confirmed', 'attended', 'cancelled', 'no_show') DEFAULT 'registered',
    payment_status ENUM('pending', 'paid', 'refunded', 'waived') DEFAULT 'pending',
    payment_amount DECIMAL(10,2) DEFAULT 0.00,
    payment_reference VARCHAR(100),
    special_requirements TEXT,
    notes TEXT,
    confirmed_by INT NULL,
    confirmed_at TIMESTAMP NULL,
    
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (confirmed_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_registration (event_id, user_id),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_registration_date (registration_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact messages table
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    university VARCHAR(255),
    department VARCHAR(255),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    user_id INT NULL,
    category ENUM('general', 'membership', 'technical', 'complaint', 'suggestion', 'legal') DEFAULT 'general',
    status ENUM('new', 'in_progress', 'resolved', 'closed', 'spam') DEFAULT 'new',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    assigned_to INT NULL,
    response TEXT,
    response_sent BOOLEAN DEFAULT FALSE,
    responded_by INT NULL,
    responded_at TIMESTAMP NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (responded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_category (category),
    INDEX idx_created (created_at),
    INDEX idx_assigned (assigned_to)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- System settings table
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json', 'text') DEFAULT 'string',
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    is_editable BOOLEAN DEFAULT TRUE,
    validation_rules JSON,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_key (setting_key),
    INDEX idx_public (is_public),
    INDEX idx_editable (is_editable)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User sessions table for enhanced security
CREATE TABLE user_sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_info JSON,
    location_info JSON,
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_expires (expires_at),
    INDEX idx_active (is_active),
    INDEX idx_last_activity (last_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit log table for tracking changes
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
    request_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_table (table_name),
    INDEX idx_record (record_id),
    INDEX idx_created (created_at),
    INDEX idx_request (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- File downloads tracking
CREATE TABLE file_downloads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document_id INT NOT NULL,
    user_id INT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    download_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_document (document_id),
    INDEX idx_user (user_id),
    INDEX idx_date (download_date),
    INDEX idx_ip (ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    title_fr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    message_ar TEXT NOT NULL,
    message_fr TEXT NOT NULL,
    message_en TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error', 'announcement') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created (created_at),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default categories
INSERT INTO categories (name_ar, name_fr, name_en, slug, type, description_ar, description_fr, description_en) VALUES
-- Document categories
('الاتفاقيات والعقود', 'Accords et Contrats', 'Agreements and Contracts', 'agreements', 'document', 'الاتفاقيات الجماعية والعقود المهنية', 'Accords collectifs et contrats professionnels', 'Collective agreements and professional contracts'),
('المزايا والحقوق', 'Avantages et Droits', 'Benefits and Rights', 'benefits', 'document', 'مزايا وحقوق الأساتذة الجامعيين', 'Avantages et droits des professeurs universitaires', 'University professors benefits and rights'),
('المعايير المهنية', 'Normes Professionnelles', 'Professional Standards', 'standards', 'document', 'المعايير والضوابط المهنية للتعليم الجامعي', 'Normes et standards professionnels pour l\'enseignement universitaire', 'Professional standards for university education'),
('الرواتب والأجور', 'Salaires et Rémunérations', 'Salaries and Compensation', 'salary', 'document', 'جداول الرواتب ونظم التعويضات', 'Barèmes de salaires et systèmes de rémunération', 'Salary scales and compensation systems'),
('الحوكمة والإدارة', 'Gouvernance et Administration', 'Governance and Administration', 'governance', 'document', 'وثائق الحوكمة والإدارة النقابية', 'Documents de gouvernance et d\'administration syndicale', 'Union governance and administration documents'),
('النماذج والطلبات', 'Formulaires et Demandes', 'Forms and Applications', 'forms', 'document', 'النماذج الرسمية وطلبات الخدمات', 'Formulaires officiels et demandes de services', 'Official forms and service requests'),

-- News categories
('أخبار النقابة', 'Actualités Syndicales', 'Union News', 'union-news', 'news', 'أخبار وأنشطة النقابة', 'Actualités et activités syndicales', 'Union news and activities'),
('الإعلانات الرسمية', 'Annonces Officielles', 'Official Announcements', 'announcements', 'news', 'الإعلانات والبيانات الرسمية', 'Annonces et communiqués officiels', 'Official announcements and statements'),
('الفعاليات والأنشطة', 'Événements et Activités', 'Events and Activities', 'events-news', 'news', 'الفعاليات والأنشطة النقابية', 'Événements et activités syndicales', 'Union events and activities'),
('التطوير المهني', 'Développement Professionnel', 'Professional Development', 'professional-dev', 'news', 'برامج وفرص التطوير المهني', 'Programmes et opportunités de développement professionnel', 'Professional development programs and opportunities'),
('الأخبار الأكاديمية', 'Actualités Académiques', 'Academic News', 'academic-news', 'news', 'الأخبار الأكاديمية والجامعية', 'Actualités académiques et universitaires', 'Academic and university news'),

-- Event categories
('اجتماعات', 'Réunions', 'Meetings', 'meetings', 'event', 'الاجتماعات النقابية والإدارية', 'Réunions syndicales et administratives', 'Union and administrative meetings'),
('ورش عمل', 'Ateliers', 'Workshops', 'workshops', 'event', 'ورش العمل والتدريب', 'Ateliers de travail et formation', 'Workshops and training sessions'),
('مؤتمرات', 'Conférences', 'Conferences', 'conferences', 'event', 'المؤتمرات العلمية والمهنية', 'Conférences scientifiques et professionnelles', 'Scientific and professional conferences');

-- Insert default admin users
INSERT INTO users (email, password_hash, first_name, last_name, role, university, department, position, is_active, email_verified) VALUES
('admin@university-union.ma', '$2y$12$LQv3c1ydiCr7tpmd5mdHdOya01kVXdYw1oQ67PpFDaVJ6FeL3C29G', 'المدير', 'العام', 'admin', 'جامعة محمد الخامس - الرباط', 'الإدارة العامة', 'الأمين العام للنقابة', TRUE, TRUE),
('editor@university-union.ma', '$2y$12$LQv3c1ydiCr7tpmd5mdHdOya01kVXdYw1oQ67PpFDaVJ6FeL3C29G', 'محرر', 'المحتوى', 'editor', 'جامعة الحسن الثاني - الدار البيضاء', 'كلية الآداب والعلوم الإنسانية', 'محرر المحتوى', TRUE, TRUE),
('member@university-union.ma', '$2y$12$LQv3c1ydiCr7tpmd5mdHdOya01kVXdYw1oQ67PpFDaVJ6FeL3C29G', 'عضو', 'نشط', 'member', 'جامعة سيدي محمد بن عبد الله - فاس', 'كلية العلوم', 'أستاذ التعليم العالي', TRUE, TRUE);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description_ar, description_fr, description_en, is_public) VALUES
('site_name_ar', 'نقابة أساتذة الجامعات المغربية', 'string', 'اسم الموقع بالعربية', 'Nom du site en arabe', 'Site name in Arabic', TRUE),
('site_name_fr', 'Syndicat National de l’Enseignement Supérieur', 'string', 'اسم الموقع بالفرنسية', 'Nom du site en français', 'Site name in French', TRUE),
('site_name_en', 'Moroccan University Teachers Union', 'string', 'اسم الموقع بالإنجليزية', 'Nom du site en anglais', 'Site name in English', TRUE),
('contact_email', 'contact@university-union.ma', 'string', 'البريد الإلكتروني للاتصال', 'Email de contact', 'Contact email', TRUE),
('support_email', 'support@university-union.ma', 'string', 'البريد الإلكتروني للدعم الفني', 'Email de support technique', 'Technical support email', TRUE),
('contact_phone', '+212 5 37 XX XX XX', 'string', 'رقم الهاتف للاتصال', 'Numéro de téléphone de contact', 'Contact phone number', TRUE),
('emergency_phone', '+212 6 XX XX XX XX', 'string', 'رقم الهاتف للطوارئ', 'Numéro de téléphone d\'urgence', 'Emergency phone number', TRUE),
('address_ar', 'شارع الجامعة، الرباط 10000، المغرب', 'string', 'العنوان بالعربية', 'Adresse en arabe', 'Address in Arabic', TRUE),
('address_fr', 'Avenue de l\'Université, Rabat 10000, Maroc', 'string', 'العنوان بالفرنسية', 'Adresse en français', 'Address in French', TRUE),
('address_en', 'University Avenue, Rabat 10000, Morocco', 'string', 'العنوان بالإنجليزية', 'Adresse en anglais', 'Address in English', TRUE),
('office_hours_ar', 'الاثنين - الجمعة: 9:00 - 17:00', 'string', 'ساعات العمل بالعربية', 'Heures de bureau en arabe', 'Office hours in Arabic', TRUE),
('office_hours_fr', 'Lundi - Vendredi: 9h00 - 17h00', 'string', 'ساعات العمل بالفرنسية', 'Heures de bureau en français', 'Office hours in French', TRUE),
('office_hours_en', 'Monday - Friday: 9:00 AM - 5:00 PM', 'string', 'ساعات العمل بالإنجليزية', 'Heures de bureau en anglais', 'Office hours in English', TRUE),
('max_file_size', '10485760', 'number', 'الحد الأقصى لحجم الملف (بايت)', 'Taille maximale de fichier (octets)', 'Maximum file size (bytes)', FALSE),
('allowed_file_types', '["pdf","doc","docx","xls","xlsx","ppt","pptx","txt","jpg","jpeg","png","gif"]', 'json', 'أنواع الملفات المسموحة', 'Types de fichiers autorisés', 'Allowed file types', FALSE),
('session_timeout', '3600', 'number', 'مهلة انتهاء الجلسة (ثانية)', 'Délai d\'expiration de session (secondes)', 'Session timeout (seconds)', FALSE),
('max_login_attempts', '5', 'number', 'الحد الأقصى لمحاولات تسجيل الدخول', 'Nombre maximum de tentatives de connexion', 'Maximum login attempts', FALSE),
('lockout_duration', '1800', 'number', 'مدة القفل بعد المحاولات الفاشلة (ثانية)', 'Durée de verrouillage après échecs (secondes)', 'Lockout duration after failed attempts (seconds)', FALSE),
('maintenance_mode', 'false', 'boolean', 'وضع الصيانة', 'Mode maintenance', 'Maintenance mode', FALSE),
('registration_enabled', 'true', 'boolean', 'تفعيل التسجيل الجديد', 'Activation des nouvelles inscriptions', 'New registration enabled', FALSE),
('email_verification_required', 'true', 'boolean', 'تفعيل التحقق من البريد الإلكتروني', 'Vérification email requise', 'Email verification required', FALSE);

-- Create indexes for better performance
CREATE INDEX idx_users_university_department ON users(university, department);
CREATE INDEX idx_documents_public_category ON documents(is_public, category_id);
CREATE INDEX idx_news_published_featured ON news_articles(is_published, is_featured);
CREATE INDEX idx_events_date_type ON events(event_date, event_type);
CREATE INDEX idx_contact_status_priority ON contact_messages(status, priority);

-- Create views for common queries
CREATE VIEW active_members AS
SELECT u.*, 
       CONCAT(u.first_name, ' ', u.last_name) as full_name,
       DATEDIFF(CURRENT_DATE, u.created_at) as days_since_joined
FROM users u 
WHERE u.is_active = TRUE AND u.role IN ('member', 'editor', 'admin');

CREATE VIEW public_documents AS
SELECT d.*, c.name_ar as category_name_ar, c.name_fr as category_name_fr, c.name_en as category_name_en,
       u.first_name as uploader_first_name, u.last_name as uploader_last_name
FROM documents d
LEFT JOIN categories c ON d.category_id = c.id
LEFT JOIN users u ON d.uploaded_by = u.id
WHERE d.is_public = TRUE;

CREATE VIEW published_news AS
SELECT n.*, c.name_ar as category_name_ar, c.name_fr as category_name_fr, c.name_en as category_name_en,
       u.first_name as author_first_name, u.last_name as author_last_name
FROM news_articles n
LEFT JOIN categories c ON n.category_id = c.id
LEFT JOIN users u ON n.author_id = u.id
WHERE n.is_published = TRUE AND (n.publish_date IS NULL OR n.publish_date <= NOW());

CREATE VIEW upcoming_events AS
SELECT e.*, 
       (SELECT COUNT(*) FROM event_registrations er WHERE er.event_id = e.id AND er.status = 'registered') as registered_count,
       u.first_name as creator_first_name, u.last_name as creator_last_name
FROM events e
LEFT JOIN users u ON e.created_by = u.id
WHERE e.is_active = TRUE AND e.is_cancelled = FALSE AND e.event_date >= NOW()
ORDER BY e.event_date ASC;

-- Triggers for automatic updates
DELIMITER //

-- Update document download count
CREATE TRIGGER update_download_count 
AFTER INSERT ON file_downloads
FOR EACH ROW
BEGIN
    UPDATE documents 
    SET download_count = download_count + 1 
    WHERE id = NEW.document_id;
END//

-- Update event participant count
CREATE TRIGGER update_participant_count_insert
AFTER INSERT ON event_registrations
FOR EACH ROW
BEGIN
    IF NEW.status = 'registered' THEN
        UPDATE events 
        SET current_participants = current_participants + 1 
        WHERE id = NEW.event_id;
    END IF;
END//

CREATE TRIGGER update_participant_count_update
AFTER UPDATE ON event_registrations
FOR EACH ROW
BEGIN
    IF OLD.status = 'registered' AND NEW.status != 'registered' THEN
        UPDATE events 
        SET current_participants = current_participants - 1 
        WHERE id = NEW.event_id;
    ELSEIF OLD.status != 'registered' AND NEW.status = 'registered' THEN
        UPDATE events 
        SET current_participants = current_participants + 1 
        WHERE id = NEW.event_id;
    END IF;
END//

-- Audit log trigger for users table
CREATE TRIGGER audit_users_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (NEW.id, 'UPDATE', 'users', NEW.id, 
            JSON_OBJECT('email', OLD.email, 'role', OLD.role, 'is_active', OLD.is_active),
            JSON_OBJECT('email', NEW.email, 'role', NEW.role, 'is_active', NEW.is_active));
END//

DELIMITER ;

-- Sample data for testing (optional)
INSERT INTO news_articles (title_ar, title_fr, title_en, slug, excerpt_ar, excerpt_fr, excerpt_en, content_ar, content_fr, content_en, category_id, author_id, is_published, is_featured, publish_date) VALUES
('إطلاق برنامج جديد للتطوير المهني', 'Lancement d\'un nouveau programme de développement professionnel', 'Launch of New Professional Development Program', 'new-professional-development-program', 
'برنامج شامل للتطوير المهني متاح الآن لجميع أعضاء النقابة', 'Programme complet de développement professionnel maintenant disponible pour tous les membres du syndicat', 'Comprehensive professional development program now available for all union members',
Syndicat des Professeurs Universitaires'تعلن نقابة أساتذة الجامعات المغربية عن إطلاق برنامج جديد ومتطور للتطوير المهني...', 'Le  Marocains annonce le lancement d\'un nouveau programme de développement professionnel...', 'The Moroccan University Teachers Union announces the launch of a new professional development program...',
(SELECT id FROM categories WHERE slug = 'professional-dev'), 1, TRUE, TRUE, NOW());

-- Clean up and optimize
ANALYZE TABLE users, documents, news_articles, events, categories;
OPTIMIZE TABLE users, documents, news_articles, events, categories;

-- Final message
SELECT 'Database schema created successfully for Moroccan University Teachers Union Platform' as message;