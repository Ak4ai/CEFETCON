import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Plus, Edit, Trash2, Eye, LogOut, Users, Trophy, BarChart3, Award, User, X, Play, Square, Clock } from 'lucide-react';
import type { CosplayProfile } from '../types';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh; /* Garante que o container ocupe a altura da viewport */
  width: 100%;
  background: var(--bg-primary);
  color: var(--text-primary);
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0;
    position: relative;
  }
`;

const Header = styled.header`
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 15px;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    
    /* Em telas muito pequenas, manter em linha mas compacto */
    @media (max-width: 480px) {
      flex-direction: row;
      gap: 10px;
    }
  }
  
  @media (min-width: 768px) {
    padding: 0 3%;
  }
  
  @media (min-width: 1200px) {
    padding: 0 5%;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    
    span {
      font-size: 0.9rem;
    }
  }
`;

const ModeSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 1px solid var(--surface);
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ModeSwitchLabel = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
`;

const ModeSwitchButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const ModeSwitchButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  
  ${props => props.$active ? `
    background: var(--accent-purple);
    color: white;
    box-shadow: 0 2px 8px rgba(167, 139, 250, 0.3);
  ` : `
    background: var(--surface);
    color: var(--text-secondary);
    
    &:hover {
      background: var(--surface-hover);
      color: var(--text-primary);
    }
  `}
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
  transition: background 0.3s ease;
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.9rem;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MainContent = styled.main`
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 30px 2%;
  box-sizing: border-box;
  overflow-x: hidden;
  flex-grow: 1; /* Faz o conteúdo principal crescer para preencher o espaço */
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
  
  @media (max-width: 480px) {
    padding: 15px 10px;
  }
  
  @media (min-width: 768px) {
    padding: 30px 3%;
  }
  
  @media (min-width: 1200px) {
    padding: 30px 5%;
  }
`;

const Section = styled.section`
  background: var(--bg-secondary);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--surface);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 15px 10px;
    margin-bottom: 15px;
    border-radius: 8px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AddButton = styled.button`
  background: var(--accent-green);
  color: var(--bg-primary);
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--success);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(110, 231, 183, 0.3);
  }
`;

const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  @media (max-width: 320px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ProfileCard = styled.div`
  border: 1px solid var(--surface);
  background: var(--bg-tertiary);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
    border-color: var(--accent-purple);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProfileContent = styled.div`
  padding: 15px;
  background: var(--bg-secondary);
`;

const ProfileName = styled.h3`
  margin: 0 0 5px 0;
  color: var(--text-primary);
`;

const ProfileDetails = styled.p`
  margin: 0 0 15px 0;
  color: var(--text-secondary);
  font-size: 14px;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const BonusPenaltySection = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 10px;
  margin: 15px 0;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.2s ease;
  padding: 8px 15px;
  border-radius: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--surface);

  &:hover {
    background: var(--surface);
    border-color: var(--accent-purple);
    transform: translateY(-1px);
  }

  span {
    user-select: none;
  }
`;

const TimerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 4px 8px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const TimerDisplay = styled.div<{ $isOvertime?: boolean }>`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  color: ${props => props.$isOvertime ? '#ef4444' : '#667eea'};
  min-width: 150px;
  text-align: center;
  padding: 4px 8px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 2px solid ${props => props.$isOvertime ? '#ef4444' : '#667eea'};
`;

const TimerButton = styled.button<{ $isStop?: boolean }>`
  padding: 6px 10px;
  background: ${props => props.$isStop ? '#ef4444' : '#10b981'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$isStop ? '#dc2626' : '#059669'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const TimePenaltyInput = styled.input`
  width: 80px;
  padding: 8px 12px;
  border: 1px solid var(--surface);
  border-radius: 6px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  text-align: center;

  &:focus {
    outline: none;
    border-color: var(--accent-purple);
  }
`;

const TimePenaltyLabel = styled.span`
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: var(--accent-purple);
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: var(--accent-purple);
          color: var(--bg-primary);
          &:hover { 
            background: var(--info); 
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
          }
        `;
      case 'danger':
        return `
          background: var(--accent-purple);
          color: var(--bg-primary);
          &:hover { 
            background: var(--error); 
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(244, 114, 182, 0.3);
          }
        `;
      default:
        return `
          background: var(--surface);
          color: var(--text-primary);
          &:hover { 
            background: var(--surface-hover); 
            transform: translateY(-1px);
          }
        `;
    }
  }}
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--bg-secondary);
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--surface);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid var(--surface);
  border-radius: 8px;
  font-size: 16px;
  background: var(--bg-tertiary);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid var(--surface);
  border-radius: 8px;
  font-size: 16px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1);
  }

  option {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 2px solid var(--surface);
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  background: var(--bg-tertiary);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;

  ${props => props.$variant === 'primary' ? `
    background: var(--accent-purple);
    color: var(--bg-primary);
    &:hover { 
      background: var(--accent-purple); 
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3);
    }
  ` : `
    background: var(--surface);
    color: var(--text-primary);
    border: 1px solid var(--surface-hover);
    &:hover { 
      background: var(--surface-hover); 
    }
  `}
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 25px;
  }
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
`;

