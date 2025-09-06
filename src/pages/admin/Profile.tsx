import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { AdminSidebar } from '../../components/Admin/AdminSidebar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Award,
  Download,
  Eye,
  Menu
} from 'lucide-react';

interface ProfileForm {
  firstName: string;
  lastName: string;
  phone: string;
  university: string;
  department: string;
  position: string;
  specialization: string;
}

const createSchema = (t: any) => yup.object({
  firstName: yup.string().required(t('profile.personalInfo.validation.firstNameRequired')),
  lastName: yup.string().required(t('profile.personalInfo.validation.lastNameRequired')),
  phone: yup.string(),
  university: yup.string(),
  department: yup.string(),
  position: yup.string(),
  specialization: yup.string()
});

export const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    resolver: yupResolver(createSchema(t)) as any,
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      university: 'Université Mohammed V - Rabat',
      department: 'Faculté des Sciences',
      position: 'Professeur de l\'Enseignement Supérieur',
      specialization: 'Mathématiques'
    }
  });

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Profil mis à jour:', data);
    setIsLoading(false);
    setIsEditing(false);
  };

  const recentActivity = [
    {
      id: 1,
      action: `${t('profile.activity.actions.downloaded')} ${t('profile.activity.items.benefitsGuide')}`,
      date: "2025-01-15",
      type: "download"
    },
    {
      id: 2,
      action: `${t('profile.activity.actions.viewed')} ${t('profile.activity.items.unionNews')}`,
      date: "2025-01-14",
      type: "view"
    },
    {
      id: 3,
      action: `${t('profile.activity.actions.registered')} ${t('profile.activity.items.workshop')}`,
      date: "2025-01-12",
      type: "registration"
    }
  ];

  const membershipInfo = {
    memberSince: "2020-09-15",
    membershipType: t('profile.membership.types.full'),
    status: t('profile.membership.statuses.active'),
    renewalDate: "2025-09-15"
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('profile.accessDenied.title')}</h1>
          <p className="text-gray-600">{t('profile.accessDenied.message')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex h-full">
            <AdminSidebar 
              isCollapsed={false} 
              onToggle={() => setMobileMenuOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {t('admin.sidebar.profile')}
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Page Content */}
        <div className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <button className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-blue-100 mb-2">{user.email}</p>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Shield className="h-4 w-4" />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'editor' ? 'bg-yellow-100 text-yellow-800' :
                    user.role === 'member' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role === 'admin' ? t('profile.header.roles.admin') :
                     user.role === 'editor' ? t('profile.header.roles.editor') :
                     user.role === 'member' ? t('profile.header.roles.member') :
                     t('profile.header.roles.visitor')}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {isEditing ? t('profile.header.cancel') : t('profile.header.edit')}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('profile.personalInfo.title')}
                </h2>

                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personalInfo.fields.firstName')}
                        </label>
                        <input
                          {...register('firstName')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personalInfo.fields.lastName')}
                        </label>
                        <input
                          {...register('lastName')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personalInfo.fields.phone')}
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personalInfo.fields.university')}
                        </label>
                        <select
                          {...register('university')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Université Mohammed V - Rabat">Université Mohammed V - Rabat</option>
                          <option value="Université Hassan II - Casablanca">Université Hassan II - Casablanca</option>
                          <option value="Université Sidi Mohamed Ben Abdellah - Fès">Université Sidi Mohamed Ben Abdellah - Fès</option>
                          <option value="Université Cadi Ayyad - Marrakech">Université Cadi Ayyad - Marrakech</option>
                          <option value="Université Ibn Tofail - Kénitra">Université Ibn Tofail - Kénitra</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personalInfo.fields.department')}
                        </label>
                        <input
                          {...register('department')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personalInfo.fields.position')}
                        </label>
                        <select
                          {...register('position')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Professeur de l'Enseignement Supérieur">{t('profile.personalInfo.positions.professor')}</option>
                          <option value="Professeur Habilité">{t('profile.personalInfo.positions.habilitated')}</option>
                          <option value="Professeur Assistant">{t('profile.personalInfo.positions.assistant')}</option>
                          <option value="Professeur Visiteur">{t('profile.personalInfo.positions.visitor')}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.personalInfo.fields.specialization')}
                      </label>
                      <input
                        {...register('specialization')}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        {t('profile.personalInfo.actions.save')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          reset();
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        {t('profile.personalInfo.actions.cancel')}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.personalInfo.labels.fullName')}</p>
                          <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.personalInfo.labels.email')}</p>
                          <p className="font-medium text-gray-900">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.personalInfo.labels.phone')}</p>
                          <p className="font-medium text-gray-900">{user.phone || t('profile.personalInfo.placeholders.notSpecified')}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.personalInfo.labels.university')}</p>
                          <p className="font-medium text-gray-900">Université Mohammed V - Rabat</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.personalInfo.labels.position')}</p>
                          <p className="font-medium text-gray-900">Professeur de l'Enseignement Supérieur</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.personalInfo.labels.memberSince')}</p>
                          <p className="font-medium text-gray-900">
                            {new Date(membershipInfo.memberSince).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Membership Status */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('profile.membership.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('profile.membership.type')}</span>
                    <span className="font-medium text-gray-900">{membershipInfo.membershipType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('profile.membership.status')}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {membershipInfo.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('profile.membership.renewalDate')}</span>
                    <span className="font-medium text-gray-900">
                      {new Date(membershipInfo.renewalDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('profile.activity.title')}
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg">
                        {activity.type === 'download' ? (
                          <Download className="h-4 w-4 text-blue-600" />
                        ) : activity.type === 'view' ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <Calendar className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('profile.quickActions.title')}
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-left">
                    {t('profile.quickActions.changePassword')}
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-left">
                    {t('profile.quickActions.downloadCard')}
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-left">
                    {t('profile.quickActions.viewHistory')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};