# Graph Report - .  (2026-08-09)

## Corpus Check
- Corpus is ~22,353 words - fits in a single context window. You may not need a graph.

## Summary
- 354 nodes · 439 edges · 32 communities (24 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Angular Build Configuration
- App Constants & Services
- App Root & Navigation
- Adventures Select Component
- Angular Core Dependencies
- Frog Animation Adventure
- Angular CLI & Workspace
- Dev Dependencies & Tooling
- Lava Lamp Loader
- Package Scripts & Metadata
- Shared Select Component
- Adventures Page & Routing
- Preferences Page
- Switch Frogs Game
- Version Sync Scripts
- Hover Buttons Adventure
- Spotify Player Clone
- Ultimate Tic-Tac-Toe
- GitHub Workflow Docs
- CI/CD Deployment
- Internationalization Assets
- UI Design References
- Logo Asset
- Project README

## God Nodes (most connected - your core abstractions)
1. `SelectComponent` - 19 edges
2. `Frog` - 15 edges
3. `Preferences` - 12 edges
4. `scripts` - 11 edges
5. `StorageService` - 11 edges
6. `ThemeService` - 11 edges
7. `LavaLamp` - 10 edges
8. `App` - 8 edges
9. `Select` - 8 edges
10. `SwitchFrogs` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Brazilian Flag SVG` --semantically_similar_to--> `United States Flag SVG`  [INFERRED] [semantically similar]
  public/assets/imgs/flag-br.svg → public/assets/imgs/flag-us.svg
- `Copilot Instructions` --references--> `Implementation Plan Template`  [INFERRED]
  .github/copilot-instructions.md → .github/implementation-plan-template.md
- `United States Flag SVG` --conceptually_related_to--> `Internationalization (i18n)`  [INFERRED]
  public/assets/imgs/flag-us.svg → public/assets/imgs/flag-br.svg
- `Select` --references--> `SelectOption`  [EXTRACTED]
  src/app/pages/adventures/components/select/select.ts → src/lib/types/components/select.type.ts
- `LavaLamp` --references--> `BlobArrayType`  [EXTRACTED]
  src/app/pages/adventures/loaders/lava-lamp/lava-lamp.ts → src/lib/types/adventures/loaders/lava-lamp.type.ts

## Import Cycles
- 3-file cycle: `src/lib/components/index.ts -> src/lib/components/select/select.component.ts -> src/lib/index.ts -> src/lib/components/index.ts`

## Hyperedges (group relationships)
- **Adventure Pages Under Router Outlet** — src_app_pages_adventures_clones_spotify_player_spotify_player, src_app_pages_adventures_games_switch_frogs_switch_frogs, src_app_pages_adventures_games_ultimate_tic_tac_toe_ultimate_tic_tac_toe, src_app_pages_adventures_interactive_hover_buttons_hover_buttons, src_app_pages_adventures_loaders_lava_lamp_lava_lamp, src_app_pages_adventures_loaders_startup_startup, src_app_pages_adventures_random_frog_frog, src_app_pages_adventures_random_tongue_tongue, src_app_pages_adventures_components_select_select [INFERRED 0.85]
- **Components Using Translate Pipe** — src_app_app, src_app_pages_home_home, src_app_pages_preferences_preferences, src_app_pages_adventures_adventures, src_app_pages_adventures_interactive_hover_buttons_hover_buttons, src_app_pages_adventures_games_switch_frogs_switch_frogs, src_app_pages_adventures_random_frog_frog, src_app_pages_adventures_random_tongue_tongue [EXTRACTED 1.00]
- **CSS-Driven Animation Adventures** — src_app_pages_adventures_loaders_lava_lamp_lava_lamp, src_app_pages_adventures_loaders_startup_startup, src_app_pages_adventures_random_tongue_tongue [INFERRED 0.75]
- **Language Selector Flag Icons** — public_assets_imgs_flag_br_flag_br, public_assets_imgs_flag_us_flag_us, concept_internationalization [INFERRED 0.85]

## Communities (32 total, 8 thin omitted)

### Community 0 - "Angular Build Configuration"
Cohesion: 0.06
Nodes (33): build, lint, serve, test, builder, configurations, defaultConfiguration, options (+25 more)

### Community 1 - "App Constants & Services"
Cohesion: 0.11
Nodes (9): LANGUAGES, THEMES, TITLE_PREFIX, StorageService, Injectable, LanguagesType, StorageType, ThemesType (+1 more)

### Community 2 - "App Root & Navigation"
Cohesion: 0.10
Nodes (9): i18n Translate Pipe, App, appConfig, routes, Component, Index HTML Entry Point, APP_VERSION, ThemeService (+1 more)

### Community 3 - "Adventures Select Component"
Cohesion: 0.10
Nodes (9): Select, Component, Home, Component, TOPICS, TitleService, Injectable, SelectionChangeEvent (+1 more)

### Community 4 - "Angular Core Dependencies"
Cohesion: 0.08
Nodes (25): @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/router, @ngx-translate/core, @ngx-translate/http-loader (+17 more)

### Community 5 - "Frog Animation Adventure"
Cohesion: 0.13
Nodes (6): Frog, Component, Tongue, Component, FrogAreaType, FrogStateType

### Community 6 - "Angular CLI & Workspace"
Cohesion: 0.09
Nodes (21): analytics, packageManager, schematicCollections, cli, newProjectRoot, projects, web-adventure-reborn, $schema (+13 more)

### Community 7 - "Dev Dependencies & Tooling"
Cohesion: 0.09
Nodes (23): @angular/build, @angular/compiler-cli, angular-eslint, eslint, @eslint/js, jsdom, devDependencies, @angular/build (+15 more)

### Community 8 - "Lava Lamp Loader"
Cohesion: 0.11
Nodes (6): LavaLamp, Component, Startup, Component, BlobArrayType, ViewChildren

### Community 9 - "Package Scripts & Metadata"
Cohesion: 0.11
Nodes (17): engines, node, name, packageManager, private, scripts, build, format (+9 more)

### Community 11 - "Adventures Page & Routing"
Cohesion: 0.16
Nodes (7): Adventure Categories System, Adventures, Component, ADVENTURES, AdventuresCategoriesType, AdventuresStatusType, AdventuresType

### Community 13 - "Switch Frogs Game"
Cohesion: 0.20
Nodes (4): INITIAL_BOARD, INITIAL_FROG_POSITIONS, SwitchFrogs, Component

### Community 14 - "Version Sync Scripts"
Cohesion: 0.42
Nodes (8): assertVersion(), main(), paths, readJson(), rootDir, syncPackageLockVersion(), syncVersionFiles(), writeJson()

### Community 18 - "GitHub Workflow Docs"
Cohesion: 0.67
Nodes (3): Copilot Instructions, Implementation Plan Template, Planning First Workflow

### Community 19 - "CI/CD Deployment"
Cohesion: 0.67
Nodes (3): Deploy Workflow, GitHub Pages Deployment, SPA Routing Fallback (404.html copy)

### Community 20 - "Internationalization Assets"
Cohesion: 1.00
Nodes (3): Internationalization (i18n), Brazilian Flag SVG, United States Flag SVG

## Knowledge Gaps
- **86 isolated node(s):** `$schema`, `version`, `packageManager`, `analytics`, `newProjectRoot` (+81 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SelectComponent` connect `Shared Select Component` to `Adventures Select Component`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `Preferences` connect `Preferences Page` to `Adventures Select Component`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `packageManager` to the rest of the system?**
  _86 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Angular Build Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.06439393939393939 - nodes in this community are weakly interconnected._
- **Should `App Constants & Services` be split into smaller, more focused modules?**
  _Cohesion score 0.11264367816091954 - nodes in this community are weakly interconnected._
- **Should `App Root & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.09686609686609686 - nodes in this community are weakly interconnected._
- **Should `Adventures Select Component` be split into smaller, more focused modules?**
  _Cohesion score 0.10461538461538461 - nodes in this community are weakly interconnected._