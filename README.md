# Closr
### Descrição

Um projeto de login utilizando Angular e ASP.Net Core para o estudo de Clean Architecture, autenticação JWT e das tecnologias em si.

Para o login foi utilizado um esquema de token e refresh token. No token foram salvas informações básicas como o id do usuário, informação essa que será obtida por um middleware para identificar se alguém está tentando fazer login utilizando um token inválido.

Foi criado uma tabela no banco para salvar o refresh token e o id do usuário. O sistema deixa o token com um tempo de expiração baixo e por meio de um middleware é identificado se o token expirou, caso ele tenha expirado e o refresh token seja igual ao que foi salvo no banco desde a última vez que foi feito o refresh, é gerado novo token e um novo refresh token, sobrescrevendo o último, em seguida é adicionado no header da resposta, ao qual será obtido no interceptor de requisições do frontend e salvo no localStorage para as próximas requisições.
Foi pensando também em alguns casos de segurança:

1. **caso um invasor tivesse acesso ao token do usuário legítimo**: o acesso seria negado pois o refresh token estaria vazio, e o middleware barraria.
2. **caso um invasor tivesse acesso ao refresh token e token do usuário legítimo**: nesse cenário um dos usuários acabaria fazendo uma requisição com o refresh token antigo, o que faria com que o middleware não encontrasse algum dos refresh tokens enviados, então por não conseguir identificar quem seria o usuário legítimo, o sistema remove do banco o refresh token do usuário em questão, tornando todas as próximas requisições inválidas, sendo necessário fazer login novamente com as credenciais que somente o usuário legítimo deve possuir.


### Vídeo
[Link](https://www.linkedin.com/posts/bruno-batalha-_aff-todo-mundo-sempre-cria-um-projeto-de-activity-6957751810031800321-sYtd?utm_source=linkedin_share&utm_medium=member_desktop_web)
