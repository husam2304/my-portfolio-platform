# Portfolio Backend API

ASP.NET 8 Web API — SQL Server — JWT Auth — File Uploads

---

## 📁 Project Structure

```
Portfolio.API/
├── Controllers/          # All API endpoints
│   ├── AuthController.cs
│   ├── HomeController.cs
│   ├── CoreStackController.cs
│   ├── ProjectsController.cs
│   ├── LabExperimentsController.cs
│   ├── AboutController.cs
│   ├── ResumeController.cs
│   └── ContactController.cs
├── Data/
│   ├── AppDbContext.cs   # EF Core context
│   └── DbSeeder.cs       # Admin account seeder
├── DTOs/
│   └── Dtos.cs           # All request/response types
├── Models/
│   └── Entities.cs       # All database entities
├── Services/
│   ├── AuthService.cs    # JWT login
│   └── FileService.cs    # Image + PDF uploads
├── appsettings.json      # Configuration (edit this first)
├── initial_schema.sql    # Optional: run SQL directly instead of EF migrations
└── Program.cs
```

---

## 🚀 Setup Steps

### 1. Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8)
- SQL Server (local or Azure)
- Visual Studio 2022 / VS Code / Rider

### 2. Configure appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=PortfolioDB;User Id=sa;Password=YourPassword;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Secret": "your-super-secret-key-at-least-32-characters-long!",
    "Issuer": "portfolio-api",
    "Audience": "portfolio-frontend"
  },
  "Cors": {
    "AllowedOrigins": "http://localhost:5173,https://yourdomain.com"
  }
}
```

> ⚠️ **Never commit real secrets.** Use `dotnet user-secrets` or environment variables in production.

### 3. Restore packages

```bash
dotnet restore
```

### 4. Set up the database

**Option A — EF Core Migrations (recommended):**
```bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

**Option B — Run SQL directly:**
Open `initial_schema.sql` in SSMS or Azure Data Studio and execute it against your SQL Server.

### 5. Create your admin account

```bash
dotnet run --seed admin YourSecurePassword123!
```

This creates the first admin. Run the app normally after that:

```bash
dotnet run
```

### 6. Open Swagger

```
http://localhost:5000/swagger
```

Click **Authorize** → enter `Bearer <your-token-from-login>` to test admin endpoints.

---

## 🔑 Authentication Flow

```
POST /api/Auth/login
Body: { "username": "admin", "password": "YourPassword" }

Response: { "succeeded": true, "data": { "token": "eyJ...", "expiresAt": "..." } }
```

Add to all admin requests:
```
Authorization: Bearer eyJ...
```

---

## 📡 API Endpoints

### Public (no auth required)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/Home/hero` | Hero section |
| GET | `/api/CoreStack/get-core-stack` | Tech stack cards |
| GET | `/api/Projects/get-projects` | All projects |
| GET | `/api/Projects/get-featured-projects` | Featured projects only |
| GET | `/api/Projects/get-project-by-id/{id}` | Project details |
| GET | `/api/LabExperiments/get-experiments` | Lab experiment data |
| GET | `/api/About/get-philosophy` | Philosophy section |
| GET | `/api/About/get-expertise` | Skills/expertise |
| GET | `/api/About/get-journey` | Career journey |
| GET | `/api/Resume/get-tech-stack` | Resume tech stack |
| GET | `/api/Resume/get-certifications` | Certifications |
| GET | `/api/Resume/get-education` | Education |
| GET | `/api/Resume/get-experience` | Work experience |
| GET | `/api/Resume/get-publications` | Publications |
| GET | `/api/Resume/download` | Download resume PDF |
| GET | `/api/Contact/get-social-links` | Social links |
| GET | `/api/Contact/get-specs` | Contact specs |
| POST | `/api/Contact/submit-contact-form` | Submit contact form |

### Admin only (requires JWT)
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/Auth/login` | Get JWT token |
| PUT | `/api/Home/hero` | Update hero section |
| POST/PUT/DELETE | `/api/CoreStack` | Manage stack items |
| POST/PUT/DELETE | `/api/Projects` | Manage projects (multipart w/ image upload) |
| PUT | `/api/LabExperiments/experiment` | Update lab experiment |
| PUT | `/api/About/philosophy` | Update philosophy (multipart w/ image) |
| POST/PUT/DELETE | `/api/About/skills` | Manage skills |
| POST/PUT/DELETE | `/api/About/journey` | Manage journey items |
| POST/PUT/DELETE | `/api/Resume/tech-stack` | Manage tech stack |
| POST/PUT/DELETE | `/api/Resume/certifications` | Manage certifications |
| POST/PUT/DELETE | `/api/Resume/education` | Manage education |
| POST/PUT/DELETE | `/api/Resume/experience` | Manage experience |
| POST/PUT/DELETE | `/api/Resume/publications` | Manage publications |
| POST | `/api/Resume/upload` | Upload resume PDF |
| POST/PUT/DELETE | `/api/Contact/social-links` | Manage social links |
| POST/PUT/DELETE | `/api/Contact/specs` | Manage contact specs |

---

## 📤 File Uploads

Images and PDFs are stored in `wwwroot/uploads/`:
```
wwwroot/
└── uploads/
    ├── projects/   ← project images
    ├── about/      ← philosophy image
    └── resume/     ← resume.pdf
```

Upload endpoints accept `multipart/form-data`. The returned `imageUrl` is a relative path like `/uploads/projects/uuid.jpg` — prepend your base URL when using it in the frontend.

---

## 🔧 Connecting to Your Frontend

In your `apiClient.ts`, set the base URL:
```ts
const BASE_URL = "http://localhost:5000"; // dev
// const BASE_URL = "https://api.yourdomain.com"; // prod
```

The API responses match your existing `ApiResult<T>` interface exactly:
```ts
{ succeeded: boolean, data: T | null, error: string | null }
```

---

## 🏭 Production Checklist

- [ ] Use `dotnet user-secrets` or Azure Key Vault for `Jwt:Secret` and connection string
- [ ] Set `ASPNETCORE_ENVIRONMENT=Production`
- [ ] Use HTTPS (configure `appsettings.Production.json` with real cert)
- [ ] Add rate limiting to the contact form endpoint
- [ ] Configure email sending in `ContactController.SubmitForm` (SendGrid recommended)
- [ ] Set up a proper CORS origin list (not wildcard)
- [ ] Add `wwwroot/uploads` to your backup strategy
