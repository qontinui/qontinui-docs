---
sidebar_position: 2
---

# The Three Tiers

The Qontinui runner is designed to be useful at three different levels of commitment. You can run it entirely on your own machine with no internet, point it at AI APIs you already pay for, or sign in to Qontinui for multi-machine coordination. All three are first-class — pick the one that fits, and change your mind later.

## Tier overview

| Tier | What you set up | What leaves your machine | When it's right |
| --- | --- | --- | --- |
| **Tier 0 — Local AI** | A local model URL (Ollama, vLLM, or any OpenAI-compatible server). | Nothing. The runner makes zero outbound network calls on its own. | Privacy-conscious users, air-gapped environments, anyone experimenting with local models. |
| **Tier 1 — Bring your own API key** | An Anthropic, OpenAI, or Gemini API key. | Outbound HTTPS to the AI provider only. No Qontinui-side state. | You already have an AI provider account and just want to use the runner. |
| **Tier 2 — Qontinui account** | Sign in to Qontinui from the runner. | Runner-to-Qontinui WebSocket traffic for coordination; auth round-trips. | Running multiple machines, coordinating workflows across a fleet, or using Qontinui-managed AI access. |

Tier 0 is the default for fresh installs.

## When each tier is right

### Tier 0 — Local AI

Choose Tier 0 if you want the strongest privacy guarantee, are working offline, or want to experiment with local models like Llama, Mistral, Gemma, or any model hosted via Ollama or an OpenAI-compatible server. The runner never reaches out to Qontinui or to any AI provider — your local model URL is the only network endpoint it touches, and that endpoint is up to you (typically `http://127.0.0.1:11434/v1` for Ollama).

This tier is also the right starting point if you're just trying the runner out and don't want to commit to an account or hand over an API key yet.

### Tier 1 — Bring your own API key

Choose Tier 1 if you already pay for Anthropic, OpenAI, or Gemini and would rather use that quota than run a model locally. You paste an API key into the setup wizard, the runner stores it in the OS keychain, and from then on every AI call goes directly to the provider you chose. Qontinui is not involved.

This tier gives you cloud-grade model quality without creating a Qontinui account. The trade-off is that your prompts and screenshots travel to the AI provider you selected, governed by their terms of service.

### Tier 2 — Qontinui account

Choose Tier 2 if you want any of the things only Qontinui can give you:

- **Multi-machine coordination.** Run automations across several computers and have them share state, hand off tasks, or coordinate via a central broker.
- **Qontinui-managed AI access.** Use AI without managing your own keys.
- **Workflow sharing and the web builder.** Author workflows on the web and run them on any of your registered runners.

Tier 2 builds on top of either Tier 0 or Tier 1's AI configuration — signing in to Qontinui doesn't replace your AI provider, it adds a coordination layer.

## How to change tier

### At first launch

The first time you start the runner, the setup wizard asks which tier you want. You can pick any of the three, configure the minimum it needs (a model URL, an API key, or a Qontinui sign-in), test the connection, and finish setup. If you'd rather decide later, pick "I'll decide later" — that drops you into Tier 0 with no AI configured. The runner is launchable, but the AI surface will prompt you to finish configuration before you can run a workflow.

### After first launch

Go to **Settings → Account** to change tier any time. You can:

- Move from Tier 0 to Tier 1 by adding an API key.
- Move from Tier 0 or Tier 1 to Tier 2 by signing in to Qontinui.
- Move from Tier 2 back down by signing out — your AI provider config is preserved.

You can also re-run the full setup wizard from **Settings → Setup → Re-run wizard** if you want the guided flow again.

## What changes between tiers

These are the user-visible differences. Nothing else about the runner changes — your projects, processes, workflows, and local DB are the same across all three tiers.

| | Tier 0 | Tier 1 | Tier 2 |
| --- | --- | --- | --- |
| Login screen | Never shown | Never shown | Shown when you sign out or your session expires |
| Cloud relay (Qontinui WebSocket) | Off | Off | On |
| Multi-machine coordination | No | No | Yes |
| AI provider | Your local model | Your API provider | Your local model or API provider, optionally Qontinui-managed |
| First-launch wizard step | Local AI step | API key step | Sign-in step + reuses Tier 0/1 AI config |
| Account banner in toolbar | Hidden | Hidden | Shows "Authorize this runner" until paired |
| Token-refresh background task | Not running | Not running | Running every 14 minutes |

When the runner is in Tier 0 or Tier 1, none of the Qontinui-account UI is shown — there's no login screen at boot, no account banner, no token refresh, and no network calls to Qontinui. When you move to Tier 2, those surfaces come back; when you move back down, they go away.

## Privacy and data handling

### Tier 0

