import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { LogOut, Star, Send, Edit3, CheckCircle, Grid3X3, Grid2X2 } from 'lucide-react';
import type { Scores } from '../types'
import { votingService } from '../services/api'

const JurorContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100dvh; /* Usa a altura da viewport dinâmica para evitar overflow */
  box-sizing: border-box;
`;

const Header = styled.header`
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px; /* Aumenta um pouco para telas maiores */
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Permite que os itens quebrem a linha em telas pequenas */
  gap: 15px;

  @media (max-width: 768px) {
    padding: 0 15px;
    justify-content: center; /* Centraliza quando quebrar a linha */
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  flex-shrink: 0; /* Evita que o título encolha */

  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 100%; /* Ocupa a largura toda em mobile */
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LayoutButton = styled.button`
  background: var(--accent-purple);
  color: var(--bg-primary);
  border: 1px solid var(--accent-purple);
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--surface-hover);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.9rem;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const LogoutButton = styled.button`
  background: rgba(239, 68, 68, 0.2);
  color: var(--text-primary);
  border: 1px solid var(--error);
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.9rem;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const MainContent = styled.main`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const ProfileSection = styled.div<{ isThreeColumn?: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.isThreeColumn ? '1fr 0.4fr 0.5fr' : '2fr 1fr'};
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: ${props => props.isThreeColumn ? '1fr 0.6fr 0.7fr' : '1.5fr 1fr'};
    gap: 15px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 400px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    min-height: 250px;
    max-height: 400px;
  }
`;

const ProfileImageThreeColumn = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const ProfileName = styled.h2`
  margin: 0 0 10px 0;
  color: var(--text-primary);
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    text-align: center;
  }
`;

const ProfileDetail = styled.div`
  margin-bottom: 15px;
  font-size: 1.1rem;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: var(--accent-purple);
`;

const DetailValue = styled.span`
  color: var(--text-primary);
  margin-left: 8px;
`;

const DescriptionWrapper = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 10px 0 0 0;
  font-size: 1rem;

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
    margin: 15px 0 10px 0;
  }

  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.3rem; }
  h3 { font-size: 1.1rem; }

  ul, ol {
    margin: 10px 0;
    padding-left: 20px;
  }

  li {
    margin: 5px 0;
  }

  p {
    margin: 10px 0;
  }

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  em {
    font-style: italic;
  }
`;

const Description: React.FC<{ children: string }> = ({ children }) => (
  <DescriptionWrapper>
    <ReactMarkdown>{children}</ReactMarkdown>
  </DescriptionWrapper>
);



const DescriptionSection = styled.div`
  padding: 30px;
  background: var(--bg-secondary);
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--bg-secondary);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid var(--surface);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  height: 100%;

  @media (max-width: 1024px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const RightContainer = styled.div`
  background: var(--bg-secondary);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid var(--surface);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-secondary);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid var(--surface);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  height: 100%;

  @media (max-width: 1024px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const InfoContainer = styled.div<{ $maxHeight?: string }>`
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid var(--surface);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  height: 100%;
  max-height: ${props => props.$maxHeight || 'none'};
  overflow-y: auto;
  transition: max-height 1s ease;

  @media (max-width: 1024px) {
    padding: 20px;
    border-radius: 12px;
    order: 3; /* Move a descrição para depois da votação em mobile */
  }

  /* Personalizar scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--bg-primary);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--surface);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--surface-hover);
  }
`;

const VotingContainer = styled.div`
  background: var(--bg-secondary);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid var(--surface);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  height: 100%;

  @media (max-width: 1024px) {
    padding: 20px;
    border-radius: 12px;
    order: 2; /* Move a votação para antes da descrição em mobile */
  }
`;

const VotingTitle = styled.h3`
  margin: 0 0 25px 0;
  color: var(--text-primary);
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CriteriaGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
`;

const CriteriaCard = styled.div`
  background: var(--bg-primary);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--surface);
  display: flex;
  flex-wrap: wrap; /* Permite quebra em telas pequenas */
  align-items: center;
  gap: 12px;
`;

const CriteriaInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CriteriaLabel = styled.label`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const CriteriaDescription = styled.p`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.3;
`;

const ScoreInput = styled.input`
  width: 80px;
  padding: 8px;
  border: 2px solid var(--surface);
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  background: var(--bg-secondary);
  color: var(--text-primary);
  margin-left: auto;

  @media (max-width: 480px) {
    width: 60px; /* Reduz um pouco em telas muito pequenas */
    margin-left: 0; /* Alinha à esquerda quando quebrar */
  }

  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.1);
  }

  &:invalid {
    border-color: var(--error);
  }
`;



