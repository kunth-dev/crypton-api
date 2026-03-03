# Crypton API

A comprehensive bot for cryptocurrency trading using external REST API integration. This bot provides REST API endpoints for automated trading operations, perfect for n8n automation workflows.

## 🚀 Features

- **REST API**: Complete API for external integrations (n8n, automation tools)
- **Crypto Trading**: Full trading functionality via external crypto API
- **Domain Whitelist**: Security through domain-based access control
- **Type Safety**: Built with TypeScript for reliability
- **Error Handling**: Comprehensive error handling and logging
- **Real-time Data**: Live market data and account information

## 🛠 Technologies

- **Backend**: Express.js with TypeScript
- **Code Quality**: Biome for linting and formatting
- **Utilities**: es-toolkit for utility functions
- **Package Manager**: Yarn
- **API Client**: Axios for HTTP requests

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- Yarn package manager
- Crypto trading API credentials

## 🚀 Quick Start

1. **Clone and install:**

   ```bash
   git clone <repository-url>
   cd crypton-api
   yarn install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Run the bot:**

   ```bash
   # Development
   yarn dev

   # Production
   yarn build && yarn start
   ```

For detailed setup instructions, see the [Setup Guide](./docs/setup.md).

## ⚙️ Configuration

Key environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `WEB_API_HOST` | Crypto API host | ✅ |
| `WEB_API_ID` | API account ID | ✅ |
| `WEB_API_KEY` | API key | ✅ |
| `WEB_API_SECRET` | API secret | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |
| `ALLOWED_DOMAINS` | Domain whitelist | ✅ |
| `NODE_ENV` | Environment mode | ❌ |
| `TRUST_PROXY` | Trust proxy headers for IP detection | ❌ |

See complete configuration details in the [Setup Guide](./docs/setup.md#environment-variables).

## 🤖 Bot Commands

Quick reference:

- `/start` - Welcome and command list
- `/balance` - Account balance
- `/symbols` - Available trading pairs
- `/trades` - List active trades
- `/positions` - Open positions

For complete command documentation, see [Bot Commands](./docs/bot-commands.md).

## 🔌 REST API

Main endpoints:

- `GET /api/health` - Health check
- `GET /api/trades` - List trades
- `POST /api/trades` - Create trade
- `GET /api/symbols` - Trading symbols
- `GET /api/positions` - Open positions
- `GET /api/account/assets` - Account balances

For complete API documentation, see [API Reference](./docs/api-reference.md).

## 📖 Documentation

Complete documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [Setup Guide](./docs/setup.md) | Installation and configuration |
| [API Reference](./docs/api-reference.md) | REST API endpoints |
| [Deployment](./docs/deployment.md) | Production deployment |
| [n8n Integration](./docs/n8n-integration.md) | n8n automation workflows |
| [Security](./docs/security.md) | Security features and best practices |
| [Development](./docs/development.md) | Developer guide |
| [Netlify Deployment](./docs/netlify-deployment.md) | Serverless deployment |

## 🔗 n8n Integration

This bot is designed for n8n automation. Quick setup:

1. Add your n8n domain to `ALLOWED_DOMAINS`
2. Use HTTP Request nodes to call API endpoints
3. Build automated trading workflows

For detailed examples and workflows, see [n8n Integration Guide](./docs/n8n-integration.md).

## � Security

Key security features:

- Domain-based access control
- Environment variable protection
- Input validation
- Secure error handling
- Security event logging

For details, see [Security Guide](./docs/security.md).

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `yarn test`
5. Lint code: `yarn lint`
6. Submit a pull request

See the [Development Guide](./docs/development.md) for more information.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- 📚 [Documentation](./docs/)
- 🐛 [Report Issues](../../issues)
- 💬 [Discussions](../../discussions)

## 🔮 Roadmap

- [ ] Advanced trading strategies
- [ ] Portfolio management
- [ ] Real-time price alerts
- [ ] Multi-exchange support
- [ ] Enhanced security features
- [ ] Automated testing coverage

---

**⚠️ Disclaimer**: This software is for educational and development purposes. Always test thoroughly with small amounts before using with real funds. Cryptocurrency trading involves significant risk.