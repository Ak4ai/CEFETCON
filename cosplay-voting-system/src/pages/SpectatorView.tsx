import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useApp } from '../contexts/AppContext';
import api from '../services/api';

// Declaração de tipo para Odometer.js
declare global {
  interface Window {
    Odometer: any;
  }
}

interface CounterRollProps {
  value: number;
  decimals?: number;
  fontSize?: string;
}

const CounterRoll: React.FC<CounterRollProps> = ({ value, decimals = 1, fontSize = '2rem' }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const odometerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Aguardar o Odometer.js carregar
    const checkOdometer = () => {
      if (window.Odometer && elementRef.current) {
        // Criar instância do Odometer
        odometerRef.current = new window.Odometer({
          el: elementRef.current,
          value: 0,
          theme: 'default',
          duration: 83000 // 8 segundos - bem mais lento para ver claramente os números rolando
        });
        setIsLoaded(true);
      } else {
        // Tentar novamente após um pequeno delay
        setTimeout(checkOdometer, 100);
      }
    };

    checkOdometer();

    return () => {
      if (odometerRef.current) {
        odometerRef.current = null;
      }
    };
  }, [decimals]);

  useEffect(() => {
    // Atualizar o valor quando mudou e o Odometer está carregado
    if (isLoaded && odometerRef.current && value !== undefined) {
      // Pequeno delay para garantir que a primeira animação também seja visível
      setTimeout(() => {
        if (odometerRef.current) { // Verificação adicional para evitar erro
          odometerRef.current.update(value);
        }
      }, 2200);
    }
  }, [value, isLoaded]);

  return (
    <CounterContainer $fontSize={fontSize}>
      <div ref={elementRef} className="odometer" />
    </CounterContainer>
  );
};

const CounterContainer = styled.div<{ $fontSize: string }>`
  font-size: ${props => props.$fontSize};
  font-weight: bold;
  color: #a855f7;
  
  /* Personalizar os estilos do odometer para nosso tema */
  .odometer {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  }
  
  /* Customizar os ribons/faixas dos dígitos */
  .odometer-ribbon {
    transition: transform 0.3s ease;
  }
  
  /* Estilo dos dígitos individuais */
  .odometer-digit {
    transition: color 0.3s ease;
  }
`;



interface VoteAverages {
  indumentaria: number;
  similaridade: number;
  qualidade: number;
  finalAverage: number;
  totalVotes: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  min-height: 100dvh;
  width: 100%;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const CardHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center; /* Centraliza o conteúdo (título) */
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

const CardContainer = styled.div`
  background: var(--bg-secondary);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 25px;
  padding: 30px 40px;
  margin: 40px;
  width: 100%;
  height: 90vh;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  backdrop-filter: blur(15px);
  animation: ${fadeIn} 1s ease-out 0.3s both;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative; /* Garante que o BackButton seja posicionado corretamente */
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 25px 20px;
    height: auto;
    margin: 0px;
  }
`;

const ProfileInfo = styled.div`
  margin-bottom: 30px;
  flex-shrink: 0; /* Não deixa encolher */
  width: 100%;
`;

const ProfileName = styled.h2`
  color: #e5e7eb;
  text-align: center;
  word-break: break-word; /* Quebra palavras longas para evitar overflow */
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: 10px;
`;

const ProfileCharacter = styled.h3`
  color: #9ca3af;
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  text-align: center;
  word-break: break-word; /* Quebra palavras longas */
  font-weight: 400;
  margin-bottom: 15px;
`;

const VotesCount = styled.p`
  color: #6b7280;
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);
  margin: 0 0 10px 0;
`;

const LastUpdate = styled.p`
  color: #9ca3af;
  font-size: clamp(0.7rem, 1.2vw, 0.9rem);
  margin: 0;
  font-style: italic;
`;

const ScoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Ajustado para 3 colunas */
  gap: 30px; /* Aumentado o espaçamento */
  margin-bottom: 40px; /* Aumentado a margem */
  flex: 1;
  min-height: 0;
  
  /* Em telas menores, uma única coluna para melhor legibilidade */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
`;

const ScoreCard = styled.div`
  background: rgba(139, 92, 246, 0.15);
  border-radius: 15px;
  padding: 20px 15px;
  border: 2px solid rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Centraliza o conteúdo */
  
