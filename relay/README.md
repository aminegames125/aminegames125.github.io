# Contact relay

Receives the contact form and forwards it to a Discord webhook, so the webhook URL never reaches the browser.

## Environment

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `DISCORD_WEBHOOK_URL` | yes | none | The webhook that receives messages |
| `ALLOWED_ORIGINS` | no | `https://aminegames125.github.io,https://amineos.dev` | Comma-separated CORS allow list |
| `PORT` | no | `8787` | Listening port |
| `TRUST_PROXY` | no | off | Set to `1` behind nginx so the client IP is read from `X-Real-IP` |

## Behaviour

- `POST /contact` with JSON `{ name, topic, message, website }`. `website` is a honeypot: when it is filled in, the request is dropped and still answered with 200.
- Limits: 5 requests per 10 minutes per IP (429 after that), body up to 8 KB, name up to 80, project type up to 40, message up to 1500 characters.
- CORS: only the listed origins. Requests with another or no `Origin` get 403.
- `GET /healthz` returns 200.
- Mentions in the message are disabled (`allowed_mentions.parse` is empty).

## Run

```powershell
docker build -t amineos-relay ./relay
docker run -d --name amineos-relay --restart unless-stopped -p 127.0.0.1:8787:8787 `
  -e DISCORD_WEBHOOK_URL="<new webhook url>" -e TRUST_PROXY=1 amineos-relay
```

Put it behind nginx on HTTPS and pass the client address:

```nginx
location /contact {
  proxy_pass http://127.0.0.1:8787;
  proxy_set_header X-Real-IP $remote_addr;
}
```

Then set `contactEndpoint` in `content/site.ts` to the public URL, for example `https://relay.amineos.dev/contact`.
