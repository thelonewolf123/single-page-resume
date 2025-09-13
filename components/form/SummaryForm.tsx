"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeData } from "@/lib/resume-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefineResume } from "@/components/RefineResume";
import { Wand2 } from "lucide-react";

interface Props {
  form: UseFormReturn<ResumeData>;
}

export default function SummaryForm({ form }: Props) {
  const { register, setValue, getValues } = form;
  const [refineOpen, setRefineOpen] = useState(false);

  const handleRefineComplete = (refinedText: string) => {
    setValue("summary", refinedText);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Professional Summary{" "}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setRefineOpen(true)}
            >
              <Wand2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          {...register("summary")}
          placeholder="Write a brief professional summary..."
          className="min-h-[100px]"
        />

        <RefineResume
          text={getValues("summary") || ""}
          onComplete={handleRefineComplete}
          open={refineOpen}
          onOpenChange={setRefineOpen}
        />
      </CardContent>
    </Card>
  );
}