  @media (max-width: 480px) {
    padding: 15px;
    flex-direction: row; /* Lado a lado em telas muito pequenas */
    justify-content: space-between;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(139, 92, 246, 0.4);
    border-color: rgba(139, 92, 246, 0.6);
    background: rgba(139, 92, 246, 0.25);
  }
`;

const ScoreTitle = styled.h4`
  color: #d1d5db; /* Cor um pouco mais clara */
  font-size: clamp(0.8rem, 1.5vw, 1.1rem); /* Um pouco maior */
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;

  @media (max-width: 480px) {
    margin-bottom: 0;
  }
`;

const ScoreValue = styled.div`
  color: #a855f7;
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: baseline;
    gap: 8px;
  }
`;

const ScoreMax = styled.div`
  color: #6b7280;
  font-size: clamp(0.6rem, 1vw, 0.8rem);
  margin-left: 4px; /* Pequeno espaço */
`;

const FinalScoreContainer = styled.div`
  background: #7c3aed;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-out 0.6s both;
  flex-shrink: 0;
  border: 2px solid rgba(139, 92, 246, 0.5);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);

  @media (max-width: 768px) {
    padding: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: ${pulse} 3s ease-in-out infinite;
    pointer-events: none;
  }
`;

const FinalScoreTitle = styled.h3`
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
`;

const FinalScoreValue = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  /* Forçar cor branca para o CounterContainer dentro da nota final */
  ${CounterContainer} {
    color: white !important;
    
    .odometer {
      color: white !important;
    }
  }
`;

const FinalScoreMax = styled.div`
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  opacity: 0.9;
  position: relative;
  z-index: 1;
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
`;

const NoDataMessage = styled.div`
  color: white;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  text-align: center;
  opacity: 0.8;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
  }
`;

const ProfileAvatar = styled.img`
  width: 200px;
  height: 240px;
  margin-top: 25px;
  border-radius: 10%;
  object-fit: cover;
  border: 2px solid rgba(139, 92, 246, 0.6);
  box-shadow: 0 3px 10px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  &:hover {
    border-color: rgba(139, 92, 246, 0.8);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
    transform: scale(1.05);
  }
`;

const ProfileTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center; /* Garante que o texto dentro dele também se centralize */
    width: 100%; /* Ocupa a largura para centralizar corretamente */
    padding: 0 10px; /* Evita que o texto encoste nas bordas */
    box-sizing: border-box;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(139, 92, 246, 0.2);
  border: 2px solid rgba(139, 92, 246, 0.5);
  color: #e5e7eb;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;

  &:hover {
    background: rgba(139, 92, 246, 0.4);
    border-color: rgba(139, 92, 246, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const categoryLabels = {
  indumentaria: 'Indumentária',
  similaridade: 'Similaridade',
  qualidade: 'Qualidade',
};

const SpectatorView: React.FC = () => {
  const { state, dispatch, loadPublicProfiles } = useApp();
  const navigate = useNavigate();
  const [averages, setAverages] = useState<VoteAverages | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const currentProfile = state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile);

  // Debug logs
  useEffect(() => {
    console.log('🎭 SpectatorView - Estado atual:', {
      currentVisibleProfileId: state.currentVisibleProfile,
      totalProfiles: state.cosplayProfiles.length,
      profilesIds: state.cosplayProfiles.map(p => p.id),
      currentProfile: currentProfile ? `${currentProfile.name} (${currentProfile.character})` : 'Nenhum'
    });
  }, [state.currentVisibleProfile, state.cosplayProfiles, currentProfile]);

  const visibleProfileRef = useRef(state.currentVisibleProfile);
  useEffect(() => {
    visibleProfileRef.current = state.currentVisibleProfile;
  }, [state.currentVisibleProfile]);

  useEffect(() => {
    loadPublicProfiles();

    const pollId = setInterval(async () => {
      try {
        const response = await api.get('/voting/current-public');
        const currentVisible = response.data.current_profile;
        const newVisibleId = currentVisible?.id ? String(currentVisible.id) : null;

        if (newVisibleId !== visibleProfileRef.current) {
          dispatch({ type: 'SET_VISIBLE_PROFILE', payload: newVisibleId });
        }
      } catch (error) {
        console.error('Erro ao verificar perfil visível público:', error);
      }
    }, 3000);

    return () => clearInterval(pollId);
  }, [dispatch, loadPublicProfiles]);

  useEffect(() => {
    const fetchAverages = async (isBackground = false) => {
      if (!currentProfile) {
        setAverages(null);
        return;
      }

      if (!isBackground) {
        setLoading(true);
      }
      
      try {
        console.log(`🔄 Buscando médias para perfil ${currentProfile.id} - ${currentProfile.name}`);
        const response = await api.get(`/votes/averages/${currentProfile.id}`);
        console.log('📊 Médias recebidas:', response.data);
        setAverages(response.data);
        setLastUpdate(new Date());
      } catch (error: any) {
        console.error('❌ Erro ao buscar médias:', error);
        if (error.response?.status === 404) {
          console.log('ℹ️ Perfil sem votos, exibindo zeros');
          setAverages({ indumentaria: 0, similaridade: 0, qualidade: 0, finalAverage: 0, totalVotes: 0 });
        } else {
          setAverages({ indumentaria: 0, similaridade: 0, qualidade: 0, finalAverage: 0, totalVotes: 0 });
        }
        setLastUpdate(new Date());
      } finally {
        if (!isBackground) {
          setLoading(false);
        }
      }
    };

    fetchAverages();
    const interval = setInterval(() => fetchAverages(true), 3000);
    return () => clearInterval(interval);
  }, [currentProfile]);

  // Use o estado de loading global do AppContext, mas também o local para as médias
  if (state.loading || loading) {
    return (
      <Container>
        <LoadingMessage>Carregando notas...</LoadingMessage>
      </Container>
    );
  }

  if (!currentProfile) {
    if (state.cosplayProfiles.length > 0 && !state.currentVisibleProfile) {
        return (
            <Container>
                <NoDataMessage>
                    Aguardando o próximo perfil...
                </NoDataMessage>
            </Container>
        );
    }

    return (
      <Container>
        <NoDataMessage>
          {state.cosplayProfiles.length === 0 
            ? 'Carregando perfis...' 
            : `Nenhum perfil selecionado para exibição (${state.cosplayProfiles.length} perfis disponíveis)`
          }
          <br />
          <small style={{ opacity: 0.7, fontSize: '0.8em' }}>
            ID visível: {state.currentVisibleProfile || 'Nenhum'}
          </small>
        </NoDataMessage>
      </Container>
    );
  }

  return (
    <Container>
      <CardContainer>
        <CardHeader>
          <BackButton onClick={() => navigate('/login')}>Voltar</BackButton>
        </CardHeader>
        
        <ProfileInfo>
          <ProfileInfoContainer>
            <ProfileAvatar 
              src={currentProfile.image} 
              alt={`Avatar de ${currentProfile.name}`}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/80x80?text=👤';
              }}
            />
            <ProfileTextInfo>
              <ProfileName>{currentProfile.name}</ProfileName>
              <ProfileCharacter>{currentProfile.character}</ProfileCharacter>
              <VotesCount>
                {averages?.totalVotes || 0} voto{(averages?.totalVotes || 0) !== 1 ? 's' : ''} computado{(averages?.totalVotes || 0) !== 1 ? 's' : ''}
              </VotesCount>
              {lastUpdate && (
                <LastUpdate>
                  Última atualização: {lastUpdate.toLocaleTimeString()}
                </LastUpdate>
              )}
            </ProfileTextInfo>
          </ProfileInfoContainer>
        </ProfileInfo>

        <ScoresGrid>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <ScoreCard key={key}>
              <ScoreTitle>{label}</ScoreTitle>
              <ScoreValue>
                <CounterRoll 
                  value={averages ? averages[key as keyof typeof categoryLabels] : 0}
                  decimals={1}
                  fontSize="clamp(1.5rem, 3vw, 2.5rem)"
                />
              </ScoreValue>
              <ScoreMax>/ 10.0</ScoreMax>
            </ScoreCard>
          ))}
        </ScoresGrid>

        <FinalScoreContainer>
          <FinalScoreTitle>Nota Final</FinalScoreTitle>
          <FinalScoreValue>
            <CounterRoll 
              value={averages ? averages.finalAverage : 0}
              decimals={2} /* Aumentar precisão da nota final */
              fontSize="clamp(2.5rem, 6vw, 4.5rem)"
            />
          </FinalScoreValue>
          <FinalScoreMax>/ 10.0</FinalScoreMax>
        </FinalScoreContainer>
      </CardContainer>
    </Container>
  );
};

export default SpectatorView;