// src/services/database/sync/syncManager - File that uses Broadcast Channel instance to reflect changes without manual refreshing
import { Patient } from '@/types/patient';

// Event types for synchronization
export type SyncEvent = {
  type: 'patient_added' | 'patient_updated';
  data: Patient;
};

class SyncManager {
  private broadcastChannel: BroadcastChannel;

  constructor() {
    // Create a new broadcast channel
    this.broadcastChannel = new BroadcastChannel('patient-sync');
    this.setupListeners();
  }

  private setupListeners() {
    // Broadcast listeners
    this.broadcastChannel.onmessage = async (event: MessageEvent<SyncEvent>) => {
      const { type, data } = event.data;
      
      window.dispatchEvent(new CustomEvent('patient-sync', { 
        detail: { type, data } 
      }));
    };
  }

  // Patient added event
  public broadcastPatientAdded(patient: Patient) {
    this.broadcastChannel.postMessage({
      type: 'patient_added',
      data: patient
    });
  }

  // Patient updated event
  public broadcastPatientUpdated(patient: Patient) {
    this.broadcastChannel.postMessage({
      type: 'patient_updated',
      data: patient
    });
  }
}

// Export a singleton instance
export const syncManager = new SyncManager(); 