import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { User2, Shield, Eye } from 'lucide-react';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh; /* Usa a altura da viewport dinâmica */
  width: 100%;
  background: var(--bg-primary);
  padding: 20px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const LoginCard = styled.div`
  background: var(--bg-secondary);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--surface);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
    border-radius: 12px;
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    padding: 15px 12px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 360px) {
    padding: 12px 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 30px;
  font-size: 2rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 25px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 360px) {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 30px;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    margin-bottom: 25px;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
    font-size: 0.9rem;
  }
`;

const RoleButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 25px;
  }
  
  @media (max-width: 360px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const RoleButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 15px;
  border: 2px solid ${props => props.$active ? 'var(--accent-purple)' : 'var(--surface)'};
  background: ${props => props.$active ? 'var(--accent-purple)' : 'var(--bg-tertiary)'};
  color: ${props => props.$active ? 'var(--bg-primary)' : 'var(--text-primary)'};
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 12px 10px;
    font-size: 14px;
    gap: 6px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (max-width: 360px) {
    padding: 14px;
    font-size: 15px;
  }

  &:hover {
    border-color: var(--accent-blue);
    background: ${props => props.$active ? 'var(--accent-blue)' : 'var(--surface)'};
    transform: translateY(-2px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid var(--surface);
  border-radius: 10px;
  font-size: 16px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  transition: all 0.3s ease;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 16px; /* Manter 16px para evitar zoom no iOS */
    border-radius: 8px;
  }

  &:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const LoginButton = styled.button`
  padding: 15px;
  background: var(--accent-purple);
  color: var(--bg-primary);
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
  }

  &:hover {
    transform: translateY(-2px);
    background: var(--accent-blue);
    box-shadow: 0 8px 20px rgba(167, 139, 250, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SpectatorButton = styled.button`
  width: 100%;
  padding: 15px;
  border: 2px solid var(--accent-green);
  background: var(--accent-green);
  color: white;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 15px;
    gap: 8px;
    margin-top: 15px;
    border-radius: 8px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }

  &:hover {
    transform: translateY(-2px);
    background: var(--accent-teal);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
  
  @media (max-width: 480px) {
    margin: 20px 0;
  }
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--surface);
  }
  
  span {
    padding: 0 15px;
    color: var(--text-secondary);
    font-size: 14px;
    
    @media (max-width: 480px) {
      padding: 0 12px;
      font-size: 13px;
    }
  }
`;

const ErrorMessage = styled.div`
  color: var(--error);
  text-align: center;
  margin-top: 10px;
  padding: 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--error);
  border-radius: 8px;
  
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
    margin-top: 8px;
  }
`;

const TestUsersInfo = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.4;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid var(--surface);
  
  /* Esconder em telas com altura muito pequena para evitar overflow vertical */
  @media (max-height: 700px) {
    display: none;
  }
  
  @media (max-width: 480px) {
    margin-top: 15px;
    font-size: 12px;
    padding: 12px;
    line-height: 1.3;
    
    /* Esconder mais cedo em mobile devido ao espaço limitado */
    @media (max-height: 600px) {
      display: none;
    }
  }
  
  @media (max-width: 360px) {
    font-size: 11px;
    padding: 10px;
    
    /* Esconder ainda mais cedo em telas muito pequenas */
    @media (max-height: 550px) {
      display: none;
    }
  }
  
  strong {
    color: var(--text-primary);
    display: block;
    margin-bottom: 8px;
    
    @media (max-width: 480px) {
      margin-bottom: 6px;
    }
  }
`;



const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'juror'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, selectedRole);
      navigate(selectedRole === 'admin' ? '/admin' : '/juror');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleSpectatorAccess = () => {
    navigate('/spectator');
  };

  return (
    <>
      <LoginContainer>
        <LoginCard>
          <Title>Sistema de Votação Cosplay</Title>
          <Subtitle>Entre com suas credenciais</Subtitle>
          
          <RoleButtons>
          <RoleButton
            type="button"
            $active={selectedRole === 'admin'}
            onClick={() => setSelectedRole('admin')}
          >
            <Shield size={20} />
            Administrador
          </RoleButton>
          <RoleButton
            type="button"
            $active={selectedRole === 'juror'}
            onClick={() => setSelectedRole('juror')}
          >
            <User2 size={20} />
            Jurado
          </RoleButton>
        </RoleButtons>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </LoginButton>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Divider>
          <span>ou</span>
        </Divider>
        
        <SpectatorButton onClick={handleSpectatorAccess}>
          <Eye size={20} />
          Entrar como Espectador
        </SpectatorButton>
        
        <TestUsersInfo>
          <strong>Usuários de teste:</strong>
          Admin: admin@cosplay.com<br />
          Jurado: jurado1@cosplay.com, jurado2@cosplay.com, jurado3@cosplay.com<br />
          Senha: 123456
        </TestUsersInfo>
      </LoginCard>
    </LoginContainer>
    </>
  );
};

export default LoginPage;