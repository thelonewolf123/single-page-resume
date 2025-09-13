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

export default function EducationForm({ form }: Props) {
  const { register, getValues, setValue, watch } = form;
  const watchedData = watch();

  const addEducation = () => {
    const currentEdu = getValues("education");
    setValue("education", [
      ...currentEdu,
      { degree: "", institution: "", location: "", startDate: "", endDate: "" }
    ]);
  };

  const removeEducation = (index: number) => {
    const currentEdu = getValues("education");
    setValue(
      "education",
      currentEdu.filter((_: unknown, i: number) => i !== index)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Education
          <Button onClick={addEducation} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {watchedData.education?.map((edu: unknown, index: number) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Education {index + 1}</h4>
              {watchedData.education.length > 1 && (
                <Button
                  onClick={() => removeEducation(index)}
                  size="sm"
                  variant="ghost"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Degree</Label>
                <Input
                  {...register(`education.${index}.degree` as const)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <Label>Institution</Label>
                <Input
                  {...register(`education.${index}.institution` as const)}
                  placeholder="University Name"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Location</Label>
                <Input
                  {...register(`education.${index}.location` as const)}
                  placeholder="City, State"
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  {...register(`education.${index}.startDate` as const)}
                  placeholder="08/2019"
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  {...register(`education.${index}.endDate` as const)}
                  placeholder="05/2023"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