const ButtonsSection = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'success' }>`
  padding: 15px 30px;
  border: none;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  min-width: 150px;
  justify-content: center;

  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: var(--accent-green);
          color: var(--bg-primary);
          &:hover { 
            background: var(--success); 
            transform: translateY(-2px); 
            box-shadow: 0 6px 20px rgba(110, 231, 183, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: var(--accent-purple);
          color: var(--text-primary);
          border: 1px solid var(--surface-hover);
          &:hover { 
            background: var(--surface-hover); 
            transform: translateY(-2px); 
          }
        `;
      default:
        return `
          background: var(--accent-purple);
          color: var(--bg-primary);
          &:hover { 
            background: var(--accent-purple); 
            transform: translateY(-2px); 
            box-shadow: 0 6px 20px rgba(167, 139, 250, 0.3);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
    transform: none;
  }
`;

const NoProfileMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--surface);
`;

const StatusMessage = styled.div<{ type: 'success' | 'info' }>`
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;

  ${props => props.type === 'success' ? `
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
    border: 1px solid var(--success);
  ` : `
    background: var(--bg-secondary);
    color: #var(--text-secondary);
    border: 1px solid var(--surface);
  `}
`;

const criteriaLabels = {
  indumentaria: {
    title: 'INDUMENTÁRIA',
    description: 'Qualidade de acabamento das roupas, maquiagem, penteado e acessórios.'
  },
  similaridade: {
    title: 'SIMILARIDADE',
    description: 'Fidelidade do cosplay ao personagem original, com base nas referências.'
  },
  qualidade: {
    title: 'QUALIDADE',
    description: 'Detalhes da vestimenta e desenvoltura do cosplayer ao desfilar.'
  }
};

const JurorVoting: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { state, submitVote } = useApp();
  
  const [isThreeColumn, setIsThreeColumn] = useState(() => {
    return window.innerWidth > 1024; // Inicia com 2 colunas em telas menores que 1024px
  });
  
  const [scores, setScores] = useState<Scores>({
    indumentaria: 0,
    similaridade: 0,
    qualidade: 0
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [descriptionMaxHeight, setDescriptionMaxHeight] = useState<string>('0px'); // Inicia com 0 para modo 3 colunas
  
  const imageContainerRef = React.useRef<HTMLDivElement>(null);

  // Efeito para enviar ping de presença
  useEffect(() => {
    const pingInterval = setInterval(() => {
      // A função submitVote já existe no contexto e usa a API correta
      // Vamos reusar o serviço de votação para o ping
      // (Idealmente, isso estaria em um `presenceService`)
      const sendPing = async () => {
        try {
          await votingService.pingPresence();
        } catch (error) {
          console.warn("Falha no ping de presença", error);
        }
      };
      sendPing();
    }, 5000); // Envia um ping a cada 5 segundos
    return () => clearInterval(pingInterval);
  }, []);

  const currentProfile = state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile);
  const jurorId = authState.user?.id || '';

  // Efeito para monitorar altura da coluna de imagem e aplicar à descrição
  useEffect(() => {
    if (isThreeColumn && imageContainerRef.current && currentProfile) {
      let isCalculating = false; // Flag para evitar loops
      
      const updateDescriptionHeight = () => {
        if (isCalculating) return; // Evita loops
        isCalculating = true;
        
        // Temporariamente remove o max-height para calcular altura natural da imagem
        setDescriptionMaxHeight('0px');
        
        // Aguarda alguns frames para garantir que o DOM atualizou
        setTimeout(() => {
          if (imageContainerRef.current) {
            const imageHeight = imageContainerRef.current.offsetHeight;
            if (imageHeight > 0) {
              setDescriptionMaxHeight(`${imageHeight}px`);
            }
          }
          isCalculating = false;
        }, 100);
      };

      // Calcular apenas uma vez quando o perfil muda
      const timeout = setTimeout(updateDescriptionHeight, 200);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setDescriptionMaxHeight('none');
    }
  }, [isThreeColumn, currentProfile?.id]); // Só recalcula quando muda o perfil

  useEffect(() => {
    if (currentProfile && jurorId && state.votes) {
      // Busca o voto existente diretamente do estado global de votos
      const existingVote = state.votes.find(v => v.cosplayId === currentProfile.id && v.jurorId === jurorId);

      // Se o usuário já estiver editando, não sobrescreva os scores locais.
      // Isso evita que o polling apague o que está sendo digitado.
      if (isEditing) {
        return;
      }

      if (existingVote) {
        setScores(existingVote.scores);
        setHasVoted(existingVote.submitted);
        setIsEditing(false);
      } else {
        setScores({
          indumentaria: 0,
          similaridade: 0,
          qualidade: 0
        });
        setHasVoted(false);
        setIsEditing(false);
      }
    }
    // A dependência agora é o perfil atual e a lista de votos.
    // Isso garante que o efeito só rode quando o perfil visível mudar
    // ou quando a lista de votos for atualizada (ex: após login).
  }, [currentProfile, jurorId, state.votes, isEditing]);

  const handleScoreChange = (criteria: keyof Scores, value: number) => {
    setScores(prev => ({
      ...prev,
      [criteria]: value
    }));
    setIsEditing(true);
  };

  const handleSubmitVote = async () => {
    if (!currentProfile || !jurorId) return;

    try {
      // Usar submitVote que lida com create/update automaticamente
      await submitVote(currentProfile.id, scores, true);
      setHasVoted(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao enviar voto:', error);
      // Aqui poderíamos mostrar uma mensagem de erro para o usuário
    }
  };

  const handleEditVote = () => {
    setIsEditing(true);
    setHasVoted(false);
  };

  const isValidScore = (score: number) => score >= 1 && score <= 10;
  const allScoresValid = Object.values(scores).every(isValidScore);

  const toggleLayout = () => {
    setIsThreeColumn(!isThreeColumn);
  };

  const handleLogout = () => {
    logout();
  };

  if (!currentProfile) {
    return (
      <JurorContainer>
        <Header>
          <HeaderContent>
            <Title>Sistema de Votação - Jurado</Title>
            <UserInfo>
              <span>Olá, {authState.user?.name}</span>
              <LayoutButton onClick={toggleLayout}>
                {isThreeColumn ? <Grid2X2 size={16} /> : <Grid3X3 size={16} />}
                {isThreeColumn ? '2 Colunas' : '3 Colunas'}
              </LayoutButton>
              <LogoutButton onClick={handleLogout}>
                <LogOut size={16} />
                Sair
              </LogoutButton>
            </UserInfo>
          </HeaderContent>
        </Header>

        <MainContent>
          <NoProfileMessage>
            <Star size={48} style={{ margin: '0 auto 20px', display: 'block', color: '#cbd5e0' }} />
            <h3>Nenhum cosplay disponível para votação</h3>
            <p>Aguarde o administrador selecionar um perfil para votação.</p>
          </NoProfileMessage>
        </MainContent>
      </JurorContainer>
    );
  }

  return (
    <JurorContainer>
      <Header>
        <HeaderContent>
          <Title>Sistema de Votação - Jurado</Title>
          <UserInfo>
            <span>Olá, {authState.user?.name}</span>
            <LayoutButton onClick={toggleLayout}>
              {isThreeColumn ? <Grid2X2 size={16} /> : <Grid3X3 size={16} />}
              {isThreeColumn ? '2 Colunas' : '3 Colunas'}
            </LayoutButton>
            <LogoutButton onClick={handleLogout}>
              <LogOut size={16} />
              Sair
            </LogoutButton>
          </UserInfo>
        </HeaderContent>
      </Header>

      <MainContent>
        {hasVoted && !isEditing && (
          <StatusMessage type="success">
            <CheckCircle size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Voto enviado com sucesso! Você pode editar sua avaliação se necessário.
          </StatusMessage>
        )}

        <ProfileSection isThreeColumn={isThreeColumn}>
          {isThreeColumn ? (
            <>
              <ImageContainer ref={imageContainerRef}>
                <ProfileImageThreeColumn 
                  src={currentProfile.image} 
                  alt={currentProfile.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sem+Imagem';
                  }}
                />
              </ImageContainer>
              
              <InfoContainer $maxHeight={descriptionMaxHeight}>
                <ProfileName>{currentProfile.name}</ProfileName>
                
                <ProfileDetail>
                  <DetailLabel>Personagem:</DetailLabel>
                  <DetailValue>{currentProfile.character}</DetailValue>
                </ProfileDetail>
                
                <ProfileDetail>
                  <DetailLabel>Anime/Série:</DetailLabel>
                  <DetailValue>{currentProfile.anime}</DetailValue>
                </ProfileDetail>

                <ProfileDetail>
                  <DetailLabel>Descrição:</DetailLabel>
                </ProfileDetail>
                <Description>{currentProfile.description}</Description>
              </InfoContainer>

              <VotingContainer>
                <VotingTitle>Avaliação por Critérios</VotingTitle>
                
                <CriteriaGrid>
                  {Object.entries(criteriaLabels).map(([key, info]) => (
                    <CriteriaCard key={key}>
                      <CriteriaInfo>
                        <CriteriaLabel>{info.title}</CriteriaLabel>
                        <CriteriaDescription>{info.description}</CriteriaDescription>
                      </CriteriaInfo>
                      <ScoreInput
                        type="number"
                        min="1"
                        max="10"
                        value={scores[key as keyof Scores] || ''}
                        onChange={(e) => handleScoreChange(
                          key as keyof Scores, 
                          parseInt(e.target.value) || 0
                        )}
                        disabled={hasVoted && !isEditing}
                        placeholder="1-10"
                      />
                    </CriteriaCard>
                  ))}
                </CriteriaGrid>

                <ButtonsSection>
                  {hasVoted && !isEditing ? (
                    <ActionButton variant="secondary" onClick={handleEditVote}>
                      <Edit3 size={20} />
                      Editar Avaliação
                    </ActionButton>
                  ) : (
                    <ActionButton 
                      variant={hasVoted ? "success" : "primary"}
                      onClick={handleSubmitVote}
                      disabled={!allScoresValid}
                    >
                      <Send size={20} />
                      {isEditing ? 'Atualizar Voto' : 'Enviar Voto'}
                    </ActionButton>
                  )}
                </ButtonsSection>

                {!allScoresValid && (
                  <StatusMessage type="info">
                    Por favor, preencha todas as notas de 1 a 10 antes de enviar.
                  </StatusMessage>
                )}
              </VotingContainer>
            </>
          ) : (
            <>
              <LeftContainer>
                <ImageSection>
                  <ProfileImage 
                    src={currentProfile.image} 
                    alt={currentProfile.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sem+Imagem';
                    }}
                  />
                </ImageSection>
                
                <InfoSection>
                  <ProfileName>{currentProfile.name}</ProfileName>
                  
                  <ProfileDetail>
                    <DetailLabel>Personagem:</DetailLabel>
                    <DetailValue>{currentProfile.character}</DetailValue>
                  </ProfileDetail>
                  
                  <ProfileDetail>
                    <DetailLabel>Anime/Série:</DetailLabel>
                    <DetailValue>{currentProfile.anime}</DetailValue>
                  </ProfileDetail>
                </InfoSection>
              </LeftContainer>

              <RightContainer>
                <VotingTitle>Avaliação por Critérios</VotingTitle>
                
                <CriteriaGrid>
                  {Object.entries(criteriaLabels).map(([key, info]) => (
                    <CriteriaCard key={key}>
                      <CriteriaInfo>
                        <CriteriaLabel>{info.title}</CriteriaLabel>
                        <CriteriaDescription>{info.description}</CriteriaDescription>
                      </CriteriaInfo>
                      <ScoreInput
                        type="number"
                        min="1"
                        max="10"
                        value={scores[key as keyof Scores] || ''}
                        onChange={(e) => handleScoreChange(
                          key as keyof Scores, 
                          parseInt(e.target.value) || 0
                        )}
                        disabled={hasVoted && !isEditing}
                        placeholder="1-10"
                      />
                    </CriteriaCard>
                  ))}
                </CriteriaGrid>

                <ButtonsSection>
                  {hasVoted && !isEditing ? (
                    <ActionButton variant="secondary" onClick={handleEditVote}>
                      <Edit3 size={20} />
                      Editar Avaliação
                    </ActionButton>
                  ) : (
                    <ActionButton 
                      variant={hasVoted ? "success" : "primary"}
                      onClick={handleSubmitVote}
                      disabled={!allScoresValid}
                    >
                      <Send size={20} />
                      {isEditing ? 'Atualizar Voto' : 'Enviar Voto'}
                    </ActionButton>
                  )}
                </ButtonsSection>

                {!allScoresValid && (
                  <StatusMessage type="info">
                    Por favor, preencha todas as notas de 1 a 10 antes de enviar.
                  </StatusMessage>
                )}
              </RightContainer>
            </>
          )}
        </ProfileSection>

        {!isThreeColumn && (
          <DescriptionSection>
            <VotingTitle>Descrição do Cosplay</VotingTitle>
            <Description>{currentProfile.description}</Description>
          </DescriptionSection>
        )}
      </MainContent>
    </JurorContainer>
  );
};

export default JurorVoting;