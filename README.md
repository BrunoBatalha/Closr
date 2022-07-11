# Lokin-FrontEnd

### Tecnologias

- Angular
- [Backend em ASP.NET Core](https://github.com/BrunoBatalha/Lokin-BackEnd)
- MySQL
- Entity Framework Core
- Docker

### Descrição

Um projeto de login utilizando Angular e ASP.Net Core para o estudo de Clean Architecture, autenticação JWT e das tecnologias em si.

Para o login foi utilizado um esquema de token e refresh token. No token foram salvas informações básicas como o id do usuário, informação essa que será obtida por um middleware para identificar se alguém está tentando fazer login utilizando um token inválido.

Foi criado uma tabela no banco para salvar o refresh token e o id do usuário. O sistema deixa o token com um tempo de expiração baixo e por meio de um middleware é identificado se o token expirou, caso ele tenha expirado e o refresh token seja igual ao que foi salvo no banco desde a última vez que foi feito o refresh, é gerado novo token e um novo refresh token, sobrescrevendo o último, em seguida é adicionado no header da resposta, ao qual será obtido no interceptor de requisições do frontend e salvo no localStorage para as próximas requisições.
Foi pensando também em alguns casos de segurança:

1. **caso um invasor tivesse acesso ao token do usuário legítimo**: o acesso seria negado pois o refresh token estaria vazio, e o middleware barraria.
2. **caso um invasor tivesse acesso ao refresh token e token do usuário legítimo**: nesse cenário um dos usuários acabaria fazendo uma requisição com o refresh token antigo, o que faria com que o middleware não encontrasse algum dos refresh tokens enviados, então por não conseguir identificar quem seria o usuário legítimo, o sistema remove do banco o refresh token do usuário em questão, tornando todas as próximas requisições inválidas, sendo necessário fazer login novamente com as credenciais que somente o usuário legítimo deve possuir.

### Sobre o Frontend

Foram utilizados itens como:

- Http Interceptors
- Lazy loading
- Reactive Forms
- Custom inputs com ControlValueAccessor
- Custom directives
- Guards
- SCSS (Mixins)
- Husky
- Lint Staged
- ESLint
- Prettier

### Docker

Para o arquivo `docker-compose.yml` funcionar corretamente é interessante deixa-lo em um nível a cima da pasta do [backend](https://github.com/BrunoBatalha/Lokin-BackEnd) para conseguir encontrar o diretório e criar as tabelas necessárias.

Com o docker instalado, execute:

```
docker compose up -d
```

### Outros

Hospedado na [Vercel](https://lokin-front-end.vercel.app/) (sem backend)

Interface baseado em uma UI do [Dribbble](https://dribbble.com/shots/1357705-Closr-login-page)

[Baseado na estrutura de projeto a seguir:](https://medium.com/@mancinileandro/como-definir-uma-estrutura-de-pastas-altamente-escal%C3%A1vel-para-o-seu-projeto-angular-31102e79a33f)

```
| - app
  | - core
    | - domain
      | - [+] entities
    | - interfaces
      | - [+] controllers
      | - [+] entities
      | - [+] mensagens
      | - [+] repositories
      | - [+] usecases
      | - [+] validations
    | - [+] usecases
    | - core.module.ts
  | - data
    | - [+] repository
    | - data.module.ts
  | - infra
    | - [+] authentication
    | - [+] http
    | - [+] log
    | - [+] translations
    | - infra.module.ts
  | - presentation
    | - [+] base
    | - [+] controllers
    | - [+] pages
    | - [+] shared
    | - presentation.module.ts
```
