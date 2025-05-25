// src/components/patient/PatientCard - Component for rendering of patient basic info

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Heart, Shield, Edit2 } from "lucide-react";
import { PatientCardProps } from "./types";
import { calculateAge, formatDate } from "./utils";

export const PatientCard = ({ patient, onEdit, onView }: PatientCardProps) => (
  <Card className="hover:shadow-md transition-shadow border-2 border-gray-200 hover:border-blue-200 flex flex-col h-full">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg">
            {patient.first_name} {patient.last_name}
          </CardTitle>
          <CardDescription>
            Age: {calculateAge(patient.date_of_birth)} • DOB: {formatDate(patient.date_of_birth)}
          </CardDescription>
        </div>
        <Badge variant="secondary">ID: {patient.id}</Badge>
      </div>
    </CardHeader>

    <CardContent className="space-y-3 flex-grow">
      <div className="space-y-3">
        {patient.email && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="truncate">{patient.email}</span>
          </div>
        )}
        {patient.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{patient.phone}</span>
          </div>
        )}
        {patient.medical_conditions && (
          <div className="flex items-center gap-2 text-sm">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="truncate">Has medical conditions</span>
          </div>
        )}
        {patient.insurance_provider && (
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="truncate">{patient.insurance_provider}</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-end items-center gap-2 pt-3 mt-auto">
        <Button variant="outline" size="sm" onClick={() => onEdit(patient)}>
          <Edit2 className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => onView(patient)}>
          View Details
        </Button>
      </div>
    </CardContent>

  </Card>
); 