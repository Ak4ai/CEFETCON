import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AppState, CosplayProfile, Vote, Scores, RawVote } from '../types';
import api, { profileService, voteService, votingService } from '../services/api';
import { useAuth } from './AuthContext';

type AppAction = 
  | { type: 'SET_PROFILES'; payload: CosplayProfile[] }
  | { type: 'ADD_COSPLAY'; payload: CosplayProfile }
  | { type: 'UPDATE_COSPLAY'; payload: CosplayProfile }
  | { type: 'DELETE_COSPLAY'; payload: string }
  | { type: 'SET_VISIBLE_PROFILE'; payload: string | null }
  | { type: 'SET_VOTES'; payload: Vote[] }
  | { type: 'ADD_VOTE'; payload: Vote }
  | { type: 'UPDATE_VOTE'; payload: Vote }
  | { type: 'SET_VOTING_STATISTICS'; payload: any | null }
  | { type: 'SET_RANKING'; payload: CosplayProfile[] }
  | { type: 'SET_LOADING'; payload: boolean };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PROFILES':
      return {
        ...state,
        cosplayProfiles: action.payload
      };
    case 'ADD_COSPLAY':
      return {
        ...state,
        cosplayProfiles: [...state.cosplayProfiles, action.payload]
      };
    case 'UPDATE_COSPLAY':
      return {
        ...state,
        cosplayProfiles: state.cosplayProfiles.map(profile =>
          profile.id === action.payload.id ? action.payload : profile
        )
      };
    case 'DELETE_COSPLAY':
      return {
        ...state,
        cosplayProfiles: state.cosplayProfiles.filter(profile => profile.id !== action.payload)
      };
    case 'SET_VISIBLE_PROFILE':
      return {
        ...state,
        currentVisibleProfile: action.payload,
        cosplayProfiles: state.cosplayProfiles.map(profile => ({
          ...profile,
          isVisible: profile.id === action.payload
        }))
      };
    case 'SET_VOTES':
      return {
        ...state,
        votes: action.payload
      };
    case 'ADD_VOTE':
      return {
        ...state,
        votes: [...state.votes, action.payload]
      };
    case 'UPDATE_VOTE':
      return {
        ...state,
        votes: state.votes.map(vote =>
          vote.jurorId === action.payload.jurorId && vote.cosplayId === action.payload.cosplayId
            ? action.payload : vote
        )
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_VOTING_STATISTICS':
      return {
        ...state,
        // Mapear os votos brutos para o formato do frontend
        votingStatistics: action.payload ? {
          ...action.payload,
          totalVotes: action.payload.current_profile_stats?.total_votes || 0,
          totalJurors: action.payload.current_profile_stats?.unique_jurors || 0,
          onlineJurors: action.payload.online_jurors || 0,
          pendingJurors: action.payload.pending_jurors?.length || 0,
          averageScores: action.payload.current_profile_stats?.averages ? {
            indumentaria: parseFloat(action.payload.current_profile_stats.averages.indumentaria || '0'),
            similaridade: parseFloat(action.payload.current_profile_stats.averages.similaridade || '0'),
            qualidade: parseFloat(action.payload.current_profile_stats.averages.qualidade || '0'),
          } : null,
          votes: (action.payload.current_profile_votes || []).map((v: RawVote) => ({
            id: v.id,
            jurorId: v.juror_id,
            jurorName: v.juror_name,
            cosplayId: v.cosplay_id,
            scores: {
              indumentaria: v.indumentaria,
              similaridade: v.similaridade,
              qualidade: v.qualidade,
            },
            submitted: v.submitted,
            updatedAt: v.updated_at,
          }))
        } : null
      };
    case 'SET_RANKING':
      console.log('🔄 Reducer SET_RANKING chamado com payload:', action.payload);
      return {
        ...state,
        ranking: action.payload
      };
    default:
      return state;
  }
};

