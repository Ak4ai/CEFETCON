export interface CosplayProfile {
  id: string;
  name: string;
  character: string;
  anime: string;
  image_urls: string[];
  description: string;
  isVisible: boolean;
  voting_status: 'pending' | 'active' | 'completed';
  final_score?: number;
  total_final_votes?: number;
  modality: 'desfile' | 'presentation';
  bonus: boolean;
  penalty: boolean;
  time_penalty?: number; // Penalidade por tempo em pontos
}

export interface DesfileScores {
  indumentaria: number;
  similaridade: number;
  qualidade: number;
}

export interface PresentationScores {
  interpretacao: number;        // Interpretação
  dificuldade: number;          // Dificuldade de Execução
  qualidade: number;            // Qualidade e Impacto da Apresentação
  conteudo: number;             // Conteúdo e Qualidade Audiovisual
  criatividade: number;         // Criatividade e Roteiro
}

export type Scores = DesfileScores | PresentationScores;

export interface Vote {
  jurorId: string;
  cosplayId: string;
  scores: Scores;
  submitted: boolean;
}

export interface Juror {
  id: string;
  name: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'juror';
}

export type UserRole = 'admin' | 'juror';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface VotingStatistics {
  currentProfile: CosplayProfile | null;
  votes: {
    id: number; // Adicionando a propriedade ID do voto
    jurorName: string;
    scores: Scores;
    submitted: boolean;
    updatedAt: string;
  }[];
  averageScores: Scores | null;
  totalVotes: number;
  totalJurors: number;
  onlineJurors: number; // Jurados online nos últimos 10 segundos
  pendingJurors: number; // Jurados que ainda não votaram no perfil atual
}

export type VotingMode = 'desfile' | 'presentation';

export interface AppState {
  cosplayProfiles: CosplayProfile[];
  jurors: Juror[];
  votes: Vote[];
  currentVisibleProfile: string | null;
  currentMode: VotingMode;
  votingStatistics: VotingStatistics | null;
  ranking: CosplayProfile[]; // Novo estado para o ranking
  loading: boolean;
}

// Tipo para o voto "bruto" que vem da API, com snake_case
export interface RawVote {
  id: number;
  juror_id: string;
  juror_name: string;
  cosplay_id: string;
  // Desfile
  indumentaria?: number;
  similaridade?: number;
  qualidade?: number;
  // Apresentação
  interpretacao?: number;
  dificuldade?: number;
  conteudo?: number;
  criatividade?: number;
  submitted: boolean;
  updated_at: string;
}