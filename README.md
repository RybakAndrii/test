# Vehicle Selector App

## Overview
The Vehicle Selector App allows users to select a vehicle make and model year to view available vehicle models.

## Features
- Fetches and displays vehicle makes using a public API.
- Dynamic routing to view models for a specific make and year.
- Responsive and accessible UI built with Tailwind CSS.
- Code quality ensured with ESLint and Prettier.

## Requirements
- Node.js >= 14
- npm >= 6

## Environment Variables
Create a `.env.local` file in the root directory and add:
```env
NEXT_PUBLIC_API_URL=https://vpic.nhtsa.dot.gov/api/vehicles
