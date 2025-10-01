import axios from 'axios';
import type { User, CosplayProfile, Vote, Scores } from '../types';

// Configuração base da API - usa a mesma origem do frontend
const API_BASE_URL = `${window.location.origin}/api`;

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido - limpar dados e redirecionar
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===============================
// SERVIÇOS DE AUTENTICAÇÃO
// ===============================

export const authService = {
  async login(email: string, password: string, role: 'admin' | 'juror') {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        role
      });

      const { user, token } = response.data;
      
      // Salvar token e dados do usuário
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro no login');
    }
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'juror';
  }) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro no registro');
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao obter usuário');
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },

  getStoredUser(): User | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  },

  getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }
};

// ===============================
// SERVIÇOS DE PERFIS
// ===============================

export const profileService = {
  async getAllProfiles(): Promise<CosplayProfile[]> {
    try {
      const response = await api.get('/profiles');
      return response.data.profiles.map((profile: any) => ({
        id: profile.id.toString(),
        name: profile.name,
        character: profile.character,
        anime: profile.anime,
        image: profile.image_url || '',
        description: profile.description || '',
        isVisible: false, // Será definido pelo contexto
        voting_status: profile.voting_status,
        final_score: profile.final_score ? parseFloat(profile.final_score) : undefined,
        total_final_votes: profile.total_final_votes ? parseInt(profile.total_final_votes) : undefined,
      }));
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar perfis');
    }
  },

  async getAllPublicProfiles(): Promise<CosplayProfile[]> {
    try {
      // Este endpoint não requer autenticação
      const response = await api.get('/profiles/public');
      return response.data.profiles.map((profile: any) => ({
        id: profile.id.toString(),
        name: profile.name,
        character: profile.character,
        anime: profile.anime,
        image: profile.image_url || '',
        description: profile.description || '',
        isVisible: false, // Será definido pelo contexto
        voting_status: profile.voting_status,
        final_score: profile.final_score ? parseFloat(profile.final_score) : undefined,
        total_final_votes: profile.total_final_votes ? parseInt(profile.total_final_votes) : undefined,
      }));
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar perfis públicos');
    }
  },

  async getProfile(id: string): Promise<CosplayProfile> {
    try {
      const response = await api.get(`/profiles/${id}`);
      const profile = response.data.profile;
      return {
        id: profile.id.toString(),
        name: profile.name,
        character: profile.character,
        anime: profile.anime,
        image: profile.image_url || '',
        description: profile.description || '',
        isVisible: false, // Será definido pelo contexto
        voting_status: profile.voting_status,
        final_score: profile.final_score ? parseFloat(profile.final_score) : undefined,
        total_final_votes: profile.total_final_votes ? parseInt(profile.total_final_votes) : undefined,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar perfil');
    }
  },

  async createProfile(profileData: {
    name: string;
    character: string;
    anime: string;
    image_url: string;
    description: string;
  }): Promise<CosplayProfile> {
    try {
      const response = await api.post('/profiles', profileData);
      const profile = response.data.profile;
      return {
        id: profile.id.toString(),
        name: profile.name,
        character: profile.character,
        anime: profile.anime,
        image: profile.image_url || '',
        description: profile.description || '',
        isVisible: false,
        voting_status: 'pending',
        final_score: undefined,
        total_final_votes: undefined,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao criar perfil');
    }
  },

  async updateProfile(id: string, profileData: Partial<{
    name: string;
    character: string;
    anime: string;
    image_url: string;
    description: string;
  }>): Promise<CosplayProfile> {
    try {
      const response = await api.put(`/profiles/${id}`, profileData);
      const profile = response.data.profile;
      return {
        id: profile.id.toString(),
        name: profile.name,
        character: profile.character,
        anime: profile.anime,
        image: profile.image_url || '',
        description: profile.description || '',
        isVisible: false,
        voting_status: profile.voting_status,
        final_score: profile.final_score ? parseFloat(profile.final_score) : undefined,
        total_final_votes: profile.total_final_votes ? parseInt(profile.total_final_votes) : undefined,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar perfil');
    }
  },

  async deleteProfile(id: string): Promise<void> {
    try {
      await api.delete(`/profiles/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao excluir perfil');
    }
  },

  async getProfileResults(id: string) {
    try {
      const response = await api.get(`/profiles/${id}/results`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar resultados');
    }
  },

  async finalizeProfileScore(profileId: string, finalScore: number, totalVotes: number): Promise<void> {
    try {
      await api.put(`/profiles/${profileId}/finalize`, {
        final_score: finalScore,
        total_final_votes: totalVotes,
        voting_status: 'completed'
      });
      console.log('💾 Score final salvo na database:', { profileId, finalScore, totalVotes });
    } catch (error: any) {
      console.error('❌ Erro ao salvar na database, usando fallback local');
      throw new Error(error.response?.data?.error || 'Erro ao finalizar perfil na database');
    }
  },

  async getRanking(): Promise<CosplayProfile[]> {
    try {
      console.log('🔄 Chamando API /profiles/ranking...');
      const response = await api.get('/profiles/ranking');
      console.log('📦 Resposta da API ranking:', response.data);
      
      // Se não há perfis no ranking, retornar array vazia sem erro
      if (!response.data.ranking || response.data.ranking.length === 0) {
        console.log('⚠️ Nenhum perfil no ranking retornado pela API');
        return [];
      }
      
      const mappedRanking = response.data.ranking.map((profile: any) => ({
        id: profile.id.toString(),
        name: profile.name,
        character: profile.character,
        anime: profile.anime,
        image: profile.image_url || '',
        description: profile.description || '',
        isVisible: false,
        voting_status: profile.voting_status,
        final_score: profile.final_score ? parseFloat(profile.final_score) : undefined,
        total_final_votes: profile.total_final_votes ? parseInt(profile.total_final_votes) : undefined,
      }));
      
      console.log('🏆 Ranking mapeado:', mappedRanking);
      return mappedRanking;
    } catch (error: any) {
      console.error('❌ Erro ao obter ranking:', error.response?.data?.error || error.message);
      // Retornar array vazia em caso de erro, para não quebrar a UI
      return [];
    }
  },

  async clearRanking(): Promise<void> {
    try {
      console.log('🗑️ Limpando dados do ranking...');
      await api.delete('/profiles/ranking/clear');
      console.log('✅ Ranking limpo com sucesso!');
    } catch (error: any) {
      console.error('❌ Erro ao limpar ranking:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Erro ao limpar ranking');
    }
  }
};

// ===============================
// SERVIÇOS DE VOTAÇÃO
// ===============================

export const voteService = {
  async getMyVotes(): Promise<Vote[]> {
    try {
      const response = await api.get('/votes/my');
      return response.data.votes.map((vote: any) => ({
        jurorId: vote.juror_id.toString(),
        cosplayId: vote.cosplay_id.toString(),
        scores: {
          craftsmanship: vote.craftsmanship,
          accuracy: vote.accuracy,
          creativity: vote.creativity,
          presentation: vote.presentation,
          overall: vote.overall_impression
        },
        submitted: vote.submitted
      }));
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar votos');
    }
  },

  async submitVote(cosplayId: string, scores: Scores, submitted: boolean = true): Promise<Vote> {
    try {
      const response = await api.post('/votes', {
        cosplay_id: parseInt(cosplayId),
        craftsmanship: scores.craftsmanship,
        accuracy: scores.accuracy,
        creativity: scores.creativity,
        presentation: scores.presentation,
        overall_impression: scores.overall,
        submitted
      });
      
      const vote = response.data.vote;
      return {
        jurorId: vote.juror_id.toString(),
        cosplayId: vote.cosplay_id.toString(),
        scores: {
          craftsmanship: vote.craftsmanship,
          accuracy: vote.accuracy,
          creativity: vote.creativity,
          presentation: vote.presentation,
          overall: vote.overall_impression
        },
        submitted: vote.submitted
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao enviar voto');
    }
  },

  async checkVote(cosplayId: string) {
    try {
      const response = await api.get(`/votes/check/${cosplayId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao verificar voto');
    }
  },

  async deleteVote(cosplayId: string): Promise<void> {
    try {
      await api.delete(`/votes/${cosplayId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao excluir voto');
    }
  },

  async getStatistics() {
    try {
      const response = await api.get('/votes/statistics');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar estatísticas');
    }
  },

  async getAllVotes(): Promise<Vote[]> {
    try {
      const response = await api.get('/votes/all');
      return response.data.votes.map((vote: any) => ({
        jurorId: vote.juror_id.toString(),
        cosplayId: vote.cosplay_id.toString(),
        scores: {
          craftsmanship: vote.craftsmanship,
          accuracy: vote.accuracy,
          creativity: vote.creativity,
          presentation: vote.presentation,
          overall: vote.overall_impression
        },
        submitted: vote.submitted
      }));
    } catch (error: any) {
      // Se não existir endpoint, tentar usar estatísticas
      console.log('⚠️ Endpoint /votes/all não existe, usando votos do contexto');
      throw new Error(error.response?.data?.error || 'Erro ao buscar todos os votos');
    }
  }
};

// ===============================
// SERVIÇOS DE CONTROLE DE VOTAÇÃO
// ===============================

export const votingService = {
  async getCurrentVisibleProfile(): Promise<CosplayProfile | null> {
    try {
      const response = await api.get('/voting/current');
      const profile = response.data.current_profile;
      
      if (!profile) return null;
      
      return {
        id: profile.id.toString(),
        name: profile.name,
        character: profile.character,
        anime: profile.anime,
        image: profile.image_url || '',
        description: profile.description || '',
        isVisible: true,
        voting_status: profile.voting_status || 'active',
        final_score: profile.final_score ? parseFloat(profile.final_score) : undefined,
        total_final_votes: profile.total_final_votes ? parseInt(profile.total_final_votes) : undefined,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar perfil atual');
    }
  },

  async setVisibleProfile(profileId: string): Promise<void> {
    try {
      await api.put(`/voting/set-visible/${profileId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao definir perfil visível');
    }
  },

  async hideCurrentProfile(): Promise<void> {
    try {
      await api.put('/voting/set-visible/null');
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao ocultar perfil');
    }
  },

  async getVotingStatus() {
    try {
      const response = await api.get('/voting/status');
      return response.data;
    } catch (error: any) {
      // Se for erro de acesso negado, propagar a mensagem específica
      if (error.response?.status === 403 || error.response?.data?.error?.includes('Acesso negado')) {
        throw new Error(error.response.data.error || 'Acesso negado. Requer papel: admin');
      }
      throw new Error(error.response?.data?.error || 'Erro ao buscar status');
    }
  },

  async getVotingStatistics(): Promise<any> {
    try {
      const response = await api.get('/voting/status');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar estatísticas');
    }
  },

  async pingPresence(): Promise<void> {
    try {
      await api.post('/presence/ping');
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar estatísticas');
    }
  },

  async finalizeCurrentProfile(): Promise<void> {
    try {
      // Por enquanto, vamos simular a finalização apenas obtendo o status atual
      // Isso força uma verificação do estado atual no backend
      await api.get('/voting/status');
      console.log('📊 Status verificado - perfil anterior processado pelo backend');
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao verificar status do perfil atual');
    }
  },

  async finalizeProfile(profileId: string): Promise<void> {
    try {
      // Tentar usar endpoint específico se existir, caso contrário usar o genérico
      await api.put(`/profiles/${profileId}/finalize`);
    } catch (error: any) {
      // Se não existir endpoint específico, simula a finalização
      console.log('📊 Finalizando perfil via status check');
      throw new Error(error.response?.data?.error || 'Erro ao finalizar perfil');
    }
  }
};

export default api;