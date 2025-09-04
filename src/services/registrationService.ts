// Registration Service for handling approval workflow
// This would typically connect to your backend API

export interface RegistrationRequest {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  memberId?: string;
  university?: string;
  department?: string;
  position?: string;
  specialization?: string;
  hireDate?: string;
  requestedRole: 'editor' | 'member';
  requestNotes?: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  rejectionReason?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ApprovalAction {
  requestId: string;
  action: 'approve' | 'reject';
  adminNotes?: string;
  rejectionReason?: string;
}

class RegistrationService {
  private baseUrl = '/api/registration'; // Replace with your actual API endpoint

  // Get all registration requests
  async getRegistrationRequests(): Promise<RegistrationRequest[]> {
    try {
      // In a real implementation, this would make an API call
      // For now, return mock data
      return this.getMockRequests();
    } catch (error) {
      console.error('Error fetching registration requests:', error);
      throw new Error('Failed to fetch registration requests');
    }
  }

  // Get pending registration requests
  async getPendingRequests(): Promise<RegistrationRequest[]> {
    try {
      const requests = await this.getRegistrationRequests();
      return requests.filter(request => request.status === 'pending');
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      throw new Error('Failed to fetch pending requests');
    }
  }

  // Approve a registration request
  async approveRequest(requestId: string, adminNotes?: string): Promise<boolean> {
    try {
      // In a real implementation, this would make an API call
      console.log('Approving request:', requestId, 'with notes:', adminNotes);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update mock data
      this.updateMockRequestStatus(requestId, 'approved', adminNotes);
      
      return true;
    } catch (error) {
      console.error('Error approving request:', error);
      throw new Error('Failed to approve request');
    }
  }

  // Reject a registration request
  async rejectRequest(requestId: string, rejectionReason: string, adminNotes?: string): Promise<boolean> {
    try {
      // In a real implementation, this would make an API call
      console.log('Rejecting request:', requestId, 'with reason:', rejectionReason);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update mock data
      this.updateMockRequestStatus(requestId, 'rejected', adminNotes, rejectionReason);
      
      return true;
    } catch (error) {
      console.error('Error rejecting request:', error);
      throw new Error('Failed to reject request');
    }
  }

  // Create a new registration request
  async createRegistrationRequest(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    memberId?: string;
    university?: string;
    department?: string;
    position?: string;
    specialization?: string;
    hireDate?: string;
    requestedRole: 'editor' | 'member';
    requestNotes?: string;
  }): Promise<string> {
    try {
      // In a real implementation, this would make an API call
      console.log('Creating registration request for:', userData.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock request ID
      const requestId = Date.now().toString();
      
      return requestId;
    } catch (error) {
      console.error('Error creating registration request:', error);
      throw new Error('Failed to create registration request');
    }
  }

  // Get statistics for dashboard
  async getRegistrationStats(): Promise<{
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  }> {
    try {
      const requests = await this.getRegistrationRequests();
      
      return {
        pending: requests.filter(r => r.status === 'pending').length,
        approved: requests.filter(r => r.status === 'approved').length,
        rejected: requests.filter(r => r.status === 'rejected').length,
        total: requests.length
      };
    } catch (error) {
      console.error('Error fetching registration stats:', error);
      throw new Error('Failed to fetch registration statistics');
    }
  }

  // Mock data for development
  private getMockRequests(): RegistrationRequest[] {
    return [
      {
        id: '1',
        userId: '101',
        firstName: 'Ahmed',
        lastName: 'Benali',
        email: 'ahmed.benali@university.ma',
        phone: '+212 6 12 34 56 78',
        university: 'Université Mohammed V - Rabat',
        department: 'Faculté des Sciences',
        position: 'Professeur Assistant',
        specialization: 'Mathématiques',
        requestedRole: 'editor',
        requestNotes: 'Je souhaite contribuer à la création de contenu éducatif pour nos membres.',
        requestDate: '2025-01-15T10:30:00',
        status: 'pending'
      },
      {
        id: '2',
        userId: '102',
        firstName: 'Fatima',
        lastName: 'Alaoui',
        email: 'fatima.alaoui@university.ma',
        phone: '+212 6 23 45 67 89',
        university: 'Université Hassan II - Casablanca',
        department: 'Faculté des Lettres et Sciences Humaines',
        position: 'Maître de Conférences',
        specialization: 'Littérature Française',
        requestedRole: 'member',
        requestNotes: 'Membre actif du syndicat depuis plusieurs années.',
        requestDate: '2025-01-14T15:45:00',
        status: 'pending'
      },
      {
        id: '3',
        userId: '103',
        firstName: 'Omar',
        lastName: 'Tazi',
        email: 'omar.tazi@university.ma',
        university: 'Université Sidi Mohamed Ben Abdellah - Fès',
        department: 'Faculté de Médecine',
        position: 'Professeur',
        specialization: 'Médecine Interne',
        requestedRole: 'editor',
        requestNotes: 'Expérience en rédaction d\'articles scientifiques et de documentation médicale.',
        requestDate: '2025-01-13T09:20:00',
        status: 'pending'
      },
      {
        id: '4',
        userId: '104',
        firstName: 'Aicha',
        lastName: 'Mansouri',
        email: 'aicha.mansouri@university.ma',
        phone: '+212 6 34 56 78 90',
        university: 'Université Cadi Ayyad - Marrakech',
        department: 'Faculté des Sciences Juridiques',
        position: 'Professeur Associé',
        specialization: 'Droit Public',
        requestedRole: 'member',
        requestNotes: 'Intéressée par les activités du syndicat.',
        requestDate: '2025-01-12T14:15:00',
        status: 'approved',
        adminNotes: 'Profil académique solide, approbation accordée.',
        approvedBy: 'admin@university-union.ma',
        approvedAt: '2025-01-12T16:30:00'
      },
      {
        id: '5',
        userId: '105',
        firstName: 'Youssef',
        lastName: 'Idrissi',
        email: 'youssef.idrissi@university.ma',
        university: 'Université Ibn Zohr - Agadir',
        department: 'Faculté des Sciences',
        position: 'Professeur Assistant',
        specialization: 'Physique',
        requestedRole: 'editor',
        requestNotes: 'Souhaite contribuer au contenu scientifique.',
        requestDate: '2025-01-11T11:00:00',
        status: 'rejected',
        adminNotes: 'Demande d\'éditeur refusée, profil plus adapté pour membre.',
        rejectionReason: 'Le profil ne correspond pas aux critères pour le rôle d\'éditeur. Veuillez soumettre une nouvelle demande en tant que membre.',
        approvedBy: 'admin@university-union.ma',
        approvedAt: '2025-01-11T15:45:00'
      }
    ];
  }

  // Update mock request status (for development)
  private updateMockRequestStatus(
    requestId: string, 
    status: 'approved' | 'rejected', 
    adminNotes?: string, 
    rejectionReason?: string
  ): void {
    // In a real implementation, this would update the database
    console.log(`Mock update: Request ${requestId} status changed to ${status}`);
    if (adminNotes) console.log('Admin notes:', adminNotes);
    if (rejectionReason) console.log('Rejection reason:', rejectionReason);
  }
}

// Export singleton instance
export const registrationService = new RegistrationService();
export default registrationService;