const StatCard = styled.div`
  background: var(--accent-purple);
  color: var(--bg-primary);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(96, 165, 250, 0.2);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const VotesTable = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  table-layout: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;
  
  /* Tabela do Ranking Final - largura mínima menor */
  .ranking-table & {
    @media (max-width: 768px) {
      min-width: 550px; /* Largura mínima menor para ranking */
    }
    
    @media (max-width: 480px) {
      min-width: 480px; /* Ainda menor em smartphones */
    }
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-width: 700px; /* Força scroll horizontal em tablets */
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    min-width: 600px; /* Força scroll horizontal em smartphones */
  }
`;

const VotesTableHeader = styled.th`
  padding: 8px 12px;
  text-align: left;
  border-bottom: 2px solid var(--accent-purple);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 100px;
  
  /* Larguras específicas por coluna - Estatísticas de Votação */
  &:nth-child(1) { /* Jurado */
    min-width: 120px;
  }
  
  &:nth-child(2) { /* Perfil Avaliado */
    min-width: 140px;
  }
  
  &:nth-child(3) { /* Nota Média */
    min-width: 100px;
  }
  
  &:nth-child(4) { /* Notas Detalhadas */
    min-width: 150px;
  }
  
  &:nth-child(5) { /* Status */
    min-width: 90px;
  }
  
  &:nth-child(6) { /* Data do Voto */
    min-width: 130px;
  }
  
  /* Tabela do Ranking Final - colunas diferentes */
  .ranking-table &:nth-child(1) { /* Posição */
    min-width: 80px;
    text-align: center;
  }
  
  .ranking-table &:nth-child(2) { /* Participante */
    min-width: 130px;
  }
  
  .ranking-table &:nth-child(3) { /* Personagem */
    min-width: 130px;
  }
  
  .ranking-table &:nth-child(4) { /* Nota Final */
    min-width: 100px;
    text-align: center;
  }
  
  .ranking-table &:nth-child(5) { /* Total de Votos */
    min-width: 110px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 4px 6px;
    font-size: 0.75rem;
  }
`;

const VotesTableCell = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid var(--surface);
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 100px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  /* Larguras específicas por coluna - Estatísticas de Votação */
  &:nth-child(1) { /* Jurado */
    min-width: 120px;
  }
  
  &:nth-child(2) { /* Perfil Avaliado */
    min-width: 140px;
  }
  
  &:nth-child(3) { /* Nota Média */
    min-width: 100px;
    text-align: center;
  }
  
  &:nth-child(4) { /* Notas Detalhadas */
    min-width: 150px;
    max-width: 200px;
  }
  
  &:nth-child(5) { /* Status */
    min-width: 90px;
    text-align: center;
  }
  
  &:nth-child(6) { /* Data do Voto */
    min-width: 130px;
  }
  
  /* Tabela do Ranking Final - colunas diferentes */
  .ranking-table &:nth-child(1) { /* Posição */
    min-width: 80px;
    text-align: center;
  }
  
  .ranking-table &:nth-child(2) { /* Participante */
    min-width: 130px;
  }
  
  .ranking-table &:nth-child(3) { /* Personagem */
    min-width: 130px;
  }
  
  .ranking-table &:nth-child(4) { /* Nota Final */
    min-width: 100px;
    text-align: center;
  }
  
  .ranking-table &:nth-child(5) { /* Total de Votos */
    min-width: 110px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 4px 6px;
    font-size: 0.75rem;
  }
  
  /* Para células de texto longo, permitir quebra */
  &.text-wrap {
    white-space: normal;
    max-width: 200px;
    
    @media (max-width: 768px) {
      max-width: 150px;
    }
    
    @media (max-width: 480px) {
      max-width: 120px;
    }
  }
`;

const VotesTableRow = styled.tr`
  &:hover {
    background: var(--surface);
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Garantir que o container não extrapole */
  box-sizing: border-box;
  position: relative;
  
  @media (max-width: 768px) {
    margin: 0 -10px; /* Compensa o padding do container pai */
    border-radius: 0;
    
    /* Barra de scroll mais visível em mobile */
    &::-webkit-scrollbar {
      height: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--accent-purple);
      border-radius: 4px;
    }
  }
  
  @media (max-width: 480px) {
    margin: 0 0px; /* Usa mais espaço disponível */
    
    /* Barra de scroll ainda mais destacada em smartphones */
    &::-webkit-scrollbar {
      height: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--accent-purple);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--bg-tertiary);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--accent-purple);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.8);
  }