const initialState: AppState = {
  cosplayProfiles: [],
  jurors: [],
  votes: [],
  currentVisibleProfile: null,
  votingStatistics: null,
  ranking: [],
  loading: false
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Profile functions
  loadProfiles: () => Promise<void>;
  loadPublicProfiles: () => Promise<void>;
  addCosplay: (cosplay: Omit<CosplayProfile, 'id' | 'isVisible' | 'voting_status' | 'final_score' | 'total_final_votes'>) => Promise<void>;
  updateCosplay: (id: string, cosplay: Partial<CosplayProfile>) => Promise<void>;
  deleteCosplay: (id: string) => Promise<void>;
  setVisibleProfile: (id: string | null) => Promise<void>;
  // Vote functions
  loadMyVotes: () => Promise<void>;
  submitVote: (cosplayId: string, scores: Scores, submitted?: boolean) => Promise<void>;
  // Utility functions
  getVotesByJuror: (jurorId: string) => Vote[];
  getVotesByCosplay: (cosplayId: string) => Vote[];
  getAverageScores: (cosplayId: string) => { [key: string]: number } | {};
  // Data management
  refreshAllData: () => Promise<void>;
  finalizeProfileLocally: (profileId: string) => Promise<void>;
  syncWithDatabase: () => Promise<void>;
  clearRanking: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { state: authState } = useAuth();
  const [hasInitialized, setHasInitialized] = React.useState(false);

  // Carregar dados iniciais quando o contexto é montado e usuário está logado
  useEffect(() => {
    const initializeData = async () => {
      if (!authState.isAuthenticated || hasInitialized) {
        return; // Não carregar dados se não estiver logado ou já inicializou
      }

      setHasInitialized(true);
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const profiles = await profileService.getAllProfiles();
        dispatch({ type: 'SET_PROFILES', payload: profiles });
        
        // Carregar o perfil visível atual
        try {
          const currentVisible = await votingService.getCurrentVisibleProfile();
          dispatch({ type: 'SET_VISIBLE_PROFILE', payload: currentVisible?.id || null });
        } catch (error) {
          console.error('Erro ao carregar perfil visível atual:', error);
        }
        
        // Carregar ranking sempre atualizado
        try {
          const ranking = await profileService.getRanking();
          console.log('🏆 Ranking obtido na inicialização:', ranking);
          dispatch({ type: 'SET_RANKING', payload: ranking });
          console.log('🏆 Ranking carregado na inicialização');
        } catch (error) {
          console.error('Erro ao carregar ranking:', error);
        }

        // Carregar estatísticas atualizadas (apenas se autenticado)
        if (authState.isAuthenticated) {
          try {
            const statistics = await votingService.getVotingStatus();
            dispatch({ type: 'SET_VOTING_STATISTICS', payload: statistics });
            console.log('📊 Estatísticas carregadas na inicialização');
          } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
          }
        }
        
        // Se for um jurado, também carregar seus votos
        if (authState.user?.role === 'juror') {
          try {
            const votes = await voteService.getMyVotes();
            dispatch({ type: 'SET_VOTES', payload: votes });
          } catch (error) {
            console.error('Erro ao carregar votos:', error);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeData();
  }, [authState.isAuthenticated, hasInitialized]);

  // Reset quando o usuário faz logout
  useEffect(() => {
    if (!authState.isAuthenticated) {
      setHasInitialized(false);
      dispatch({ type: 'SET_PROFILES', payload: [] });
      dispatch({ type: 'SET_VOTES', payload: [] });
    }
  }, [authState.isAuthenticated]);

  // Polling para admin: atualizar estatísticas em tempo real (SEM salvar na database)
  useEffect(() => {
    if (!authState.isAuthenticated || authState.user?.role !== 'admin') {
      return;
    }

    const statsInterval = setInterval(async () => {
      try {
        // Verificar novamente se ainda é admin antes de cada polling
        if (!authState.isAuthenticated || authState.user?.role !== 'admin') {
          console.log('⚠️ Usuário não é mais admin, parando polling de estatísticas');
          return;
        }

        // Carregar apenas estatísticas/status - NÃO salvar na database
        const statistics = await votingService.getVotingStatus();
        dispatch({ type: 'SET_VOTING_STATISTICS', payload: statistics });
        
        // Atualizar ranking em tempo real
        try {
          const ranking = await profileService.getRanking();
          console.log('🏆 Ranking obtido no polling:', ranking);
          dispatch({ type: 'SET_RANKING', payload: ranking });
          console.log('✅ Dispatch SET_RANKING executado');
        } catch (error: any) {
          console.warn('⚠️ Não foi possível atualizar ranking:', error?.message || error);
        }
        
        console.log('📊 Estatísticas e ranking atualizados em tempo real');
      } catch (error: any) {
        console.error('❌ Erro ao atualizar estatísticas:', error?.message || error);
        
        // Se for erro de permissão, parar o polling
        if (error?.message?.includes('Acesso negado') || error?.message?.includes('admin')) {
          console.log('🛑 Erro de permissão detectado, parando polling de estatísticas');
          // O useEffect será executado novamente e o intervalo será limpo
        }
      }
    }, 3000); // A cada 3 segundos para ver mudanças em tempo real

    return () => clearInterval(statsInterval);
  }, [authState.isAuthenticated, authState.user?.role]);

  // Polling para jurados: verificar mudanças no perfil visível e seus votes a cada 3 segundos
  useEffect(() => {
    if (!authState.isAuthenticated || authState.user?.role !== 'juror') {
      return; // Só fazer polling para jurados autenticados
    }

    const pollInterval = setInterval(async () => {
      try {
        // Verificar perfil visível
        const currentVisible = await votingService.getCurrentVisibleProfile();
        const newVisibleId = currentVisible?.id || null;
        
        // Só atualizar se realmente mudou
        if (newVisibleId !== state.currentVisibleProfile) {
          console.log('🔄 Perfil visível atualizado:', newVisibleId);
          dispatch({ type: 'SET_VISIBLE_PROFILE', payload: newVisibleId });
        }

        // Verificar votes do jurado
        const votes = await voteService.getMyVotes();
        dispatch({ type: 'SET_VOTES', payload: votes });
      } catch (error) {
        console.error('Erro ao verificar perfil visível e votes:', error);
      }
    }, 3000); // Verifica a cada 3 segundos

    return () => clearInterval(pollInterval);
  }, [authState.isAuthenticated, authState.user?.role, state.currentVisibleProfile]);



  // Profile actions using API
  const loadProfiles = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Guardar perfis que foram finalizados localmente
      const locallyCompleted = state.cosplayProfiles.filter(p => 
        p.voting_status === 'completed' && p.final_score != null
      );
      
      const serverProfiles = await profileService.getAllProfiles();
      
      // Mesclar dados: preservar scores locais para perfis completed
      const mergedProfiles = serverProfiles.map(serverProfile => {
        const localProfile = locallyCompleted.find(local => local.id === serverProfile.id);
        if (localProfile) {
          return {
            ...serverProfile,
            voting_status: 'completed' as const,
            final_score: localProfile.final_score,
            total_final_votes: localProfile.total_final_votes
          };
        }
        return serverProfile;
      });
      
      dispatch({ type: 'SET_PROFILES', payload: mergedProfiles });
    } catch (error) {
      console.error('Erro ao carregar perfis:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadPublicProfiles = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Usar o novo endpoint público que não requer autenticação
      const serverProfiles = await profileService.getAllPublicProfiles();
      dispatch({ type: 'SET_PROFILES', payload: serverProfiles });
    } catch (error) {
      console.error('Erro ao carregar perfis públicos:', error);
      // Não acionar um loop de erro, apenas registrar. A UI mostrará a mensagem de erro.
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const addCosplay = async (cosplayData: Omit<CosplayProfile, 'id' | 'isVisible' | 'voting_status' | 'final_score' | 'total_final_votes'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newCosplay = await profileService.createProfile({
        name: cosplayData.name,
        character: cosplayData.character,
        anime: cosplayData.anime,
        image_urls: cosplayData.image_urls,
        description: cosplayData.description
      });
      dispatch({ type: 'ADD_COSPLAY', payload: newCosplay });
    } catch (error) {
      console.error('Erro ao adicionar cosplay:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateCosplay = async (id: string, cosplayData: Partial<CosplayProfile>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const updatedCosplay = await profileService.updateProfile(id, cosplayData);
      dispatch({ type: 'UPDATE_COSPLAY', payload: updatedCosplay });
    } catch (error) {
      console.error('Erro ao atualizar cosplay:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteCosplay = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await profileService.deleteProfile(id);
      dispatch({ type: 'DELETE_COSPLAY', payload: id });
    } catch (error) {
      console.error('Erro ao deletar cosplay:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setVisibleProfile = async (id: string | null) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Se há um perfil atualmente visível e estamos mudando para outro perfil
      if (state.currentVisibleProfile && id !== state.currentVisibleProfile) {
        console.log('🔄 Processando mudança do perfil:', state.currentVisibleProfile, '→', id);
        
        // Garantir que temos as estatísticas mais recentes antes de finalizar
        if (authState.user?.role === 'admin') {
          try {
            const currentStats = await votingService.getVotingStatus();
            dispatch({ type: 'SET_VOTING_STATISTICS', payload: currentStats });
            console.log('📊 Estatísticas atualizadas antes da finalização');
          } catch (error) {
            console.error('⚠️ Erro ao atualizar estatísticas:', error);
          }
        }
        
        // Finalizar perfil anterior localmente
        try {
          await finalizeProfileLocally(state.currentVisibleProfile);
        } catch (error) {
          console.error('⚠️ Erro ao finalizar perfil localmente:', error);
        }
      }

      // Definir o novo perfil visível
      if (id) {
        await votingService.setVisibleProfile(id);
        console.log('👁️ Novo perfil visível definido:', id);
      } else {
        await votingService.hideCurrentProfile();
        console.log('🔒 Perfil oculto');
      }
      
      // Atualiza o perfil visível no estado
      dispatch({ type: 'SET_VISIBLE_PROFILE', payload: id });
      
      // Para admin, só recarregar estatísticas sem sobrescrever perfis
      if (authState.user?.role === 'admin') {
        try {
          const statistics = await votingService.getVotingStatus();
          dispatch({ type: 'SET_VOTING_STATISTICS', payload: statistics });
          console.log('✅ Estatísticas atualizadas sem sobrescrever perfis');
        } catch (error) {
          console.error('⚠️ Erro ao atualizar estatísticas:', error);
        }
      } else {
        // Para jurados, recarregar todos os dados normalmente
        await refreshAllData();
      }
    } catch (error) {
      console.error('Erro ao definir visibilidade:', error);
      throw error; // Re-throw para que o componente possa tratar o erro
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Vote actions using API  
  const loadMyVotes = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const votes = await voteService.getMyVotes();
      dispatch({ type: 'SET_VOTES', payload: votes });
    } catch (error) {
      console.error('Erro ao carregar votos:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const submitVote = async (cosplayId: string, scores: Scores, submitted: boolean = false) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const vote = await voteService.submitVote(cosplayId, scores, submitted);
      // Encontra e atualiza ou adiciona o voto
      const existingVoteIndex = state.votes.findIndex(v => v.cosplayId === cosplayId);
      if (existingVoteIndex >= 0) {
        dispatch({ type: 'UPDATE_VOTE', payload: vote });
      } else {
        dispatch({ type: 'ADD_VOTE', payload: vote });
      }
    } catch (error) {
      console.error('Erro ao enviar voto:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getVotesByJuror = (jurorId: string): Vote[] => {
    return state.votes.filter(vote => vote.jurorId === jurorId);
  };

  const getVotesByCosplay = (cosplayId: string): Vote[] => {
    return state.votes.filter(vote => vote.cosplayId === cosplayId);
  };

  const getAverageScores = (cosplayId: string) => {
    const votes = getVotesByCosplay(cosplayId);
    if (votes.length === 0) return {};

    const totals = votes.reduce((acc, vote) => ({
      indumentaria: acc.indumentaria + vote.scores.indumentaria,
      similaridade: acc.similaridade + vote.scores.similaridade,
      qualidade: acc.qualidade + vote.scores.qualidade,
    }), { indumentaria: 0, similaridade: 0, qualidade: 0 });

    return {
      indumentaria: totals.indumentaria / votes.length,
      similaridade: totals.similaridade / votes.length,
      qualidade: totals.qualidade / votes.length,
      total: Object.values(totals).reduce((a, b) => a + b, 0) / (votes.length * 3)
    };
  };

  const finalizeProfileLocally = async (profileId: string) => {
    try {
      console.log('🧮 Calculando score final para perfil:', profileId);
      
      // Tentar usar dados das estatísticas atuais se disponíveis
      let profileVotes: Vote[] = [];
      let finalScore = 0;
      let totalVotes = 0;
      
      // Se temos estatísticas do perfil atual e é o perfil que estamos finalizando
      if (state.votingStatistics && state.currentVisibleProfile === profileId) {
        console.log('📊 Usando dados das estatísticas para calcular score');
        const stats = state.votingStatistics;
        
        if (stats.votes && stats.votes.length > 0) {
          // Calcular score médio baseado nas estatísticas
          const totalScores = stats.votes.reduce((acc, vote) => {
            if (vote.submitted) {
              return acc + (
                vote.scores.indumentaria + 
                vote.scores.similaridade + 
                vote.scores.qualidade
              );
            }
            return acc;
          }, 0);
          
          const submittedVotes = stats.votes.filter(v => v.submitted);
          totalVotes = submittedVotes.length;
          
          if (totalVotes > 0) {
            finalScore = totalScores / (totalVotes * 3); // Normalizar para 0-10
            console.log('📊 Score calculado das estatísticas:', finalScore, 'com', totalVotes, 'votos');
          }
        } else if (stats.averageScores) {
          // Usar médias das estatísticas se disponível
          const avgScores = stats.averageScores;
          finalScore = (
            avgScores.indumentaria + 
            avgScores.similaridade + 
            avgScores.qualidade
          ) / 3;
          totalVotes = stats.totalVotes || 0;
          console.log('📊 Score calculado das médias:', finalScore, 'com', totalVotes, 'votos');
        }
      } else {
        // Fallback: tentar usar votos do contexto (para jurados ou dados já carregados)
        profileVotes = state.votes.filter(vote => vote.cosplayId === profileId && vote.submitted);
        
        if (profileVotes.length > 0) {
          const totals = profileVotes.reduce((acc, vote) => ({
            indumentaria: acc.indumentaria + vote.scores.indumentaria,
            similaridade: acc.similaridade + vote.scores.similaridade,
            qualidade: acc.qualidade + vote.scores.qualidade,
          }), { indumentaria: 0, similaridade: 0, qualidade: 0 });

          totalVotes = profileVotes.length;
          finalScore = (
            totals.indumentaria + 
            totals.similaridade + 
            totals.qualidade
          ) / (totalVotes * 3);
          console.log('📊 Score calculado dos votos diretos:', finalScore, 'com', totalVotes, 'votos');
        }
      }
      
      // Tentar salvar na database primeiro
      const finalScoreRounded = parseFloat(finalScore.toFixed(2));
      try {
        await profileService.finalizeProfileScore(profileId, finalScoreRounded, totalVotes);
        console.log('💾 Score salvo na database com sucesso');
      } catch (error) {
        console.warn('⚠️ Falha ao salvar na database, mantendo apenas localmente:', error);
      }

      // Atualizar perfil localmente (fallback ou complemento)
      const updatedProfiles = state.cosplayProfiles.map(profile => {
        if (profile.id === profileId) {
          return {
            ...profile,
            voting_status: 'completed' as const,
            final_score: finalScoreRounded,
            total_final_votes: totalVotes
          };
        }
        return profile;
      });

      dispatch({ type: 'SET_PROFILES', payload: updatedProfiles });
      console.log('✅ Perfil finalizado com score:', finalScoreRounded, 'votos:', totalVotes);

    } catch (error) {
      console.error('❌ Erro ao calcular score final:', error);
    }
  };

  const refreshAllData = async () => {
    console.log('🔄 Atualizando todos os dados...');
    try {
      // Guardar perfis que foram finalizados localmente
      const locallyCompleted = state.cosplayProfiles.filter(p => 
        p.voting_status === 'completed' && p.final_score != null
      );
      
      // Recarregar perfis do servidor
      const serverProfiles = await profileService.getAllProfiles();
      
      // Mesclar dados: preservar scores locais para perfis completed
      const mergedProfiles = serverProfiles.map(serverProfile => {
        const localProfile = locallyCompleted.find(local => local.id === serverProfile.id);
        if (localProfile) {
          return {
            ...serverProfile,
            voting_status: 'completed' as const,
            final_score: localProfile.final_score,
            total_final_votes: localProfile.total_final_votes
          };
        }
        return serverProfile;
      });
      
      // Log apenas se houver perfis preservados
      if (locallyCompleted.length > 0) {
        console.log('🔄 Preservados', locallyCompleted.length, 'perfis finalizados com scores locais');
      }
      
      dispatch({ type: 'SET_PROFILES', payload: mergedProfiles });
      console.log('✅ Perfis recarregados com scores locais preservados');
      
      // Recarregar dados específicos do usuário
      if (authState.user?.role === 'admin') {
        try {
          const statistics = await votingService.getVotingStatus();
          dispatch({ type: 'SET_VOTING_STATISTICS', payload: statistics });
          console.log('✅ Estatísticas de admin recarregadas');
        } catch (error) {
          console.error('⚠️ Erro ao recarregar estatísticas:', error);
        }
      } else if (authState.user?.role === 'juror') {
        try {
          const votes = await voteService.getMyVotes();
          dispatch({ type: 'SET_VOTES', payload: votes });
          console.log('✅ Votos de jurado recarregados');
        } catch (error) {
          console.error('⚠️ Erro ao recarregar votos:', error);
        }
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar dados:', error);
    }
  };

  const syncWithDatabase = async () => {
    console.log('🔄 Sincronizando com database...');
    try {
      // Forçar recarregamento direto da database sem preservar dados locais
      const serverProfiles = await profileService.getAllProfiles();
      dispatch({ type: 'SET_PROFILES', payload: serverProfiles });
      console.log('✅ Dados sincronizados com a database');
      
      // Log dos perfis finalizados encontrados
      const completedFromDB = serverProfiles.filter(p => p.voting_status === 'completed' && p.final_score != null);
      if (completedFromDB.length > 0) {
        console.log('🏆 Perfis finalizados carregados da database:', 
          completedFromDB.map(p => `${p.name}: ${p.final_score} pts`).join(', ')
        );
      }
    } catch (error) {
      console.error('❌ Erro ao sincronizar com database:', error);
    }
  };

  const clearRanking = async () => {
    try {
      await profileService.clearRanking();
      // Limpar ranking local e recarregar dados
      dispatch({ type: 'SET_RANKING', payload: [] });
      await refreshAllData();
      console.log('✅ Ranking limpo e dados atualizados');
    } catch (error) {
      console.error('❌ Erro ao limpar ranking:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      loadProfiles,
      loadPublicProfiles,
      addCosplay,
      updateCosplay,
      deleteCosplay,
      setVisibleProfile,
      loadMyVotes,
      submitVote,
      getVotesByJuror,
      getVotesByCosplay,
      getAverageScores,
      refreshAllData,
      finalizeProfileLocally,
      syncWithDatabase,
      clearRanking
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
