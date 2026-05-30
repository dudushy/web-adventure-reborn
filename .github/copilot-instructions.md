---
description: 'Instruções de workspace para o Copilot: fluxo obrigatório de planejamento com aprovação prévia, proibição estrita de commits e resumo objetivo das alterações.'
applyTo: '**'
---

# Instruções do GitHub Copilot

## Commits

- Regra estrita: o Copilot nunca deve criar, sugerir, revisar, aceitar, executar ou simular commits neste projeto.
- Regra estrita: o Copilot nunca deve executar comandos de commit (incluindo `git commit`, `git commit --amend`, squash de commits ou qualquer automação equivalente).
- Mesmo quando solicitado, o Copilot deve recusar a ação de commit e limitar-se a orientar o usuário sobre as alterações realizadas no código.

## Fluxo obrigatório de planejamento e aprovação

- Antes de implementar qualquer alteração em código, o Copilot deve criar um plano de implementação e aguardar aprovação explícita do usuário.
- O plano deve ser construído com base em:
    - análise do código já existente no repositório
    - pesquisa de referências e boas práticas em implementações existentes na internet, quando aplicável
    - avaliação de impacto técnico (arquivos afetados, riscos e estratégia de validação)
- Sem aprovação explícita do usuário, nenhuma alteração de implementação deve ser aplicada em arquivos de código.
- Após aprovação, o Copilot deve executar somente o que foi aprovado no plano. Se surgir desvio relevante, deve pausar, atualizar o plano e pedir nova aprovação.
- O plano deve conter, no mínimo:
    - objetivo e contexto
    - diagnóstico do estado atual
    - proposta técnica por etapas
    - riscos e mitigação
    - estratégia de testes/validação
    - critérios de conclusão

## Protocolo de conformidade (planejar antes de codar)

- Este projeto adota o modo estrito: "Planejamento Primeiro".
- Antes de qualquer implementação, o Copilot deve finalizar o plano e encerrar com pedido explícito de aprovação.
- A implementação só pode começar após confirmação clara do usuário. Frase preferencial de aprovação: "Aprovado, pode implementar".
- Se o usuário pedir alteração direta no código sem aprovação prévia do plano, o Copilot deve recusar a implementação imediata e responder com plano primeiro.
- Antes de editar arquivos de código, o Copilot deve validar internamente este checklist:
    - plano apresentado
    - aprovação explícita recebida
    - escopo aprovado sem desvios
- Se qualquer item do checklist falhar, a implementação deve ser bloqueada.

Modelo recomendado de plano:

1. Objetivo
2. Diagnóstico do código atual
3. Referências externas e decisão técnica
4. Passos de implementação
5. Riscos e mitigação
6. Validação/testes
7. Critérios de aceite
8. Solicitação explícita de aprovação do usuário

## Resumo das alterações

- Ao finalizar uma tarefa, apresente um resumo claro e objetivo do que foi feito nos códigos.
- Destaque os arquivos principais alterados e o efeito prático da mudança.
- Evite textos longos, repetitivos ou genéricos.

## Estilo esperado para documentação

- Escreva em português do Brasil.
- Use linguagem técnica simples, clara e objetiva.
- Organize o conteúdo em seções curtas e escaneáveis.
- Prefira listas e exemplos práticos quando ajudarem o entendimento.
- Mantenha a documentação alinhada com a estrutura real do projeto e com os comandos realmente usados no repositório.
