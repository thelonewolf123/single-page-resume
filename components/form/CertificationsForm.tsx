"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeData } from "@/lib/resume-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<ResumeData>;
}

export default function CertificationsForm({ form }: Props) {
  const { register, getValues, setValue, watch } = form;
  const watchedData = watch();

  const addCertification = () => {
    const currentCerts = getValues("certifications");
    setValue("certifications", [...currentCerts, { name: "", issuer: "" }]);
  };

  const removeCertification = (index: number) => {
    const currentCerts = getValues("certifications");
    setValue(
      "certifications",
      currentCerts.filter((_: unknown, i: number) => i !== index)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Certifications
          <Button onClick={addCertification} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {watchedData.certifications?.map((cert: unknown, index: number) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <Label>Certification Name</Label>
              <Input
                {...register(`certifications.${index}.name` as const)}
                placeholder="AWS Certified Developer"
              />
            </div>
            <div className="flex-1">
              <Label>Issuer</Label>
              <Input
                {...register(`certifications.${index}.issuer` as const)}
                placeholder="Amazon Web Services"
              />
            </div>
            {watchedData.certifications.length > 1 && (
              <Button
                onClick={() => removeCertification(index)}
                size="sm"
                variant="ghost"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
