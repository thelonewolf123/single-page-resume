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

export default function AchievementsForm({ form }: Props) {
  const { register, getValues, setValue, watch } = form;
  const watchedData = watch();
  const [refineOpen, setRefineOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const addAchievement = () => {
    const currentAchievements = getValues("achievements");
    setValue("achievements", [
      ...currentAchievements,
      { title: "", description: "" }
    ]);
  };

  const removeAchievement = (index: number) => {
    const currentAchievements = getValues("achievements");
    setValue(
      "achievements",
      currentAchievements.filter((_: unknown, i: number) => i !== index)
    );
  };

  const handleRefineComplete = (refinedText: string) => {
    if (selectedIndex !== null) {
      setValue(`achievements.${selectedIndex}.description`, refinedText);
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
            Key Achievements
            <Button onClick={addAchievement} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {watchedData.achievements?.map(
            (achievement: unknown, index: number) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Achievement {index + 1}</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleRefineClick(index)}
                      size="sm"
                      variant="ghost"
                    >
                      <Wand2 className="h-4 w-4" />
                    </Button>
                    {watchedData.achievements.length > 1 && (
                      <Button
                        onClick={() => removeAchievement(index)}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    {...register(`achievements.${index}.title` as const)}
                    placeholder="Achievement title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    {...register(`achievements.${index}.description` as const)}
                    placeholder="Describe your achievement..."
                    className="min-h-[60px]"
                  />
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {selectedIndex !== null && (
        <RefineResume
          text={watchedData.achievements[selectedIndex]?.description || ""}
          onComplete={handleRefineComplete}
          open={refineOpen}
          onOpenChange={setRefineOpen}
        />
      )}
    </>
  );
}