`;

const CurrentProfileBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #48bb78;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: #718096;
  font-style: italic;
  padding: 20px;
`;

// Wrapper for timer and badge above statistics
const WrapAbove = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    gap: 30px;
  }
`;

// Componentes para seleção horizontal de perfis
const ProfileSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileSelectorLabel = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 18px;
  margin-bottom: 10px;
`;

const ProfilesContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 20px 10px;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #0f172a;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #a466eaff;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #818183ff;
  }
`;

const ProfileSelectorCard = styled.div<{ $isSelected?: boolean; $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  border-radius: 15px;
  min-width: 140px;
  cursor: pointer;
  border: 3px solid ${props => {
    if (props.$isActive) return '#48bb78';
    if (props.$isSelected) return '#667eea';
    return '#0f172a';
  }};
  background: ${props => {
    if (props.$isActive) return 'var(--accent-green)';
    if (props.$isSelected) return 'var(--accent-purple)';
    return '#0f172a';
  }};
  color: ${props => (props.$isSelected || props.$isActive) ? 'white' : 'white'};
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
    border-color: ${props => props.$isActive ? '#48bb78' : '#667eea'};
  }
  
  ${props => props.$isActive && `
    &::before {
      content: "ATIVO";
      position: absolute;
      top: -12px;
      right: -12px;
      background: #e53e3e;
      color: white;
      font-size: 11px;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `}
`;

const ProfileIcon = styled.div<{ $isSelected?: boolean; $isActive?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => {
    if (props.$isActive) return 'rgba(255, 255, 255, 0.25)';
    if (props.$isSelected) return 'rgba(255, 255, 255, 0.25)';
    return 'var(--accent-purple)';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: white;
  font-size: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
`;

const ProfileSelectorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileSelectorName = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  line-height: 1.3;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
`;

const ProfileSelectorCharacter = styled.div`
  font-size: 11px;
  opacity: 0.85;
  text-align: center;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
`;

const NoneOption = styled(ProfileSelectorCard)`
  background: #090d18ff;
  border: 3px dashed #cbd5e0;
  color: #718096;
  
  &:hover {
    border-color: #a0aec0;
    background: #edf2f7;
    color: #4a5568;
  }
`;

const DetailedScores = styled.span`
  color: white;
  font-size: 13px;
  font-family: 'Courier New', monospace;
  background: var(--bg-tertiary);
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: inline-block;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ClearRankingButton = styled.button`
  background: var(--accent-purple);
  color: var(--bg-primary);
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  margin-left: auto;
  transition: all 0.3s ease;

  &:hover {
    background: var(--error);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(244, 114, 182, 0.3);
  }
`;

const AdminDashboard: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { state, addCosplay, updateCosplay, deleteCosplay, setVisibleProfile, clearRanking, setVotingMode, setBonusPenalty, setTimePenalty } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<CosplayProfile | null>(null);

  // Estado do cronômetro
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timePenaltyValue, setTimePenaltyValue] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    character: '',
    anime: '',
    image_urls: [''],
    description: '',
    modality: state.currentMode
  });

  // Debug: Verificar ranking e filtro
  useEffect(() => {
    console.log('🔍 [AdminDashboard] Modo atual:', state.currentMode);
    console.log('🔍 [AdminDashboard] Total de perfis no ranking:', state.ranking.length);
    console.log('🔍 [AdminDashboard] Perfis no ranking COMPLETOS:', 
      state.ranking.map(p => ({ 
        name: p.name, 
        modality: p.modality,
        final_score: p.final_score,
        total_votes: p.total_final_votes,
        matches: p.modality === state.currentMode
      }))
    );
    const filteredRanking = state.ranking.filter(p => p.modality === state.currentMode);
    console.log('🔍 [AdminDashboard] Perfis FILTRADOS:', 
      filteredRanking.map(p => ({ 
        name: p.name, 
        modality: p.modality,
        final_score: p.final_score,
        total_votes: p.total_final_votes
      }))
    );
  }, [state.ranking, state.currentMode]);

  // Filtrar perfis pela modalidade atual
  const filteredProfiles = state.cosplayProfiles.filter(
    profile => profile.modality === state.currentMode
  );

  // Handler para alternar entre modalidades
  const handleModeChange = async (newMode: 'desfile' | 'presentation') => {
    try {
      await setVotingMode(newMode);
      console.log(`✅ Modo alterado para: ${newMode}`);
    } catch (error) {
      console.error('❌ Erro ao alterar modo:', error);
      alert('Erro ao alterar modo de votação. Tente novamente.');
    }
  };

  // Handler para atualizar bônus/penalidade
  const handleBonusPenaltyChange = async (profileId: string, type: 'bonus' | 'penalty') => {
    const profile = state.cosplayProfiles.find(p => p.id === profileId);
    if (!profile) return;

    try {
      let newBonus = profile.bonus;
      let newPenalty = profile.penalty;

      if (type === 'bonus') {
        newBonus = !newBonus;
      } else {
        newPenalty = !newPenalty;
      }

      console.log('🔍 Enviando dados:', { 
        profileId, 
        type,
        newBonus, 
        newPenalty,
        bonus_type: typeof newBonus,
        penalty_type: typeof newPenalty
      });

      await setBonusPenalty(profileId, newBonus, newPenalty);
      console.log(`✅ ${type === 'bonus' ? 'Bônus' : 'Penalidade'} atualizado para ${profile.name}`);
    } catch (error) {
      console.error(`❌ Erro ao atualizar ${type}:`, error);
      alert(`Erro ao atualizar ${type === 'bonus' ? 'bônus' : 'penalidade'}. Tente novamente.`);
    }
  };

  // Funções do cronômetro
  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = async () => {
    if (isTimerRunning && timerIntervalRef.current && state.currentVisibleProfile) {
      clearInterval(timerIntervalRef.current);
      setIsTimerRunning(false);
      
      // Calcular penalidade se passou de 3 minutos (180 segundos)
      if (timerSeconds > 180) {
        const overtimeSeconds = timerSeconds - 180;
        const penalty = overtimeSeconds * 0.3;
        const finalPenalty = parseFloat(penalty.toFixed(2));
        setTimePenaltyValue(finalPenalty);
        
        // Salvar a penalidade no banco de dados
        try {
          await setTimePenalty(state.currentVisibleProfile, finalPenalty);
          console.log('✅ Penalidade de tempo salva:', finalPenalty);
        } catch (error) {
          console.error('❌ Erro ao salvar penalidade de tempo:', error);
        }
      }
    }
  };

  const resetTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setTimePenaltyValue(0);
  };

  // Cleanup do timer ao desmontar componente
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Resetar timer quando mudar de perfil e carregar penalidade salva do banco
  useEffect(() => {
    resetTimer();
    
    // Carregar penalidade salva do banco de dados para este perfil
    if (state.currentVisibleProfile) {
      const activeProfile = state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile);
      if (activeProfile && activeProfile.time_penalty) {
        setTimePenaltyValue(activeProfile.time_penalty);
      }
    }
  }, [state.currentVisibleProfile, state.cosplayProfiles]);

  // Formatar tempo para exibição (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimePenaltyChange = async (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && state.currentVisibleProfile) {
      setTimePenaltyValue(numValue);
      
      // Salvar no banco de dados
      try {
        await setTimePenalty(state.currentVisibleProfile, numValue);
        console.log('✅ Penalidade de tempo atualizada manualmente:', numValue);
      } catch (error) {
        console.error('❌ Erro ao atualizar penalidade de tempo:', error);
      }
    }
  };

  const handleOpenModal = (profile?: CosplayProfile) => {
    if (profile) {
      setEditingProfile(profile);
      setFormData({
        name: profile.name,
        character: profile.character,
        anime: profile.anime,
        image_urls: profile.image_urls.length > 0 ? profile.image_urls : [''],
        description: profile.description,
        modality: profile.modality
      });
    } else {
      setEditingProfile(null);
      setFormData({
        name: '',
        character: '',
        anime: '',
        image_urls: [''],
        description: '',
        modality: state.currentMode // Define modalidade atual como padrão
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProfile(null);
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...formData.image_urls];
    newImageUrls[index] = value;
    setFormData({ ...formData, image_urls: newImageUrls });
  };

  const addImageUrlInput = () => {
    setFormData({ ...formData, image_urls: [...formData.image_urls, ''] });
  };

  const removeImageUrlInput = (index: number) => {
    const newImageUrls = formData.image_urls.filter((_, i) => i !== index);
    setFormData({ ...formData, image_urls: newImageUrls });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const image_urls = formData.image_urls.filter(url => url.trim() !== '');

    console.log('🔍 [AdminDashboard] Submetendo formulário:', {
      isEditing: !!editingProfile,
      formData: formData,
      modality: formData.modality
    });

    if (editingProfile) {
      updateCosplay(editingProfile.id, {
        ...formData,
        image_urls: image_urls,
        modality: formData.modality
      });
    } else {
      addCosplay({
        ...formData,
        image_urls: image_urls,
        modality: formData.modality,
        bonus: false,
        penalty: false,
      });
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      deleteCosplay(id);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleVisibilityChange = async (newProfileId: string) => {
    try {
      await setVisibleProfile(newProfileId || null);
      console.log('✅ Perfil alterado com sucesso! Interface atualizada.');
    } catch (error) {
      console.error('❌ Erro ao alterar perfil:', error);
      alert('Erro ao alterar perfil. Tente novamente.');
    }
  };

  const handleClearRanking = async () => {
    if (confirm('⚠️ ATENÇÃO: Isso irá limpar todos os dados salvos do ranking final e resetar os perfis para o estado pendente. Esta ação não pode ser desfeita. Tem certeza que deseja continuar?')) {
      try {
        await clearRanking();
        alert('✅ Ranking limpo com sucesso! Todos os perfis foram resetados.');
      } catch (error) {
        console.error('❌ Erro ao limpar ranking:', error);
        alert('❌ Erro ao limpar ranking. Tente novamente.');
      }
    }
  };

  return (
    <>
      <AdminContainer>
        <Header>
          <HeaderContent>
            <Title>Painel Administrativo</Title>
            <ModeSwitch>
              <ModeSwitchLabel>Modalidade:</ModeSwitchLabel>
              <ModeSwitchButtons>
                <ModeSwitchButton
                  $active={state.currentMode === 'desfile'}
                  onClick={() => handleModeChange('desfile')}
                >
                  Desfile
                </ModeSwitchButton>
                <ModeSwitchButton
                  $active={state.currentMode === 'presentation'}
                  onClick={() => handleModeChange('presentation')}
                >
                  Apresentação
                </ModeSwitchButton>
              </ModeSwitchButtons>
            </ModeSwitch>
            <UserInfo>
              <span>Olá, {authState.user?.name}</span>
              <LogoutButton onClick={handleLogout}>
                <LogOut size={16} />
                Sair
              </LogoutButton>
          </UserInfo>
        </HeaderContent>
      </Header>

      <MainContent>
        <Section>
          <SectionTitle>
            <Eye size={24} />
            Controle de Votação
          </SectionTitle>
          
          <ProfileSelector>
            <ProfileSelectorLabel>Selecione o perfil visível para os jurados:</ProfileSelectorLabel>
            
            <ProfilesContainer>
              {/* Opção "Nenhum perfil" */}
              <NoneOption
                $isSelected={!state.currentVisibleProfile}
                onClick={() => handleVisibilityChange('')}
              >
                <ProfileIcon>
                  <X size={24} />
                </ProfileIcon>
                <ProfileSelectorName>Nenhum</ProfileSelectorName>
                <ProfileSelectorCharacter>Ocultar todos</ProfileSelectorCharacter>
              </NoneOption>

              {/* Cards dos perfis */}
              {filteredProfiles.map(profile => (
                <ProfileSelectorCard
                  key={profile.id}
                  $isSelected={state.currentVisibleProfile === profile.id}
                  $isActive={state.currentVisibleProfile === profile.id}
                  onClick={() => handleVisibilityChange(profile.id)}
                >
                  <ProfileIcon
                    $isSelected={state.currentVisibleProfile === profile.id}
                    $isActive={state.currentVisibleProfile === profile.id}
                  >
                    {profile.image_urls && profile.image_urls[0] ? (
                      <ProfileSelectorImage 
                        src={profile.image_urls[0]} 
                        alt={profile.name}
                        onError={(e) => {
                          // Se a imagem falhar, mostrar o ícone de usuário
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                          }
                        }}
                      />
                    ) : (
                      <User size={28} />
                    )}
                  </ProfileIcon>
                  <ProfileSelectorName>{profile.name}</ProfileSelectorName>
                  <ProfileSelectorCharacter>{profile.character}</ProfileSelectorCharacter>
                </ProfileSelectorCard>
              ))}
            </ProfilesContainer>

            {filteredProfiles.length === 0 && (
              <NoDataMessage>
                Nenhum perfil cadastrado para a modalidade {state.currentMode === 'desfile' ? 'Desfile' : 'Apresentação'}. Adicione perfis na seção abaixo.
              </NoDataMessage>
            )}
          </ProfileSelector>
        </Section>

        <Section>
          <SectionTitle>
            <BarChart3 size={24} />
            Estatísticas de Votação
          </SectionTitle>

          {state.currentVisibleProfile && (
            <>
              <WrapAbove>
                <CurrentProfileBadge>
                  <Trophy size={16} />
                  Perfil Ativo: {state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile)?.name} - {state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile)?.character}
                </CurrentProfileBadge>

                {/* Seção do Cronômetro */}
                <TimerSection>
                  <Clock size={20} />
                  <TimerDisplay $isOvertime={timerSeconds > 180}>
                    {formatTime(timerSeconds)}
                  </TimerDisplay>
                  
                  {!isTimerRunning ? (
                    <TimerButton onClick={startTimer}>
                      <Play size={16} />
                      Iniciar
                    </TimerButton>
                  ) : (
                    <TimerButton $isStop onClick={stopTimer}>
                      <Square size={16} />
                      Parar
                    </TimerButton>
                  )}
                  
                  {timerSeconds > 180 && (
                    <TimePenaltyLabel>
                      Excedeu {timerSeconds - 180}s (limite: 3min)
                    </TimePenaltyLabel>
                  )}
                </TimerSection>
              </WrapAbove>
              <BonusPenaltySection>
                <CheckboxContainer>
                  <StyledCheckbox
                    type="checkbox"
                    checked={state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile)?.bonus || false}
                    onChange={() => handleBonusPenaltyChange(state.currentVisibleProfile!, 'bonus')}
                  />
                  <span>Bônus (+0.5)</span>
                </CheckboxContainer>
                <CheckboxContainer>
                  <StyledCheckbox
                    type="checkbox"
                    checked={state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile)?.penalty || false}
                    onChange={() => handleBonusPenaltyChange(state.currentVisibleProfile!, 'penalty')}
                  />
                  <span>Punição (-0.5)</span>
                </CheckboxContainer>
                
                {/* Penalidade por tempo */}
                {timePenaltyValue > 0 && (
                  <CheckboxContainer>
                    <span>Penalidade por tempo: -</span>
                    <TimePenaltyInput
                      type="number"
                      step="0.1"
                      min="0"
                      value={timePenaltyValue}
                      onChange={(e) => handleTimePenaltyChange(e.target.value)}
                    />
                    <span>pts</span>
                  </CheckboxContainer>
                )}
              </BonusPenaltySection>
            </>
          )}

          {state.votingStatistics ? (
            <>
              <StatisticsGrid>
                <StatCard>
                  <StatValue>{state.votingStatistics.totalVotes}</StatValue>
                  <StatLabel>Total de Votos</StatLabel>
                </StatCard>
                <StatCard> 
                  <StatValue>
                    {state.votingStatistics?.averageScores ? 
                      (() => {
                        const scores = Object.values(state.votingStatistics.averageScores).filter(s => typeof s === 'number' && !isNaN(s));
                        if (scores.length === 0) return '0.0';
                        const sum = scores.reduce((acc, score) => acc + score, 0);
                        // Use the actual number of scores (3 for desfile, 5 for apresentação)
                        const criteriaCount = scores.length;
                        let averageScore = sum / criteriaCount;
                        
                        // Aplicar bônus/penalidade se o perfil tiver
                        const currentProfile = state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile);
                        if (currentProfile) {
                          if (currentProfile.bonus) {
                            averageScore += 0.5;
                          }
                          if (currentProfile.penalty) {
                            averageScore -= 0.5;
                          }
                        }
                        
                        // Aplicar penalidade por tempo
                        if (timePenaltyValue > 0) {
                          averageScore -= timePenaltyValue;
                        }
                        
                        // Garantir que a nota não seja negativa
                        averageScore = Math.max(0, averageScore);
                        
                        return averageScore.toFixed(1);
                      })()
                      : '0.0'
                    }
                  </StatValue>
                  <StatLabel>Nota Média</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{state.votingStatistics?.onlineJurors || 0}</StatValue>
                  <StatLabel>Jurados Online</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{state.votingStatistics?.pendingJurors || 0}</StatValue>
                  <StatLabel>Jurados Pendentes</StatLabel>
                </StatCard>
              </StatisticsGrid>

              {state.votingStatistics?.votes && state.votingStatistics.votes.length > 0 ? (
                <TableContainer>
                  <VotesTable>
                    <thead>
                      <tr>
                        <VotesTableHeader>Jurado</VotesTableHeader>
                        <VotesTableHeader>Perfil Avaliado</VotesTableHeader>
                        <VotesTableHeader>Nota Média</VotesTableHeader>
                        <VotesTableHeader>Notas Detalhadas</VotesTableHeader>
                        <VotesTableHeader>Status</VotesTableHeader>
                        <VotesTableHeader>Data do Voto</VotesTableHeader>
                      </tr>
                  </thead>
                  <tbody>
                    {state.votingStatistics?.votes?.map((vote, index) => (
                      <VotesTableRow key={vote.id || index}>
                        <VotesTableCell>{vote.jurorName}</VotesTableCell>
                        <VotesTableCell>
                          {state.votingStatistics?.currentProfile ? 
                            `${state.votingStatistics.currentProfile.name} - ${state.votingStatistics.currentProfile.character}` 
                            : 'Perfil não encontrado'
                          }
                        </VotesTableCell>
                        <VotesTableCell>
                          <strong style={{ color: '#667eea' }}>
                            {(() => {
                              const scores = Object.values(vote.scores).map(s => parseFloat(s as any)).filter(s => !isNaN(s));
                              if (scores.length === 0) return '0.0';
                              const sum = scores.reduce((acc, score) => acc + score, 0);
                              // Use the actual number of scores (3 for desfile, 5 for apresentação)
                              const criteriaCount = scores.length;
                              let averageScore = sum / criteriaCount;
                              
                              // Aplicar bônus/penalidade se o perfil tiver
                              const currentProfile = state.cosplayProfiles.find(p => p.id === state.currentVisibleProfile);
                              if (currentProfile) {
                                if (currentProfile.bonus) {
                                  averageScore += 0.5;
                                }
                                if (currentProfile.penalty) {
                                  averageScore -= 0.5;
                                }
                              }
                              
                              // Aplicar penalidade por tempo
                              if (timePenaltyValue > 0) {
                                averageScore -= timePenaltyValue;
                              }
                              
                              // Garantir que a nota não seja negativa
                              averageScore = Math.max(0, averageScore);
                              
                              return averageScore.toFixed(1);
                            })()}
                          </strong>
                        </VotesTableCell>
                        <VotesTableCell>
                          <DetailedScores>
                            {Object.values(vote.scores)
                              .filter(s => s !== undefined && s !== null && s !== '')
                              .join(', ')}
                          </DetailedScores>
                        </VotesTableCell>
                        <VotesTableCell>
                          <span style={{ 
                            color: vote.submitted ? '#48bb78' : '#ed8936',
                            fontWeight: 'bold'
                          }}>
                            {vote.submitted ? 'Enviado' : 'Rascunho'}
                          </span>
                        </VotesTableCell>
                        <VotesTableCell>
                          {new Date(vote.updatedAt).toLocaleString('pt-BR')}
                        </VotesTableCell>
                      </VotesTableRow>
                    ))}
                  </tbody>
                </VotesTable>
                </TableContainer>
              ) : (
                <NoDataMessage>
                  Nenhum voto registrado ainda.
                </NoDataMessage>
              )}
            </>
          ) : (
            <NoDataMessage>
              Carregando estatísticas...
            </NoDataMessage>
          )}
        </Section>

        <Section>
          <SectionTitle>
            <Award size={24} />
            Ranking Final
            <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '10px' }}>
              ({state.ranking.filter(p => p.modality === state.currentMode).length} perfis)
            </span>
            {state.ranking.length > 0 && (
              <ClearRankingButton onClick={handleClearRanking}>
                <Trash2 size={16} />
                Limpar Dados
              </ClearRankingButton>
            )}
          </SectionTitle>
          {state.ranking.filter(p => p.modality === state.currentMode).length > 0 ? (
            <TableContainer className="ranking-table">
              <VotesTable>
                <thead>
                  <tr>
                    <VotesTableHeader>Posição</VotesTableHeader>
                    <VotesTableHeader>Participante</VotesTableHeader>
                    <VotesTableHeader>Personagem</VotesTableHeader>
                    <VotesTableHeader>Nota Final</VotesTableHeader>
                    <VotesTableHeader>Modificador</VotesTableHeader>
                    <VotesTableHeader>Total de Votos</VotesTableHeader>
                  </tr>
                </thead>
                <tbody>
                  {state.ranking
                    .filter(profile => profile.modality === state.currentMode)
                    // Apenas calcular o modificador para exibição (não aplicar na nota)
                    .map(profile => {
                      // Calcular modificador total apenas para exibir na coluna
                      let totalModifier = 0;
                      if (profile.bonus) totalModifier += 0.5;
                      if (profile.penalty) totalModifier -= 0.5;
                      if (profile.time_penalty) totalModifier -= profile.time_penalty;
                      
                      // A nota final JÁ VEM CALCULADA DO BACKEND
                      const finalScore = profile.final_score || 0;
                      
                      return { 
                        ...profile, 
                        finalScore, 
                        totalModifier 
                      };
                    })
                    // Reordenar pelo score do backend
                    .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0))
                    .map((profile, index) => (
                      <VotesTableRow key={profile.id}>
                        <VotesTableCell>
                          <strong style={{ fontSize: '1.2rem' }}>{index + 1}º</strong>
                        </VotesTableCell>
                        <VotesTableCell>{profile.name}</VotesTableCell>
                        <VotesTableCell>{profile.character}</VotesTableCell>
                        <VotesTableCell>
                          <strong style={{ color: '#667eea', fontSize: '1.1rem' }}>
                            {profile.finalScore.toFixed(2)}
                          </strong>
                        </VotesTableCell>
                        <VotesTableCell>
                          {profile.totalModifier !== 0 && (
                            <strong style={{ 
                              color: profile.totalModifier > 0 ? '#10b981' : '#ef4444',
                              fontSize: '1rem'
                            }}>
                              {profile.totalModifier > 0 ? '+' : ''}{profile.totalModifier.toFixed(2)}
                              <span style={{ fontSize: '0.75rem', marginLeft: '3px' }}>
                              </span>
                            </strong>
                          )}
                          {profile.totalModifier === 0 && (
                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>-</span>
                          )}
                        </VotesTableCell>
                        <VotesTableCell>
                          {profile.total_final_votes}
                        </VotesTableCell>
                      </VotesTableRow>
                    ))}
                </tbody>
              </VotesTable>
            </TableContainer>
          ) : (
            <NoDataMessage>
              Nenhum perfil com votação concluída ainda. Os resultados aparecerão aqui
              após a troca de um perfil ativo.
            </NoDataMessage>
          )}
        </Section>

        <Section>
          <SectionTitle>
            <Users size={24} />
            Perfis de Cosplay
          </SectionTitle>
          
          <AddButton onClick={() => handleOpenModal()}> 
            <Plus size={20} />
            Adicionar Novo Perfil
          </AddButton>

          <ProfilesGrid>
            {filteredProfiles.map(profile => (
              <ProfileCard key={profile.id}>
                <ProfileImage 
                  src={profile.image_urls[0] || '/placeholder-cosplay.jpg'} 
                  alt={profile.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
                  }}
                />
                <ProfileContent>
                  <ProfileName>{profile.name}</ProfileName>
                  <ProfileDetails>
                    <strong>Personagem:</strong> {profile.character}<br />
                    <strong>Anime:</strong> {profile.anime}<br />
                    <strong>Status:</strong> {profile.id === state.currentVisibleProfile ? 
                      <span style={{ color: '#48bb78', fontWeight: 'bold' }}>Visível para jurados</span> : 
                      <span style={{ color: '#a0aec0' }}>Oculto</span>
                    }
                  </ProfileDetails>
                  <ProfileActions>
                    <ActionButton 
                      $variant="primary" 
                      onClick={() => handleOpenModal(profile)}
                    >
                      <Edit size={16} />
                      Editar
                    </ActionButton>
                    <ActionButton 
                      $variant="danger" 
                      onClick={() => handleDelete(profile.id)}
                    >
                      <Trash2 size={16} />
                      Excluir
                    </ActionButton>
                  </ProfileActions>
                </ProfileContent>
              </ProfileCard>
            ))}
          </ProfilesGrid>

          {filteredProfiles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <Trophy size={48} style={{ margin: '0 auto 20px', display: 'block' }} />
              <p>Nenhum perfil cadastrado para a modalidade {state.currentMode === 'desfile' ? 'Desfile' : 'Apresentação'}.</p>
              <p>Clique em "Adicionar Novo Perfil" para começar.</p>
            </div>
          )}
        </Section>
      </MainContent>

      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <ModalContent>
            <h3>{editingProfile ? 'Editar Perfil' : 'Novo Perfil'}</h3>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Nome do participante"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <Input
                type="text"
                placeholder="Nome do personagem"
                value={formData.character}
                onChange={(e) => setFormData({...formData, character: e.target.value})}
                required
              />
              <Input
                type="text"
                placeholder="Nome do anime/série"
                value={formData.anime}
                onChange={(e) => setFormData({...formData, anime: e.target.value})}
                required
              />
              {formData.image_urls.map((url, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Input
                    type="url"
                    placeholder={`URL da Imagem ${index + 1}${index === 0 ? ' (Principal)' : ''}`}
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    required={index === 0}
                  />
                  {formData.image_urls.length > 1 && (
                    <Button type="button" onClick={() => removeImageUrlInput(index)} $variant="secondary">Remover</Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={addImageUrlInput} $variant="secondary">Adicionar mais imagens</Button>
              <Select
                value={formData.modality}
                onChange={(e) => setFormData({...formData, modality: e.target.value as 'desfile' | 'presentation'})}
                required
              >
                <option value="desfile">Modalidade: Desfile (3 critérios)</option>
                <option value="presentation">Modalidade: Apresentação (5 critérios)</option>
              </Select>
              <Textarea
                placeholder="Descrição do cosplay"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              <FormButtons>
                <Button type="button" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button type="submit" $variant="primary">
                  {editingProfile ? 'Atualizar' : 'Criar'}
                </Button>
              </FormButtons>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </AdminContainer>
    </>
  );
};

export default AdminDashboard;