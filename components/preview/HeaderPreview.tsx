"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Linkedin, Github, Globe, MapPin } from "lucide-react";
import type { ResumeData } from "@/lib/resume-schema";

interface Props {
  data: ResumeData;
}

const formatUrl = (url: string): string => {
  if (!url) return "";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url.replace(/^\/\//, "")}`;
};

export default function HeaderPreview({ data }: Props) {
  return (
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
            <Link
              href={formatUrl(data.personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
          )}
          {data.personalInfo?.github && (
            <Link
              href={formatUrl(data.personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          )}
          {data.personalInfo?.website && (
            <Link
              href={formatUrl(data.personalInfo.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Globe className="h-4 w-4" />
              Website
            </Link>
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
  );
}
