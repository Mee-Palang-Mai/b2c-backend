# B2C Backend - Implementation Guide

A modern B2C (Business-to-Consumer) backend API built with NestJS, TypeScript, and Express. This project provides a RESTful API for order management with comprehensive testing and best practices.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)

To install pnpm globally:
```bash
npm install -g pnpm
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd b2c-backend
```

2. Install dependencies:
```bash
pnpm install
```

## Start App (Development)

1. Ensure Docker is installed and running.
2. Install dependencies (if not already):
```bash
pnpm install
```
3. Copy environment file:
```bash
cp .env.example .env  # or create .env manually if example is missing
```
   - Set at least:
     - `DATABASE_URL=postgresql://<DB_USER>:<DB_PASSWORD>@localhost:<DB_PORT>/<DB_NAME>?schema=public`
     - `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_PORT` (used by docker-compose)
4. Start local PostgreSQL with Docker Compose:
```bash
docker compose up -d postgres
```
5. Migrate current schema:
```bash
pnpm prisma:migrate
```
6. Seed database (optional):
```bash
pnpm prisma:seed
```
7. Start the app in development:
```bash
pnpm start:dev
```

## Running the Application

### Development Mode

Start the application in development mode with hot-reload:
```bash
pnpm start:dev
```

The API will be available at `http://localhost:3000`

### Debug Mode

Start with debugging enabled:
```bash
pnpm start:debug
```

### Production Mode

Build and run the production version:
```bash
# Build the application
pnpm build

# Start production server
pnpm start:prod
```

### Custom Port

Set a custom port using the `PORT` environment variable:
```bash
PORT=8080 pnpm start:dev
```

## API Documentation

### Base URL
```
http://localhost:3000
```

## Project Structure

```
b2c-backend/
├── src/
│   ├── database/               # Database module & Prisma service
│   │   ├── database.module.ts
│   │   └── prisma.service.ts
│   ├── order-example/          # Order module (example implementation)
│   │   ├── dto/                # Data Transfer Objects
│   │   │   ├── create-order.dto.ts
│   │   │   └── update-order.dto.ts
│   │   ├── order.controller.ts # REST API endpoints
│   │   ├── order.controller.spec.ts # Controller tests
│   │   ├── order.service.ts    # Business logic
│   │   ├── order.service.spec.ts    # Service tests
│   │   ├── order.entity.ts     # Order interface & enums
│   │   └── order.module.ts     # Module definition
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   └── main.ts                 # Application entry point
├── prisma/                     # Prisma ORM
│   ├── schema.prisma
│   └── seed.ts
├── docker-compose.yml          # Local Postgres
├── test/                       # E2E tests
├── dist/                       # Compiled JavaScript
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── nest-cli.json               # NestJS CLI configuration
└── eslint.config.mjs           # ESLint configuration
```

### Module Architecture

This project follows NestJS modular architecture:

- **Module**: Organizes related components (`order.module.ts`)
- **Controller**: Handles HTTP requests (`order.controller.ts`)
- **Service**: Contains business logic (`order.service.ts`)
- **DTO**: Validates and transforms data (`dto/`)
- **Entity**: Defines data structures (`order.entity.ts`)

## Testing

### Run All Tests
```bash
pnpm test
```

### Watch Mode
```bash
pnpm test:watch
```

### Test Coverage
```bash
pnpm test:cov
```

### E2E Tests
```bash
pnpm test:e2e
```

### Test Files
- `*.spec.ts` - Unit tests
- `*.e2e-spec.ts` - End-to-end tests

## Development Guidelines

### Code Quality

**Linting:**
```bash
pnpm lint
```

**Formatting:**
```bash
pnpm format
```

### Creating a New Module

Follow the order-example pattern when creating new modules:

1. **Create module structure:**
```bash
nest generate module feature-name
nest generate controller feature-name
nest generate service feature-name
```

2. **Create DTOs:**
```typescript
// dto/create-feature.dto.ts
export class CreateFeatureDto {
  // Define properties
}
```

3. **Create entity/interface:**
```typescript
// feature.entity.ts
export interface Feature {
  id: string;
  // Define properties
}
```

4. **Implement service with business logic:**
```typescript
@Injectable()
export class FeatureService {
  // Implement CRUD operations
}
```

5. **Implement controller with endpoints:**
```typescript
@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}
  // Implement routes
}
```

6. **Write tests:**
- Create `feature.service.spec.ts` for unit tests
- Create `feature.controller.spec.ts` for controller tests

### Database Integration

#### Prisma

This project uses Prisma as the ORM.

- **Environment**: set `DATABASE_URL` in `.env` (see `DATABASE_SETUP.md`).
- **Generate client**:
```bash
pnpm prisma:generate
```
- **Create and run migrations (dev)**:
```bash
pnpm prisma:migrate
```
- **Apply migrations (prod/CI)**:
```bash
pnpm prisma:migrate:deploy
```
- **Push schema without migrations (non‑prod)**:
```bash
pnpm db:push
```
- **Seed data**:
```bash
pnpm prisma:seed
```
- **Prisma Studio**:
```bash
pnpm prisma:studio
```

Troubleshooting:
- If you see `Module "@prisma/client" has no exported member "PrismaClient"`, run `pnpm prisma:generate` to (re)generate the client.

Docker:
- Start Postgres via `docker-compose.yml`, set `DATABASE_URL`, then run the commands above.

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Documentation](https://jestjs.io/docs/getting-started)

## License

This project is [UNLICENSED](LICENSE).

## Support

For questions or issues, please open an issue in the repository or contact the development team.

