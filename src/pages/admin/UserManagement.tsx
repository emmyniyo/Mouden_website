import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AdminSidebar } from '../../components/Admin/AdminSidebar';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Shield,
  MoreVertical,
  UserCheck,
  UserX,
  Download,
  User,
  Menu,
  X
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  university: string;
  department: string;
  role: 'admin' | 'editor' | 'member' | 'visitor';
  isActive: boolean;
  lastLogin?: string;
  joinDate: string;
  memberId?: string;
}

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  department: string;
  position: string;
  role: 'admin' | 'editor' | 'member' | 'visitor';
  isActive: boolean;
  memberId: string;
}

const createSchema = (t: any) => yup.object({
  firstName: yup.string().required(t('admin.userManagement.form.validation.firstNameRequired')),
  lastName: yup.string().required(t('admin.userManagement.form.validation.lastNameRequired')),
  email: yup.string().email(t('admin.userManagement.form.validation.emailInvalid')).required(t('admin.userManagement.form.validation.emailRequired')),
  phone: yup.string(),
  university: yup.string().required(t('admin.userManagement.form.validation.universityRequired')),
  department: yup.string().required(t('admin.userManagement.form.validation.departmentRequired')),
  position: yup.string(),
  role: yup.string().required(t('admin.userManagement.form.validation.roleRequired')),
  isActive: yup.boolean(),
  memberId: yup.string()
});

const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Mohammed',
    lastName: 'Al-Hassani',
    email: 'admin@university-union.ma',
    phone: '+212 6 12 34 56 78',
    university: 'Université Mohammed V - Rabat',
    department: 'Faculté des Sciences',
    role: 'admin',
    isActive: true,
    lastLogin: '2025-01-15T10:30:00',
    joinDate: '2020-01-15',
    memberId: 'ADM001'
  },
  {
    id: '2',
    firstName: 'Fatima',
    lastName: 'Zahra',
    email: 'fatima@university-union.ma',
    phone: '+212 6 23 45 67 89',
    university: 'Université Hassan II - Casablanca',
    department: 'Faculté des Lettres et Sciences Humaines',
    role: 'editor',
    isActive: true,
    lastLogin: '2025-01-14T15:45:00',
    joinDate: '2021-03-10',
    memberId: 'EDT002'
  },
  {
    id: '3',
    firstName: 'Abderrahman',
    lastName: 'Tazi',
    email: 'abderrahman@university-union.ma',
    phone: '+212 6 34 56 78 90',
    university: 'Université Sidi Mohamed Ben Abdellah - Fès',
    department: 'Faculté de Médecine et de Pharmacie',
    role: 'member',
    isActive: true,
    lastLogin: '2025-01-13T09:20:00',
    joinDate: '2022-09-05',
    memberId: 'MEM003'
  },
  {
    id: '4',
    firstName: 'Amina',
    lastName: 'Kettani',
    email: 'amina@university-union.ma',
    university: 'Université Cadi Ayyad - Marrakech',
    department: 'Faculté des Sciences Juridiques et Économiques',
    role: 'member',
    isActive: false,
    joinDate: '2023-02-20',
    memberId: 'MEM004'
  }
];

