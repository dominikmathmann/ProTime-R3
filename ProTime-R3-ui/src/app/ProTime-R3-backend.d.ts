/* tslint:disable */
// Generated using typescript-generator version 2.12.476 on 2019-02-26 08:46:15.

export interface JWTUser {
  token: string;
  user: string;
  password: string;
  roles: string[];
}

export interface Report {
  from: Date;
  to: Date;
  includeRideTime: boolean;
  projectId: number;
  filter: string;
  days: ReportDay[];
  duration: number;
}

export interface Record extends IntegerIdEntity {
  start: Date;
  end: Date;
  project: Project;
  description: string;
  journeyTime: boolean;
  duration: number;
}

export interface ReportDay {
  date: Date;
  entries: ReportEntry[];
  duration: number;
}

export interface Project extends IntegerIdEntity {
  projectId: string;
  projectName: string;
}

export interface IntegerIdEntity {
  id: number;
}

export interface ReportEntry {
  project: number;
  description: string;
  duration: number;
  durationNotAccountable: number;
}
