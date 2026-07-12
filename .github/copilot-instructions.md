---
description: 'Workspace instructions for Copilot: mandatory planning workflow with prior approval, strict prohibition on commits, and concise summary of changes.'
applyTo: '**'
---

# GitHub Copilot Instructions

## Commits

- Strict rule: Copilot must never create, suggest, review, accept, execute, or simulate commits in this project.
- Strict rule: Copilot must never execute commit commands, including `git commit`, `git commit --amend`, commit squashing, or equivalent automation.
- Even when requested, Copilot must refuse the action and limit itself to guiding the user about changes made to the code.

## Mandatory planning and approval workflow

- Before implementing any code change, Copilot must create an implementation plan and wait for explicit user approval.
- The plan must be based on:
    - analysis of the existing repository code
    - research into references and best practices from existing internet implementations, when applicable
    - technical impact assessment, including affected files, risks, and validation strategy
- No implementation change may be applied to code files without explicit user approval.
- After approval, Copilot must perform only the work approved in the plan. If a relevant deviation arises, it must pause, update the plan, and request new approval.
- The plan must contain at least:
    - objective and context
    - diagnosis of the current state
    - step-by-step technical proposal
    - risks and mitigations
    - test and validation strategy
    - completion criteria

## Compliance protocol (plan before coding)

- This project uses the strict "Planning First" mode.
- Before any implementation, Copilot must complete the plan and end by explicitly requesting approval.
- Implementation may begin only after clear user confirmation. The preferred approval phrase is: "Approved, you can implement."
- If the user requests a direct code change without prior plan approval, Copilot must refuse immediate implementation and provide the plan first.
- Before editing code files, Copilot must internally validate this checklist:
    - plan presented
    - explicit approval received
    - approved scope without deviations
- If any checklist item fails, implementation must be blocked.

Recommended plan template:

1. Objective
2. Diagnosis of the current code
3. External references and technical decision
4. Implementation steps
5. Risks and mitigations
6. Validation and testing
7. Acceptance criteria
8. Explicit user approval request

## Change summary

- When completing a task, provide a clear and concise summary of the code changes.
- Highlight the main modified files and the practical effect of the change.
- Avoid long, repetitive, or generic text.

## Expected documentation style

- Write in English.
- Use simple, clear, and objective technical language.
- Organize content into short, scannable sections.
- Prefer lists and practical examples when they improve understanding.
- Keep documentation aligned with the actual project structure and commands used in the repository.
