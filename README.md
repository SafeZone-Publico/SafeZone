# SafeZone

SafeZone é uma plataforma colaborativa dedicada a fornecer informações em tempo real sobre desastres naturais e outras emergências. O projeto permite que usuários compartilhem e visualizem alertas de risco em um mapa interativo.

## Funcionalidades

### Mapa Interativo
- Visualização de ocorrências em tempo real
- Marcadores personalizados para diferentes tipos de incidentes:
  - Árvore Caída
  - Calor Intenso
  - Fogo
  - Ondas Grandes
  - Tempestade
  - Tornado
- Sistema de filtros por tipo de ocorrência
- Geolocalização do usuário
- Possibilidade de adicionar e remover marcadores
- Níveis de severidade para cada ocorrência (Baixo, Médio, Alto, Crítico)

### Sistema de Cadastro
- Formulário de cadastro de usuários com validação aprimorada
- Campos para informações pessoais com validação em tempo real
- Validação específica para CEP (formato XXXXX-XXX e 8 dígitos)
- Validação para telefone (apenas números, 10 ou 11 dígitos)
- Validação de senha (mínimo de 8 caracteres)
- Seleção de estado e CEP
- Termos de uso e política de privacidade

### Interface
- Design moderno e responsivo
- Navegação intuitiva com botões interligados na página inicial
- Modais interativos
- Feedback visual claro para campos inválidos no formulário

## Tecnologias Utilizadas

- HTML5
- CSS
- JavaScript
- Leaflet.js (para o mapa interativo)
- OpenStreetMap (provedor de mapas/localização)

## Estrutura do Projeto

```
SafeZone/
├── css/
│   ├── cadastro.css    # Estilos comuns e formulário
│   ├── home.css        # Estilos da página inicial
│   ├── integrantes.css # Estilos da página de integrantes
│   └── mapa.css        # Estilos do mapa interativo
├── js/
│   ├── cadastro.js     # Lógica do formulário de cadastro
│   ├── mapa.js         # Lógica do mapa interativo
│   └── contato.js      # Lógica do formulário de contato
├── img/
│   ├── icones/         # Ícones para os marcadores do mapa
│   ├── participantes/  # Fotos e ícones dos participantes
│   │   ├── lucas.png
│   │   ├── guilherme.jpg
│   │   ├── geovanne.png
│   │   ├── linkedin.png
│   │   └── github.png
│   ├── logo-safe-zone.png
│   ├── logo-direita.png
│   ├── logo-safe-zone-fonte-esquerda.png
│   ├── logo-marca-safe-zone.png   # Favicon do site
│   ├── mapa.png
│   ├── grupo-de-usuarios.png
│   ├── fundo-rosa-dos-ventos.png
│   └── alerta.png
├── videos/
│   └── fumaca.mp4      # Vídeo de fundo da página inicial
├── index.html          # Página inicial
├── cadastro.html       # Página de cadastro
├── mapa.html           # Página do mapa interativo
├── faq.html            # Perguntas frequentes
├── integrantes.html    # Página dos integrantes do projeto
└── contato.html        # Página de contato
```

## Como Usar

1. Clone o repositório
2. Abra o arquivo `index.html` em seu navegador
3. Navegue pelo site usando o menu superior
4. Para usar o mapa:
   - Selecione um tipo de ocorrência
   - Clique no local desejado no mapa
   - Preencha as informações no modal
   - Confirme para adicionar o marcador

## Autores

- Lucas Silva Gastão Pinheiro (RM563960 - 1TDSPY)
  - [LinkedIn](https://www.linkedin.com/in/lucas-pinheiro-1a7154291/)
  - [GitHub](https://github.com/LucasSgPinheiro)

- Geovanne Coneglian Passos (RM562673 - 1TDSPY)
  - [LinkedIn](https://www.linkedin.com/in/geovanne-coneglian-775472353/)
  - [GitHub](https://github.com/GeovanneCP)

- Guilherme Soares de Almeida (RM563143 - 1TDSPY) 
  - [LinkedIn](https://www.linkedin.com/in/guilherme-soares-de-almeida-783859249/)
  - [GitHub](https://github.com/GuuiSOares)