# Reciply — Bravey Demo App

A simple recipe discovery app built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

This repository is used to showcase [Bravey](https://bravey.io) — an AI coding agent that picks up Linear tickets, creates branches, and opens pull requests automatically.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: In-memory (see `lib/recipes.ts`)

## Features

- **Recipe Discovery**: Browse a collection of recipes with images, cooking times, and ingredients
- **Search & Filter**: Find recipes by title, description, or ingredients with real-time search
- **Category Filtering**: Filter recipes by category (Breakfast, Lunch, Dinner, Dessert, Snack, Drink)
- **Bookmarkable URLs**: Share filtered results with URL query parameters
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Search Examples

Try these URLs to see the search and filtering in action:
- Search for mango: `/?q=mango`
- Filter by drinks: `/?category=drink`
- Search for chocolate desserts: `/?q=chocolate&category=dessert`
- Find breakfast recipes: `/?category=breakfast`

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