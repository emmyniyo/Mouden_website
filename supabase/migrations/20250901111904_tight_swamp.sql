-- Moroccan University Teachers Union Database Schema
-- PostgreSQL 13+ Compatible
-- Full Unicode support including Arabic

-- Create database
CREATE DATABASE moroccan_university_union WITH 
    ENCODING 'UTF8' 
    LC_COLLATE='en_US.UTF-8' 
    LC_CTYPE='en_US.UTF-8';

-- Connect to the database
\c moroccan_university_union;

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'member', 'visitor');
CREATE TYPE category_type AS ENUM ('document', 'news', 'event');
CREATE TYPE event_type AS ENUM ('meeting', 'workshop', 'conference', 'social', 'strike', 'assembly', 'training', 'ceremony');
CREATE TYPE registration_status AS ENUM ('registered', 'confirmed', 'attended', 'cancelled', 'no_show');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'waived');
CREATE TYPE message_status AS ENUM ('new', 'in_progress', 'resolved', 'closed', 'spam');
CREATE TYPE message_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE message_category AS ENUM ('general', 'membership', 'technical', 'complaint', 'suggestion', 'legal');
CREATE TYPE setting_type AS ENUM ('string', 'number', 'boolean', 'json', 'text');
CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'error', 'announcement');

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
    specialization VARCHAR(255),
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    last_login TIMESTAMP,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_member_id ON users(member_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_university ON users(university);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_users_created ON users(created_at);
CREATE INDEX idx_users_university_department ON users(university, department);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name_ar VARCHAR(255) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type category_type NOT NULL,
    parent_id INT REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_type ON categories(type);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_sort ON categories(sort_order);

-- Documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
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
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    is_public BOOLEAN DEFAULT FALSE,
    requires_membership BOOLEAN DEFAULT TRUE,
    download_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    uploaded_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    approved_by INT REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP,
    is_featured BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_public ON documents(is_public);
CREATE INDEX idx_documents_membership ON documents(requires_membership);
CREATE INDEX idx_documents_category ON documents(category_id);
CREATE INDEX idx_documents_featured ON documents(is_featured);
CREATE INDEX idx_documents_created ON documents(created_at);
CREATE INDEX idx_documents_expires ON documents(expires_at);
CREATE INDEX idx_documents_public_category ON documents(is_public, category_id);

-- Full text search indexes for PostgreSQL
CREATE INDEX idx_documents_search_ar ON documents USING gin(to_tsvector('arabic', title_ar || ' ' || COALESCE(description_ar, '')));
CREATE INDEX idx_documents_search_fr ON documents USING gin(to_tsvector('french', title_fr || ' ' || COALESCE(description_fr, '')));
CREATE INDEX idx_documents_search_en ON documents USING gin(to_tsvector('english', title_en || ' ' || COALESCE(description_en, '')));

-- News articles table
CREATE TABLE news_articles (
    id SERIAL PRIMARY KEY,
    title_ar VARCHAR(500) NOT NULL,
    title_fr VARCHAR(500) NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt_ar TEXT,
    excerpt_fr TEXT,
    excerpt_en TEXT,
    content_ar TEXT NOT NULL,
    content_fr TEXT NOT NULL,
    content_en TEXT NOT NULL,
    featured_image VARCHAR(500),
    image_alt_ar VARCHAR(255),
    image_alt_fr VARCHAR(255),
    image_alt_en VARCHAR(255),
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    author_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_breaking BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    publish_date TIMESTAMP,
    meta_title_ar VARCHAR(255),
    meta_title_fr VARCHAR(255),
    meta_title_en VARCHAR(255),
    meta_description_ar TEXT,
    meta_description_fr TEXT,
    meta_description_en TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_news_published ON news_articles(is_published);
CREATE INDEX idx_news_featured ON news_articles(is_featured);
CREATE INDEX idx_news_breaking ON news_articles(is_breaking);
CREATE INDEX idx_news_publish_date ON news_articles(publish_date);
CREATE INDEX idx_news_slug ON news_articles(slug);
CREATE INDEX idx_news_category ON news_articles(category_id);
CREATE INDEX idx_news_published_featured ON news_articles(is_published, is_featured);

-- Full text search for news
CREATE INDEX idx_news_search_ar ON news_articles USING gin(to_tsvector('arabic', title_ar || ' ' || content_ar));
CREATE INDEX idx_news_search_fr ON news_articles USING gin(to_tsvector('french', title_fr || ' ' || content_fr));
CREATE INDEX idx_news_search_en ON news_articles USING gin(to_tsvector('english', title_en || ' ' || content_en));

-- Events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title_ar VARCHAR(500) NOT NULL,
    title_fr VARCHAR(500) NOT NULL,
    title_en VARCHAR(500) NOT NULL,
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    event_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    location_ar VARCHAR(255),
    location_fr VARCHAR(255),
    location_en VARCHAR(255),
    address TEXT,
    event_type event_type NOT NULL,
    max_participants INT,
    current_participants INT DEFAULT 0,
    registration_required BOOLEAN DEFAULT FALSE,
    registration_deadline TIMESTAMP,
    registration_fee DECIMAL(10,2) DEFAULT 0.00,
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    featured_image VARCHAR(500),
    is_public BOOLEAN DEFAULT TRUE,
    requires_approval BOOLEAN DEFAULT FALSE,
    created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    is_cancelled BOOLEAN DEFAULT FALSE,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_end_date ON events(end_date);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_public ON events(is_public);
CREATE INDEX idx_events_active ON events(is_active);
CREATE INDEX idx_events_cancelled ON events(is_cancelled);
CREATE INDEX idx_events_registration_deadline ON events(registration_deadline);
CREATE INDEX idx_events_date_type ON events(event_date, event_type);

-- Event registrations table
CREATE TABLE event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status registration_status DEFAULT 'registered',
    payment_status payment_status DEFAULT 'pending',
    payment_amount DECIMAL(10,2) DEFAULT 0.00,
    payment_reference VARCHAR(100),
    special_requirements TEXT,
    notes TEXT,
    confirmed_by INT REFERENCES users(id) ON DELETE SET NULL,
    confirmed_at TIMESTAMP,
    
    UNIQUE(event_id, user_id)
);

CREATE INDEX idx_registrations_status ON event_registrations(status);
CREATE INDEX idx_registrations_payment_status ON event_registrations(payment_status);
CREATE INDEX idx_registrations_date ON event_registrations(registration_date);

-- Contact messages table
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    university VARCHAR(255),
    department VARCHAR(255),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    category message_category DEFAULT 'general',
    status message_status DEFAULT 'new',
    priority message_priority DEFAULT 'medium',
    assigned_to INT REFERENCES users(id) ON DELETE SET NULL,
    response TEXT,
    response_sent BOOLEAN DEFAULT FALSE,
    responded_by INT REFERENCES users(id) ON DELETE SET NULL,
    responded_at TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_priority ON contact_messages(priority);
CREATE INDEX idx_contact_category ON contact_messages(category);
CREATE INDEX idx_contact_created ON contact_messages(created_at);
CREATE INDEX idx_contact_assigned ON contact_messages(assigned_to);
CREATE INDEX idx_contact_status_priority ON contact_messages(status, priority);

-- System settings table
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type setting_type DEFAULT 'string',
    description_ar TEXT,
    description_fr TEXT,
    description_en TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    is_editable BOOLEAN DEFAULT TRUE,
    validation_rules JSONB,
    updated_by INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_settings_key ON system_settings(setting_key);
CREATE INDEX idx_settings_public ON system_settings(is_public);
CREATE INDEX idx_settings_editable ON system_settings(is_editable);

-- User sessions table
CREATE TABLE user_sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    device_info JSONB,
    location_info JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_sessions_active ON user_sessions(is_active);
CREATE INDEX idx_sessions_last_activity ON user_sessions(last_activity);

-- Audit logs table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id INT,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    request_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_table ON audit_logs(table_name);
CREATE INDEX idx_audit_record ON audit_logs(record_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);
CREATE INDEX idx_audit_request ON audit_logs(request_id);

-- File downloads tracking
CREATE TABLE file_downloads (
    id SERIAL PRIMARY KEY,
    document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    download_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_downloads_document ON file_downloads(document_id);
CREATE INDEX idx_downloads_user ON file_downloads(user_id);
CREATE INDEX idx_downloads_date ON file_downloads(download_date);
CREATE INDEX idx_downloads_ip ON file_downloads(ip_address);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title_ar VARCHAR(255) NOT NULL,
    title_fr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    message_ar TEXT NOT NULL,
    message_fr TEXT NOT NULL,
    message_en TEXT NOT NULL,
    type notification_type DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created ON notifications(created_at);
CREATE INDEX idx_notifications_expires ON notifications(expires_at);

-- Insert default categories
INSERT INTO categories (name_ar, name_fr, name_en, slug, type, description_ar, description_fr, description_en) VALUES
-- Document categories
('الاتفاقيات والعقود', 'Accords et Contrats', 'Agreements and Contracts', 'agreements', 'document', 'الاتفاقيات الجماعية والعقود المهنية', 'Accords collectifs et contrats professionnels', 'Collective agreements and professional contracts'),
('المزايا والحقوق', 'Avantages et Droits', 'Benefits and Rights', 'benefits', 'document', 'مزايا وحقوق الأساتذة الجامعيين', 'Avantages et droits des professeurs universitaires', 'University professors benefits and rights'),
('المعايير المهنية', 'Normes Professionnelles', 'Professional Standards', 'standards', 'document', 'المعايير والضوابط المهنية للتعليم الجامعي', 'Normes et standards professionnels pour l''enseignement universitaire', 'Professional standards for university education'),
('الرواتب والأجور', 'Salaires et Rémunérations', 'Salaries and Compensation', 'salary', 'document', 'جداول الرواتب ونظم التعويضات', 'Barèmes de salaires et systèmes de rémunération', 'Salary scales and compensation systems'),
('الحوكمة والإدارة', 'Gouvernance et Administration', 'Governance and Administration', 'governance', 'document', 'وثائق الحوكمة والإدارة النقابية', 'Documents de gouvernance et d''administration syndicale', 'Union governance and administration documents'),
('النماذج والطلبات', 'Formulaires et Demandes', 'Forms and Applications', 'forms', 'document', 'النماذج الرسمية وطلبات الخدمات', 'Formulaires officiels et demandes de services', 'Official forms and service requests'),

-- News categories
('أخبار النقابة', 'Actualités Syndicales', 'Union News', 'union-news', 'news', 'أخبار وأنشطة النقابة', 'Actualités et activités syndicales', 'Union news and activities'),
('الإعلانات الرسمية', 'Annonces Officielles', 'Official Announcements', 'announcements', 'news', 'الإعلانات والبيانات الرسمية', 'Annonces et communiqués officiels', 'Official announcements and statements'),
('الفعاليات والأنشطة', 'Événements et Activités', 'Events and Activities', 'events-news', 'news', 'الفعاليات والأنشطة النقابية', 'Événements et activités syndicales', 'Union events and activities'),
('التطوير المهني', 'Développement Professionnel', 'Professional Development', 'professional-dev', 'news', 'برامج وفرص التطوير المهني', 'Programmes et opportunités de développement professionnel', 'Professional development programs and opportunities'),
('الأخبار الأكاديمية', 'Actualités Académiques', 'Academic News', 'academic-news', 'news', 'الأخبار الأكاديمية والجامعية', 'Actualités académiques et universitaires', 'Academic and university news');

-- Insert default admin users (password: admin123)
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
('contact_phone', '+212 5 37 XX XX XX', 'string', 'رقم الهاتف للاتصال', 'Numéro de téléphone', 'Contact phone', TRUE),
('max_file_size', '10485760', 'number', 'الحد الأقصى لحجم الملف (بايت)', 'Taille maximale de fichier (octets)', 'Maximum file size (bytes)', FALSE);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create views for common queries
CREATE VIEW active_members AS
SELECT u.*, 
       CONCAT(u.first_name, ' ', u.last_name) as full_name,
       EXTRACT(DAY FROM (CURRENT_DATE - u.created_at::date)) as days_since_joined
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

-- Function to update download count
CREATE OR REPLACE FUNCTION update_download_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE documents 
    SET download_count = download_count + 1 
    WHERE id = NEW.document_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_download_count
    AFTER INSERT ON file_downloads
    FOR EACH ROW
    EXECUTE FUNCTION update_download_count();

-- Function to update participant count
CREATE OR REPLACE FUNCTION update_participant_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.status = 'registered' THEN
            UPDATE events 
            SET current_participants = current_participants + 1 
            WHERE id = NEW.event_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status = 'registered' AND NEW.status != 'registered' THEN
            UPDATE events 
            SET current_participants = current_participants - 1 
            WHERE id = NEW.event_id;
        ELSIF OLD.status != 'registered' AND NEW.status = 'registered' THEN
            UPDATE events 
            SET current_participants = current_participants + 1 
            WHERE id = NEW.event_id;
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_participant_count
    AFTER INSERT OR UPDATE ON event_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_participant_count();

-- Sample data
INSERT INTO news_articles (title_ar, title_fr, title_en, slug, excerpt_ar, excerpt_fr, excerpt_en, content_ar, content_fr, content_en, category_id, author_id, is_published, is_featured, publish_date) VALUES
('إطلاق برنامج جديد للتطوير المهني', 'Lancement d''un nouveau programme de développement professionnel', 'Launch of New Professional Development Program', 'new-professional-development-program', 
'برنامج شامل للتطوير المهني متاح الآن لجميع أعضاء النقابة', 'Programme complet de développement professionnel maintenant disponible pour tous les membres du syndicat', 'Comprehensive professional development program now available for all union members',
'تعلن نقابة أساتذة الجامعات المغربية عن إطلاق برنامج جديد ومتطور للتطوير المهني...', 'Le Syndicat des Professeurs Universitaires Marocains annonce le lancement d''un nouveau programme de développement professionnel...', 'The Moroccan University Teachers Union announces the launch of a new professional development program...',
(SELECT id FROM categories WHERE slug = 'professional-dev'), 1, TRUE, TRUE, NOW());

-- Analyze tables for performance
ANALYZE users, documents, news_articles, events, categories;

-- Final message
SELECT 'PostgreSQL database schema created successfully for Moroccan University Teachers Union Platform' as message;