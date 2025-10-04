-- PostgreSQL Database Backup
-- Generated: 2025-10-04T03:50:53.832Z
-- Database: cosplay_voting

-- Dados da tabela: users
TRUNCATE TABLE users CASCADE;
INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at, last_activity) VALUES (4, 'Jurado 3', 'jurado3@cosplay.com', '$2b$12$.BgpGTBI5CGnzWNyAKZtC.WwaenN0czcU3m5rRKWcnx..0H5DKSgq', 'juror', '2025-09-27T06:18:26.250Z', '2025-09-27T06:18:26.250Z', '2025-09-27T08:04:16.385Z');
INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at, last_activity) VALUES (3, 'Jurado 2', 'jurado2@cosplay.com', '$2b$12$.BgpGTBI5CGnzWNyAKZtC.WwaenN0czcU3m5rRKWcnx..0H5DKSgq', 'juror', '2025-09-27T06:18:26.249Z', '2025-09-27T06:18:26.249Z', '2025-10-01T19:06:03.244Z');
INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at, last_activity) VALUES (1, 'Administrador', 'admin@cosplay.com', '$2b$12$.BgpGTBI5CGnzWNyAKZtC.WwaenN0czcU3m5rRKWcnx..0H5DKSgq', 'admin', '2025-09-27T06:18:26.235Z', '2025-09-27T06:18:26.235Z', '2025-10-04T06:47:39.326Z');
INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at, last_activity) VALUES (2, 'Jurado 1', 'jurado1@cosplay.com', '$2b$12$.BgpGTBI5CGnzWNyAKZtC.WwaenN0czcU3m5rRKWcnx..0H5DKSgq', 'juror', '2025-09-27T06:18:26.247Z', '2025-09-27T06:18:26.247Z', '2025-10-04T06:50:51.141Z');

