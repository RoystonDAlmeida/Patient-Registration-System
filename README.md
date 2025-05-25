# Patient Pocket Ledger

A secure, local-first patient data management system built with React, TypeScript, and PGlite. This application provides a robust solution for managing patient records entirely in the browser, with no server-side dependencies.

## 📑 Table of Contents

- [🌟 Key Features](#-key-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [💻 Usage](#-usage)
  - [Patient Registration](#patient-registration)
  - [SQL Query Interface](#sql-query-interface)
  - [Multi-Tab Usage](#multi-tab-usage)
- [🛠️ Development](#️-development)
  - [Available Scripts](#available-scripts)
- [🏗️ Technical Implementation](#️-technical-implementation)
  - [Data Storage](#data-storage)
  - [State Management](#state-management)
- [🎯 Challenges & Solutions](#-challenges--solutions)
- [🛡️ Security Considerations](#️-security-considerations)
- [📚 Tech Stack](#-tech-stack)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## 🌟 Key Features

- 🔒 **Local-First Storage**: All patient data is stored locally using PGlite, ensuring privacy and offline functionality
- 📱 **Responsive Design**: Optimized for all devices from mobile to desktop
- 🎨 **Modern UI**: Built with shadcn/ui components for a polished user experience
- 🔍 **Advanced Search**: Powerful patient search and filtering capabilities
- 📊 **SQL Interface**: Direct raw SQL query interface for advanced data analysis
- 🔄 **Multi-Tab Support**: Real-time data synchronization across browser tabs
- 💾 **Data Persistence**: Patient records persist across page refreshes
- 🚀 **Zero-Server Architecture**: Everything runs in the browser

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Modern web browser with IndexedDB support

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:RoystonDAlmeida/Patient-Registration-System.git
   cd Patient-Registration-System/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## 💻 Usage

### Patient Registration

1. Click "Register Patient" tab in the tabs bar
2. Fill in the patient details form
3. Click "Register Patient" to submit and save the patient record

### SQL Query Interface

1. Navigate to the "SQL Query" section
2. Enter your SQL query in the editor
3. Click "Execute" to run the query
4. View results in the table below

### Multi-Tab Usage

The application automatically handles data synchronization across tabs:
- Changes made in one tab are immediately reflected in others
- All tabs maintain consistent data state
- No manual refresh required

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Technical Implementation

### Data Storage

- Uses PGlite for local SQL database functionality
- Implements IndexedDB for persistent storage
- Handles data synchronization through BroadcastChannel API

### State Management

- React Query for server state management
- Local state management with React hooks
- Cross-tab communication using BroadcastChannel

## 🎯 Challenges & Solutions

### Challenge 1: Cross-Tab Synchronization
**Solution**: Implemented a custom synchronization system using BroadcastChannel API to ensure real-time updates across tabs.

### Challenge 2: Data Persistence
**Solution**: Leveraged PGlite's built-in persistence layer with IndexedDB to maintain data across page refreshes.

### Challenge 3: SQL Query Interface
**Solution**: Created a safe SQL query interface with input validation and error handling to prevent SQL injection.

## 🛡️ Security Considerations

- All data is stored locally in the browser
- No sensitive data is transmitted to external servers
- SQL query interface includes input sanitization
- Regular security audits of dependencies

## 📚 Tech Stack

- React 18
- TypeScript
- Vite
- PGlite
- Tailwind CSS
- shadcn/ui
- React Router
- React Query

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.