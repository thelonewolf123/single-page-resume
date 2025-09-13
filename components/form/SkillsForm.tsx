"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeData } from "@/lib/resume-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface Props {
  form: UseFormReturn<ResumeData>;
}

export default function SkillsForm({ form }: Props) {
  const { getValues, setValue, watch } = form;
  const watchedData = watch();
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = getValues("skills") || [];
      setValue("skills", [...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = getValues("skills") || [];
    setValue(
      "skills",
      currentSkills.filter((_: unknown, i: number) => i !== index)
    );
  };

  // Map skills to ItemInterface for ReactSortable
  const skillItems = (watchedData.skills || []).map((skill, idx) => ({
    id: idx,
    name: skill
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReactSortable
          list={skillItems}
          setList={(newOrder) =>
            setValue(
              "skills",
              newOrder.map((item) => item.name)
            )
          }
          animation={200}
          delayOnTouchOnly={true}
          delay={2}
          className="flex flex-wrap gap-2"
        >
          {skillItems.map((item, index) => (
            <Badge
              key={item.id}
              variant="secondary"
              className="cursor-move select-none"
              onClick={() => removeSkill(index)}
            >
              {item.name} <X />
            </Badge>
          ))}
        </ReactSortable>

        <div className="flex gap-2 min-w-8">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSkill())
            }
          />
          <Button onClick={addSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
