export interface YarnColor {
  name: string;
  hex: string;
  approxYardage: string;
  purpose: string;
}

export interface PatternRound {
  id: string;
  roundNumber: string;
  instruction: string;
  stitchCount: number;
  notes?: string;
}

export interface PatternSection {
  id: string;
  partName: string;
  color: string;
  notes?: string;
  rounds: PatternRound[];
}

export interface AssemblyStep {
  stepNumber: number;
  title: string;
  description: string;
  tips?: string;
}

export interface CrochetPattern {
  dollTitle: string;
  dollSummary: string;
  difficulty: 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  finishedSize: string;
  gauge: string;
  hookSize: string;
  yarnWeight: string;
  yarnColors: YarnColor[];
  materials: string[];
  abbreviations: { abbr: string; full: string; tip?: string }[];
  sections: PatternSection[];
  assemblyInstructions: AssemblyStep[];
  specialStitchesAndTips: string[];
}

export interface GenerateResponse {
  success: boolean;
  dollDesignImage?: string;
  pattern?: CrochetPattern;
  error?: string;
  creditNotice?: string;
  creditIssue?: boolean;
}
