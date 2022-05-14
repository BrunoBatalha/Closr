# LokinFrontEnd

Interface baseado em uma UI do [Dribbble](https://dribbble.com/shots/1357705-Closr-login-page)

[Estrutura de projeto utilizada](https://medium.com/@mancinileandro/como-definir-uma-estrutura-de-pastas-altamente-escal%C3%A1vel-para-o-seu-projeto-angular-31102e79a33f)


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
