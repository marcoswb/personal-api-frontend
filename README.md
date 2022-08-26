# API pessoal frontend


## Tópicos

- [API pessoal frontend](#api-pessoal-frontend)
  - [Tópicos](#tópicos)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Tecnologias e Ferramentas utilizadas](#tecnologias-e-ferramentas-utilizadas)
  - [Começando](#começando)
  - [Estrutura de Arquivos](#estrutura-de-arquivos)
  - [Instalação](#instalação)
  - [Edição](#edição)
  - [Publicação](#publicação)
  - [Licença](#licença)
  - [Contato](#contato)


---
## Sobre o Projeto

Este projeto visa a criação de um frontend para consumir alguns dados pessoais, que irão ser fornecidos via API REST [nesse projeto](https://github.com/marcoswb/personal-api). Esse frontend é basicamente um portifólio para mostrar um pouco sobre mim, minhas experiências, formações, projetos já feitos no Github, posts feitos no Medium e informações para contato.

A motivação para o desenvolvimento desse projeto foi o aprendizado, e também para me desafiar a criar uma aplicação completa do início ao fim. Principalmente porque não tenho muita afinidade com tecnologias frontend, e quis me instigar e testar se conseguiria implementar algo relativamente agradável em questões de design e usabilidade.

---
## Tecnologias e Ferramentas utilizadas

- **Javascript** -> Linguagem base para a criação do projeto;
- **React** -> Biblioteca frontend para criação de interfaces;
- **Versel** -> Plataforma para deploy de projetos frontend;


---
## Começando

Caso deseje utilizar esse projeto como um template para criação do seu próprio, fiz ele pensando em ser totalmente configurável e poder ser reutilizado. Para isso, a seguir mostrarei um overview dos principais pontos do projeto e ao fim você deve ser capaz de configurar e poder replicá-lo em sua máquina.


---
## Estrutura de Arquivos

A estrutura de arquivos está da seguinte maneira:

```bash
├── public/
|
├── src/
│   ├── components/
|   |
│   ├── App.css
│   ├── App.js
│   ├── index.js
│   └── reportWebVitals.js
|
├── .env
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

Serão explicados os arquivos e diretórios na seção de [Edição](#edição).


---
## Instalação

1. O processo é bem simples, basta copiar o projeto utilizando o comando:

```sh
git clone https://github.com/marcoswb/personal-api-frontend.git
```

2. Utilizar o comando a seguir para entrar dentro do projeto:
  
```sh
cd personal-api-frontend
```

3. Utilizar o comando a seguir para instalar as dependências javascript:
  
```sh
npm install
```

Com isso o projeto será criado com todas as dependências devidamente instaladas e linkadas.


---
## Edição

Nesta seção explicarei os diretórios e arquivos utilizados no projeto:

- **public/** - Contém alguns arquivos padrões criados pelo React, entre eles o "index.html" que é o primeiro html chamado ao executar o Projeto;
- **src/** - Diretório que contém basicamente todo o código fonte que foi escrito;
  - **components/** - Diretório que contém componentes React, cada pasta é um componente basicamente, com seu arquivo js e css próprio;
  - **App.css** - Arquivo css global do projeto;
  - **App.js** - Arquivo javascript que vai ditar quais endpoints o projeto terá;
  - **index.js** - Arquivo javascript principal, que renderiza os componentes em tela;
  
- **.env** - Arquivo que armazena as variáveis de ambiente da aplicação`(você deve criar esse arquivo)`, dentre elas estão:
  - `REACT_APP_ENDPOINT_API` -> URL até a API [desse projeto](https://github.com/marcoswb/personal-api);
  
- **.gitignore** - Arquivo padrão do GIT para ignorar diretórios e arquivos desnecessários;
    
- **LICENSE** - Arquivo de licença de uso do projeto;
  
- **package.json** - Todas as configurações do projeto ficam salvos nesse arquivo.

- **README.md** - Arquivo padrão do Github com a descrição do projeto;


---
## Publicação

Para executar esse projeto, primeiramente você deve ter [esse outro projeto](https://github.com/marcoswb/personal-api) configurado e executando, pois o frontend irá consumir os dados dessa API.

Como plataforma de deploy utilizei a [Versel](https://vercel.com/dashboard):

1. Basta criar um novo projeto na Versel, e vincular seu projeto do Github nele. Ao vincular o projeto do Github, toda vez que você fizer um commit na branch main, automaticamente será feito um novo deploy do app pela Versel;

2. Por ultimo é só adicionar as mesmas variáveis do arquivo .env nas variáveis de ambiente do projeto na Versel.

E pronto, só esperar o deploy na Versel e sua aplicação já estará disponível na internet para qualquer pessoa acessar;

OBS.: Caso você possua um Domínio próprio e queira utilizar ele na sua aplicação, recomendo o vídeo do [Felipe Deschamps](https://youtu.be/IyRUn0GocEc), nele você aprende como configurar tudo isso na versel;


---
## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.


---
## Contato

Marcos Warmling Berti - **marcos_wb@outlook.com**
