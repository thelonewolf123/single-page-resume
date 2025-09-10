"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  Printer
} from "lucide-react";
import type { ResumeData } from "@/lib/resume-schema";
import Image from "next/image";

interface ResumePreviewProps {
  data: ResumeData;
  onPrint: () => void;
}

export function ResumePreview({ data, onPrint }: ResumePreviewProps) {
  return (
    <div className="lg:col-span-3 print:col-span-full print:w-full">
      <Card className="sticky top-4 print:shadow-none print:border-none">
        <CardHeader className="print:hidden">
          <CardTitle className="flex items-center justify-between">
            Resume Preview
            <Button
              onClick={onPrint}
              size="sm"
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="print:p-0">
          <div className="bg-white text-black p-8 min-h-[800px] shadow-lg print:shadow-none print:p-0 print:min-h-0">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-black mb-2">
                  {data.personalInfo?.fullName || "Your Name"}
                </h1>
                <p className="text-xl text-blue-600 mb-4">
                  {data.personalInfo?.title || "Professional Title"}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {data.personalInfo?.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {data.personalInfo.phone}
                    </div>
                  )}
                  {data.personalInfo?.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {data.personalInfo.email}
                    </div>
                  )}
                  {data.personalInfo?.linkedin && (
                    <div className="flex items-center gap-1">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </div>
                  )}
                  {data.personalInfo?.github && (
                    <div className="flex items-center gap-1">
                      <Github className="h-4 w-4" />
                      GitHub
                    </div>
                  )}
                  {data.personalInfo?.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      Website
                    </div>
                  )}
                  {data.personalInfo?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {data.personalInfo.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center ml-6 overflow-hidden">
                {data.personalInfo?.profileImage ? (
                  <Image
                    src={data.personalInfo.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={250}
                    height={250}
                  />
                ) : (
                  <span className="text-gray-500 text-xs">Photo</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="col-span-2 space-y-6">
                {/* Summary */}
                {data.summary && (
                  <div>
                    <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                      SUMMARY
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {data.summary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {data.experience?.some((exp) => exp.title || exp.company) && (
                  <div>
                    <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                      EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                      {data.experience.map(
                        (exp, index) =>
                          (exp.title || exp.company) && (
                            <div key={index}>
                              <h3 className="font-bold text-black">
                                {exp.title}
                              </h3>
                              <p className="text-blue-600 font-medium">
                                {exp.company}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                {(exp.startDate || exp.endDate) && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {exp.startDate}{" "}
                                    {exp.startDate && exp.endDate && "- "}{" "}
                                    {exp.endDate}
                                  </div>
                                )}
                                {exp.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {exp.location}
                                  </div>
                                )}
                              </div>
                              {exp.description && (
                                <div className="text-sm text-gray-700">
                                  {exp.description
                                    .split("\n")
                                    .map((line, i) => (
                                      <p key={i} className="mb-1">
                                        {line.startsWith("•")
                                          ? line
                                          : `• ${line}`}
                                      </p>
                                    ))}
                                </div>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Key Achievements */}
                {data.achievements?.some(
                  (achievement) => achievement.title
                ) && (
                  <div>
                    <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                      KEY ACHIEVEMENTS
                    </h2>
                    <div className="space-y-3">
                      {data.achievements.map(
                        (achievement, index) =>
                          achievement.title && (
                            <div key={index}>
                              <h3 className="font-bold text-black text-sm">
                                {achievement.title}
                              </h3>
                              {achievement.description && (
                                <p className="text-xs text-gray-700 mt-1">
                                  {achievement.description}
                                </p>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                      SKILLS
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {data.education?.some(
                  (edu) => edu.degree || edu.institution
                ) && (
                  <div>
                    <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                      EDUCATION
                    </h2>
                    <div className="space-y-3">
                      {data.education.map(
                        (edu, index) =>
                          (edu.degree || edu.institution) && (
                            <div key={index}>
                              <h3 className="font-bold text-black text-sm">
                                {edu.degree}
                              </h3>
                              <p className="text-blue-600 text-sm">
                                {edu.institution}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                {(edu.startDate || edu.endDate) && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {edu.startDate}{" "}
                                    {edu.startDate && edu.endDate && "- "}{" "}
                                    {edu.endDate}
                                  </div>
                                )}
                                {edu.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {edu.location}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {data.certifications?.some((cert) => cert.name) && (
                  <div>
                    <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                      CERTIFICATION
                    </h2>
                    <div className="space-y-2">
                      {data.certifications.map(
                        (cert, index) =>
                          cert.name && (
                            <div key={index}>
                              <p className="text-blue-600 text-sm">
                                • {cert.name}
                              </p>
                              {cert.issuer && (
                                <p className="text-xs text-gray-600 ml-2">
                                  ({cert.issuer})
                                </p>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
