import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
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
  Clock,
  Download,
  Eye
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

const schema = yup.object({
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom de famille est requis'),
  phone: yup.string(),
  university: yup.string(),
  department: yup.string(),
  position: yup.string(),
  specialization: yup.string()
});

export const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    resolver: yupResolver(schema),
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
      action: "Téléchargé: Guide des Avantages 2025",
      date: "2025-01-15",
      type: "download"
    },
    {
      id: 2,
      action: "Consulté: Nouvelles du Syndicat",
      date: "2025-01-14",
      type: "view"
    },
    {
      id: 3,
      action: "Inscrit à: Atelier de Développement Professionnel",
      date: "2025-01-12",
      type: "registration"
    }
  ];

  const membershipInfo = {
    memberSince: "2020-09-15",
    membershipType: "Adhésion Complète",
    status: "Actif",
    renewalDate: "2025-09-15"
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès Refusé</h1>
          <p className="text-gray-600">Veuillez vous connecter pour voir votre profil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
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
                    {user.role === 'admin' ? 'Administrateur' :
                     user.role === 'editor' ? 'Éditeur' :
                     user.role === 'member' ? 'Membre' :
                     'Visiteur'}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {isEditing ? 'Annuler' : 'Modifier'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informations Personnelles
                </h2>

                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom
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
                          Nom de famille
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
                          Numéro de téléphone
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Université
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
                          Faculté/Département
                        </label>
                        <input
                          {...register('department')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Poste
                        </label>
                        <select
                          {...register('position')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Professeur de l'Enseignement Supérieur">Professeur de l'Enseignement Supérieur</option>
                          <option value="Professeur Habilité">Professeur Habilité</option>
                          <option value="Professeur Assistant">Professeur Assistant</option>
                          <option value="Professeur Visiteur">Professeur Visiteur</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Spécialisation
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
                        Sauvegarder les Modifications
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          reset();
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Nom complet</p>
                          <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <p className="font-medium text-gray-900">{user.phone || 'Non spécifié'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Université</p>
                          <p className="font-medium text-gray-900">Université Mohammed V - Rabat</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Poste</p>
                          <p className="font-medium text-gray-900">Professeur de l'Enseignement Supérieur</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Membre depuis</p>
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
                  Statut d'Adhésion
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type d'adhésion</span>
                    <span className="font-medium text-gray-900">{membershipInfo.membershipType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Statut</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {membershipInfo.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Date de renouvellement</span>
                    <span className="font-medium text-gray-900">
                      {new Date(membershipInfo.renewalDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Activité Récente
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
                  Actions Rapides
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-left">
                    Changer le mot de passe
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-left">
                    Télécharger la carte de membre
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-left">
                    Voir l'historique d'activité
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};