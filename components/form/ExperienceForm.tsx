"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ResumeData } from "@/lib/resume-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Wand2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RefineResume } from "../RefineResume";

interface Props {
  form: UseFormReturn<ResumeData>;
}

export default function ExperienceForm({ form }: Props) {
  const { register, getValues, setValue, watch } = form;
  const watchedData = watch();
  const [refineOpen, setRefineOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const addExperience = () => {
    const currentExp = getValues("experience");
    setValue("experience", [
      ...currentExp,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ]);
  };

  const removeExperience = (index: number) => {
    const currentExp = getValues("experience");
    setValue(
      "experience",
      currentExp.filter((_: unknown, i: number) => i !== index)
    );
  };

  const handleRefineComplete = (refinedText: string) => {
    if (selectedIndex !== null) {
      setValue(`experience.${selectedIndex}.description`, refinedText);
    }
  };

  const handleRefineClick = (index: number) => {
    setSelectedIndex(index);
    setRefineOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Experience
            <Button onClick={addExperience} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {watchedData.experience?.map((exp: unknown, index: number) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleRefineClick(index)}
                    size="sm"
                    variant="ghost"
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                  {watchedData.experience.length > 1 && (
                    <Button
                      onClick={() => removeExperience(index)}
                      size="sm"
                      variant="ghost"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    {...register(`experience.${index}.title` as const)}
                    placeholder="Data Scientist"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    {...register(`experience.${index}.company` as const)}
                    placeholder="Tech Corp"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    {...register(`experience.${index}.location` as const)}
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    {...register(`experience.${index}.startDate` as const)}
                    placeholder="01/2023"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    {...register(`experience.${index}.endDate` as const)}
                    placeholder="Present"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  {...register(`experience.${index}.description` as const)}
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedIndex !== null && (
        <RefineResume
          text={watchedData.experience[selectedIndex]?.description || ""}
          onComplete={handleRefineComplete}
          open={refineOpen}
          onOpenChange={setRefineOpen}
        />
      )}
    </>
  );
}
