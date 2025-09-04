import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">
                Syndicat des Professeurs Universitaires Marocains
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Pour un enseignement supérieur d'excellence et des droits garantis aux professeurs universitaires au Maroc
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liens Rapides</h3>
            <div className="space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors block">
                Accueil
              </Link>
              <Link to="/news" className="text-gray-300 hover:text-white transition-colors block">
                Actualités
              </Link>
              <Link to="/documents" className="text-gray-300 hover:text-white transition-colors block">
                Documents
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors block">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Informations de Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">contact@syndicat-professeurs.ma</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">+212 5 37 XX XX XX</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Avenue de l'Université<br />
                  Rabat 10000, Maroc
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Syndicat des Professeurs Universitaires Marocains. Tous droits réservés.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d'Utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};