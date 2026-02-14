# Homeblinds Facturacion
Facturación para negocio de persianas

## ⚡ Tech Stack

- **Frontend**: Angular 18.2 (upgraded from v4)
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose 8
- **Authentication**: JWT (JSON Web Tokens)
- **UI Framework**: Bootstrap 3, Angular Material 18
- **Invoice API**: [FacturAPI](https://github.com/FacturAPI/facturapi-node)

## 🚀 Quick Start

### Prerequisites

- Node.js 24.x
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd homeblinds-facturacion

# Install dependencies
npm install

# Set environment variables
export MONGODB_URI=mongodb://localhost:27017/homeblinds
export SESSION_SECRET=your-secret-key-here

# Run in development mode
npm run dev
```

### Available Scripts

- `npm run dev` - Run development mode with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code

## 📦 Deployment

### Vercel Deployment

This application is ready to deploy on Vercel. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

Quick deploy:
```bash
npm install -g vercel
vercel login
vercel
```

Don't forget to set environment variables in Vercel:
- `MONGODB_URI`
- `SESSION_SECRET`

## 🔐 Security

See [SECURITY.md](./SECURITY.md) for security information and recommendations.

## 📚 Documentation

- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)
- [Security Report](./SECURITY.md)

## 🛠️ Recent Updates (February 2026)

- ✅ Upgraded Angular from v4 to v18
- ✅ Updated TypeScript from v3.9 to v5.5
- ✅ Migrated RxJS operators to v7 pipe syntax
- ✅ Updated all server dependencies
- ✅ Added Vercel deployment configuration
- ✅ Fixed security vulnerabilities in Mongoose and body-parser
- ✅ Modernized build configuration

## 🤝 Contributing

Built thanks to [FacturAPI](https://github.com/FacturAPI/facturapi-node)

## 📝 License

MIT

