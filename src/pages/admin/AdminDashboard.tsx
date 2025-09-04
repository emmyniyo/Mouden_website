import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  FileText,
  Newspaper,
  Calendar,
  TrendingUp,
  Activity,
  Settings,
  Bell,
  BarChart3,
  ArrowRight,
  Plus,
  Edit
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const statsData = [
  { name: 'Jan', users: 400, documents: 240, news: 12 },
  { name: 'Fév', users: 300, documents: 139, news: 18 },
  { name: 'Mar', users: 200, documents: 980, news: 15 },
  { name: 'Avr', users: 278, documents: 390, news: 20 },
  { name: 'Mai', users: 189, documents: 480, news: 25 },
  { name: 'Jun', users: 239, documents: 380, news: 22 }
];

const pieData = [
  { name: 'Admin', value: 5, color: '#EF4444' },
  { name: 'Éditeur', value: 15, color: '#F59E0B' },
  { name: 'Membre', value: 340, color: '#10B981' },
  { name: 'Visiteur', value: 140, color: '#6B7280' }
];

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Utilisateurs',
      value: '1,248',
      change: '+12%',
      icon: <Users className="h-8 w-8 text-blue-600" />,
      color: 'blue'
    },
    {
      title: 'Total Documents',
      value: '456',
      change: '+8%',
      icon: <FileText className="h-8 w-8 text-green-600" />,
      color: 'green'
    },
    {
      title: 'Total Actualités',
      value: '89',
      change: '+15%',
      icon: <Newspaper className="h-8 w-8 text-purple-600" />,
      color: 'purple'
    },
    {
      title: 'Sessions Actives',
      value: '234',
      change: '+5%',
      icon: <Activity className="h-8 w-8 text-orange-600" />,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Nouvelle inscription utilisateur',
      user: 'John Smith',
      timestamp: 'Il y a 2 heures',
      type: 'user'
    },
    {
      id: 2,
      action: 'Document téléchargé',
      user: 'Sarah Wilson',
      timestamp: 'Il y a 4 heures',
      type: 'document'
    },
    {
      id: 3,
      action: 'Article d\'actualité publié',
      user: 'Mike Johnson',
      timestamp: 'Il y a 6 heures',
      type: 'news'
    },
    {
      id: 4,
      action: 'Données membre mises à jour',
      user: 'Lisa Chen',
      timestamp: 'Il y a 8 heures',
      type: 'user'
    },
    {
      id: 5,
      action: 'Événement créé',
      user: 'David Rodriguez',
      timestamp: 'Il y a 1 jour',
      type: 'event'
    }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-50 border-gray-200';
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      user: <Users className="h-4 w-4 text-blue-600" />,
      document: <FileText className="h-4 w-4 text-green-600" />,
      news: <Newspaper className="h-4 w-4 text-purple-600" />,
      event: <Calendar className="h-4 w-4 text-orange-600" />
    };
    return icons[type as keyof typeof icons] || <Activity className="h-4 w-4 text-gray-600" />;
  };

  if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès Refusé</h1>
          <p className="text-gray-600">Vous n'avez pas la permission d'accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Administrateur</h1>
            <p className="text-gray-600 mt-1">Bon retour, {user.firstName} !</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 bg-white rounded-lg shadow-sm border border-gray-200">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${getStatColor(stat.color)} bg-white rounded-xl shadow-lg border p-6`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Link
            to="/admin/users"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Gestion Utilisateurs
                </h3>
                <p className="text-gray-600 text-sm">
                  Gérer les membres et les rôles
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>

          <Link
            to="/admin/documents"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Gestion Documents
                </h3>
                <p className="text-gray-600 text-sm">
                  Télécharger et organiser les documents
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>

          <Link
            to="/admin/news"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Gestion Actualités
                </h3>
                <p className="text-gray-600 text-sm">
                  Créer et publier des articles
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Aperçu de l'Activité</h3>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>6 derniers mois</option>
                    <option>3 derniers mois</option>
                    <option>Mois dernier</option>
                  </select>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3B82F6" />
                    <Bar dataKey="documents" fill="#10B981" />
                    <Bar dataKey="news" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Trends Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Tendance de Croissance des Utilisateurs</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* User Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Rôles des Utilisateurs</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Activité Récente</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">par {activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};