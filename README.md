# Reciply — Bravey Demo App

A simple recipe discovery app built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

This repository is used to showcase [Bravey](https://bravey.io) — an AI coding agent that picks up Linear tickets, creates branches, and opens pull requests automatically.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: In-memory (see `lib/recipes.ts`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/recipes` | List all recipes |
| POST | `/api/recipes` | Create a recipe |
| GET | `/api/recipes/:id` | Get a single recipe |
