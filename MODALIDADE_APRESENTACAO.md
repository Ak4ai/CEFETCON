# Implementação da Modalidade de Apresentação

## ✅ O que foi implementado

### 1. **Database (Backend)**
- ✅ Tabela `cosplay_profiles` agora tem campo `modality` ('desfile' | 'presentation')
- ✅ Tabela `votes` tem dois novos critérios: `interpretacao` e `performance` (para apresentação)
- ✅ Tabela `voting_control` tem campo `current_mode` para controlar qual modalidade está ativa
- ✅ Migrations automáticas implementadas

### 2. **Backend - API Routes**
- ✅ `/api/profiles` - Aceita `modality` na criação de perfis
- ✅ `/api/votes` - Aceita `interpretacao` e `performance` opcionalmente
- ✅ `/api/voting/set-mode` (PUT) - Trocar modalidade (desfile/presentation)
- ✅ `/api/voting/mode` (GET) - Obter modalidade atual
- ✅ Cálculo de nota final adaptado para cada modalidade:
  - **Desfile**: Média de 3 critérios (indumentaria, similaridade, qualidade)
  - **Apresentação**: Média de 5 critérios (+ interpretacao e performance)

### 3. **Frontend - Types & Context**
- ✅ Tipos TypeScript atualizados (`CosplayProfile`, `Scores`, `VotingMode`)
- ✅ `AppContext` com gerenciamento de modalidade
- ✅ Funções `setVotingMode()` e `loadCurrentMode()`
- ✅ API service com funções para modalidade

---

## 🚧 O que VOCÊ precisa fazer agora

### 4. **AdminDashboard - Adicionar Switch de Modalidade**

No arquivo `AdminDashboard.tsx`, você precisa:

1. **Importar o hook e state necessários**:
```tsx
import { useApp } from '../contexts/AppContext';
import { useState } from 'react';
```

2. **Adicionar state e funções no componente**:
```tsx
const AdminDashboard = () => {
  const { state, /* ...outras funções */, setVotingMode } = useApp();
  const [currentMode, setCurrentMode] = useState<'desfile' | 'presentation'>(state.currentMode);

  const handleModeChange = async () => {
    const newMode = currentMode === 'desfile' ? 'presentation' : 'desfile';
    try {
      await setVotingMode(newMode);
      setCurrentMode(newMode);
    } catch (error) {
      console.error('Erro ao trocar modalidade:', error);
      alert('Erro ao trocar modalidade');
    }
  };
  
  // Filtrar perfis baseado na modalidade atual
  const filteredProfiles = state.cosplayProfiles.filter(
    profile => profile.modality === currentMode
  );
  
  // ... resto do código
}
```

3. **Adicionar o Switch na interface** (logo após o `<Title>`):
```tsx
<HeaderContent>
  <Title>Painel Administrativo</Title>
  <ModeSwitch>
    <ModeSwitchLabel>
      {currentMode === 'desfile' ? '🎭 Desfile' : '🎤 Apresentação'}
    </ModeSwitchLabel>
    <ModeSwitchButton onClick={handleModeChange}>
      Trocar para {currentMode === 'desfile' ? 'Apresentação' : 'Desfile'}
    </ModeSwitchButton>
  </ModeSwitch>
  <UserInfo>
    {/* ... código existente */}
  </UserInfo>
</HeaderContent>
```

4. **Adicionar styled components para o switch**:
```tsx
const ModeSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ModeSwitchLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-purple);
`;

const ModeSwitchButton = styled.button`
  background: var(--accent-purple);
  color: var(--bg-primary);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-blue);
    transform: translateY(-2px);
  }
`;
```

5. **Atualizar o ProfilesGrid para usar `filteredProfiles`**:
```tsx
<ProfilesGrid>
  {filteredProfiles.map(profile => (
    // ... seu código de card existente
  ))}
</ProfilesGrid>
```

6. **Atualizar o modal de adição de perfil** para incluir seleção de modalidade:
```tsx
<Form onSubmit={handleAddSubmit}>
  {/* ... campos existentes ... */}
  
  <Label>
    Modalidade:
    <Select
      value={newCosplay.modality || 'desfile'}
      onChange={(e) => setNewCosplay({
        ...newCosplay,
        modality: e.target.value as 'desfile' | 'presentation'
      })}
    >
      <option value="desfile">Desfile</option>
      <option value="presentation">Apresentação</option>
    </Select>
  </Label>
  
  {/* ... resto dos campos ... */}
