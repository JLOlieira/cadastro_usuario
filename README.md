# Projeto de Cadastro de Usuários com React

## 📋 Sobre o Projeto

Este é um projeto React que consome uma API para cadastrar e listar usuários. Ele inclui validação de campos obrigatórios e tratamento de erros, como tentativas de cadastrar um e-mail já existente no banco de dados.

## 🔧 Funcionalidades

- Listagem de usuários cadastrados
- Cadastro de novos usuários com:
  - Nome
  - Idade
  - E-mail
- Validação de campos vazios
- Exibição de mensagens de erro amigáveis
- Prevenção de duplicidade de e-mails no cadastro

## 🧪 Tecnologias utilizadas

- **React**
- **Axios** para chamadas à API
- **useRef** para manipulação direta dos inputs
- **useState** para controle de estado

## 💡 Detalhes extras

- Quando o usuário tenta cadastrar com campos vazios, os inputs são destacados com uma borda vermelha.
- Se o e-mail já estiver cadastrado, uma mensagem de erro é exibida dinamicamente na tela.
- A mensagem de erro desaparece automaticamente após 3 segundos.