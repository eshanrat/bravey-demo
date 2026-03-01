# TaskFlow — Bravey Demo App

A simple engineering task board built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

This repository is used to showcase [Bravey](https://bravey.io) — an AI coding agent that picks up Linear tickets, creates branches, and opens pull requests automatically.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: In-memory (see `lib/store.ts`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Get a task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
