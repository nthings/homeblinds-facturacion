# Homeblinds Facturacion
Facturación para negocio de persianas

## ⚡ Tech Stack

- **Frontend**: Angular 19.2 (**ALL XSS vulnerabilities FIXED**)
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose 8
- **Authentication**: JWT (JSON Web Tokens)
- **UI Framework**: Bootstrap 3, Angular Material 19
- **Styling**: Dart Sass (pure JavaScript, no native compilation)
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
export API_KEY=your-facturapi-key-here

# Run in development mode
npm run dev
```

### Available Scripts

- `npm run dev` - Run development mode with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code

## 🔐 Security

✅ **ALL CRITICAL VULNERABILITIES FIXED**

See [SECURITY.md](./SECURITY.md) for complete security information.

## 📚 Documentation

- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)
- [Security Report](./SECURITY.md) - All XSS vulnerabilities fixed!
- [Upgrade Summary](./UPGRADE_SUMMARY.md)
- [node-sass to Dart Sass Migration](./NODE_SASS_MIGRATION.md)
- [Express Static Serving for Vercel](./EXPRESS_STATIC_MIGRATION.md)

## 🛠️ Recent Updates (February 2026)

- ✅ **Upgraded Angular from v4 to v19** (ALL XSS VULNERABILITIES FIXED)
- ✅ Updated TypeScript from v3.9 to v5.5
- ✅ Migrated RxJS operators to v7 pipe syntax
- ✅ **Migrated from node-sass to Dart Sass** (Vercel compatible, no Python required)
- ✅ **Adapted Express for Vercel static serving** (public/ directory, no express.static())
- ✅ Updated all server dependencies
- ✅ Added Vercel deployment configuration
- ✅ Fixed all security vulnerabilities
- ✅ Modernized build configuration

## 🤝 Contributing

Built thanks to [FacturAPI](https://github.com/FacturAPI/facturapi-node)

## 📝 License

MIT