</Form>
```

---

### 5. **JurorVoting - Adicionar Critérios de Apresentação**

No arquivo `JurorVoting.tsx`:

1. **Detectar modalidade do perfil**:
```tsx
const JurorVoting = () => {
  const { state, submitVote } = useApp();
  const currentProfile = state.cosplayProfiles.find(
    p => p.id === state.currentVisibleProfile
  );
  
  const isPresentation = currentProfile?.modality === 'presentation';
  
  // ... resto do código
}
```

2. **Adicionar states para os novos critérios**:
```tsx
const [scores, setScores] = useState({
  indumentaria: 5,
  similaridade: 5,
  qualidade: 5,
  interpretacao: 5, // novo
  performance: 5,   // novo
});
```

3. **Adicionar inputs condicionais** (após os 3 critérios existentes):
```tsx
{isPresentation && (
  <>
    <CriteriaCard>
      <CriteriaTitle>🎭 Interpretação</CriteriaTitle>
      <CriteriaDescription>
        Capacidade de incorporar o personagem
      </CriteriaDescription>
      <ScoreInput
        type="number"
        min="1"
        max="10"
        value={scores.interpretacao}
        onChange={(e) => setScores({
          ...scores,
          interpretacao: parseInt(e.target.value)
        })}
      />
    </CriteriaCard>

    <CriteriaCard>
      <CriteriaTitle>⭐ Performance</CriteriaTitle>
      <CriteriaDescription>
        Qualidade da apresentação geral
      </CriteriaDescription>
      <ScoreInput
        type="number"
        min="1"
        max="10"
        value={scores.performance}
        onChange={(e) => setScores({
          ...scores,
          performance: parseInt(e.target.value)
        })}
      />
    </CriteriaCard>
  </>
)}
```

4. **Atualizar o cálculo da nota final**:
```tsx
const calculateFinalScore = () => {
  if (isPresentation) {
    return (
      (scores.indumentaria + scores.similaridade + scores.qualidade +
       scores.interpretacao + scores.performance) / 5
    ).toFixed(1);
  }
  return (
    (scores.indumentaria + scores.similaridade + scores.qualidade) / 3
  ).toFixed(1);
};
```

5. **Atualizar submitVote para enviar os novos critérios**:
```tsx
const handleSubmit = async () => {
  try {
    await submitVote(currentProfile.id, scores, true);
    alert('Voto enviado com sucesso!');
  } catch (error) {
    alert('Erro ao enviar voto');
  }
};
```

---

### 6. **SpectatorView - Atualizar para mostrar 5 critérios**

No arquivo `SpectatorView.tsx`, detectar modalidade e mostrar critérios condicionalmente:

```tsx
const SpectatorView = () => {
  // ... código existente
  
  const isPresentation = voteAverages?.modality === 'presentation'; // se você adicionar isso no backend
  
  return (
    <Container>
      <CardContainer>
        {/* ... código existente ... */}
        
        <ScoresGrid>
          <ScoreCard>
            <ScoreTitle>Indumentária</ScoreTitle>
            <ScoreValue>
              <CounterRoll value={voteAverages.indumentaria} fontSize="3rem" />
              <ScoreMax>/ 10</ScoreMax>
            </ScoreValue>
          </ScoreCard>

          <ScoreCard>
            <ScoreTitle>Similaridade</ScoreTitle>
            <ScoreValue>
              <CounterRoll value={voteAverages.similaridade} fontSize="3rem" />
              <ScoreMax>/ 10</ScoreMax>
            </ScoreValue>
          </ScoreCard>

          <ScoreCard>
            <ScoreTitle>Qualidade</ScoreTitle>
            <ScoreValue>
              <CounterRoll value={voteAverages.qualidade} fontSize="3rem" />
              <ScoreMax>/ 10</ScoreMax>
            </ScoreValue>
          </ScoreCard>
          
          {isPresentation && (
            <>
              <ScoreCard>
                <ScoreTitle>Interpretação</ScoreTitle>
                <ScoreValue>
                  <CounterRoll value={voteAverages.interpretacao} fontSize="3rem" />
                  <ScoreMax>/ 10</ScoreMax>
                </ScoreValue>
              </ScoreCard>

              <ScoreCard>
                <ScoreTitle>Performance</ScoreTitle>
                <ScoreValue>
                  <CounterRoll value={voteAverages.performance} fontSize="3rem" />
                  <ScoreMax>/ 10</ScoreMax>
                </ScoreValue>
              </ScoreCard>
            </>
          )}
        </ScoresGrid>
        
        {/* ... resto do código ... */}
      </CardContainer>
    </Container>
  );
};
```

---

## 🔧 Passos para Testar

1. **Rodar migração do banco**:
```bash
cd cosplay-backend
node src/database/migrate.js
```

2. **Iniciar backend**:
```bash
npm start
```

3. **Iniciar frontend**:
```bash
cd cosplay-voting-system
npm run dev
```

4. **Testar fluxo**:
   - Login como admin
   - Trocar para modalidade "Apresentação"
   - Criar um perfil de apresentação
   - Tornar ele visível
   - Login como jurado
   - Ver os 5 critérios de votação
   - Enviar voto
   - Ver os resultados no spectator view

---

## 📝 Notas Importantes

- ✅ **Rankings Separados**: O backend já calcula corretamente médias diferentes para cada modalidade
- ✅ **Compatibilidade**: Perfis de desfile continuam funcionando normalmente (sem os critérios extras)
- ✅ **Migração**: Perfis existentes são automaticamente marcados como 'desfile'
- ⚠️ **Ao trocar modalidade**: O perfil visível é limpo automaticamente (segurança)

---

## 🎯 Resultado Final

Quando tudo estiver implementado, você terá:

- Switch no admin para alternar entre Desfile e Apresentação
- Perfis filtrados por modalidade
- Jurados vendo 3 ou 5 critérios dependendo da modalidade
- Rankings calculados corretamente para cada tipo
- Sistema completamente retrocompatível

Boa sorte! 🚀
