-- Registration Approval System Migration
-- Adds support for admin approval of user registration requests

-- Add new columns to users table for approval workflow
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS requested_role ENUM('admin', 'editor', 'member', 'visitor') DEFAULT 'member',
ADD COLUMN IF NOT EXISTS approval_notes TEXT,
ADD COLUMN IF NOT EXISTS approved_by INT REFERENCES users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP NULL,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Create indexes for approval queries
CREATE INDEX IF NOT EXISTS idx_users_approval_status ON users(approval_status);
CREATE INDEX IF NOT EXISTS idx_users_requested_role ON users(requested_role);
CREATE INDEX IF NOT EXISTS idx_users_approved_by ON users(approved_by);

-- Create registration_requests table for better tracking
CREATE TABLE IF NOT EXISTS registration_requests (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requested_role ENUM('admin', 'editor', 'member', 'visitor') NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    request_notes TEXT,
    admin_notes TEXT,
    approved_by INT REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP NULL,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for registration_requests
CREATE INDEX IF NOT EXISTS idx_registration_requests_status ON registration_requests(status);
CREATE INDEX IF NOT EXISTS idx_registration_requests_requested_role ON registration_requests(requested_role);
CREATE INDEX IF NOT EXISTS idx_registration_requests_approved_by ON registration_requests(approved_by);
CREATE INDEX IF NOT EXISTS idx_registration_requests_created ON registration_requests(created_at);

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_registration_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_registration_requests_updated_at
    BEFORE UPDATE ON registration_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_registration_requests_updated_at();

-- Create view for pending registration requests
CREATE OR REPLACE VIEW pending_registration_requests AS
SELECT 
    rr.id as request_id,
    u.id as user_id,
    u.email,
    u.first_name,
    u.last_name,
    u.phone,
    u.member_id,
    u.university,
    u.department,
    u.position,
    u.specialization,
    u.hire_date,
    rr.requested_role,
    rr.request_notes,
    rr.created_at as request_date,
    rr.updated_at as last_updated
FROM registration_requests rr
JOIN users u ON rr.user_id = u.id
WHERE rr.status = 'pending'
ORDER BY rr.created_at ASC;

-- Create view for approved registration requests
CREATE OR REPLACE VIEW approved_registration_requests AS
SELECT 
    rr.id as request_id,
    u.id as user_id,
    u.email,
    u.first_name,
    u.last_name,
    u.phone,
    u.member_id,
    u.university,
    u.department,
    u.position,
    u.specialization,
    u.hire_date,
    rr.requested_role,
    rr.request_notes,
    rr.admin_notes,
    rr.approved_by,
    approver.first_name as approver_first_name,
    approver.last_name as approver_last_name,
    rr.approved_at,
    rr.created_at as request_date
FROM registration_requests rr
JOIN users u ON rr.user_id = u.id
LEFT JOIN users approver ON rr.approved_by = approver.id
WHERE rr.status = 'approved'
ORDER BY rr.approved_at DESC;

-- Create view for rejected registration requests
CREATE OR REPLACE VIEW rejected_registration_requests AS
SELECT 
    rr.id as request_id,
    u.id as user_id,
    u.email,
    u.first_name,
    u.last_name,
    u.phone,
    u.member_id,
    u.university,
    u.department,
    u.position,
    u.specialization,
    u.hire_date,
    rr.requested_role,
    rr.request_notes,
    rr.admin_notes,
    rr.rejection_reason,
    rr.approved_by,
    approver.first_name as approver_first_name,
    approver.last_name as approver_last_name,
    rr.approved_at,
    rr.created_at as request_date
FROM registration_requests rr
JOIN users u ON rr.user_id = u.id
LEFT JOIN users approver ON rr.approved_by = approver.id
WHERE rr.status = 'rejected'
ORDER BY rr.approved_at DESC;

-- Update existing users to have approved status
UPDATE users 
SET approval_status = 'approved', 
    requested_role = role,
    approved_at = created_at
WHERE approval_status = 'pending';

-- Insert system settings for approval workflow
INSERT INTO system_settings (setting_key, setting_value, setting_type, description_ar, description_fr, description_en, is_public) VALUES
('registration_approval_required', 'true', 'boolean', 'يتطلب التسجيل موافقة الإدارة', 'L''inscription nécessite l''approbation de l''administration', 'Registration requires admin approval', FALSE),
('auto_approve_members', 'false', 'boolean', 'الموافقة التلقائية على الأعضاء', 'Approbation automatique des membres', 'Auto approve members', FALSE),
('auto_approve_editors', 'false', 'boolean', 'الموافقة التلقائية على المحررين', 'Approbation automatique des éditeurs', 'Auto approve editors', FALSE),
('approval_notification_email', 'admin@university-union.ma', 'string', 'البريد الإلكتروني لإشعارات الموافقة', 'Email pour les notifications d''approbation', 'Email for approval notifications', FALSE);

-- Create function to approve registration request
CREATE OR REPLACE FUNCTION approve_registration_request(
    request_id_param INT,
    approver_id_param INT,
    admin_notes_param TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    user_id_var INT;
    requested_role_var VARCHAR(20);
BEGIN
    -- Get request details
    SELECT user_id, requested_role INTO user_id_var, requested_role_var
    FROM registration_requests 
    WHERE id = request_id_param AND status = 'pending';
    
    IF user_id_var IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Update registration request
    UPDATE registration_requests 
    SET status = 'approved',
        approved_by = approver_id_param,
        approved_at = CURRENT_TIMESTAMP,
        admin_notes = admin_notes_param
    WHERE id = request_id_param;
    
    -- Update user
    UPDATE users 
    SET approval_status = 'approved',
        role = requested_role_var::user_role,
        approved_by = approver_id_param,
        approved_at = CURRENT_TIMESTAMP,
        approval_notes = admin_notes_param,
        is_active = TRUE
    WHERE id = user_id_var;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create function to reject registration request
CREATE OR REPLACE FUNCTION reject_registration_request(
    request_id_param INT,
    approver_id_param INT,
    rejection_reason_param TEXT,
    admin_notes_param TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    user_id_var INT;
BEGIN
    -- Get request details
    SELECT user_id INTO user_id_var
    FROM registration_requests 
    WHERE id = request_id_param AND status = 'pending';
    
    IF user_id_var IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Update registration request
    UPDATE registration_requests 
    SET status = 'rejected',
        approved_by = approver_id_param,
        approved_at = CURRENT_TIMESTAMP,
        rejection_reason = rejection_reason_param,
        admin_notes = admin_notes_param
    WHERE id = request_id_param;
    
    -- Update user
    UPDATE users 
    SET approval_status = 'rejected',
        approved_by = approver_id_param,
        approved_at = CURRENT_TIMESTAMP,
        rejection_reason = rejection_reason_param,
        approval_notes = admin_notes_param,
        is_active = FALSE
    WHERE id = user_id_var;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create function to create registration request
CREATE OR REPLACE FUNCTION create_registration_request(
    user_id_param INT,
    requested_role_param VARCHAR(20),
    request_notes_param TEXT DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
    request_id_var INT;
BEGIN
    -- Create registration request
    INSERT INTO registration_requests (user_id, requested_role, request_notes)
    VALUES (user_id_param, requested_role_param, request_notes_param)
    RETURNING id INTO request_id_var;
    
    -- Update user approval status
    UPDATE users 
    SET approval_status = 'pending',
        requested_role = requested_role_param::user_role
    WHERE id = user_id_param;
    
    RETURN request_id_var;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT SELECT ON pending_registration_requests TO authenticated;
GRANT SELECT ON approved_registration_requests TO authenticated;
GRANT SELECT ON rejected_registration_requests TO authenticated;
GRANT EXECUTE ON FUNCTION approve_registration_request TO authenticated;
GRANT EXECUTE ON FUNCTION reject_registration_request TO authenticated;
GRANT EXECUTE ON FUNCTION create_registration_request TO authenticated;

-- Final message
SELECT 'Registration approval system migration completed successfully' as message;