Nothing leaves your machine because of the runner itself. The runner doesn't phone home, doesn't telemetry, doesn't sync. The one network endpoint it talks to is your local AI URL (typically loopback). Anything your local AI does — for example, if you've pointed it at a remote model server you control — is governed by that AI's behavior, not by Qontinui.

### Tier 1

The runner sends prompts, screenshots, and tool-use traffic to whichever AI provider you selected (Anthropic, OpenAI, Gemini). What that provider does with your data is governed by their terms of service. The runner does not send anything to Qontinui.

Your API key is stored in the OS keychain (Keychain on macOS, Credential Manager on Windows, libsecret on Linux). It is not written in cleartext to disk.

### Tier 2

The runner exchanges two kinds of traffic with Qontinui:

- **Authentication.** A signed-in runner periodically refreshes its session token. The token is stored in `auth.runner_tokens` on the Qontinui backend and locally in the OS keychain.
- **Coordination metadata.** When you run workflows that span machines, Qontinui sees the workflow identifiers, runner identifiers, and the coordination messages the runners exchange.

Qontinui does not see your local files, screen contents, or AI prompts unless you explicitly share them — for example, by uploading a project to the web builder or by routing AI calls through a Qontinui-managed provider. The AI traffic you configured in Tier 0 or Tier 1 stays unchanged in Tier 2; signing in to Qontinui adds coordination, it doesn't reroute your AI.

## Frequently asked questions

### Can I use the runner offline?

Yes. Tier 0 is built for that. The runner boots and runs with no internet — the only network call it makes is to your local AI URL, which you control. If you set up the runner once with internet (to download models, for example) and then go offline, Tier 0 keeps working.

Tier 1 needs internet whenever it makes an AI call (to reach your provider's API). Between AI calls it doesn't need network.

Tier 2 prefers internet but tolerates outages — see below.

### What data leaves my machine in Tier 0?

None. The runner makes no outbound network calls in Tier 0. The only traffic is what your local AI sends, which is local-only by default (Ollama, vLLM, and similar tools listen on loopback). If you've configured your local AI to forward requests somewhere else, that's outside Qontinui's control.

### What if my Qontinui account is suspended or the network goes down?

Tier 2 downgrades gracefully. The runner keeps working with whatever credentials it has cached locally, so a transient network outage or a backend hiccup doesn't lock you out. You'll see a degraded indicator in the UI, but your current automation keeps running and you can still launch new ones. The runner reconnects automatically when the network or your account comes back.

If you want to fall back further — say your account is permanently revoked — you can switch to Tier 0 or Tier 1 from **Settings → Account** without reinstalling. Your local projects, processes, and workflows are unaffected.

### Can I upgrade later?

Yes, any time. Go to **Settings → Account** and pick a higher tier. Upgrading from Tier 0 or Tier 1 to Tier 2 opens a browser window to sign in to Qontinui; once you confirm, the runner is paired and starts coordinating. Your existing local configuration — projects, AI provider, workflows — is preserved.

### Can I downgrade later?

Yes. Sign out from **Settings → Account** to drop from Tier 2 to Tier 0 or Tier 1. Your locally configured AI provider stays in place, your local projects stay in place, and your locally stored data is keyed by a stable local identifier that doesn't change across tier transitions.

### Does sign-out delete my local work?

No. Your local DB stays keyed by a local user ID that is independent of your Qontinui account. Signing out clears your Qontinui session token and stops the cloud relay; it does not touch your projects, processes, workflows, or any other local state. You can sign back in later and find everything intact.

### Will the runner ever phone home in Tier 0 or Tier 1?

No. The runner doesn't have analytics, telemetry, or auto-update calls to Qontinui in Tier 0 or Tier 1. If a future release adds anything of that shape, it will be opt-in and called out in the release notes.

### What identifier is used in Tier 0 and Tier 1?

A locally generated UUID, stored in your settings file. It's stable for the life of your install — it survives upgrades and is the same identifier the local DB uses to key your data. When you move to Tier 2, this local ID is preserved alongside your Qontinui account ID, so moving up or down between tiers never breaks the link to your existing work.

### Do I need a Qontinui account to try the runner?

No. Tier 0 is the default for fresh installs and needs no account, no API key, and no internet. The setup wizard walks you through configuring a local model and you're working in a couple of minutes.

### Can I run the same workflow under different tiers?

Yes. Workflows don't depend on the tier you're in — they depend on which AI provider you've configured. A workflow built in Tier 0 with a local model will run unchanged in Tier 2 if you keep that local model selected; if you switch to a Qontinui-managed AI in Tier 2, the same workflow uses that instead.

### What happens to my API key when I sign in to Qontinui?

Nothing. It stays in your OS keychain and continues to be used for AI calls. Tier 2 adds coordination on top of your existing AI setup; it doesn't take over AI traffic unless you specifically configure a Qontinui-managed AI provider.
