"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeData } from "@/lib/resume-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  form: UseFormReturn<ResumeData>;
}

export default function SummaryForm({ form }: Props) {
  const { register } = form;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          {...register("summary")}
          placeholder="Write a brief professional summary..."
          className="min-h-[100px]"
        />
      </CardContent>
    </Card>
  );
}
