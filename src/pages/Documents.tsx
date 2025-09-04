import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Upload,
  Calendar,
  Lock,
  Globe,
  ArrowUpDown
} from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'txt';
  size: string;
  uploadDate: string;
  category: string;
  isPublic: boolean;
  description: string;
  downloadCount: number;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Accord de Négociation Collective 2025',
    type: 'pdf',
    size: '2.4 MB',
    uploadDate: '2025-01-15',
    category: 'Accords',
    isPublic: false,
    description: 'Accord complet de négociation collective pour 2025',
    downloadCount: 156
  },
  {
    id: '2',
    title: 'Guide des Avantages des Membres',
    type: 'pdf',
    size: '1.8 MB',
    uploadDate: '2025-01-12',
    category: 'Avantages',
    isPublic: true,
    description: 'Guide complet des avantages et services des membres',
    downloadCount: 89
  },
  {
    id: '3',
    title: 'Manuel des Normes Professionnelles',
    type: 'pdf',
    size: '3.2 MB',
    uploadDate: '2025-01-10',
    category: 'Normes',
    isPublic: true,
    description: 'Normes et directives professionnelles pour les éducateurs',
    downloadCount: 234
  },
  {
    id: '4',
    title: 'Barème des Salaires 2025',
    type: 'xlsx',
    size: '245 KB',
    uploadDate: '2025-01-08',
    category: 'Salaires',
    isPublic: false,
    description: 'Barème des salaires mis à jour pour l\'année académique 2025',
    downloadCount: 78
  },
  {
    id: '5',
    title: 'Constitution du Syndicat',
    type: 'pdf',
    size: '1.2 MB',
    uploadDate: '2024-12-20',
    category: 'Gouvernance',
    isPublic: true,
    description: 'Constitution officielle du syndicat et règlements',
    downloadCount: 45
  },
  {
    id: '6',
    title: 'Formulaire de Procédure de Grief',
    type: 'docx',
    size: '156 KB',
    uploadDate: '2024-12-15',
    category: 'Formulaires',
    isPublic: false,
    description: 'Formulaire pour déposer des griefs et des plaintes',
    downloadCount: 12
  }
];

export const Documents = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showPublicOnly, setShowPublicOnly] = useState(false);

  const categories = ['all', 'Accords', 'Avantages', 'Normes', 'Salaires', 'Gouvernance', 'Formulaires'];

  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = mockDocuments.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      const matchesVisibility = showPublicOnly ? doc.isPublic : (user ? true : doc.isPublic);
      
      return matchesSearch && matchesCategory && matchesVisibility;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
          break;
        case 'size':
          const aSize = parseFloat(a.size);
          const bSize = parseFloat(b.size);
          comparison = aSize - bSize;
          break;
        case 'downloads':
          comparison = a.downloadCount - b.downloadCount;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder, showPublicOnly, user]);

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8 text-red-600" />;
  };

  const handleDownload = (doc: Document) => {
    console.log(`Téléchargement ${doc.title}`);
  };

  const handleView = (doc: Document) => {
    console.log(`Visualisation ${doc.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Centre de Documents</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accédez aux documents importants du syndicat, aux accords et aux ressources
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher des documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Toutes les Catégories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="date-desc">Plus Récent</option>
                <option value="date-asc">Plus Ancien</option>
                <option value="title-asc">A à Z</option>
                <option value="title-desc">Z à A</option>
                <option value="downloads-desc">Plus Téléchargé</option>
              </select>
            </div>

            {/* Upload Button */}
            {user && (user.role === 'admin' || user.role === 'editor') && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Upload className="h-5 w-5" />
                Télécharger Document
              </button>
            )}
          </div>

          {/* Visibility Toggle */}
          {user && (
            <div className="mt-4 flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPublicOnly}
                  onChange={(e) => setShowPublicOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Afficher uniquement les documents publics</span>
              </label>
            </div>
          )}
        </motion.div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">{doc.title}</h3>
                    {doc.isPublic ? (
                      <Globe className="h-4 w-4 text-green-600" title="Document public" />
                    ) : (
                      <Lock className="h-4 w-4 text-yellow-600" title="Membres uniquement" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                    </div>
                    <span>{doc.size}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {doc.downloadCount} téléchargements
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(doc)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Télécharger"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAndSortedDocuments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
            <p className="text-gray-600">Essayez d'ajuster vos critères de recherche ou filtres.</p>
          </motion.div>
        )}

        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8"
          >
            <div className="text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Accéder à Plus de Documents</h3>
              <p className="text-blue-700 mb-4">
                Connectez-vous en tant que membre du syndicat pour accéder aux documents exclusifs et aux ressources.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Se Connecter
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};