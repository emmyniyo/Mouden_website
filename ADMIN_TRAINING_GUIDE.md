# 👨‍🏫 Admin Training Guide - National Union of Higher Education Platform

## 📚 Table of Contents
1. [Getting Started](#getting-started)
2. [User Management](#user-management)
3. [Document Management](#document-management)
4. [News & Content Management](#news--content-management)
5. [Event Management](#event-management)
6. [Contact & Communication](#contact--communication)
7. [System Settings](#system-settings)
8. [Security Best Practices](#security-best-practices)
9. [Troubleshooting](#troubleshooting)

## 🚀 Getting Started

### First Login
1. Navigate to `https://university-union.ma/login`
2. Use your admin credentials:
   - **Email**: admin@university-union.ma
   - **Password**: [Provided separately]
3. You'll be redirected to the admin dashboard

### Dashboard Overview
The admin dashboard provides:
- **Statistics Overview**: User counts, document statistics, recent activity
- **Quick Actions**: Direct links to common tasks
- **Recent Activity**: Latest platform activities
- **System Status**: Platform health indicators

### Language Support
- Switch between Arabic (العربية), French (Français), and English
- All admin interfaces support RTL layout for Arabic
- Content can be managed in all three languages simultaneously

## 👥 User Management

### Accessing User Management
1. From the dashboard, click "إدارة المستخدمين" (User Management)
2. Or navigate to `/admin/users`

### User Roles Explained
- **Admin (مدير)**: Full system access, can manage all users and content
- **Editor (محرر)**: Can manage content (news, documents) but not users
- **Member (عضو)**: Access to member-only content and features
- **Visitor (زائر)**: Public content access only

### Adding New Users
1. Click "إضافة مستخدم" (Add User)
2. Fill in required information:
   - **Name**: First and last name in Arabic
   - **Email**: Must be unique and valid
   - **University**: Select from Moroccan universities
   - **Department**: Faculty or department
   - **Role**: Choose appropriate role
3. Click "حفظ" (Save)

### Managing Existing Users
- **Search**: Use the search bar to find specific users
- **Filter**: Filter by role, university, or status
- **Edit**: Click the edit icon to modify user information
- **Deactivate**: Disable user access without deleting the account
- **Delete**: Permanently remove user (use with caution)

### Bulk Operations
- **Export**: Download user list as CSV/Excel
- **Import**: Upload user data from spreadsheet
- **Bulk Email**: Send announcements to multiple users

## 📄 Document Management

### Accessing Document Management
1. From the dashboard, click "إدارة الوثائق" (Document Management)
2. Or navigate to `/admin/documents`

### Document Categories
- **الاتفاقيات والعقود** (Agreements & Contracts)
- **المزايا والحقوق** (Benefits & Rights)
- **المعايير المهنية** (Professional Standards)
- **الرواتب والأجور** (Salaries & Compensation)
- **الحوكمة والإدارة** (Governance & Administration)
- **النماذج والطلبات** (Forms & Applications)

### Uploading Documents
1. Click "رفع وثيقة جديدة" (Upload New Document)
2. Fill in multilingual titles:
   - **Arabic Title**: العنوان بالعربية
   - **French Title**: Titre en français
   - **English Title**: Title in English
3. Select appropriate category
4. Choose access level:
   - **Public**: Accessible to all visitors
   - **Members Only**: Requires login
   - **Admin Only**: Restricted to administrators
5. Upload file (supported formats: PDF, DOCX, XLSX, TXT)
6. Add descriptions in all languages
7. Click "رفع الوثيقة" (Upload Document)

### Document Security
- **File Validation**: System automatically checks file types and sizes
- **Virus Scanning**: Files are scanned for malware (if configured)
- **Access Control**: Documents respect user permissions
- **Audit Trail**: All downloads and views are logged

### Managing Documents
- **Edit**: Update document information and translations
- **Move**: Change category or access level
- **Archive**: Hide document without deleting
- **Delete**: Permanently remove (requires confirmation)
- **Statistics**: View download and view counts

## 📰 News & Content Management

### Accessing News Management
1. From the dashboard, click "إدارة الأخبار" (News Management)
2. Or navigate to `/admin/news`

### Creating News Articles
1. Click "مقال جديد" (New Article)
2. Fill in multilingual content:
   - **Titles**: Arabic, French, and English titles
   - **Content**: Full article content in all languages
   - **Excerpts**: Short summaries for previews
3. Select category:
   - **أخبار النقابة** (Union News)
   - **الإعلانات الرسمية** (Official Announcements)
   - **الفعاليات والأنشطة** (Events & Activities)
   - **التطوير المهني** (Professional Development)
   - **الأخبار الأكاديمية** (Academic News)
4. Set publication options:
   - **Publish Date**: Schedule for future publication
   - **Featured**: Mark as featured article
   - **Breaking News**: Mark as urgent/breaking news
5. Add featured image (optional)
6. Click "إنشاء المقال" (Create Article) or "حفظ كمسودة" (Save as Draft)

### Content Guidelines
- **Arabic Content**: Use formal Modern Standard Arabic
- **French Content**: Use professional academic French
- **English Content**: Use clear, professional English
- **Images**: Use high-quality, relevant images from Pexels or upload custom images
- **SEO**: Include relevant keywords and meta descriptions

### Publishing Workflow
1. **Draft**: Article is saved but not visible to public
2. **Review**: Editor or admin reviews content
3. **Published**: Article goes live on the website
4. **Featured**: Article appears in featured sections
5. **Archived**: Article is hidden but preserved

## 📅 Event Management

### Creating Events
1. Navigate to Events section in admin panel
2. Click "إضافة فعالية" (Add Event)
3. Fill in event details:
   - **Multilingual Titles**: Arabic, French, English
   - **Date & Time**: Start and end times
   - **Location**: Physical or virtual location
   - **Type**: Meeting, workshop, conference, etc.
   - **Registration**: Enable if registration required
   - **Capacity**: Maximum number of participants
4. Set registration options:
   - **Registration Deadline**: Last date to register
   - **Approval Required**: Manual approval for registrations
   - **Fee**: Registration cost (if applicable)
5. Add event description and contact information
6. Upload featured image
7. Click "إنشاء الفعالية" (Create Event)

### Managing Registrations
- **View Registrations**: See all registered participants
- **Approve/Reject**: Manage registration requests
- **Send Updates**: Email participants about changes
- **Export List**: Download participant list
- **Check-in**: Mark attendance during event

### Event Categories
- **اجتماعات** (Meetings): Regular union meetings
- **ورش عمل** (Workshops): Training and skill development
- **مؤتمرات** (Conferences): Academic conferences
- **أنشطة اجتماعية** (Social Activities): Community events

## 💬 Contact & Communication

### Managing Contact Messages
1. Navigate to Contact Management
2. View incoming messages with priority levels:
   - **عاجل** (Urgent): Requires immediate attention
   - **عالي** (High): Important but not urgent
   - **متوسط** (Medium): Standard priority
   - **منخفض** (Low): Can be handled later

### Message Categories
- **عام** (General): General inquiries
- **العضوية** (Membership): Membership-related questions
- **تقني** (Technical): Technical support requests
- **شكوى** (Complaint): Formal complaints
- **اقتراح** (Suggestion): Suggestions for improvement
- **قانوني** (Legal): Legal matters

### Responding to Messages
1. Click on a message to view details
2. Assign to team member if needed
3. Change priority or category if necessary
4. Write response in appropriate language
5. Click "إرسال الرد" (Send Response)
6. Mark as resolved when complete

### Automated Responses
- Set up auto-replies for common questions
- Create templates for frequent responses
- Configure escalation rules for urgent matters

## ⚙️ System Settings

### General Settings
- **Site Information**: Update site name, description, contact details
- **Language Settings**: Default language, available languages
- **Email Configuration**: SMTP settings for outgoing emails
- **File Upload**: Maximum file sizes, allowed file types
- **Security Settings**: Password requirements, session timeouts

### Customization Options
- **Logo Upload**: Replace default logo with union logo
- **Color Scheme**: Customize primary and secondary colors
- **Footer Content**: Update footer links and information
- **Social Media**: Add social media links

### Backup Settings
- **Automatic Backups**: Schedule regular backups
- **Backup Location**: Local or cloud storage
- **Retention Policy**: How long to keep backups
- **Notification**: Email alerts for backup status

## 🔒 Security Best Practices

### Password Security
- Use strong passwords (minimum 12 characters)
- Include uppercase, lowercase, numbers, and symbols
- Change passwords regularly (every 90 days)
- Never share admin credentials

### User Access Control
- Assign minimum necessary permissions
- Regularly review user roles and access
- Deactivate accounts for inactive users
- Monitor login attempts and suspicious activity

### File Security
- Only upload trusted files
- Scan files for viruses before uploading
- Regularly review uploaded content
- Set appropriate access permissions

### Data Protection
- Regular database backups
- Secure file storage
- Monitor data access logs
- Comply with data protection regulations

## 🛠️ Troubleshooting

### Common Issues

#### Users Can't Login
1. Check if account is active
2. Verify email address is correct
3. Check for account lockout due to failed attempts
4. Reset password if necessary

#### Documents Won't Upload
1. Check file size (must be under 10MB)
2. Verify file type is allowed
3. Check upload directory permissions
4. Ensure sufficient disk space

#### Email Not Sending
1. Verify SMTP settings in system configuration
2. Check email server status
3. Test with different email provider
4. Review email logs for errors

#### Site Performance Issues
1. Check server resources (CPU, memory, disk)
2. Review database performance
3. Clear application cache
4. Restart application if necessary

### Getting Help
- **Technical Support**: tech-support@university-union.ma
- **User Manual**: Available in document center
- **Video Tutorials**: Access training videos
- **Community Forum**: Connect with other admins

## 📊 Analytics & Reporting

### Available Reports
- **User Activity**: Login patterns, active users
- **Document Usage**: Most downloaded documents, access patterns
- **Content Performance**: Popular news articles, engagement metrics
- **System Health**: Performance metrics, error rates

### Generating Reports
1. Navigate to Reports section
2. Select report type and date range
3. Choose output format (PDF, Excel, CSV)
4. Click "إنشاء التقرير" (Generate Report)
5. Download or email report

### Key Metrics to Monitor
- **Daily Active Users**: Number of users logging in daily
- **Document Downloads**: Popular documents and trends
- **News Engagement**: Article views and reading time
- **Event Participation**: Registration and attendance rates
- **Contact Volume**: Support request trends

## 🎯 Best Practices

### Content Management
- **Consistency**: Maintain consistent tone and style across languages
- **Accuracy**: Ensure translations are accurate and culturally appropriate
- **Timeliness**: Keep content current and relevant
- **Accessibility**: Use clear language and proper formatting

### User Communication
- **Responsiveness**: Reply to messages within 24 hours
- **Professionalism**: Maintain professional tone in all communications
- **Multilingual**: Respond in the user's preferred language
- **Documentation**: Keep records of important communications

### System Maintenance
- **Regular Updates**: Keep system and dependencies updated
- **Monitoring**: Regularly check system health and performance
- **Backups**: Verify backup integrity regularly
- **Security**: Stay informed about security best practices

---

**Training Completed By**: ________________  
**Date**: ________________  
**Trainer**: ________________  
**Next Review Date**: ________________

For additional training or support, contact: training@university-union.ma