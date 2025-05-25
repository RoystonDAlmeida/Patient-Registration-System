// src/components/PatientList - Component for rendering patient box components with details

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { User, Edit2, X } from "lucide-react";
import { Patient } from "@/types/patient";
import { UpdateablePatientFields } from "@/services/database/operations/patientOperations";
import { PatientSearch } from "./patient/PatientSearch";
import { PatientCard } from "./patient/PatientCard";
import { PatientEditForm } from "./patient/PatientEditForm";
import { PatientViewMode } from "./patient/PatientViewMode";

interface PatientListProps {
  patients: Patient[];
  db: {
    getAllPatients: () => Promise<Patient[]>;
    updatePatient: (id: number, updates: UpdateablePatientFields) => Promise<Patient>;
  };
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientList = ({ patients, db, setPatients }: PatientListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState<UpdateablePatientFields>({});

  const filteredPatients = patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.includes(searchTerm)
  );

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
    setEditedFields({
      email: patient.email || '',
      phone: patient.phone || '',
      address: patient.address || '',
      emergency_contact_name: patient.emergency_contact_name || '',
      emergency_contact_phone: patient.emergency_contact_phone || '',
      medical_conditions: patient.medical_conditions || '',
      medications: patient.medications || '',
      allergies: patient.allergies || '',
      insurance_provider: patient.insurance_provider || '',
      insurance_policy_number: patient.insurance_policy_number || '',
    });
  };

  const handleFieldChange = (field: keyof UpdateablePatientFields, value: string) => {
    setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!selectedPatient) return;

    try {
      await db.updatePatient(selectedPatient.id, editedFields);
      const updatedPatients = await db.getAllPatients();
      setPatients(updatedPatients);
      toast({
        title: "Success",
        description: "Patient information updated successfully!",
      });
      setIsEditing(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Failed to update patient:", error);
      toast({
        title: "Update Error",
        description: "Failed to update patient information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedPatient(null);
    setEditedFields({});
  };

  return (
    <div className="space-y-6">
      <PatientSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredPatients.length === 0 ? (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No patients found" : "No patients registered"}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? "Try adjusting your search terms." : "Register your first patient to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={handleEdit}
              onView={setSelectedPatient}
            />
          ))}
        </div>
      )}

      {selectedPatient && (
        <AlertDialog open={!!selectedPatient} onOpenChange={() => handleCancel()}>
          <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-hidden rounded-lg mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] lg:w-[calc(100%-8rem)]">
            <div className="relative">
              <button
                onClick={handleCancel}
                className="absolute -right-2 -top-2 rounded-full p-2 bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                <X className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Close</span>
              </button>
              <div className="pr-8">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {isEditing ? "Edit Patient Information" : `${selectedPatient.first_name} ${selectedPatient.last_name}`}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {isEditing ? "Update patient information" : "Complete patient information"}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
            </div>
            
            <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-12rem)] pr-4">
              {isEditing ? (
                <PatientEditForm
                  editedFields={editedFields}
                  onFieldChange={handleFieldChange}
                />
              ) : (
                <PatientViewMode
                  patient={selectedPatient}
                  onEdit={handleEdit}
                />
              )}
            </div>
            
            <div className="mt-4 border-t pt-4 sticky bottom-0 bg-white">
              <div className="flex justify-end gap-2 w-full">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => handleEdit(selectedPatient)}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Information
                  </Button>
                )}
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default PatientList;