export const UserManagement = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = ['all', 'admin', 'editor', 'member', 'visitor'];
  const statuses = ['all', 'active', 'inactive'];

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UserForm>({
    resolver: yupResolver(createSchema(t)) as any,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      university: '',
      department: '',
      position: '',
      role: 'member',
      isActive: true,
      memberId: ''
    }
  });

  const universities = [
    'Université Mohammed V - Rabat',
    'Université Hassan II - Casablanca',
    'Université Sidi Mohamed Ben Abdellah - Fès',
    'Université Cadi Ayyad - Marrakech',
    'Université Ibn Tofail - Kénitra',
    'Université Abdelmalek Essaâdi - Tétouan',
    'Université Ibn Zohr - Agadir'
  ];

  const departments = [
    'Faculté des Sciences',
    'Faculté des Lettres et Sciences Humaines',
    'Faculté de Médecine et de Pharmacie',
    'Faculté des Sciences Juridiques et Économiques',
    'Faculté d\'Ingénierie',
    'Faculté d\'Éducation',
    'Faculté des Sciences de l\'Information et de la Communication'
  ];

  const positions = [
    'Professeur de l\'Enseignement Supérieur',
    'Professeur Habilité',
    'Professeur Assistant',
    'Professeur Visiteur',
    'Maître de Conférences',
    'Maître Assistant',
    'Assistant'
  ];

  const onSubmit = async (data: UserForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditMode && selectedUser) {
        // Update existing user
        const updatedUser: User = {
          ...selectedUser,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || undefined,
          university: data.university,
          department: data.department,
          role: data.role,
          isActive: data.isActive,
          memberId: data.memberId || selectedUser.memberId
        };

        // In a real app, this would be an API call
        console.log('User updated:', updatedUser);
      } else {
        // Create new user
        const memberId = data.memberId || `MEM${String(mockUsers.length + 1).padStart(3, '0')}`;
        
        const newUser: User = {
          id: String(mockUsers.length + 1),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || undefined,
          university: data.university,
          department: data.department,
          role: data.role,
          isActive: data.isActive,
          joinDate: new Date().toISOString().split('T')[0],
          memberId: memberId
        };

        // In a real app, this would be an API call
        console.log('New user created:', newUser);
      }
      
      // Close modal and reset form
      setShowUserModal(false);
      setIsEditMode(false);
      setSelectedUser(null);
      reset();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = () => {
    reset();
    setIsEditMode(false);
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditMode(true);
    
    // Populate form with user data
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('email', user.email);
    setValue('phone', user.phone || '');
    setValue('university', user.university);
    setValue('department', user.department);
    setValue('position', ''); // Position not in User interface, using empty string
    setValue('role', user.role);
    setValue('isActive', user.isActive);
    setValue('memberId', user.memberId || '');
    
    setShowUserModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      console.log('User deleted:', userToDelete);
      
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && user.isActive) ||
                         (selectedStatus === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      editor: 'bg-yellow-100 text-yellow-800',
      member: 'bg-green-100 text-green-800',
      visitor: 'bg-gray-100 text-gray-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: 'Administrateur',
      editor: 'Éditeur',
      member: 'Membre',
      visitor: 'Visiteur'
    };
    return labels[role as keyof typeof labels] || role;
  };

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
            {t('admin.sidebar.userManagement')}
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Page Content */}
        <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-600 mt-1">
              Gérer les membres du syndicat et les utilisateurs
            </p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </button>
            <button 
                  onClick={handleAddUser}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
                  {t('admin.userManagement.addUser')}
            </button>
          </div>
        </motion.div>

            {/* Statistics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 mb-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Utilisateurs
                    </p>
                    <p className="text-3xl font-bold text-gray-900">{mockUsers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Membres Actifs
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {mockUsers.filter(u => u.isActive && u.role === 'member').length}
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Administrateurs
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {mockUsers.filter(u => u.role === 'admin').length}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Utilisateurs Inactifs
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {mockUsers.filter(u => !u.isActive).length}
                    </p>
                  </div>
                  <UserX className="h-8 w-8 text-orange-600" />
                </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher des utilisateurs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'Tous les rôles' : getRoleLabel(role)}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'Tous les statuts' :
                     status === 'active' ? 'Actif' :
                     'Inactif'}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              {filteredUsers.length} utilisateurs
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Université
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Dernière connexion
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.memberId && (
                            <div className="text-xs text-blue-600">ID: {user.memberId}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{user.university}</div>
                      <div className="text-sm text-gray-500">{user.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'Jamais connecté'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-700 p-1 rounded"
                          title={t('common.edit')}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-700 p-1 rounded"
                          title={t('common.delete')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 p-1 rounded">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

          </div>
        </div>

        {/* Add User Modal */}
        {showUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditMode ? t('admin.userManagement.edit.title') : t('admin.userManagement.form.title')}
                </h2>
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    setIsEditMode(false);
                    setSelectedUser(null);
                    reset();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('admin.userManagement.form.personalInfo')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.firstName')} *
                      </label>
                      <input
                        {...register('firstName')}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('admin.userManagement.form.placeholders.firstName')}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.lastName')} *
                      </label>
                      <input
                        {...register('lastName')}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('admin.userManagement.form.placeholders.lastName')}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.email')} *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('admin.userManagement.form.placeholders.email')}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.phone')}
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('admin.userManagement.form.placeholders.phone')}
                      />
                    </div>
            </div>
          </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('admin.userManagement.form.professionalInfo')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.university')} *
                      </label>
                      <select
                        {...register('university')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t('admin.userManagement.form.placeholders.selectUniversity')}</option>
                        {universities.map((university) => (
                          <option key={university} value={university}>
                            {university}
                          </option>
                        ))}
                      </select>
                      {errors.university && (
                        <p className="text-red-500 text-sm mt-1">{errors.university.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.department')} *
                      </label>
                      <select
                        {...register('department')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t('admin.userManagement.form.placeholders.selectDepartment')}</option>
                        {departments.map((department) => (
                          <option key={department} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.position')}
                      </label>
                      <select
                        {...register('position')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t('admin.userManagement.form.placeholders.selectPosition')}</option>
                        {positions.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </div>

              <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.role')} *
                      </label>
                      <select
                        {...register('role')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="member">{t('admin.userManagement.form.roles.member')}</option>
                        <option value="editor">{t('admin.userManagement.form.roles.editor')}</option>
                        <option value="admin">{t('admin.userManagement.form.roles.admin')}</option>
                        <option value="visitor">{t('admin.userManagement.form.roles.visitor')}</option>
                      </select>
                      {errors.role && (
                        <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                      )}
              </div>
            </div>
          </div>

                {/* Account Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('admin.userManagement.form.accountSettings')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        {...register('isActive')}
                        type="checkbox"
                        id="isActive"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                        {t('admin.userManagement.form.activeAccount')}
                      </label>
                    </div>

              <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.userManagement.form.memberId')}
                      </label>
                      <input
                        {...register('memberId')}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('admin.userManagement.form.placeholders.memberId')}
                      />
              </div>
            </div>
          </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserModal(false);
                      setIsEditMode(false);
                      setSelectedUser(null);
                      reset();
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    {t('admin.userManagement.form.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {isEditMode ? t('admin.userManagement.form.updating') : t('admin.userManagement.form.creating')}
                      </>
                    ) : (
                      <>
                        {isEditMode ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {isEditMode ? t('admin.userManagement.form.update') : t('admin.userManagement.form.create')}
                      </>
                    )}
                  </button>
              </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && userToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t('admin.userManagement.edit.confirmDelete')}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {t('admin.userManagement.edit.deleteWarning')}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900">
                    {userToDelete.firstName} {userToDelete.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{userToDelete.email}</p>
                  <p className="text-sm text-gray-500">{userToDelete.university}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  {t('admin.userManagement.edit.cancel')}
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t('admin.userManagement.edit.deleting')}
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      {t('admin.userManagement.edit.delete')}
                    </>
                  )}
                </button>
            </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};