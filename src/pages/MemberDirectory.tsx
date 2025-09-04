import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  User,
  Award,
  Calendar,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  university: string;
  department: string;
  position: string;
  specialization: string;
  joinDate: string;
  isPublic: boolean;
  avatar?: string;
}

const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'Mohammed',
    lastName: 'Al-Hassani',
    email: 'mohammed.hassani@um5.ac.ma',
    phone: '+212 6 12 34 56 78',
    university: 'Université Mohammed V - Rabat',
    department: 'Faculté des Sciences',
    position: 'Professeur de l\'Enseignement Supérieur',
    specialization: 'Mathématiques Appliquées',
    joinDate: '2020-01-15',
    isPublic: true
  },
  {
    id: '2',
    firstName: 'Fatima',
    lastName: 'Zahra',
    email: 'fatima.zahra@uh2c.ma',
    phone: '+212 6 23 45 67 89',
    university: 'Université Hassan II - Casablanca',
    department: 'Faculté des Lettres et Sciences Humaines',
    position: 'Professeur Habilité',
    specialization: 'Littérature Arabe Contemporaine',
    joinDate: '2021-03-10',
    isPublic: true
  },
  {
    id: '3',
    firstName: 'Abderrahman',
    lastName: 'Tazi',
    email: 'abderrahman.tazi@usmba.ac.ma',
    university: 'Université Sidi Mohamed Ben Abdellah - Fès',
    department: 'Faculté de Médecine et de Pharmacie',
    position: 'Professeur de l\'Enseignement Supérieur',
    specialization: 'Cardiologie',
    joinDate: '2019-09-05',
    isPublic: false
  },
  {
    id: '4',
    firstName: 'Amina',
    lastName: 'Kettani',
    email: 'amina.kettani@uca.ma',
    phone: '+212 6 45 67 89 01',
    university: 'Université Cadi Ayyad - Marrakech',
    department: 'Faculté des Sciences Juridiques et Économiques',
    position: 'Professeur Assistant',
    specialization: 'Droit Constitutionnel',
    joinDate: '2022-02-20',
    isPublic: true
  },
  {
    id: '5',
    firstName: 'Youssef',
    lastName: 'Benali',
    email: 'youssef.benali@uit.ac.ma',
    university: 'Université Ibn Tofail - Kénitra',
    department: 'Faculté des Sciences',
    position: 'Professeur Habilité',
    specialization: 'Physique Nucléaire',
    joinDate: '2021-11-12',
    isPublic: true
  }
];

export const MemberDirectory = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const universities = [
    'all',
    'Université Mohammed V - Rabat',
    'Université Hassan II - Casablanca',
    'Université Sidi Mohamed Ben Abdellah - Fès',
    'Université Cadi Ayyad - Marrakech',
    'Université Ibn Tofail - Kénitra'
  ];

  const departments = [
    'all',
    'Faculté des Sciences',
    'Faculté des Lettres et Sciences Humaines',
    'Faculté de Médecine et de Pharmacie',
    'Faculté des Sciences Juridiques et Économiques',
    'Faculté d\'Ingénierie',
    'Faculté d\'Éducation'
  ];

  const filteredMembers = mockMembers.filter(member => {
    if (!member.isPublic && user?.role !== 'admin') return false;
    
    const matchesSearch = member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity = selectedUniversity === 'all' || member.university === selectedUniversity;
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    
    return matchesSearch && matchesUniversity && matchesDepartment;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Connexion Requise
          </h1>
          <p className="text-gray-600">
            Veuillez vous connecter pour accéder au répertoire des membres
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Répertoire des Membres
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connectez-vous avec vos collègues professeurs universitaires à travers le Maroc
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher des membres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {universities.map(university => (
                  <option key={university} value={university}>
                    {university === 'all' ? 'Toutes les universités' : university}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {departments.map(department => (
                  <option key={department} value={department}>
                    {department === 'all' ? 'Toutes les facultés' : department}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              {filteredMembers.length} membres
            </div>
          </div>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-blue-600 font-medium">{member.position}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{member.university}</p>
                    <p className="text-gray-600">{member.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <div className="text-sm">
                    <p className="text-gray-600">Spécialisation</p>
                    <p className="font-medium text-gray-900">{member.specialization}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div className="text-sm">
                    <p className="text-gray-600">Membre depuis</p>
                    <p className="font-medium text-gray-900">
                      {new Date(member.joinDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                {member.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-900">{member.phone}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  Envoyer un Message
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun membre trouvé
            </h3>
            <p className="text-gray-600">
              Essayez d'ajuster vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};