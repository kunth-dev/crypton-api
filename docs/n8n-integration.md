# n8n Integration Guide

This guide explains how to integrate the Crypton API with n8n automation workflows.

## Overview

The Crypton API is designed to work seamlessly with n8n, a powerful workflow automation tool. You can use n8n to:

- Automate trading based on external signals
- Create complex trading strategies
- Monitor market conditions and execute trades
- Build custom notification systems
- Integrate with other services and APIs

## Prerequisites

- n8n instance running (cloud or self-hosted)
- Bot API endpoint URL
- Domain whitelist configured

## Setting Up Domain Whitelist

1. **Identify your n8n domain:**
   - For n8n cloud: `n8n.cloud` or your custom domain
   - For self-hosted: your server's domain or IP

2. **Add to ALLOWED_DOMAINS:**

   ```bash
   # In your .env file
   ALLOWED_DOMAINS=localhost,your-n8n-domain.com
   ```

## API Endpoints for n8n

### Most Used Endpoints

| Endpoint | Method | Purpose |
| ---------- | -------- | --------- |
| `/api/health` | GET | Health check |
| `/api/trades` | GET | List trades |
| `/api/trades` | POST | Create trade |
| `/api/trades/:id` | DELETE | Cancel trade |
| `/api/symbols` | GET | Get all symbols |
| `/api/symbols/:symbol` | GET | Get symbol details |
| `/api/symbols/ticks/:symbol` | GET | Get real-time tick data |
| `/api/account/assets` | GET | Get balances |
| `/api/positions` | GET | Get positions |

For complete API documentation, see [API Reference](./api-reference.md).

## Error Handling

### Handle API Errors in n8n

Add an error workflow to handle failed requests:

```javascript
// In Error Trigger node
const error = $input.item.json;

// Log error
console.error('Trading error:', error);

// Send notification
return [{
  json: {
    subject: 'Trading Bot Error',
    message: `Error: ${error.error}\nDetails: ${error.message}`,
    timestamp: new Date().toISOString()
  }
}];
```

### Retry Logic

Configure HTTP Request node retry settings:

- **Max Retries**: 3
- **Retry On**: 5xx errors
- **Retry Wait**: 1000ms

## Best Practices

1. **Test with Small Amounts**: Always test workflows with minimal trade amounts first
2. **Use Conditional Logic**: Add checks to prevent duplicate trades
3. **Set Up Alerts**: Configure notifications for important events
4. **Monitor Workflows**: Regularly check execution logs
5. **Rate Limiting**: Be mindful of API rate limits
6. **Error Handling**: Always include error handling nodes
7. **Secure Credentials**: Use n8n's credential system for sensitive data
8. **Version Control**: Export and backup your workflows

## Security Considerations

1. **Domain Whitelist**: Always configure the domain whitelist
2. **HTTPS**: Use HTTPS for production deployments
3. **Network Security**: Ensure secure network connection between n8n and bot
4. **Access Control**: Limit who can modify workflows
5. **Audit Logs**: Enable logging for security events

## Troubleshooting

### Common Issues

**Domain Not Whitelisted:**

```json
{
  "success": false,
  "error": "Access forbidden",
  "message": "Domain not whitelisted"
}
```

**Solution**: Add your n8n domain to `ALLOWED_DOMAINS`

**Connection Timeout:**

- Check bot is running: `curl http://your-bot-domain:3000/api/health`
- Verify network connectivity
- Check firewall rules

**Invalid Response:**

- Verify API endpoint URL
- Check request body format
- Review API documentation

## Advanced Workflows

### Multi-Exchange Arbitrage

Monitor prices across exchanges and execute arbitrage trades.

### Sentiment Analysis Trading

Integrate with sentiment analysis APIs to trade based on market sentiment.

### Technical Indicator Based Trading

Use n8n with technical analysis libraries to create indicator-based strategies.

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [API Reference](./api-reference.md)
- [Setup Guide](./setup.md)

## Support

For n8n integration issues:

1. Check n8n execution logs
2. Verify bot API is accessible
3. Test endpoints with curl/Postman
4. Review domain whitelist configuration
5. Check network connectivity

---

**⚠️ Risk Disclaimer**: Automated trading carries significant risk. Always test thoroughly with small amounts before using in production. Never risk more than you can afford to lose.
