# Glossário — Sistema de Carregamento da Carteirinha da UFMG

Linguagem do domínio usada no projeto. Quando código, documentação ou conversa usarem estes conceitos, use os termos abaixo.

## Termos

**Usuário**
Qualquer estudante ou servidor da UFMG que possua uma Carteirinha. Visitantes não fazem parte do domínio.
_Evitar:_ "cliente", "aluno" (restringe demais), "conta".

**Servidor (UFMG)**
Funcionário ou docente da UFMG. É um tipo de Usuário.
_Evitar:_ usar "servidor" para o backend. O backend é a **API**.

**Carteirinha**
Cartão de identificação da UFMG que o Usuário usa como meio de pagamento dentro da universidade (restaurantes universitários, bibliotecas, lanchonetes).

**Número de série**
Identificador único de uma Carteirinha, lido por NFC ao aproximar o cartão do sensor. É por ele que se encontra o Usuário.
_Evitar:_ "matrícula", "ID do usuário".

**Saldo**
Valor em reais (BRL) disponível na Carteirinha.

**Recarga**
Operação de crédito: soma um valor ao Saldo da Carteirinha. É a única operação que o sistema faz.
_Evitar:_ "carregamento" fora do nome do projeto, "depósito".

**Débito**
Operação de cobrar pelo uso da Carteirinha num ponto de venda. **Fora do escopo:** seria a futura "versão de administrador".

**Totem**
Terminal de autoatendimento automatizado, sem atendente, onde o Usuário faz a Recarga. O frontend é a interface do Totem.

**Sessão de atendimento**
O ciclo de um Usuário no Totem: aproximar a Carteirinha, ver o Saldo, fazer a Recarga e finalizar. Ao finalizar, os dados do Usuário são apagados para o próximo Usuário.

## Relações

- Um **Usuário** tem exatamente uma **Carteirinha**, identificada por um **Número de série**.
- Uma **Carteirinha** tem um **Saldo**.
- Uma **Recarga** aumenta o **Saldo**; um **Débito** o diminuiria (não implementado).
- Uma **Sessão de atendimento** no **Totem** atende um único **Usuário**.

## Fora do escopo

- Pagamento da Recarga (Pix, cartão etc.): o valor é creditado sem cobrança.
- Débito e versão de administrador.
- Visitantes.
