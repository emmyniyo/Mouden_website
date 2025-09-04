import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Globe,
  Lock,
  Calendar,
  User,
  BarChart3
} from 'lucide-react';

interface Document {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  category: string;
  isPublic: boolean;
  uploadDate: string;
  uploadedBy: string;
  downloadCount: number;
  viewCount: number;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Accord de Négociation Collective 2025',
    fileName: 'accord_negociation_collective_2025.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    category: 'accords',
    isPublic: false,
    uploadDate: '2025-01-15',
    uploadedBy: 'Mohammed Al-Hassani',
    downloadCount: 156,
    viewCount: 234
  },
  {
    id: '2',
    title: 'Guide des Avantages des Membres',
    fileName: 'guide_avantages_membres.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    category: 'avantages',
    isPublic: true,
    uploadDate: '2025-01-12',
    uploadedBy: 'Fatima Zahra',
    downloadCount: 89,
    viewCount: 145
  },
  {
    id: '3',
    title: 'Barème des Salaires Mis à Jour 2025',
    fileName: 'bareme_salaires_2025.xlsx',
    fileSize: '245 KB',
    fileType: 'xlsx',
    category: 'salaires',
    isPublic: false,
    uploadDate: '2025-01-10',
    uploadedBy: 'Abderrahman Tazi',
    downloadCount: 78,
    viewCount: 112
  }
];

export const DocumentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const categories = ['all', 'accords', 'avantages', 'salaires', 'normes', 'formulaires', 'gouvernance'];
  const fileTypes = ['all', 'pdf', 'docx', 'xlsx', 'txt'];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.fileType === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8 text-red-600" />;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      accords: 'Accords',
      avantages: 'Avantages',
      salaires: 'Salaires',
      normes: 'Normes',
      formulaires: 'Formulaires',
      gouvernance: 'Gouvernance'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des Documents
            </h1>
            <p className="text-gray-600 mt-1">
              Gérer et organiser les documents du syndicat
            </p>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 mt-4 sm:mt-0"
          >
            <Upload className="h-4 w-4" />
            Télécharger Document
          </button>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Documents
                </p>
                <p className="text-3xl font-bold text-gray-900">{mockDocuments.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Documents Publics
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {mockDocuments.filter(d => d.isPublic).length}
                </p>
              </div>
              <Globe className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Documents Membres
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {mockDocuments.filter(d => !d.isPublic).length}
                </p>
              </div>
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Téléchargements
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {mockDocuments.reduce((sum, doc) => sum + doc.downloadCount, 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
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
                placeholder="Rechercher des documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Toutes les catégories' : getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {fileTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Tous les types' : type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              {filteredDocuments.length} documents
            </div>
          </div>
        </motion.div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {doc.title}
                    </h3>
                    {doc.isPublic ? (
                      <Globe className="h-4 w-4 text-green-600" title="Public" />
                    ) : (
                      <Lock className="h-4 w-4 text-orange-600" title="Membres uniquement" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{doc.fileSize}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {getCategoryLabel(doc.category)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {doc.uploadedBy}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{doc.downloadCount} téléchargements</span>
                    <span>{doc.viewCount} vues</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Télécharger un Nouveau Document
                </h3>
              </div>
              
              <div className="p-6">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre du Document
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Entrez le titre du document"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {categories.filter(c => c !== 'all').map(category => (
                          <option key={category} value={category}>
                            {getCategoryLabel(category)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Niveau d'Accès
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="public">Public</option>
                        <option value="members">Membres uniquement</option>
                        <option value="admin">Administrateurs uniquement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Description du document..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fichier
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Glissez le fichier ici ou cliquez pour sélectionner
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOCX, XLSX, TXT (max 10MB)
                      </p>
                      <input type="file" className="hidden" accept=".pdf,.docx,.xlsx,.txt" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Télécharger
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};