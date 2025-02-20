export type Keys = 'Experience' | 'Languages' | 'Certification' | 'Skills' | 'Education';

export interface Cv {
  personalDetails: PersonalDetails;
  experiences: Experience[];
  certifications: Certification[];
  languages: Language[];
  skills: Skill[];
  education: Education[];
}

export interface PersonalDetails {
  email: string;
  name: string;
  phone: string;
  role: string;
  city: string;
  country: string;
  birthday: string;
}

export interface Experience {
  companyName: string;
  context: string;
  fromDate: Date;
  toDate: Date;
  role: string;
  city: string;
  country: string;
  description: string;
}

export interface Certification {
  title: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Skill {
  name: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: number;
  country: string;
}
