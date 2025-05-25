import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import PatientRegistrationForm from "@/components/PatientRegistrationForm";
import PatientList from "@/components/PatientList";
import SQLQueryInterface from "@/components/SQLQueryInterface";
import { Patient } from "@/types/patient";
import { initializeDatabase, patientOperations, getDatabase } from "@/services/database";
import { PageHeader } from "@/components/pages/index/PageHeader";
import { LoadingState } from "@/components/pages/index/LoadingState";
import { ErrorState } from "@/components/pages/index/ErrorState";
import { TabNavigation } from "@/components/pages/index/TabNavigation";
import { TabConfig } from "@/components/pages/index/types";

const Index = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("register");

  const tabs: TabConfig[] = [
    { id: "register", label: "Register Patient" },
    { id: "patients", label: "Patient Records", count: patients.length },
    { id: "query", label: "SQL Query" }
  ];

  // Initialize database and load patients
  const initDatabase = async () => {
    try {
      console.log("Initializing PGlite database...");
      setInitError(null);
      await initializeDatabase();
      await loadPatients();
      setIsLoading(false);
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Failed to initialize database:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setInitError(errorMessage);
      setIsLoading(false);
      
      toast({
        title: "Database Error",
        description: "Failed to initialize the patient database. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    initDatabase();

    const handleSync = (event: CustomEvent) => {
      const { type, data } = event.detail;
      
      if (type === 'patient_added') {
        setPatients(prev => [data as Patient, ...prev]);
        toast({
          title: "Patient Added",
          description: "A new patient was added in another tab.",
        });
      } else if (type === 'patient_updated') {
        setPatients(prev => prev.map(p => p.id === (data as Patient).id ? data as Patient : p));
        toast({
          title: "Patient Updated",
          description: "Patient information was updated in another tab.",
        });
      }
    };

    window.addEventListener('patient-sync', handleSync as EventListener);
    return () => window.removeEventListener('patient-sync', handleSync as EventListener);
  }, []);

  const loadPatients = async () => {
    try {
      console.log("Loading patients from database...");
      const patientsData = await patientOperations.getAllPatients();
      const sortedPatients = patientsData.sort((a, b) => a.id - b.id);
      setPatients(sortedPatients);
      console.log(`Loaded ${sortedPatients.length} patients`);
    } catch (error) {
      console.error("Failed to load patients:", error);
      toast({
        title: "Load Error",
        description: "Failed to load patient records.",
        variant: "destructive",
      });
    }
  };

  const handlePatientRegistered = async () => {
    console.log("Patient registered, reloading data...");
    await loadPatients();
    toast({
      title: "Success",
      description: "Patient registered successfully!",
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (initError) {
    return (
      <ErrorState
        error={initError}
        onRetry={() => {
          setIsLoading(true);
          setInitError(null);
          initDatabase();
        }}
        onRefresh={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-8 pb-16 max-w-full">
        <PageHeader patientCount={patients.length} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="mt-4 sm:mt-20 mb-8">
            <TabsContent value="register">
              <Card className="mb-8 w-full overflow-hidden">
                <CardHeader className="px-3 sm:px-6">
                  <CardTitle>Patient Registration</CardTitle>
                  <CardDescription>
                    Register a new patient in the system
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 sm:p-6">
                  <div className="px-3 sm:px-6">
                    <PatientRegistrationForm 
                      db={patientOperations} 
                      onPatientRegistered={handlePatientRegistered}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patients">
              <Card className="mb-8 w-full overflow-hidden">
                <CardHeader className="px-3 sm:px-6">
                  <CardTitle>Patient Records</CardTitle>
                  <CardDescription>
                    View and manage registered patients
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 sm:p-6">
                  <div className="px-3 sm:px-6">
                    <PatientList 
                      patients={patients} 
                      db={patientOperations}
                      setPatients={setPatients}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="query">
              <Card className="mb-8 w-full overflow-hidden">
                <CardHeader className="px-3 sm:px-6">
                  <CardTitle>SQL Query Interface</CardTitle>
                  <CardDescription>
                    Execute custom SQL queries on the patient database
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 sm:p-6">
                  <div className="px-3 sm:px-6">
                    <SQLQueryInterface db={getDatabase()} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;