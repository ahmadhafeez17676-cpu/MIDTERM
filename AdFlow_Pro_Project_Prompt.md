# 🚀 AdFlow Pro – Sponsored Ads Marketplace Platform

## 📌 Project Description
AdFlow Pro is a **production-level SaaS marketplace platform** where:
- Clients submit ads
- Moderators review content
- Admin verifies payments
- Only approved ads go live for a limited duration

This is NOT a simple CRUD app — it is a **workflow-driven system**.

---

## 🧰 Tech Stack

### Frontend
- Next.js 14 (App Router)
- Tailwind CSS
- React Query / Server Actions

### Backend
- Node.js + Express.js
- REST API Architecture

### Database
- Supabase PostgreSQL

### Authentication
- JWT Authentication
- Role-Based Access Control (RBAC)

### Deployment
- Vercel

---

## 👥 User Roles

### 1. Client
- Create and manage ads
- Submit payment proof
- Track ad status

### 2. Moderator
- Review ads
- Approve / Reject ads
- Add notes

### 3. Admin
- Verify payments
- Publish / schedule ads
- Feature ads
- View analytics

### 4. Super Admin
- Manage system settings
- Full control

---

## 🔄 Ad Lifecycle Workflow

```
Draft → Submitted → Under Review → Payment Pending → 
Payment Submitted → Payment Verified → Scheduled → 
Published → Expired
```

### Rules:
- No ad goes live without payment verification
- Expired ads must not appear publicly
- Every status change must be logged

---

## ⚡ Antigravity Ranking Engine

```
rankScore = (featured ? 50 : 0)
           + (packageWeight * 10)
           + freshnessPoints
           + adminBoost
           + verifiedSellerPoints
```

### Features:
- Premium ads rank higher
- Fresh ads get temporary boost
- Admin can manually boost ads

---

## 📦 Package System

| Package  | Duration | Features |
|----------|--------|----------|
| Basic    | 7 days | Low priority |
| Standard | 15 days | Medium priority |
| Premium  | 30 days | Featured + Auto boost |

---

## 🖼️ Media Handling

- Only external URLs allowed
- No file uploads
- YouTube thumbnails auto-generated
- Validate URLs before saving

---

## 💳 Payment System

- Manual payment submission
- Required fields:
  - amount
  - method
  - transaction_ref
  - sender_name
  - screenshot_url
- Prevent duplicate transactions
- Admin verification required

---

## ⏱️ Automation (Cron Jobs)

- Auto publish scheduled ads
- Auto expire ads
- Send expiry notifications (48 hours before)
- System health logs

---

## 🌐 REST API Structure

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Client
- POST `/api/client/ads`
- PATCH `/api/client/ads/:id`
- POST `/api/client/payments`
- GET `/api/client/dashboard`

### Moderator
- GET `/api/moderator/review-queue`
- PATCH `/api/moderator/ads/:id/review`

### Admin
- GET `/api/admin/payment-queue`
- PATCH `/api/admin/payments/:id/verify`
- PATCH `/api/admin/ads/:id/publish`
- GET `/api/admin/analytics`

### Public
- GET `/api/ads`
- GET `/api/ads/:slug`

---

## 🗄️ Database Tables

- users
- ads
- packages
- categories
- cities
- payments
- ad_media
- notifications
- audit_logs
- ad_status_history

---

## 🖥️ Frontend Pages

- Home Page
- Explore Ads Page
- Ad Detail Page
- Packages Page
- Client Dashboard
- Moderator Panel
- Admin Dashboard
- Analytics Page
- Login / Register

---

## 📁 Project Structure

```
server/
  controllers/
  services/
  routes/
  middlewares/
  validators/
  cron/
  db/

client/
  app/
  components/
  features/
  hooks/
  utils/
```

---

## 🔐 Security

- JWT Authentication
- RBAC Middleware
- Input validation (Zod/Joi)
- Error handling

---

## 📦 Output Requirements

- Complete Backend Code
- Complete Frontend UI
- Database Schema (SQL)
- Authentication System
- RBAC Implementation
- Ranking Engine
- Cron Jobs
- Clean Architecture

---

## ⚠️ Important Rules

- Code must be production-level
- Follow scalable architecture
- No incomplete logic
- Use best practices

---

## 🧠 Development Steps

1. Folder Structure  
2. Database Schema  
3. Backend APIs  
4. Frontend UI  
5. Automation & Deployment  

---

## 🎯 Goal

Build a **real-world SaaS marketplace system** with:
- Workflow logic
- Role-based access
- Automation
- Scalable architecture

---

🔥 **Pro Tip:**  
Use this file with AI tools like ChatGPT or Cursor to generate full project step-by-step.
