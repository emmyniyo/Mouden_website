import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ isCollapsed, onToggle }: AdminSidebarProps) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      title: t('admin.sidebar.dashboard'),
      icon: LayoutDashboard,
      path: '/admin',
      badge: null,
      roles: ['admin', 'editor']
    },
    // {
    //   title: t('admin.sidebar.analytics'),
    //   icon: BarChart3,
    //   path: '/admin/analytics',
    //   badge: null
    // },
    {
      title: t('admin.sidebar.approvals'),
      icon: UserCheck,
      path: '/admin/registration-approval',
      badge: 23,
      roles: ['admin']
    },
    {
      title: t('admin.sidebar.userManagement'),
      icon: Users,
      path: '/admin/users',
      badge: null,
      roles: ['admin']
    },
    {
      title: t('admin.sidebar.documents'),
      icon: FileText,
      path: '/admin/documents',
      badge: null,
      roles: ['admin', 'editor']
    },
    {
      title: t('admin.sidebar.news'),
      icon: Newspaper,
      path: '/admin/news',
      badge: null,
      roles: ['admin', 'editor']
    },
    // {
    //   title: t('admin.sidebar.notifications'),
    //   icon: Bell,
    //   path: '/admin/notifications',
    //   badge: 5
    // },
    // {
    //   title: t('admin.sidebar.security'),
    //   icon: Shield,
    //   path: '/admin/security',
    //   badge: null
    // },
    // {
    //   title: t('admin.sidebar.settings'),
    //   icon: Settings,
    //   path: '/admin/settings',
    //   badge: null
    // },
    // {
    //   title: t('admin.sidebar.help'),
    //   icon: HelpCircle,
    //   path: '/admin/help',
    //   badge: null
    // },
    {
      title: t('admin.sidebar.profile'),
      icon: User,
      path: '/admin/profile',
      badge: null,
      roles: ['admin', 'editor']
    }
  ].filter(item => {
    // Filter items based on user role
    if (!user || !item.roles) return false;
    return item.roles.includes(user.role);
  });

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white border-r border-gray-200 h-full flex flex-col shadow-lg"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {t('admin.sidebar.title')}
                </h2>
                <p className="text-xs text-gray-500">
                  {t('admin.sidebar.subtitle')}
                </p>
              </div>
            </motion.div>
          )}
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`group flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  active 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                } transition-colors duration-200`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 flex-1 flex items-center justify-between"
                    >
                      <span className="font-medium text-sm">
                        {item.title}
                      </span>
                      
                      {item.badge && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          {/* User Info */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  { user?.firstName } { user?.lastName }
                </p>
                <p className="text-xs text-gray-500 truncate">
                  { user?.role === 'admin' ? t('admin.sidebar.adminRole') : t('admin.sidebar.editorRole')}
                </p>
              </div>
            </motion.div>
          )}

          {/* Logout Button */}
          <button 
           onClick={() => {
            logout();
            window.location.href = '/';
          }}
           className="w-full flex items-center px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200 group">
            <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-600 transition-colors duration-200">
              <LogOut className="h-5 w-5" />
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 font-medium text-sm"
                >
                  {t('admin.sidebar.logout')}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
