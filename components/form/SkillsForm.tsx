"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeData } from "@/lib/resume-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Props {
  form: UseFormReturn<ResumeData>;
}

export default function SkillsForm({ form }: Props) {
  const { getValues, setValue, watch } = form;
  const watchedData = watch();
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = getValues("skills");
      setValue("skills", [...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = getValues("skills");
    setValue(
      "skills",
      currentSkills.filter((_: unknown, i: number) => i !== index)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
          />
          <Button onClick={addSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {watchedData.skills?.map((skill: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removeSkill(index)}
            >
              {skill} ×
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