-- Dados da tabela: cosplay_profiles
TRUNCATE TABLE cosplay_profiles CASCADE;
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (37, 'Raphael Alves Lima ', 'Thomas Shelby', 'Peaky Blinders', '# Thomas "Tommy" Shelby - Peaky Blinders

## Sobre a Personagem
Thomas Shelby é o carismático e implacável líder da gangue Peaky Blinders, uma família de criminosos de Birmingham, Inglaterra, no período pós-Primeira Guerra Mundial. Herói de guerra condecorado, ele é assombrado por seu passado e sofre de estresse pós-traumático, o que o torna um estrategista frio, ambicioso e calculista. Seu objetivo é expandir os negócios da família e legitimar seu nome, custe o que custar.

## Detalhes do Cosplay

### Vestimenta Principal (O "Uniforme" Peaky Blinder)
- **Terno de Três Peças**: A base de tudo. Feito de tweed ou lã grossa, em cores sóbrias como cinza-carvão, marrom ou azul-marinho. Composto por:
    - **Paletó (Jaqueta)**
    - **Colete**
    - **Calça de alfaiataria**
- **Sobretudo Longo**: Um casaco pesado de lã, geralmente preto ou cinza escuro, com um colarinho de veludo preto contrastante. Essencial para a silhueta imponente.
- **Boina (Flat Cap)**: A peça mais icônica. Uma boina de tweed no estilo "newsboy", geralmente combinando com o terno. (Lembre-se: a lâmina na aba é parte da lenda, não um acessório real para o cosplay!).
- **Camisa Social**: Quase sempre uma camisa com colarinho removível no estilo "penny" (arredondado). Geralmente branca ou com listras finas.
- **Botas de Couro**: Botas robustas, de cano médio e com cadarço, de cor preta ou marrom-escura.

### Acessórios
- **Cigarro**: Thomas está quase sempre com um cigarro na boca. É um adereço de personagem indispensável.
- **Relógio de Bolso**: Preso por uma corrente ao colete.
- **Cantil de Bolso (Hip Flask)** ou **Copo de Uísque**: Adereços que complementam seu personagem.
- **Gravata**: (Opcional) Muitas vezes ele não usa, preferindo o colarinho abotoado até em cima. Quando usa, é uma gravata simples e escura.

### Características Físicas
- **Corte de Cabelo**: O famoso corte "Peaky Blinder". Raspado nas laterais e na nuca (undercut), com o cabelo mais comprido no topo, geralmente penteado para a frente ou para o lado.
- **Olhos**: Azuis, com um olhar extremamente focado, frio e penetrante.
- **Expressão**: Séria, pensativa e quase nunca sorrindo. A atitude é crucial.

### Versões Alternativas
- **Visual de Trabalho (Garrison Pub)**: Mais casual, sem o paletó e o sobretudo, apenas com a camisa (mangas arregaçadas), o colete e as calças.
- **Traje de Gala**: Em eventos formais, ele usa um smoking preto impecável, sempre dentro da moda dos anos 1920.

## Referências
Protagonista absoluto da aclamada série de televisão **Peaky Blinders**, da BBC.

---

*Dificuldade*: Intermediária (O desafio é encontrar as peças com os tecidos e cortes corretos da época).', FALSE, 1, '2025-10-03T06:08:10.837Z', '2025-10-04T06:45:50.396Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/9f/95/61/9f95618482812d906f564d281e1769c7.jpg','https://i.pinimg.com/736x/f9/c5/4c/f9c54c386f3d79cadf78e3fa8f5e4d6d.jpg','https://i.pinimg.com/736x/41/b1/0f/41b10f0b9963c26c7d663a58016d535c.jpg','https://i.pinimg.com/736x/5e/ce/32/5ece32d423a270d0fa5b47b9551055d5.jpg','https://i.pinimg.com/736x/86/5d/0d/865d0da143758f55340937618029cd05.jpg','https://i.pinimg.com/736x/0c/ce/d4/0cced4ef16bfc01222a7dc06d6e89714.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (38, 'Luka Labadia', 'Ahri Florescer Espiritual ', 'League of Legends ', '# Ahri Florescer Espiritual (Spirit Blossom Ahri) - League of Legends

## Sobre a Personagem
Ahri é uma Vastaya, uma raça de seres-espírito-besta de Runeterra, com afinidade pela magia. Em sua skin "Florescer Espiritual", ela incorpora a figura de um espírito florescer, sendo a ponte entre o mundo dos vivos e dos mortos durante o festival Florescer Espiritual de Ionia. Ela é uma figura graciosa, sedutora e um tanto enigmática, que guia as almas perdidas para a vida após a morte, muitas vezes testando seus corações.

## Detalhes do Cosplay

### Vestimenta Principal
- **Quimono (Kimono)**: Um quimono branco ou off-white, com detalhes em tons de azul claro, roxo e rosa, evocando flores de cerejeira e padrões espirituais. As mangas são longas e fluidas, quase esvoaçantes.
- **Obi**: Uma faixa larga azul-escura ou roxa amarrada na cintura, com um grande laço na parte de trás.
- **Acessórios de Cabelo**: Flores e fitas (geralmente em tons de rosa, azul e branco) adornando o cabelo, especialmente na área dos coques ou da coroa.
- **Colar/Gargantilha**: Um colar delicado que pode ter um pequeno sino ou um charm espiritual.

### Acessórios
- **Orelhas de Raposa**: Orelhas brancas ou prateadas, peludas, fixadas na cabeça.
- **Nove Caudas**: O acessório mais icônico e desafiador. Nove caudas grandes, volumosas e peludas (brancas ou prateadas, com pontas que podem ter um tom azul/roxo ou rosa), que parecem flutuar ou brilhar. Podem ter LEDs.
- **Lanternas Espirituais**: Pequenas lanternas de papel ou resina, com luzes internas (LEDs), que ela segura ou que flutuam ao redor dela.
- **Leque**: Um leque tradicional japonês, com designs de flores de cerejeira ou motivos espirituais.

### Características Físicas
- **Cabelo**: Longo e branco prateado, geralmente estilizado em um ou dois coques altos ou penteados elaborados, com algumas mechas soltas emoldurando o rosto.
- **Olhos**: Rosa-choque ou violeta-claro, com pupilas finas (uso de lentes de contato é altamente recomendado).
- **Maquiagem**: Delicada, com tons de rosa nos lábios e bochechas. Pode incluir um design sutil de "lírio" ou "flor" no rosto, perto dos olhos, como na splash art.
- **Unhas**: Podem ser pintadas de rosa ou azul.

### Versões Alternativas
- **Splash Art/Concept Art**: Existem variações sutis no design, então é bom escolher uma arte de referência específica.

## Referências
Skin "Florescer Espiritual Ahri" do jogo **League of Legends**, lançada durante o evento Florescer Espiritual.

---

*Dificuldade*: Avançada (Principalmente devido à complexidade e ao volume das nove caudas e aos detalhes do quimono).  
*Destaque*: As nove caudas grandes e o cabelo branco prateado com as flores.  
*Dica*: As caudas são o grande desafio. Elas precisam de uma estrutura interna para manter o volume e a forma. Usar pelo sintético de boa qualidade e, se possível, incluir um sistema de LEDs para um efeito mágico noturno. O quimono deve ter tecidos fluidos para um movimento gracioso.', FALSE, 1, '2025-10-03T06:10:12.416Z', '2025-10-04T06:45:46.443Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/eb/70/87/eb7087ab633e28cf7eaf93d91921c1b3.jpg','https://i.pinimg.com/736x/8a/15/c6/8a15c63cc7b0900acac8045a359fece0.jpg','https://i.pinimg.com/736x/7c/dc/ae/7cdcaeb632e4703479b7bf22f4542a27.jpg','https://i.pinimg.com/736x/23/bd/f6/23bdf6bef0596365760f2859dbcb0bab.jpg','https://i.pinimg.com/736x/f1/72/b7/f172b7e92840d5c5d0bd811ec5fd0767.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (31, 'Maria Laura Jardim Soares', 'Choso', 'Jujutsu Kaisen', '# Choso - Jujutsu Kaisen

## Sobre a Personagem
Choso é uma das Pinturas da Morte (Cursed Womb: Death Painting), uma criação híbrida entre um humano, um espírito amaldiçoado e um feiticeiro. Ele é o mais velho de três irmãos (Eso e Kechizu) e possui um profundo senso de lealdade familiar. Sua técnica inata é a Manipulação de Sangue, que ele controla com maestria. Inicialmente um antagonista, Choso passa por uma mudança drástica de aliança após descobrir uma conexão familiar inesperada com Yuji Itadori durante o Arco de Shibuya.

## Detalhes do Cosplay

### Vestimenta Principal
- **Blusa de Gola Alta**: Uma blusa de cor clara (bege, off-white ou cinza claro) de mangas compridas e gola alta.
- **Túnica Externa (Kimono-like)**: Uma túnica folgada e sem mangas, de cor roxa acinzentada ou marrom-escuro, usada por cima da blusa. Possui um fecho circular distinto na altura do pescoço.
- **Calças largas**: Calças folgadas no estilo "saruel" ou "hakama", da mesma cor clara da blusa interna, geralmente presas para dentro das botas.
- **Faixa na cintura**: Uma faixa de tecido claro, semelhante a um cachecol, amarrada na cintura.
- **Calçados**: Botas de cano médio de cor escura ou faixas que cobrem a canela.

### Acessórios
- O traje de Choso é seu principal identificador, não possuindo acessórios externos como armas. O foco está nos detalhes da roupa e nas características físicas.

### Características Físicas
- **Penteado**: Cabelo preto e longo, estilizado em dois coques ou rabos de cavalo altos e volumosos, com duas mechas longas e retas emoldurando o rosto.
- **Marca Facial**: Sua característica mais marcante. Uma faixa/marca preta sólida e horizontal que cruza a ponte do nariz e se estende pelas bochechas, logo abaixo dos olhos.
- **Olhos**: Pequenos e de cor escura, quase sempre com uma expressão séria ou melancólica.

### Versões Alternativas
- **Arco de Shibuya (Pós-Luta)**: Durante e após sua luta com Yuji, Choso é visto sem sua túnica roxa externa, vestindo apenas a blusa de gola alta clara, muitas vezes manchada de sangue devido ao uso excessivo de sua técnica.

## Referências
Personagem de grande destaque no mangá e anime **Jujutsu Kaisen**, especialmente a partir do **Arco do Incidente de Shibuya**, onde sua história e desenvolvimento são aprofundados.

---

*Dificuldade*: Intermediária  
*Destaque*: O penteado único e a inconfundível marca preta no rosto.  
*Dica*: A estilização da peruca (wig) é essencial para o sucesso deste cosplay. Para a marca no rosto, use uma tinta facial de boa qualidade ou um delineador à prova d''água para garantir que a linha fique nítida e não borre.', FALSE, 1, '2025-10-03T05:54:43.811Z', '2025-10-04T06:46:21.635Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/8f/14/03/8f14038c6ccfa8edb7ac0e58e5315130.jpg','https://i.pinimg.com/736x/76/4a/60/764a608c959edf0d7788c523f58eeb7e.jpg','https://i.pinimg.com/1200x/8f/1d/3c/8f1d3cc18d187da4aa6cfda7b6d9fd8a.jpg','https://i.pinimg.com/736x/7d/3c/73/7d3c73e17c1e26f05576f53bff4d37c8.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (35, 'Rafael Carlos de Souza ', 'Sub-Zero', 'Mortal Kombat', '# Sub-Zero - Mortal Kombat

## Sobre a Personagem
Sub-Zero é um título hereditário no clã de assassinos Lin Kuei. O mais conhecido é Kuai Liang, um guerreiro com a habilidade sobre-humana de controlar o gelo (Criomancia). Ele pode congelar oponentes, criar armas de gelo e deslizar pelo chão. Definido por seu código de honra e sua rivalidade mortal com Scorpion, Sub-Zero é um dos personagens mais fundamentais e reconhecíveis de todo o universo Mortal Kombat.

## Detalhes do Cosplay

### Vestimenta Principal (Versão Moderna - Ex: MK11/MK1)
- **Máscara Ninja**: A peça central. Cobre o nariz e a boca, geralmente em azul e preto, com detalhes que podem ser de tecido, couro ou com aparência metálica.
- **Capuz**: Capuz preto ou azul-escuro que se integra à máscara.
- **Túnica/Tabardo**: Uma túnica azul usada sobre o peito, muitas vezes com detalhes em preto, cinza ou prata e o símbolo do clã Lin Kuei.
- **Roupa de Base**: Um traje preto justo por baixo, podendo ser um macacão ou calça e blusa.
- **Armadura**: Peças de armadura nos ombros, antebraços e canelas. O design varia muito entre os jogos, mas a paleta de azul, preto e prata/aço é constante.
- **Cinto**: Cinto utilitário com fivelas e, frequentemente, o medalhão do clã.

### Acessórios
- **Bola de Gelo (Ice Ball)**: Um prop essencial. Uma esfera de resina translúcida, acrílico ou plástico pintado para simular sua magia de gelo.
- **Armas de Gelo**: Adereços como a Espada Kori, um machado de gelo ou um martelo de gelo.
- **Bandagens**: Faixas de tecido nos braços ou pernas, comuns em vários de seus designs.

### Características Físicas
- **Olhos Congelados**: (Opcional) Lentes de contato brancas ou azul-claras para simular seus poderes de criomante.
- **Cicatriz**: (Kuai Liang) Uma cicatriz vermelha vertical sobre o olho direito, um detalhe importante adicionado a partir dos jogos 3D.
- **Postura**: Forte, disciplinada e pronta para o combate.

### Versões Alternativas
- **Clássico (Arcade)**: O visual nostálgico. Um "pijama" ninja azul simples, com máscara e capuz de tecido. Mais fácil de fazer e instantaneamente reconhecível.
- **Mortal Kombat: Deception**: Conhecido como "Shredder Sub-Zero", este visual tem uma armadura mais elaborada e um elmo que lembra o de um samurai.
- **Bi-Han (Sub-Zero Original)**: O visual do primeiro jogo, muito similar ao clássico, mas sem a cicatriz. Após sua morte, ele se torna o espectro Noob Saibot.

## Referências
Personagem jogável em quase todos os games da franquia **Mortal Kombat**, desde o arcade original de 1992. Sua aparência evolui drasticamente a cada novo jogo, oferecendo muitas opções para os cosplayers.

---

*Dificuldade*: Intermediária a Avançada (as versões modernas exigem trabalho com armaduras).  
*Destaque*: A icônica máscara azul e os adereços de gelo (Ice Ball/Armas).  
*Dica*: Espuma de EVA é o material ideal para criar as peças da armadura. Adicionar LEDs azuis discretos nos adereços de gelo ou nos olhos da máscara pode criar um efeito visual incrível para fotos noturnas.', FALSE, 1, '2025-10-03T06:05:06.128Z', '2025-10-04T06:46:02.626Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/20/00/03/20000374aab6d5aefe6dc22e49725461.jpg','https://i.pinimg.com/736x/fa/38/5d/fa385d00917a3557810fb52bc4283dfa.jpg','https://i.pinimg.com/736x/97/93/3d/97933d883b2ba2cb1c3d1b8dfe97dda6.jpg','https://i.pinimg.com/736x/5b/7e/f9/5b7ef9d13d3370f95a0d0a0a0a8eb3b9.jpg','https://i.pinimg.com/736x/25/d6/89/25d68943fe17f9d423468935a6ce5138.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (34, 'Kamila Moreira de Jesus ', 'Sem-Rosto "Kaonashi"', 'A viagem de chihiro ', '# Sem Rosto (Kaonashi) - A Viagem de Chihiro

## Sobre a Personagem
O Sem Rosto é um espírito misterioso e solitário do filme "A Viagem de Chihiro". Ele é uma entidade que reflete a personalidade e os desejos daqueles ao seu redor. Inicialmente tímido e silencioso, ele se torna um monstro voraz e insaciável ao ser corrompido pela ganância dos funcionários da casa de banhos. Sua verdadeira natureza é calma e dócil, revelada apenas na presença da sinceridade de Chihiro.

## Detalhes do Cosplay

### Vestimenta Principal
- **Manto Preto Longo**: A peça central. Um manto ou túnica preta que cobre o corpo inteiro, da cabeça aos pés, e se arrasta um pouco no chão. O tecido deve ser semi-transparente ou opaco, criando uma silhueta alta e fantasmagórica que esconde completamente a forma humana.
- **Roupa de Baixo**: Recomenda-se usar uma roupa preta de corpo inteiro (zentai suit) ou roupas pretas justas por baixo para garantir que nada fique visível através do manto.

### Acessórios
- **Máscara**: O item mais importante. Uma máscara branca e oval com uma expressão neutra e melancólica. Possui detalhes em roxo/cinza acima e abaixo dos olhos e uma boca pequena. A máscara é usada na frente da cabeça coberta pelo manto, não no rosto do cosplayer.
- **Moedas de Ouro Falsas**: Para oferecer às pessoas, imitando sua habilidade de criar ouro.
- **Fichas de Banho de Madeira**: Como as usadas na casa de banhos do filme.

### Características Físicas
- **Forma**: Alto, esguio e sem uma forma definida. A ideia é parecer uma sombra ambulante.
- **Movimento**: Lento, deliberado e um pouco hesitante.
- **Som**: Ele é quase sempre silencioso, exceto por seus sons característicos de "Ah... ah...".

### Versões Alternativas
- **Forma Monstruosa**: Uma versão muito mais complexa. O manto se abre para revelar uma boca enorme e cheia de dentes, com braços e pernas finos e longos. Este cosplay é de nível avançado e geralmente requer estruturas internas, fantoches ou até mesmo a ajuda de outras pessoas para ser operado.

## Referências
Personagem central do filme de animação do Studio Ghibli, **A Viagem de Chihiro** (Spirited Away), dirigido por Hayao Miyazaki.

---

*Dificuldade*: Iniciante (forma padrão) a Mestre (forma monstruosa)  
*Destaque*: A máscara icônica e o manto preto que esconde completamente a identidade do cosplayer.  
*Dica*: O grande truque deste cosplay é o posicionamento. A máscara deve ficar mais alta que o seu rosto real para criar a ilusão de altura e de uma anatomia não-humana. Use um tecido preto fino e respirável para a cabeça, para que você possa ver através dele.', FALSE, 1, '2025-10-03T06:03:49.429Z', '2025-10-04T06:46:08.484Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/dc/fa/ec/dcfaec8b07108407992345d3ed8c8562.jpg','https://i.pinimg.com/1200x/eb/60/49/eb6049b793c9573012d346e8d326e185.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (42, 'Júlia Satiro de Oliveira', 'Gata Negra - Felicia Hardy', 'Marvel Comics - Spider Man ', '# Gata Negra (Black Cat) - Marvel''s Spider-Man

## Sobre a Personagem
Felicia Hardy, a Gata Negra, é uma ladra habilidosa, acrobata e especialista em artes marciais. Embora muitas vezes opere no lado errado da lei, ela possui um código de honra e age como uma anti-heroína, frequentemente se tornando uma aliada e interesse amoroso do Homem-Aranha. Ela possui a habilidade de manipular a probabilidade, causando "azar" aos seus inimigos, e é conhecida por sua personalidade sedutora, confiante e brincalhona.

## Detalhes do Cosplay

### Vestimenta Principal (Traje Clássico)
- **Macacão de Corpo Inteiro (Catsuit)**: Um macacão preto justo, geralmente feito de couro sintético, vinil ou spandex, que realça sua silhueta ágil.
- **Decote em "V" Profundo**: Uma característica marcante do traje, com um zíper frontal que pode ser ajustado.
- **Gola de Pelo Branco**: Uma gola volumosa de pelo sintético branco ao redor do pescoço.
- **Punhos e Tornozelos de Pelo Branco**: Detalhes de pelo sintético branco nas extremidades das luvas e das botas, combinando com a gola.

### Acessórios
- **Máscara de Dominó**: Uma máscara preta simples que cobre a área dos olhos, acentuando seu olhar misterioso.
- **Garras**: Luvas com pequenas garras retráteis ou fixas nas pontas dos dedos.
- **Chicote**: (Opcional) Um chicote preto, que ela às vezes utiliza como arma ou ferramenta.
- **Bolsa de Ladrão**: (Opcional) Uma pequena bolsa presa à coxa para guardar seus "tesouros" roubados.

### Características Físicas
- **Cabelo**: Longo, liso e de cor branco-prateado ou platinado.
- **Olhos**: Verdes ou azuis (lentes de contato podem ser usadas para intensificar a cor).
- **Maquiagem**: Geralmente um batom vermelho vibrante e um delineado "gatinho" para realçar os olhos.

### Versões Alternativas
- **Marvel''s Spider-Man (PS4/PS5)**: Uma versão mais moderna e tática. O traje possui detalhes em branco e cinza, com texturas diferentes e pequenas peças de armadura. A gola de pelo é removida.
- **Ultimate Spider-Man**: Visual mais jovem, com cabelo curto e castanho, e um traje mais simples, sem os pelos brancos.
- **Anos 90 (Série Animada)**: Cabelo azul-acinzentado e um traje que mantém os elementos clássicos, mas com um design de animação.

## Referências
Personagem proeminente nos quadrinhos da Marvel Comics, especialmente nas histórias do **Homem-Aranha**. Também tem papéis de destaque em jogos como **Marvel''s Spider-Man** e em várias séries animadas.

---

*Dificuldade*: Iniciante a Intermediário (o desafio é encontrar um macacão com bom caimento).  
*Destaque*: O contraste do macacão preto com os pelos brancos e o cabelo platinado.  
*Dica*: O material do macacão é a chave. Um tecido com um pouco de brilho, como couro sintético, captura perfeitamente o visual da personagem. A atitude confiante, misteriosa e um pouco provocadora é fundamental para incorporar a Gata Negra.', FALSE, 1, '2025-10-03T06:15:10.288Z', '2025-10-04T06:45:37.116Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/04/b4/da/04b4da0e5032b69e11ec8187da7523d4.jpg','https://i.pinimg.com/736x/93/24/35/9324358e0e66c44a2aaca1644066b581.jpg','https://i.pinimg.com/736x/40/8c/da/408cda6e00716fb6c667ba94859a2e10.jpg','https://i.pinimg.com/736x/a6/10/02/a610025bb95292cf0f8b2de300c4125a.jpg','https://i.pinimg.com/736x/39/0a/cc/390acc35e16e35ff9a249b449cb708e1.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (43, 'Rafael Carlos de Souza ', 'Sub Zero ', 'Mortal Kombat 9', '# Sub-Zero - Mortal Kombat

## Sobre a Personagem
Sub-Zero é um título hereditário no clã de assassinos Lin Kuei. O mais conhecido é Kuai Liang, um guerreiro com a habilidade sobre-humana de controlar o gelo (Criomancia). Ele pode congelar oponentes, criar armas de gelo e deslizar pelo chão. Definido por seu código de honra e sua rivalidade mortal com Scorpion, Sub-Zero é um dos personagens mais fundamentais e reconhecíveis de todo o universo Mortal Kombat.

## Detalhes do Cosplay

### Vestimenta Principal (Versão Moderna - Ex: MK11/MK1)
- **Máscara Ninja**: A peça central. Cobre o nariz e a boca, geralmente em azul e preto, com detalhes que podem ser de tecido, couro ou com aparência metálica.
- **Capuz**: Capuz preto ou azul-escuro que se integra à máscara.
- **Túnica/Tabardo**: Uma túnica azul usada sobre o peito, muitas vezes com detalhes em preto, cinza ou prata e o símbolo do clã Lin Kuei.
- **Roupa de Base**: Um traje preto justo por baixo, podendo ser um macacão ou calça e blusa.
- **Armadura**: Peças de armadura nos ombros, antebraços e canelas. O design varia muito entre os jogos, mas a paleta de azul, preto e prata/aço é constante.
- **Cinto**: Cinto utilitário com fivelas e, frequentemente, o medalhão do clã.

### Acessórios
- **Bola de Gelo (Ice Ball)**: Um prop essencial. Uma esfera de resina translúcida, acrílico ou plástico pintado para simular sua magia de gelo.
- **Armas de Gelo**: Adereços como a Espada Kori, um machado de gelo ou um martelo de gelo.
- **Bandagens**: Faixas de tecido nos braços ou pernas, comuns em vários de seus designs.

### Características Físicas
- **Olhos Congelados**: (Opcional) Lentes de contato brancas ou azul-claras para simular seus poderes de criomante.
- **Cicatriz**: (Kuai Liang) Uma cicatriz vermelha vertical sobre o olho direito, um detalhe importante adicionado a partir dos jogos 3D.
- **Postura**: Forte, disciplinada e pronta para o combate.

### Versões Alternativas
- **Clássico (Arcade)**: O visual nostálgico. Um "pijama" ninja azul simples, com máscara e capuz de tecido. Mais fácil de fazer e instantaneamente reconhecível.
- **Mortal Kombat: Deception**: Conhecido como "Shredder Sub-Zero", este visual tem uma armadura mais elaborada e um elmo que lembra o de um samurai.
- **Bi-Han (Sub-Zero Original)**: O visual do primeiro jogo, muito similar ao clássico, mas sem a cicatriz. Após sua morte, ele se torna o espectro Noob Saibot.

## Referências
Personagem jogável em quase todos os games da franquia **Mortal Kombat**, desde o arcade original de 1992. Sua aparência evolui drasticamente a cada novo jogo, oferecendo muitas opções para os cosplayers.

---

*Dificuldade*: Intermediária a Avançada (as versões modernas exigem trabalho com armaduras).  
*Destaque*: A icônica máscara azul e os adereços de gelo (Ice Ball/Armas).  
*Dica*: Espuma de EVA é o material ideal para criar as peças da armadura. Adicionar LEDs azuis discretos nos adereços de gelo ou nos olhos da máscara pode criar um efeito visual incrível para fotos noturnas.', FALSE, 1, '2025-10-04T06:11:17.351Z', '2025-10-04T06:46:53.926Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/25/d6/89/25d68943fe17f9d423468935a6ce5138.jpg','https://i.pinimg.com/736x/5b/7e/f9/5b7ef9d13d3370f95a0d0a0a0a8eb3b9.jpg','https://i.pinimg.com/736x/46/70/59/4670599b94160d770dab828d37384c42.jpg','https://i.pinimg.com/736x/a0/12/2b/a0122ba9bc49455db67b194869732d59.jpg','https://i.pinimg.com/736x/e8/d4/dc/e8d4dc53e36b56c5c87eaf510b31ba15.jpg'], 'desfile', 'presentation', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (36, 'Luana Gabriela guedes', 'Elaina ', 'Majo no tabitabi', '# Elaina - Majo no Tabitabi (A Jornada da Bruxa)

## Sobre a Personagem
Elaina é a protagonista da série, uma bruxa genial e viajante conhecida pelo título de "Bruxa Cinzenta". Motivada pelas histórias de uma feiticeira chamada Nike, ela viaja pelo mundo sem um destino fixo, registrando suas diversas e, por vezes, sombrias experiências em um diário. Ela é confiante (às vezes até um pouco arrogante), inteligente e curiosa, mas geralmente prefere manter uma postura de observadora nos assuntos alheios.

## Detalhes do Cosplay

### Vestimenta Principal
- **Chapéu de Bruxa**: Um clássico chapéu preto, pontudo e de abas largas, adornado com uma fita roxa na base.
- **Robe de Bruxa**: Um longo sobretudo/robe preto com forro interno roxo, usado aberto.
- **Blusa Branca**: Uma blusa de mangas compridas com babados nos punhos e na gola.
- **Corset/Corpete**: Um colete preto justo (corset ou corpete) usado por cima da blusa.
- **Saia Preta**: Uma saia preta, geralmente plissada, que vai até a altura dos joelhos.
- **Meias**: Meias pretas 7/8 (acima dos joelhos).
- **Sapatos**: Botas pretas ou sapatos de cor escura.

### Acessórios
- **Broche de Bruxa**: Um broche prateado em formato de estrela ou flor de lis, usado para prender o laço/gravata no colarinho da blusa. É seu símbolo de graduação como bruxa.
- **Vassoura Mágica**: Sua vassoura de madeira, usada para voar.
- **Varinha Mágica**: (Opcional) Uma varinha simples de madeira.
- **Diário**: O diário onde ela anota suas aventuras.

### Características Físicas
- **Cabelo**: Longo e liso, de cor cinza-claro ou prateado (cor de cinzas), geralmente usado solto ou com duas tranças finas na frente.
- **Olhos**: Roxos ou violeta (uso de lentes de contato recomendado).

### Versões Alternativas
- **Roupas Casuais**: Em alguns capítulos e ilustrações, Elaina usa roupas mais simples para se misturar, como vestidos ou blusas e saias de cores claras, mas sempre mantendo uma aparência elegante.

## Referências
Protagonista do anime e da série de light novels **Majo no Tabitabi** (Wandering Witch: The Journey of Elaina).

---

*Dificuldade*: Intermediária  
*Destaque*: O cabelo cinza-prateado, o broche de bruxa e o chapéu elegante.  
*Dica*: O segredo para um bom cosplay de Elaina está na qualidade dos tecidos, especialmente do robe. Um tecido com bom caimento e um forro roxo vibrante farão toda a diferença. A peruca (wig) deve ser de alta qualidade para capturar a cor e o brilho do cabelo dela.', FALSE, 1, '2025-10-03T06:07:06.175Z', '2025-10-04T06:45:57.770Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/e8/b9/a4/e8b9a49df584ef1f57e36de0c30206b4.jpg','https://i.pinimg.com/736x/89/dc/20/89dc20aed77c557a8dff6ebcdbad2ed7.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (30, 'Nicoly Cristina da Silva ', 'Villager (Minecraft)', 'Minecraft ', '# Villager (Aldeão) - Minecraft

## Sobre a Personagem
O Villager, ou Aldeão, é um dos mobs passivos mais icônicos do universo de Minecraft. Eles vivem em vilas geradas pelo mundo, possuem diversas profissões e são a principal forma de comércio dentro do jogo, trocando itens com o jogador em troca de esmeraldas. São conhecidos por sua aparência única e blocky, seu nariz proeminente e seus sons característicos de "hmmm".

## Detalhes do Cosplay

### Vestimenta Principal
- **Cabeça Cúbica**: A parte mais importante. Geralmente feita com uma caixa de papelão ou espuma EVA para criar o formato quadrado. Deve incluir:
    - **Nariz grande**: Um nariz exageradamente grande e protuberante.
    - **Monocelha**: Uma única sobrancelha preta e reta.
    - **Olhos verdes**: Dois olhos verdes e retangulares.
- **Túnica (Robe)**: Uma túnica longa e marrom que vai até os pés, cobrindo todo o corpo e dando uma silhueta retangular. Não há calças ou sapatos visíveis.
- **Braços**: Mangas longas que terminam em "mãos" quadradas, que devem ser unidas na frente do corpo para imitar a pose clássica do Villager.

### Acessórios
- **Esmeralda**: Uma grande esmeralda pixelada, feita de espuma, papel ou outro material leve. É o item de troca principal deles.
- **Itens de Profissão**: Dependendo da versão, pode carregar trigo, um livro, um peixe, etc., todos em estilo pixelado/cúbico.

### Características Físicas
- **Formato**: O corpo inteiro deve passar a impressão de ser feito de blocos. A silhueta é mais importante que os detalhes.
- **Postura**: Rígida, com os braços sempre cruzados na frente.
- **Som**: O som "hmmm" é sua marca registrada (pode ser imitado pelo cosplayer para um efeito cômico).

### Versões Alternativas
A principal variação do Villager é sua profissão, que muda a cor e os detalhes de sua túnica:
- **Bibliotecário (Librarian)**: Túnica branca com detalhes que parecem óculos e um chapéu que se assemelha a um livro.
- **Fazendeiro (Farmer)**: Túnica marrom com um chapéu de palha de abas largas.
- **Ferreiro (Blacksmith)**: Túnica marrom com um avental preto por cima.
- **Clérigo (Cleric)**: Túnica roxa com detalhes dourados.
- **Aldeão Zumbi (Zombie Villager)**: A mesma estrutura, mas com pele esverdeada, olhos vermelhos e roupas rasgadas.

## Referências
Personagem (mob) encontrado em vilas por todo o mundo do jogo **Minecraft**, um dos jogos mais vendidos de todos os tempos.

---

*Dificuldade*: Intermediária a Avançada (exige construção e não apenas costura)  
*Destaque*: A cabeça cúbica com o nariz gigante e os braços cruzados.  
*Dica*: O segredo deste cosplay está na construção. Use papelão ou placas de espuma para criar a cabeça e os ombros, garantindo a forma de bloco. Leveza é fundamental para conseguir usar a cabeça por muito tempo!', FALSE, 1, '2025-10-03T05:52:47.281Z', '2025-10-04T06:46:25.674Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/81/3c/b8/813cb865e0005b5e58106bfa07ea57f6.jpg','https://i.pinimg.com/736x/51/b9/b3/51b9b3db5da0b94626e90b1655730fff.jpg','https://i.pinimg.com/736x/51/9a/1c/519a1c7708f536f7f59c0214ba07b728.jpg','https://i.pinimg.com/736x/6d/3c/d7/6d3cd7e9ea653fe4b3f24497e192cd1f.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (41, 'Daniel Ribeiro ', 'Papyrus ', 'Undertale ', '# Papyrus - Undertale

## Sobre a Personagem
Papyrus é um esqueleto exuberante, carismático e um tanto ingênuo do jogo Undertale. Ele sonha em se tornar um membro da Guarda Real e se esforça ao máximo para capturar um humano, acreditando que isso lhe trará respeito e popularidade. Ele é obcecado por quebra-cabeças, cozinha espaguete (de forma questionável) e tem um coração de ouro, sempre acreditando no bem que existe dentro de todos.

## Detalhes do Cosplay

### Vestimenta Principal (O "Corpo de Batalha")
- **Peitoral de Armadura**: Uma peça branca que cobre o torso, com detalhes e bordas em dourado/amarelo. É uma "armadura" feita à mão, então deve ter uma aparência mais de fantasia do que de metal real.
- **Cachecol Vermelho**: Um longo e esvoaçante cachecol (ou capa curta) vermelho amarrado no pescoço. É sua marca registrada.
- **Luvas Vermelhas**: Luvas longas que vão até os cotovelos.
- **Sunga Azul**: Uma sunga ou shorts azuis bem justos usados por cima da parte de baixo.
- **Pernas de Esqueleto**: Uma calça legging ou meião preto com os ossos da perna pintados ou aplicados em branco.
- **Botas Vermelhas**: Botas de cano alto, também com uma faixa dourada/amarela na parte superior.

### Acessórios
- **Osso (Prop)**: Um grande osso branco, que ele usa em seus ataques "azuis". Pode ser feito de espuma, PVC ou até mesmo um de plástico comprado em pet shops.
- **Prato de Espaguete**: (Opcional, mas hilário) Um prato com uma porção de espaguete para oferecer aos humanos que encontrar.

### Características Físicas
- **Crânio de Esqueleto**: A parte mais importante. Pode ser uma máscara completa que captura seu sorriso largo e expressão confiante, ou uma combinação de maquiagem "skull face" com um capuz preto (balaclava) por baixo para esconder o cabelo e o pescoço.
- **Corpo de Esqueleto**: O tronco e os braços podem ser cobertos por uma blusa preta com os ossos da caixa torácica e dos braços pintados.
- **Postura**: Absolutamente essencial! Papyrus está sempre com o peito estufado, a cabeça erguida e em poses heroicas e extravagantes.

### Versões Alternativas
- **"Cara Legal" (Cool Dude)**: Seu traje de "encontro". Consiste em um boné de beisebol vermelho virado para trás, uma camiseta branca com a inscrição "COOL DUDE", shorts, meias e tênis.

## Referências
Personagem amado do aclamado jogo de RPG **Undertale**, criado por Toby Fox.

---

*Dificuldade*: Intermediária (O desafio está na confecção do "Corpo de Batalha" e da máscara/crânio).  
*Destaque*: O cachecol vermelho esvoaçante e a pose heroica e confiante.  
*Dica*: A personalidade é 80% deste cosplay! Pratique seu "NYEH HEH HEH!", suas poses exageradas e sua atitude otimista. Uma máscara bem-feita que capture o sorriso icônico de Papyrus fará seu cosplay se destacar de longe.', FALSE, 1, '2025-10-03T06:13:35.394Z', '2025-10-04T06:47:00.182Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/5e/b6/62/5eb662604ddae4b235c504fd8bb87081.jpg','https://i.pinimg.com/736x/e1/3f/46/e13f46bb48c911183035cdd5e3676740.jpg'], 'desfile', 'presentation', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (40, 'Daniel Ribeiro ', 'Papyrus ', 'Undertale ', '# Papyrus - Undertale

## Sobre a Personagem
Papyrus é um esqueleto exuberante, carismático e um tanto ingênuo do jogo Undertale. Ele sonha em se tornar um membro da Guarda Real e se esforça ao máximo para capturar um humano, acreditando que isso lhe trará respeito e popularidade. Ele é obcecado por quebra-cabeças, cozinha espaguete (de forma questionável) e tem um coração de ouro, sempre acreditando no bem que existe dentro de todos.

## Detalhes do Cosplay

### Vestimenta Principal (O "Corpo de Batalha")
- **Peitoral de Armadura**: Uma peça branca que cobre o torso, com detalhes e bordas em dourado/amarelo. É uma "armadura" feita à mão, então deve ter uma aparência mais de fantasia do que de metal real.
- **Cachecol Vermelho**: Um longo e esvoaçante cachecol (ou capa curta) vermelho amarrado no pescoço. É sua marca registrada.
- **Luvas Vermelhas**: Luvas longas que vão até os cotovelos.
- **Sunga Azul**: Uma sunga ou shorts azuis bem justos usados por cima da parte de baixo.
- **Pernas de Esqueleto**: Uma calça legging ou meião preto com os ossos da perna pintados ou aplicados em branco.
- **Botas Vermelhas**: Botas de cano alto, também com uma faixa dourada/amarela na parte superior.

### Acessórios
- **Osso (Prop)**: Um grande osso branco, que ele usa em seus ataques "azuis". Pode ser feito de espuma, PVC ou até mesmo um de plástico comprado em pet shops.
- **Prato de Espaguete**: (Opcional, mas hilário) Um prato com uma porção de espaguete para oferecer aos humanos que encontrar.

### Características Físicas
- **Crânio de Esqueleto**: A parte mais importante. Pode ser uma máscara completa que captura seu sorriso largo e expressão confiante, ou uma combinação de maquiagem "skull face" com um capuz preto (balaclava) por baixo para esconder o cabelo e o pescoço.
- **Corpo de Esqueleto**: O tronco e os braços podem ser cobertos por uma blusa preta com os ossos da caixa torácica e dos braços pintados.
- **Postura**: Absolutamente essencial! Papyrus está sempre com o peito estufado, a cabeça erguida e em poses heroicas e extravagantes.

### Versões Alternativas
- **"Cara Legal" (Cool Dude)**: Seu traje de "encontro". Consiste em um boné de beisebol vermelho virado para trás, uma camiseta branca com a inscrição "COOL DUDE", shorts, meias e tênis.

## Referências
Personagem amado do aclamado jogo de RPG **Undertale**, criado por Toby Fox.

---

*Dificuldade*: Intermediária (O desafio está na confecção do "Corpo de Batalha" e da máscara/crânio).  
*Destaque*: O cachecol vermelho esvoaçante e a pose heroica e confiante.  
*Dica*: A personalidade é 80% deste cosplay! Pratique seu "NYEH HEH HEH!", suas poses exageradas e sua atitude otimista. Uma máscara bem-feita que capture o sorriso icônico de Papyrus fará seu cosplay se destacar de longe.', FALSE, 1, '2025-10-03T06:13:00.757Z', '2025-10-04T06:45:42.799Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/5e/b6/62/5eb662604ddae4b235c504fd8bb87081.jpg','https://i.pinimg.com/736x/45/3f/78/453f78b434a041a46ca460534f6d8406.jpg','https://i.pinimg.com/736x/d4/bc/d7/d4bcd790a1fbc7630e0ca034b3a40276.jpg','https://i.pinimg.com/736x/4c/88/f4/4c88f4071b0b0679eaa110fb7844167a.jpg','https://i.pinimg.com/736x/93/bb/30/93bb305a236d8a38bc3d2a1a5e2430e8.jpg','https://i.pinimg.com/736x/e1/3f/46/e13f46bb48c911183035cdd5e3676740.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (39, 'Luka Labadia ', 'Ahri Florescer Espiritual', 'League of Legends ', '# Ahri Florescer Espiritual (Spirit Blossom Ahri) - League of Legends

## Sobre a Personagem
Ahri é uma Vastaya, uma raça de seres-espírito-besta de Runeterra, com afinidade pela magia. Em sua skin "Florescer Espiritual", ela incorpora a figura de um espírito florescer, sendo a ponte entre o mundo dos vivos e dos mortos durante o festival Florescer Espiritual de Ionia. Ela é uma figura graciosa, sedutora e um tanto enigmática, que guia as almas perdidas para a vida após a morte, muitas vezes testando seus corações.

## Detalhes do Cosplay

### Vestimenta Principal
- **Quimono (Kimono)**: Um quimono branco ou off-white, com detalhes em tons de azul claro, roxo e rosa, evocando flores de cerejeira e padrões espirituais. As mangas são longas e fluidas, quase esvoaçantes.
- **Obi**: Uma faixa larga azul-escura ou roxa amarrada na cintura, com um grande laço na parte de trás.
- **Acessórios de Cabelo**: Flores e fitas (geralmente em tons de rosa, azul e branco) adornando o cabelo, especialmente na área dos coques ou da coroa.
- **Colar/Gargantilha**: Um colar delicado que pode ter um pequeno sino ou um charm espiritual.

### Acessórios
- **Orelhas de Raposa**: Orelhas brancas ou prateadas, peludas, fixadas na cabeça.
- **Nove Caudas**: O acessório mais icônico e desafiador. Nove caudas grandes, volumosas e peludas (brancas ou prateadas, com pontas que podem ter um tom azul/roxo ou rosa), que parecem flutuar ou brilhar. Podem ter LEDs.
- **Lanternas Espirituais**: Pequenas lanternas de papel ou resina, com luzes internas (LEDs), que ela segura ou que flutuam ao redor dela.
- **Leque**: Um leque tradicional japonês, com designs de flores de cerejeira ou motivos espirituais.

### Características Físicas
- **Cabelo**: Longo e branco prateado, geralmente estilizado em um ou dois coques altos ou penteados elaborados, com algumas mechas soltas emoldurando o rosto.
- **Olhos**: Rosa-choque ou violeta-claro, com pupilas finas (uso de lentes de contato é altamente recomendado).
- **Maquiagem**: Delicada, com tons de rosa nos lábios e bochechas. Pode incluir um design sutil de "lírio" ou "flor" no rosto, perto dos olhos, como na splash art.
- **Unhas**: Podem ser pintadas de rosa ou azul.

### Versões Alternativas
- **Splash Art/Concept Art**: Existem variações sutis no design, então é bom escolher uma arte de referência específica.

## Referências
Skin "Florescer Espiritual Ahri" do jogo **League of Legends**, lançada durante o evento Florescer Espiritual.

---

*Dificuldade*: Avançada (Principalmente devido à complexidade e ao volume das nove caudas e aos detalhes do quimono).  
*Destaque*: As nove caudas grandes e o cabelo branco prateado com as flores.  
*Dica*: As caudas são o grande desafio. Elas precisam de uma estrutura interna para manter o volume e a forma. Usar pelo sintético de boa qualidade e, se possível, incluir um sistema de LEDs para um efeito mágico noturno. O quimono deve ter tecidos fluidos para um movimento gracioso.', FALSE, 1, '2025-10-03T06:11:04.580Z', '2025-10-04T06:47:04.494Z', 'active', '0.00', 0, ARRAY['https://i.pinimg.com/736x/eb/70/87/eb7087ab633e28cf7eaf93d91921c1b3.jpg','https://i.pinimg.com/736x/12/39/63/123963634c557adb5132849c620ec750.jpg','https://i.pinimg.com/736x/97/f1/52/97f152b06549e87d15cbed47a73fe3fa.jpg','https://i.pinimg.com/736x/25/08/0b/25080b318a7ed36a93b9bbf0f6f5f2b5.jpg','https://i.pinimg.com/736x/bc/92/5d/bc925d3273a79ac783fae7a0f1dd0875.jpg','https://i.pinimg.com/736x/c1/6c/7b/c16c7b4fee33dae97664269e4b247f6d.jpg'], 'desfile', 'presentation', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (48, 'Rayssa Rodrigues Gontijo Vaz ', 'Inosuke', 'Demon slayer', '# Hashibira Inosuke - Kimetsu no Yaiba (Demon Slayer)

## Sobre a Personagem
Inosuke Hashibira é um dos principais aliados de Tanjiro Kamado e membro do Corpo de Exterminadores de Demônios. Criado por javalis na montanha, ele possui uma personalidade selvagem, impulsiva e extremamente orgulhosa, sempre buscando ser o mais forte e desafiar os outros para provar sua superioridade. Apesar de sua natureza agressiva, ele é leal aos seus amigos e tem um coração protetor. Sua marca registrada é a cabeça de javali que ele usa como máscara.

## Detalhes do Cosplay

### Vestimenta Principal
- **Cabeça de Javali (Máscara)**: A peça mais icônica. Uma cabeça de javali cinza/azul-clara, com pelo sintético, presas grandes e uma expressão feroz. Deve ser uma máscara que cubra toda a cabeça, com aberturas discretas para a visão.
- **Calças Harem/Hakama**: Calças largas e frouxas, geralmente em um tom de cinza, azul-escuro ou marrom-escuro, amarradas nos tornozelos.
- **Pele de Javali (Saia)**: Uma saia feita de pelo sintético marrom ou cinza, simulando a pele de javali, usada sobre as calças.

### Acessórios
- **Duas Katanas Nichirin**: As espadas de Inosuke são serrilhadas e de cor azul-acinzentada ou azul-escuro. Ele as usa nas bainhas amarradas na lateral da cintura.
- **Ataduras/Faixas**: Faixas brancas enroladas em seus braços, cobrindo os antebraços e os punhos.
- **Cinto**: Um cinto simples, geralmente de corda ou couro, para prender as espadas e a pele de javali.

### Características Físicas
- **Corpo**: Inosuke é incrivelmente musculoso e definido, apesar de sua aparência "delicada" sem a máscara. Para o cosplay, um físico atlético ajuda muito.
- **Cabelo**: Preto azulado, longo e despenteado, com as pontas mais claras, quase azul-claras.
- **Olhos**: Grandes, com íris verdes ou verdes-azuladas. Possuem cílios longos e marcantes, que contrastam com sua personalidade selvagem.
- **Expressão**: Sem a máscara, ele tem uma expressão surpreendentemente bonita e andrógina, o que contrasta fortemente com sua atitude. Com a máscara, a expressão é de desafio.

### Versões Alternativas
- **Uniforme do Corpo de Exterminadores (com Jaqueta)**: Em algumas cenas ou artes, Inosuke usa a jaqueta preta padrão dos Exterminadores de Demônios por cima de sua roupa, mas ainda com a cabeça de javali e as calças.

## Referências
Personagem principal do popular mangá e anime **Kimetsu no Yaiba (Demon Slayer)**, criado por Koyoharu Gotouge.

---

*Dificuldade*: Intermediária a Avançada (A cabeça de javali é o maior desafio, exigindo modelagem e trabalho com pelo sintético).  
*Destaque*: A inconfundível máscara de cabeça de javali e as duas katanas serrilhadas.  
*Dica*: Invista tempo na construção da cabeça de javali para que ela fique leve e confortável, mas com uma expressão fiel. A atitude de Inosuke é energética e barulhenta, então pratique suas poses de batalha e seu grito "PIG ASSAULT"\!', FALSE, 1, '2025-10-04T06:31:46.559Z', '2025-10-04T06:45:07.288Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/10/07/f2/1007f2aff9b50b066417f4129bcf01af.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (44, 'Amanda Inês Resende de Souza ', 'Firekeeper ', 'Dark Souls ', '# Fire Keeper (Guardiã do Fogo) - Dark Souls III

## Sobre a Personagem
A Fire Keeper é uma figura enigmática e vital em Dark Souls III, atuando como a principal intercessora entre o jogador (o Unkindled Ash) e o processo de fortalecer a chama no Firelink Shrine. Ela está sempre de olhos vendados, sem pálpebras, e fala com uma voz suave e melancólica. Sua existência está intrinsecamente ligada à First Flame e ao ciclo de eras de luz e escuridão, e ela é a guardiã silenciosa da esperança em um mundo moribundo.

## Detalhes do Cosplay

### Vestimenta Principal
- **Manto Longo**: Um manto longo e fluido, geralmente de cor cinza-escura, preta ou roxo-acinzentada. O tecido deve ter um caimento pesado e elegante, com mangas longas e amplas.
- **Vestido Base**: Por baixo do manto, um vestido simples de cor escura, que serve como base para o traje.
- **Capuz**: Um capuz que faz parte do manto ou é usado por baixo, cobrindo a parte de trás da cabeça e do pescoço.
- **Luvas Longas**: Luvas que vão até os cotovelos ou mais acima, de um tecido fino e escuro, sem mostrar a pele.
- **Sapatos/Botas**: Sapatos ou botas discretos e escuros, que não chamem atenção, pois o manto geralmente cobre os pés.

### Acessórios
- **Véu/Venda para os Olhos**: A característica mais definidora. Uma faixa de tecido (geralmente branca ou bege pálido) que cobre completamente os olhos. Este véu não deve ser transparente.
- **Coroa/Diadema**: Um ornamento delicado, geralmente feito de metal escurecido ou material semelhante a osso/galho, que adorna o véu na testa.
- **Chama de Fogo (Opcional)**: Uma pequena chama ou efeito de fogo na mão, simbolizando a First Flame. Pode ser um LED flamejante.
- **Anéis**: Anéis simples e escuros nos dedos.

### Características Físicas
- **Cabelo**: Não visível devido ao capuz e ao véu.
- **Expressão**: Devido ao véu, a expressão é transmitida pela postura e pelo movimento. A postura é serena, um pouco curvada e humilde.
- **Mãos**: Delicadas, mas com uma leve textura ou detalhe que sugira a história de seu sacrifício (embora não tão explícito quanto as chagas do Ashen One).

### Versões Alternativas
- **Sem Véu (Final "The End of Fire")**: Embora nunca vista completamente sem véu, a descrição de seus olhos sem pálpebras poderia ser interpretada com maquiagem pesada ou próteses para os olhos para um cosplay mais arriscado e dramático.
- **Versão com Soul of Fire Keeper (Item)**: A alma em si é um item, mas pode inspirar um acessório etéreo.

## Referências
Personagem crucial e não jogável de **Dark Souls III**, servindo como o ponto central para o upgrade de estatísticas do jogador e para a lore do jogo no Firelink Shrine.

---

*Dificuldade*: Intermediária a Avançada (Devido à necessidade de um bom caimento do manto, detalhes sutis e a criação do véu/diadema).  
*Destaque*: O véu que cobre os olhos e a coroa delicada.  
*Dica*: O caimento do manto é vital para a elegância e a aura melancólica da Fire Keeper. Escolha um tecido pesado, como veludo, linho ou lã fina. Pratique a postura e os movimentos lentos e graciosos para realmente incorporar o personagem, transmitindo a serenidade e a tragédia dela. Certifique-se de que a venda permita uma visão mínima ou utilize um guia para se locomover com segurança.', FALSE, 1, '2025-10-04T06:24:09.509Z', '2025-10-04T06:45:34.631Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/be/91/32/be913200c24ea418ea6c15e417d2a067.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (33, 'marjory marques bastos de menezes', 'Sua', 'Alien Stage', '# Sua - Alien Stage

## Sobre a Personagem
Sua é uma das participantes centrais da primeira rodada do Alien Stage, uma competição de canto mortal onde humanos são forçados a se apresentar para uma audiência alienígena. Caracterizada como sensível, quieta e de aparência frágil, ela demonstra uma enorme força interior e devoção, especialmente por sua amada, Mizi. Sua performance e seu sacrifício no início da história são o catalisador para todo o enredo, e sua memória assombra os personagens restantes.

## Detalhes do Cosplay

### Vestimenta Principal
- **Vestido branco** curto e sem alças, com um design limpo e minimalista. Algumas versões a mostram com mangas brancas separadas que vão do cotovelo ao pulso.
- **Meias brancas** altas, geralmente 7/8 (acima dos joelhos).
- **Sapatos brancos**, que podem ser sapatilhas ou botas de cano curto com um pequeno salto.

### Acessórios
- **Microfone** com design único, geralmente branco com detalhes que lembram uma flor ou um organismo alienígena. É seu acessório mais icônico.
- **Brincos** pequenos e discretos, geralmente prateados ou brancos.
- **Pelúcia de alienígena verde** (opcional, mas frequentemente associado à personagem em artes e mercadorias).

### Características Físicas
- **Cabelo**: Preto, bem curto e liso, com um corte reto e franja.
- **Olhos**: Azuis ou violeta-claro (uso de lentes de contato recomendado para maior fidelidade).
- **Expressão**: Frequentemente melancólica, serena ou focada.

### Versões Alternativas
- **Vestido Preto (Troca com Mizi)**: Em algumas artes e flashbacks, Sua é vista usando o vestido preto de Mizi. Esta é uma ótima opção para um cosplay em dupla.
- **Roupas Casuais**: Em artes promocionais, ela pode aparecer com roupas mais simples, como blusas de cores claras e saias, mantendo a paleta de cores suaves.

## Referências
Personagem central da série de clipes musicais animados **Alien Stage**, criada por VIVINOS. Sua aparece de forma proeminente no "Round 1" e sua presença é sentida ao longo de toda a série.

---

*Dificuldade*: Iniciante a Intermediário  
*Destaque*: O cabelo curto e preto em contraste com o vestido totalmente branco e o microfone único.  
*Dica*: A simplicidade do traje exige um acabamento impecável. A expressão facial e a delicadeza na pose são essenciais para capturar a essência da personagem.', FALSE, 1, '2025-10-03T06:01:24.358Z', '2025-10-04T06:46:13.540Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/01/50/62/015062d75621365a07d93eb5afbd2286.jpg','https://i.pinimg.com/736x/9f/64/a2/9f64a2e756b12eda307c621173e8a550.jpg','https://i.pinimg.com/736x/78/e6/5c/78e65c082bb55322c05896c627cdb6af.jpg','https://i.pinimg.com/736x/6b/61/d2/6b61d2074664330a2d4f7d9ec5e8f125.jpg','https://i.pinimg.com/736x/55/25/67/5525675cf72cedef52ba7076a8505ca6.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (45, 'Clênio Vitor da Silva ', 'Michael Jackson ', 'Cantor ', '# Michael Jackson - O Rei do Pop

## Sobre o Artista
Michael Jackson, o "Rei do Pop", foi um dos artistas mais influentes e revolucionários da história da música. Cantor, compositor e dançarino incomparável, ele quebrou barreiras culturais e redefiniu a indústria do entretenimento com seus videoclipes cinematográficos, performances de palco eletrizantes e um senso de moda que criou tendências globais. Seus movimentos, como o Moonwalk, e seu estilo são instantaneamente reconhecíveis em todo o mundo.

## Detalhes do Cosplay

### Vestimenta Principal (Visual "Billie Jean" - Motown 25)
- **Jaqueta de Lantejoulas Pretas**: Uma jaqueta curta, completamente coberta de lantejoulas pretas brilhantes.
- **Calças Pretas**: Calças sociais pretas, com a barra propositalmente mais curta ("high-water") para deixar as meias bem visíveis.
- **Camisa**: Por baixo da jaqueta, uma camisa de lantejoulas prateadas ou, para uma versão mais simples, uma camisa social branca com botões.
- **Meias Brancas**: Meias brancas de algodão, grossas e brilhantes, que são um ponto de destaque do visual.
- **Sapatos Loafer Pretos**: Sapatos de couro pretos, no estilo mocassim (loafer), perfeitos para dançar.

### Acessórios
- **Fedora Preto**: Um chapéu de feltro preto, estilo fedora, usado inclinado para a frente.
- **A Luva Branca**: O acessório mais famoso. Uma única luva para a mão esquerda, coberta de strass, cristais ou lantejoulas brancas/prateadas.
- **Microfone**: (Opcional) Um microfone de mão, de preferência com um design mais vintage.

### Características Físicas
- **Cabelo**: O cabelo preto com cachos soltos (Jheri curl) da era "Thriller", geralmente na altura dos ombros com uma mecha caindo sobre a testa.
- **Postura e Poses**: Essencial! A alma do cosplay está nos movimentos. Pratique as poses icônicas: a mão na aba do chapéu, a postura na ponta dos pés, os giros e, para os mais ousados, o Moonwalk.

### Versões Alternativas
- **"Thriller"**: A famosa jaqueta de couro vermelha com detalhes em preto, combinada com calças vermelhas.
- **"Smooth Criminal"**: O elegante terno branco risca de giz, com uma camisa azul, gravata branca e um chapéu fedora branco.
- **"Bad"**: Jaqueta de couro preta coberta de fivelas, zíperes e cintos.
- **Traje Militar**: As icônicas jaquetas de estilo militar, com dragonas, adornos dourados e medalhas, que ele usou em muitas turnês.

## Referências
Artista e ícone global. Este visual específico foi imortalizado na performance de "Billie Jean" no especial de TV **Motown 25: Yesterday, Today, Forever** (1983), onde ele realizou o Moonwalk pela primeira vez para um público massivo.

---

*Dificuldade*: Intermediária (O desafio está em encontrar ou customizar a jaqueta e a luva de lantejoulas).  
*Destaque*: A combinação da luva branca única, o fedora preto e as meias brancas visíveis.  
*Dica*: Este cosplay é 90% atitude e performance. Assista ao vídeo da performance no Motown 25 repetidamente. Cada detalhe, da inclinação do chapéu ao jeito de segurar o microfone, é importante. O caimento da calça mais curta é crucial para o visual ser autêntico.', FALSE, 1, '2025-10-04T06:26:20.345Z', '2025-10-04T06:45:26.580Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/ba/02/d3/ba02d352a3fbd0608b5033eb0324042c.jpg','https://i.pinimg.com/736x/44/a5/81/44a5813d9df2af5765127ac3097bf3bc.jpg','https://i.pinimg.com/736x/6d/5b/f1/6d5bf1dadd8c03c946f826173c825324.jpg','https://i.pinimg.com/736x/39/72/a1/3972a15971d3088101f4749bcfbdc968.jpg','https://i.pinimg.com/736x/67/e8/53/67e853b32f19425383b52a94c77e357c.jpg'], 'desfile', 'desfile', FALSE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (46, 'Eliza Silva Jardim ', '2b', 'Jogo Nier: Automata', '# YoRHa No.2 Type B (2B) - NieR:Automata

## Sobre a Personagem
2B é a protagonista do jogo NieR:Automata, um androide de combate do esquadrão de infantaria automatizado, YoRHa. Sua designação oficial é "2B" ("Number 2 Type B"), onde "B" significa "Battle". Ela é caracterizada por sua personalidade calma, focada e estritamente profissional, raramente demonstrando emoções. Ao lado de seu parceiro, 9S, ela luta em nome da humanidade contra as formas de vida mecânicas que invadiram a Terra.

## Detalhes do Cosplay

### Vestimenta Principal
- **Vestido Gótico Lolita**: Um vestido preto curto e elegante, com mangas longas e bufantes que se separam nos ombros. Possui detalhes intrincados de renda, um decote que mostra a clavícula e uma saia com recortes e penas na barra, que revela uma lingerie branca por baixo (leotard).
- **Luvas Longas**: Luvas brancas que vão acima dos cotovelos.
- **Meias Altas**: Meias pretas que vão até a coxa, com um detalhe de renda no topo.
- **Botas de Salto Alto**: Botas pretas de cano alto (acima dos joelhos) com salto agulha e detalhes em laço na parte de trás.

### Acessórios
- **Venda nos Olhos**: Sua característica mais icônica. Uma venda preta de tecido que cobre completamente seus olhos, simbolizando a "justiça cega".
- **Bandana de Cabelo (Headband)**: Uma tiara preta e fina usada no cabelo.
- **Espadas**:
    - **Virtuous Contract**: Uma katana branca com detalhes dourados.
    - **Virtuous Treaty**: (Opcional) Uma espada maior, também branca.
- **Pod 042**: (Opcional, para cosplays avançados) Um robô flutuante de suporte tático que a acompanha.

### Características Físicas
- **Cabelo**: Curto, branco-prateado, em um corte "bob" com franja reta.
- **Olhos**: (Quando visíveis) Azuis ou cinza-claros.
- **Marca de Beleza**: Uma pequena pinta (sinal) no lado esquerdo do lábio inferior.
- **Postura**: Elegante, precisa e sempre pronta para o combate. Seus movimentos são como os de uma bailarina misturada com uma espadachim.

### Versões Alternativas
- **Sem Saia (Modo de Autodestruição)**: O visual de batalha onde a saia do vestido é descartada, mostrando apenas o leotard preto por baixo das botas.
- **Traje do 2P (Soulcalibur VI / FFXIV)**: Uma versão com a paleta de cores invertida: vestido branco, cabelo preto e detalhes em preto.

## Referências
Protagonista do aclamado jogo de RPG de ação **NieR:Automata**, desenvolvido pela PlatinumGames e publicado pela Square Enix.

---

*Dificuldade*: Avançada (O vestido é complexo, com muitos detalhes em renda e um corte específico. As botas também são um desafio).  
*Destaque*: A venda preta, o cabelo branco e a espada Virtuous Contract.  
*Dica*: A precisão nos detalhes da renda e no corte do vestido é o que diferencia um bom cosplay de 2B. A venda deve ser feita de um material que permita alguma visibilidade para segurança. A postura e a forma de segurar a espada são cruciais para capturar a essência da personagem.', FALSE, 1, '2025-10-04T06:28:35.915Z', '2025-10-04T06:45:16.442Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/07/91/ad/0791ad48edd1f1152b43eb2a511e2c56.jpg','https://i.pinimg.com/736x/53/06/7b/53067bee73463d175dd657447b73cf89.jpg','https://i.pinimg.com/736x/dc/77/95/dc77951909945e28ea38f0972772455b.jpg','https://i.pinimg.com/736x/40/1c/1e/401c1e485d3d500476f3829d22dab3aa.jpg','https://i.pinimg.com/736x/19/24/24/1924244e4cd01c6549b69f648c25684c.jpg','https://i.pinimg.com/736x/ec/16/57/ec1657463972a785be312e83c19c708e.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (49, 'Isadora Rocelle Castro Constantino', 'Raiden Shogun ', 'Genshin impact ', '# Raiden Shogun (Beelzebul/Ei) - Genshin Impact

## Sobre a Personagem
A Raiden Shogun é a atual Arconte Electro e a governante suprema de Inazuma. Na verdade, ela é um sistema duplo: a Shogun, uma marionete autômata que governa no dia a dia com uma lógica implacável, e Ei, a verdadeira Arconte, que medita eternamente no Plano da Eutimia. Ela busca a "Eternidade" para sua nação, uma visão que a coloca em conflito direto com o Viajante. Sua presença é imponente, divina e um tanto melancólica.

## Detalhes do Cosplay

### Vestimenta Principal
- **Quimono (Kimono)**: Um quimono curto e modificado, predominantemente em tons de roxo, violeta e lilás.
- **Mangas Longas e Destacadas**: Possui mangas longas e extremamente largas, com um gradiente de roxo para branco e detalhes em dourado, que são separadas do corpo principal do traje.
- **Body/Leotard**: Um body preto justo por baixo de tudo.
- **Obi (Faixa)**: Uma faixa larga na cintura, de cor roxa escura com um grande laço dourado e um emblema de Inazuma no centro.
- **Meias**: Uma meia preta longa na perna direita, que vai até a coxa, e uma faixa roxa na perna esquerda.
- **Sapatos**: Sandálias de salto alto no estilo geta, de cor roxa e dourada.

### Acessórios
- **Adorno de Cabelo (Kanzashi)**: Um leque roxo com flores e um bastão dourado, usado para prender parte do cabelo.
- **Laço nas Costas**: Um grande laço roxo nas costas, preso ao obi.
- **Pauldron (Ombreira)**: Uma pequena peça de armadura dourada e roxa no ombro esquerdo.
- **"Mitsudomoe" (Símbolo Electro)**: O emblema do elemento Electro é visível em várias partes do traje.

### Características Físicas
- **Cabelo**: Longo, de cor violeta-escura, preso em uma longa trança que vai até os pés.
- **Olhos**: Roxos, que brilham intensamente quando ela usa suas habilidades.
- **Postura**: Divina, ereta e imponente. Seus movimentos são precisos e cheios de autoridade.

### Arma
- **Lança (Engulfing Lightning)**: Sua arma característica, uma naginata (lança com lâmina) dourada e roxa.
- **Espada (Musou Isshin)**: A icônica tachi (espada) que ela "puxa" de seu peito ao usar seu Supremo. Fazer um prop que simule este efeito é um grande diferencial.

## Referências
Personagem jogável e Arconte central do arco de Inazuma no jogo **Genshin Impact**.

---

*Dificuldade*: Avançada (O traje é cheio de camadas, detalhes bordados, gradientes de cor e acessórios complexos).  
*Destaque*: A longa trança violeta, o quimono detalhado e, para um cosplay completo, a lança "Engulfing Lightning".  
*Dica*: Os tecidos fazem toda a diferença. Use tecidos com brilho sutil, como brocado ou cetim, para os detalhes dourados e roxos. A peruca (wig) precisa ser bem estilizada para o volume e o comprimento da trança. Se possível, adicione LEDs roxos discretos na espada ou na mão para simular o poder Electro.', FALSE, 1, '2025-10-04T06:33:26.443Z', '2025-10-04T06:45:04.430Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/01/ee/e9/01eee91e59848a1f13ab9d36d6229978.jpg','https://i.pinimg.com/736x/5e/45/e1/5e45e12d931ddfcbdb8bf46faed7206b.jpg','https://i.pinimg.com/736x/bd/a8/67/bda867d35f39f30967dd8b120e847e63.jpg','https://i.pinimg.com/736x/bb/dc/99/bbdc9958cf1b84571d7261398c57222a.jpg','https://i.pinimg.com/736x/81/3d/af/813daf221af66e1f08819df5aa803ddd.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (47, 'Gabriel de Oliveira Souza ', 'Anakin Skywalker ', 'Star Wars ', '# Anakin Skywalker - Star Wars: A Vingança dos Sith

## Sobre a Personagem
Anakin Skywalker é "O Escolhido" da profecia Jedi, um dos mais poderosos Cavaleiros Jedi que já existiram, destinado a trazer equilíbrio à Força. Treinado por Obi-Wan Kenobi, ele é um herói da República durante as Guerras Clônicas, mas seu medo da perda, sua paixão e sua impaciência o tornam vulnerável ao Lado Sombrio. Sua queda trágica e transformação no Lorde Sith Darth Vader é o ponto central da saga Skywalker.

## Detalhes do Cosplay

### Vestimenta Principal (Cavaleiro Jedi / Lorde Sith - Episódio III)
- **Túnica Interna**: Uma túnica de cor marrom-escura ou preta, com mangas compridas e um colarinho alto e texturizado.
- **Túnica Externa (Jedi Tunic)**: Uma túnica texturizada de cor mais clara (geralmente marrom ou cinza escuro), usada por cima da túnica interna.
- **Tabardos de Couro**: Duas longas faixas de couro sintético preto ou marrom muito escuro que passam sobre os ombros e caem na frente e atrás.
- **Obi (Faixa)**: Uma faixa de tecido da mesma cor da túnica externa, amarrada na cintura por cima dos tabardos.
- **Cinto de Couro**: Um cinto de couro marrom com uma fivela prateada, usado sobre o Obi. Possui bolsas utilitárias e um gancho para o sabre de luz.
- **Calças**: Calças de cor marrom ou preta.
- **Botas de Couro**: Botas de cano alto, que vão quase até os joelhos, de cor marrom-escura ou preta.

### Acessórios
- **Sabre de Luz**: O icônico sabre de luz de Anakin, com lâmina azul. É um dos adereços mais importantes.
- **Luva Mecânica**: Uma luva de couro preta na mão direita para cobrir seu braço robótico, muitas vezes com detalhes que imitam partes mecânicas.

### Características Físicas
- **Cabelo**: Cabelo castanho, mais comprido e ondulado, na altura dos ombros, repartido ao meio.
- **Olhos**:
    - **Jedi**: Azuis.
    - **Sith**: Amarelos com a íris vermelha (lentes de contato são essenciais para este efeito).
- **Cicatriz**: Uma fina cicatriz vertical que atravessa seu olho direito.

### Versões Alternativas
- **Padawan (Episódio II - Ataque dos Clones)**: Túnicas Jedi mais claras, cabelo curto com a trança de Padawan e sem a cicatriz.
- **Darth Vader**: A armadura preta completa após sua derrota em Mustafar. Um cosplay completamente diferente e muito mais complexo.
- **Tatooine (Episódio II)**: Poncho marrom e roupas de fazendeiro, para um visual mais casual.

## Referências
Personagem central da trilogia prequel de **Star Wars**, com este visual sendo o mais proeminente em **Episódio III: A Vingança dos Sith**.

---

*Dificuldade*: Intermediária a Avançada (O desafio está nas camadas de tecido e no trabalho com o couro sintético).  
*Destaque*: O cabelo, a cicatriz e, claro, o sabre de luz azul. Para o look do Lado Sombrio, os olhos Sith são impactantes.  
*Dica*: O envelhecimento e o desgaste das túnicas podem adicionar muito realismo ao cosplay, refletindo as batalhas das Guerras Clônicas. A postura — confiante como Jedi, atormentada e sombria ao cair para o Lado Sombrio — é fundamental para a performance.', FALSE, 1, '2025-10-04T06:30:37.975Z', '2025-10-04T06:45:10.895Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/e0/84/16/e084165427b7d95c6ac5da1615274348.jpg','https://i.pinimg.com/736x/8f/4a/75/8f4a755847ad414f7b55e80566e837a7.jpg','https://i.pinimg.com/736x/92/63/d9/9263d98084b39b67ea5f404717b42933.jpg','https://i.pinimg.com/736x/f3/1b/be/f31bbe3203fd53b02044b07bea896848.jpg','https://i.pinimg.com/736x/e9/90/80/e9908018356bf2dac081234824a480fe.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (52, 'Sabrina Dias de Souza Silva ', 'Tanjiro Kamado', 'Kimetsu no Yaiba', '# Tanjiro Kamado - Kimetsu no Yaiba (Demon Slayer)

## Sobre a Personagem
Tanjiro Kamado é o protagonista bondoso e determinado de Demon Slayer. Após sua família ser massacrada por um demônio e sua irmã, Nezuko, ser transformada em uma, ele inicia uma jornada para se tornar um Exterminador de Demônios. Seu objetivo é encontrar uma cura para sua irmã e vingar sua família. Ele é conhecido por seu incrível olfato, sua compaixão inabalável e sua técnica de Respiração da Água, que mais tarde evolui para a lendária Dança do Deus do Fogo (Hinokami Kagura).

## Detalhes do Cosplay

### Vestimenta Principal
- **Uniforme do Corpo de Exterminadores (Demon Slayer Corps Uniform)**: Um gakuran (uniforme escolar japonês tradicional) de cor marrom-escura, composto por uma jaqueta de gola alta e calças largas.
- **Haori Xadrez**: Sua peça mais icônica. Um haori (casaco tradicional japonês) com um padrão xadrez verde e preto (ichimatsu).
- **Cinto Branco**: Um cinto largo e branco usado sobre o uniforme.
- **Faixas nas Pernas (Kyahan)**: Faixas brancas enroladas da canela até o joelho.
- **Meias Tabi**: Meias brancas tradicionais que separam o dedão dos outros dedos.
- **Sandálias Zori**: Sandálias de palha com tiras brancas.

### Acessórios
- **Caixa de Madeira (Wooden Box)**: A caixa que ele carrega nas costas para proteger Nezuko do sol. É um acessório essencial e distintivo.
- **Katana Nichirin Preta**: A espada de Tanjiro é única por sua lâmina preta, que simboliza má sorte para a maioria, mas se torna um recipiente para suas técnicas especiais.
- **Brincos Hanafuda**: Longos brincos retangulares de papel com a imagem de um sol nascente sobre uma montanha. São uma herança de família e extremamente importantes para a história.

### Características Físicas
- **Cabelo**: Cabelo curto e despenteado, de cor bordô escuro (vinho) com pontas mais claras.
- **Olhos**: Olhos grandes e gentis, também de cor bordô.
- **Cicatriz**: Uma grande cicatriz de queimadura na parte superior esquerda da testa, que muda de aparência após a Seleção Final.

### Versões Alternativas
- **Dança do Deus do Fogo (Hinokami Kagura)**: O cosplay padrão, mas com efeitos de fogo (props com LEDs ou edição de fotos) em sua espada para representar sua técnica mais poderosa.
- **Roupa de Treinamento**: Durante seu treinamento com Urokodaki, ele usa um quimono azul com um padrão de nuvens.

## Referências
Protagonista absoluto do mangá e anime de sucesso mundial **Kimetsu no Yaiba (Demon Slayer)**, criado por Koyoharu Gotouge.

---

*Dificuldade*: Intermediária (O desafio está em construir a caixa de madeira e nos detalhes do haori e dos brincos).  
*Destaque*: O haori xadrez verde e preto, os brincos Hanafuda e a caixa de madeira nas costas.  
*Dica*: A caixa de madeira deve ser construída com um material leve (como espuma EVA ou papelão reforçado) para ser confortável de carregar. A expressão de Tanjiro é fundamental: ele tem um olhar gentil e determinado. Capturar essa dualidade na performance eleva o cosplay.', FALSE, 1, '2025-10-04T06:37:42.628Z', '2025-10-04T06:46:47.018Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/d2/52/43/d2524300badb83bac858a58a0f129dff.jpg','https://i.pinimg.com/736x/a8/a3/7d/a8a37d12be7272abd2216f89da918fc0.jpg','https://i.pinimg.com/736x/13/1b/86/131b8656a2d5f0d87a5b4ec0f4760a3a.jpg','https://i.pinimg.com/736x/00/ef/e3/00efe3b20557e0f157f6b3009966da59.jpg','https://i.pinimg.com/736x/1c/6c/40/1c6c4066a153ef8f9e8afa57c287852b.jpg','https://i.pinimg.com/736x/1c/6c/40/1c6c4066a153ef8f9e8afa57c287852b.jpg'], 'desfile', 'presentation', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (29, 'Obede Souza Oliveira ', 'Miles Morales "suit 2.0"', '(Spider-Man) - Spider-Verse', '# Miles Morales (Spider-Man) - Spider-Verse / Marvel Comics

## Sobre a Personagem
Miles Morales é um jovem afro-latino de Brooklyn que se torna o Homem-Aranha de sua dimensão após a morte de Peter Parker. Ele possui habilidades semelhantes às de Peter, como superforça, agilidade, o sentido aranha, a capacidade de aderir a superfícies e soltar teias, mas também tem poderes únicos como o "Venom Blast" (descargas elétricas) e a camuflagem (invisibilidade). Miles é conhecido por sua personalidade carismática, seu coração bondoso e sua luta para equilibrar a vida de super-herói com os desafios da adolescência.

## Detalhes do Cosplay

### Vestimenta Principal (Uniforme Clássico)
- **Traje de corpo inteiro** de super-herói, nas cores vermelho e preto.
    - **Parte preta**: Predominante no torso, braços e pernas.
    - **Parte vermelha**: Design de teia de aranha (geralmente em relevo ou estampado) cobrindo a máscara, ombros e as partes laterais do corpo.
- **Símbolo da aranha**: Grande e estiloso, em vermelho, no centro do peito e nas costas, com um design mais angular e moderno do que o do Peter Parker.

### Acessórios
- **Luvas/Mãos**: Geralmente pretas com detalhes vermelhos.
- **Sapatos/Pés**: Pretos com detalhes vermelhos.
- **Lançadores de Teia**: Integrados no traje ou discretos nos pulsos.
- **Capuz (Opcional, mas icônico)**: Um capuz vermelho ou preto por cima do traje, especialmente popularizado pelos filmes "Spider-Verse".
- **Jaqueta de Moletom (Opcional)**: Uma jaqueta de moletom azul, cinza ou vermelha, usada por cima do traje para um visual mais casual e urbano.
- **Tênis (Opcional)**: Tênis de basquete vermelhos e pretos de cano alto, usados por cima do traje ou com as versões "casual".

### Características Físicas
- **Corpo**: Atlético e magro, típico de um adolescente.
- **Cabelo**: Curto e encaracolado (afro), geralmente escondido pela máscara, mas visível se o capuz estiver abaixado ou em versões casuais.
- **Olhos**: As lentes da máscara são grandes e brancas, com um contorno preto.

### Versões Alternativas
- **Homem-Aranha no Aranhaverso (Into the Spider-Verse)**: Traje clássico com um capuz vermelho e tênis de basquete. Visual mais "artístico" e estilizado.
- **Através do Aranhaverso (Across the Spider-Verse)**: Traje com algumas pequenas modificações no design, mas mantendo a essência. O capuz e os tênis continuam sendo um elemento chave.
- **Traje Gwen Stacy (Spider-Gwen)**: Miles aparece brevemente com o traje de Gwen no primeiro filme, o que poderia ser uma divertida versão alternativa para um meme ou uma referência.
- **Versão Ultimate Comics**: O traje original de Miles, que é muito similar ao das animações, mas sem o capuz e tênis como elementos tão proeminentes.

## Referências
Personagem principal nos filmes animados **Homem-Aranha no Aranhaverso** (Spider-Man: Into the Spider-Verse) e **Homem-Aranha: Através do Aranhaverso** (Spider-Man: Across the Spider-Verse), além de ser um dos protagonistas nos quadrinhos **Ultimate Spider-Man** da Marvel Comics. Também aparece em jogos como **Marvel''s Spider-Man: Miles Morales**.

---

*Dificuldade*: Iniciante a Intermediário (dependendo da complexidade do traje)  
*Destaque*: As cores vermelho e preto, o símbolo da aranha no peito e, para as versões mais populares, o capuz e os tênis de cano alto.  
*Dica*: Invista em um bom traje de corpo inteiro que se ajuste bem. Adicionar um capuz e, se possível, os tênis de basquete de cano alto por cima do traje eleva instantaneamente o reconhecimento do Miles do Spider-Verse. A pose dinâmica e atlética também faz toda a diferença.', FALSE, 1, '2025-10-03T05:49:29.133Z', '2025-10-04T06:46:29.446Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/b2/dc/b4/b2dcb4ed35c4e18a7a26d934f9ae0b45.jpg','https://i.pinimg.com/736x/01/9d/cf/019dcf3432826d76478e951279dd5cc1.jpg','https://i.pinimg.com/736x/93/cf/19/93cf195e452fa533f7ab4b4ad5d7bf20.jpg','https://i.pinimg.com/736x/1f/b0/f1/1fb0f15e7a02a0da29a0aafffa796560.jpg','https://i.pinimg.com/736x/20/df/89/20df8976dc7f0774cd23fa2e178d3619.jpg','https://i.pinimg.com/736x/01/7e/85/017e8510ff1d20b1987a7e0c1a7d3f0f.jpg','https://i.pinimg.com/736x/bd/5b/4b/bd5b4b87e2d0da46559f24b0e029d2d2.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (51, 'Sabrina Dias de Souza Silva ', 'Tanjiro Kamado', 'Kimetsu no Yaiba', '# Tanjiro Kamado - Kimetsu no Yaiba (Demon Slayer)

## Sobre a Personagem
Tanjiro Kamado é o protagonista bondoso e determinado de Demon Slayer. Após sua família ser massacrada por um demônio e sua irmã, Nezuko, ser transformada em uma, ele inicia uma jornada para se tornar um Exterminador de Demônios. Seu objetivo é encontrar uma cura para sua irmã e vingar sua família. Ele é conhecido por seu incrível olfato, sua compaixão inabalável e sua técnica de Respiração da Água, que mais tarde evolui para a lendária Dança do Deus do Fogo (Hinokami Kagura).

## Detalhes do Cosplay

### Vestimenta Principal
- **Uniforme do Corpo de Exterminadores (Demon Slayer Corps Uniform)**: Um gakuran (uniforme escolar japonês tradicional) de cor marrom-escura, composto por uma jaqueta de gola alta e calças largas.
- **Haori Xadrez**: Sua peça mais icônica. Um haori (casaco tradicional japonês) com um padrão xadrez verde e preto (ichimatsu).
- **Cinto Branco**: Um cinto largo e branco usado sobre o uniforme.
- **Faixas nas Pernas (Kyahan)**: Faixas brancas enroladas da canela até o joelho.
- **Meias Tabi**: Meias brancas tradicionais que separam o dedão dos outros dedos.
- **Sandálias Zori**: Sandálias de palha com tiras brancas.

### Acessórios
- **Caixa de Madeira (Wooden Box)**: A caixa que ele carrega nas costas para proteger Nezuko do sol. É um acessório essencial e distintivo.
- **Katana Nichirin Preta**: A espada de Tanjiro é única por sua lâmina preta, que simboliza má sorte para a maioria, mas se torna um recipiente para suas técnicas especiais.
- **Brincos Hanafuda**: Longos brincos retangulares de papel com a imagem de um sol nascente sobre uma montanha. São uma herança de família e extremamente importantes para a história.

### Características Físicas
- **Cabelo**: Cabelo curto e despenteado, de cor bordô escuro (vinho) com pontas mais claras.
- **Olhos**: Olhos grandes e gentis, também de cor bordô.
- **Cicatriz**: Uma grande cicatriz de queimadura na parte superior esquerda da testa, que muda de aparência após a Seleção Final.

### Versões Alternativas
- **Dança do Deus do Fogo (Hinokami Kagura)**: O cosplay padrão, mas com efeitos de fogo (props com LEDs ou edição de fotos) em sua espada para representar sua técnica mais poderosa.
- **Roupa de Treinamento**: Durante seu treinamento com Urokodaki, ele usa um quimono azul com um padrão de nuvens.

## Referências
Protagonista absoluto do mangá e anime de sucesso mundial **Kimetsu no Yaiba (Demon Slayer)**, criado por Koyoharu Gotouge.

---

*Dificuldade*: Intermediária (O desafio está em construir a caixa de madeira e nos detalhes do haori e dos brincos).  
*Destaque*: O haori xadrez verde e preto, os brincos Hanafuda e a caixa de madeira nas costas.  
*Dica*: A caixa de madeira deve ser construída com um material leve (como espuma EVA ou papelão reforçado) para ser confortável de carregar. A expressão de Tanjiro é fundamental: ele tem um olhar gentil e determinado. Capturar essa dualidade na performance eleva o cosplay.', FALSE, 1, '2025-10-04T06:36:34.074Z', '2025-10-04T06:44:59.968Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/d2/52/43/d2524300badb83bac858a58a0f129dff.jpg','https://i.pinimg.com/736x/a8/a3/7d/a8a37d12be7272abd2216f89da918fc0.jpg','https://i.pinimg.com/736x/13/1b/86/131b8656a2d5f0d87a5b4ec0f4760a3a.jpg','https://i.pinimg.com/736x/00/ef/e3/00efe3b20557e0f157f6b3009966da59.jpg','https://i.pinimg.com/736x/1c/6c/40/1c6c4066a153ef8f9e8afa57c287852b.jpg'], 'desfile', 'desfile', FALSE, TRUE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (32, 'Mariana Carrilho Dias', 'Karin Uzumaki ', 'Naruto Shippuden', '# Karin Uzumaki - Naruto Shippuden

## Sobre a Personagem
Karin é uma kunoichi do clã Uzumaki e ex-subordinada de Orochimaru. Conhecida por suas habilidades sensoriais extraordinárias e seu poder de cura através de mordidas, ela possui cabelos vermelhos característicos do clã Uzumaki e usa óculos distintivos. Sua personalidade varia de séria e calculista a completamente apaixonada por Sasuke Uchiha.

## Detalhes do Cosplay

### Vestimenta Principal (Equipe Taka/Hebi)
- **Blusa roxa/lavanda** de mangas curtas com gola alta e zíper.
- **Shorts pretos** curtos e justos (hot pants).
- **Meias longas** roxas ou pretas que vão até a coxa.
- **Cinto** largo cinza com fivela metálica na cintura.
- **Sandálias ninja** padrão, geralmente pretas ou azul-escuras.

### Acessórios
- **Óculos**: Sua marca registrada, com armação marrom-avermelhada ou roxa.
- **Bolsa de armas ninja**: Usada na perna direita.
- **Protetor de testa de Kusagakure** (Vila da Grama) com um risco no meio, frequentemente usado no pescoço ou guardado.

### Características Físicas
- **Cabelo**: Vermelho intenso e vibrante, com um penteado único: espetado na parte de trás e longo e liso na frente.
- **Olhos**: Vermelhos (uso de lentes de contato recomendado).
- **Marcas de mordida**: (Opcional, maquiagem) Marcas de dentes nos braços, pescoço e peito para representar seu poder de "Mordida da Cura".

### Versões Alternativas
- **The Last: Naruto the Movie**: Visual mais maduro com cabelo mais comprido e óculos diferentes.
- **Boruto: Naruto Next Generations**: Versão adulta, geralmente vista com um vestido escuro e um penteado mais contido.
- **Base de Orochimaru**: Jaleco de laboratório branco por cima de sua roupa padrão.

## Referências
Personagem aparece principalmente em **Naruto Shippuden** como membro da equipe Hebi (e depois Taka), liderada por Sasuke Uchiha. Ela desempenha um papel crucial como ninja sensorial e médica do time.

---

*Dificuldade*: Intermediária  
*Destaque*: Cabelo vermelho vibrante e os óculos característicos.  
*Dica*: A estilização da peruca é fundamental para capturar o penteado espetado/liso de Karin. Atenção aos detalhes dos óculos e ao tom exato de roxo da roupa.', FALSE, 1, '2025-10-03T05:56:08.203Z', '2025-10-04T06:46:17.188Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/d4/a7/dc/d4a7dcca0457df0a2893f4d67c9ed682.jpg','https://i.pinimg.com/1200x/d0/6b/58/d06b58025d27b9da94a4bdb1f6ea60f8.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (53, 'Pedro Henrique Villefort Nascimento ', 'Venom extreme ', 'YouTube ', '# Venom Extreme - Minecraft / YouTube

## Sobre o Personagem
Venom Extreme é o avatar (skin) de um dos pioneiros e mais influentes criadores de conteúdo de Minecraft no Brasil. Sua imagem está diretamente associada à era de ouro do YouTube de games no país, representando aventura, nostalgia e a exploração do mundo dos blocos. A skin é simples, mas instantaneamente reconhecível por sua combinação de cores e, principalmente, seus icônicos fones de ouvido.

## Detalhes do Cosplay

### Vestimenta Principal
- **Moletom com Zíper (Hoodie)**: Um moletom de cor preta ou cinza-escura, com zíper, para ser usado aberto.
- **Camiseta Verde**: A peça de destaque. Uma camiseta de cor verde-limão bem vibrante, usada por baixo do moletom.
- **Calça Jeans**: Uma calça jeans azul de corte reto e simples.
- **Tênis**: Tênis de cor escura, como preto ou cinza.

### Acessórios
- **Fone de Ouvido (Headphones)**: O acessório mais importante. Um fone de ouvido grande (over-ear) de cor preta com detalhes em verde-limão na lateral.
- **Picareta ou Espada de Diamante**: (Opcional) Para deixar o contexto de Minecraft claro, carregar uma réplica de uma ferramenta ou arma do jogo é uma ótima ideia.

### Características Físicas
- **Cabelo**: Cabelo castanho, curto e um pouco espetado, seguindo o estilo da skin.
- **Olhos**: (Opcional, para mais detalhes) Lentes de contato de cor verde vibrante para imitar os olhos característicos do personagem.

### Versões Alternativas
- **Versão "Pixelada"**: Para um desafio maior, criar uma máscara de caixa de papelão no formato da cabeça do Minecraft, pintada com a face da skin do Venom Extreme.
- **Fan Arts**: Existem diversas artes de fãs que reimaginam o personagem com mais detalhes, que podem servir de inspiração para uma versão mais elaborada do traje.

## Referências
Avatar (skin) do YouTuber **Venom Extreme**, imortalizado em suas séries e vídeos de **Minecraft** que marcaram o início da década de 2010 no YouTube Brasil.

---

*Dificuldade*: Iniciante (A maioria das peças pode ser encontrada em lojas comuns, sendo um ótimo "closet cosplay").  
*Destaque*: A combinação da camiseta verde-limão com os fones de ouvido pretos e verdes.  
*Dica*: A customização do fone de ouvido é o que realmente define este cosplay. Você pode usar tinta acrílica ou fita adesiva de vinil verde para criar os detalhes laterais em um fone preto simples.', FALSE, 1, '2025-10-04T06:43:43.173Z', '2025-10-04T06:46:43.365Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/58/27/e1/5827e16d248a8ce1f7c157cd53a59997.jpg','https://i.pinimg.com/736x/d1/85/09/d18509e917d5487398b2732bceb692e3.jpg','https://i.pinimg.com/736x/bc/b8/0e/bcb80e2c36d55b1df635f1ffa31b94d1.jpg'], 'desfile', 'desfile', TRUE, FALSE, '0.00');
INSERT INTO cosplay_profiles (id, name, character, anime, description, is_visible, created_by, created_at, updated_at, voting_status, final_score, total_final_votes, image_urls, voting_mode, modality, bonus, penalty, time_penalty) VALUES (50, 'Isadora Rocelle Castro Constantino', 'Raiden Shogun ', 'Genshin impact ', '# Raiden Shogun (Beelzebul/Ei) - Genshin Impact

## Sobre a Personagem
A Raiden Shogun é a atual Arconte Electro e a governante suprema de Inazuma. Na verdade, ela é um sistema duplo: a Shogun, uma marionete autômata que governa no dia a dia com uma lógica implacável, e Ei, a verdadeira Arconte, que medita eternamente no Plano da Eutimia. Ela busca a "Eternidade" para sua nação, uma visão que a coloca em conflito direto com o Viajante. Sua presença é imponente, divina e um tanto melancólica.

## Detalhes do Cosplay

### Vestimenta Principal
- **Quimono (Kimono)**: Um quimono curto e modificado, predominantemente em tons de roxo, violeta e lilás.
- **Mangas Longas e Destacadas**: Possui mangas longas e extremamente largas, com um gradiente de roxo para branco e detalhes em dourado, que são separadas do corpo principal do traje.
- **Body/Leotard**: Um body preto justo por baixo de tudo.
- **Obi (Faixa)**: Uma faixa larga na cintura, de cor roxa escura com um grande laço dourado e um emblema de Inazuma no centro.
- **Meias**: Uma meia preta longa na perna direita, que vai até a coxa, e uma faixa roxa na perna esquerda.
- **Sapatos**: Sandálias de salto alto no estilo geta, de cor roxa e dourada.

### Acessórios
- **Adorno de Cabelo (Kanzashi)**: Um leque roxo com flores e um bastão dourado, usado para prender parte do cabelo.
- **Laço nas Costas**: Um grande laço roxo nas costas, preso ao obi.
- **Pauldron (Ombreira)**: Uma pequena peça de armadura dourada e roxa no ombro esquerdo.
- **"Mitsudomoe" (Símbolo Electro)**: O emblema do elemento Electro é visível em várias partes do traje.

### Características Físicas
- **Cabelo**: Longo, de cor violeta-escura, preso em uma longa trança que vai até os pés.
- **Olhos**: Roxos, que brilham intensamente quando ela usa suas habilidades.
- **Postura**: Divina, ereta e imponente. Seus movimentos são precisos e cheios de autoridade.

### Arma
- **Lança (Engulfing Lightning)**: Sua arma característica, uma naginata (lança com lâmina) dourada e roxa.
- **Espada (Musou Isshin)**: A icônica tachi (espada) que ela "puxa" de seu peito ao usar seu Supremo. Fazer um prop que simule este efeito é um grande diferencial.

## Referências
Personagem jogável e Arconte central do arco de Inazuma no jogo **Genshin Impact**.

---

*Dificuldade*: Avançada (O traje é cheio de camadas, detalhes bordados, gradientes de cor e acessórios complexos).  
*Destaque*: A longa trança violeta, o quimono detalhado e, para um cosplay completo, a lança "Engulfing Lightning".  
*Dica*: Os tecidos fazem toda a diferença. Use tecidos com brilho sutil, como brocado ou cetim, para os detalhes dourados e roxos. A peruca (wig) precisa ser bem estilizada para o volume e o comprimento da trança. Se possível, adicione LEDs roxos discretos na espada ou na mão para simular o poder Electro.', FALSE, 1, '2025-10-04T06:34:27.051Z', '2025-10-04T06:46:49.574Z', 'completed', '0.00', 0, ARRAY['https://i.pinimg.com/736x/01/ee/e9/01eee91e59848a1f13ab9d36d6229978.jpg','https://i.pinimg.com/736x/81/3d/af/813daf221af66e1f08819df5aa803ddd.jpg','https://i.pinimg.com/736x/d9/77/c6/d977c6945ee085ed16acd56b371b9457.jpg','https://i.pinimg.com/736x/62/dc/61/62dc6155d63044523e7722edb1d12f4b.jpg','https://i.pinimg.com/736x/f1/f0/73/f1f073cf04091b3cf59cd5f9de088ad9.jpg','https://i.pinimg.com/736x/a2/02/a2/a202a20a405a0e6013fea3ca3adcfb51.jpg'], 'desfile', 'presentation', TRUE, FALSE, '0.00');

-- Tabela votes está vazia

-- Dados da tabela: voting_control
TRUNCATE TABLE voting_control CASCADE;
INSERT INTO voting_control (id, current_visible_profile_id, updated_at, current_mode) VALUES (1, 39, '2025-10-04T06:47:00.184Z', 'presentation');

-- Dados da tabela: juror_activity
TRUNCATE TABLE juror_activity CASCADE;
INSERT INTO juror_activity (juror_id, last_seen) VALUES (3, '2025-10-01T19:06:01.167Z');
INSERT INTO juror_activity (juror_id, last_seen) VALUES (2, '2025-10-04T06:50:51.141Z');

-- Resetar sequences
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('cosplay_profiles_id_seq', (SELECT MAX(id) FROM cosplay_profiles));
SELECT setval('votes_id_seq', (SELECT MAX(id) FROM votes));
SELECT setval('voting_control_id_seq', (SELECT MAX(id) FROM voting_control));

