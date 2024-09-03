# Coinpaprika API (1.7.8)

Coinpaprika API delivers precise & frequently updated market data from the world of crypto: coin prices, volumes, market caps, ATHs, return rates, and more.

## Introduction

If you want to use the Coinpaprika API, you have two main options: you can choose the API Free plan, which has sufficient limits for hobby and non-commercial use, or get one of the paid plans, ideal for commercial or professional use. To decide which plan is the best for you, check the [Plans and Pricing comparison](https://coinpaprika.com/pricing).

Depending on the selected plan, you should send requests to the appropriate base URL:

| Plan       | Base URL                             |
|------------|--------------------------------------|
| Free       | `https://api.coinpaprika.com/v1/`    |
| Starter    | `https://api-pro.coinpaprika.com/v1/`|
| Pro        | `https://api-pro.coinpaprika.com/v1/`|
| Business   | `https://api-pro.coinpaprika.com/v1/`|
| Enterprise | `https://api-pro.coinpaprika.com/v1/`|

## Authentication

If you use the Free plan, you don't need to set up an API key for each request. For other plans, it is required. You can generate the API key in the Developer Portal after signing in.

To provide the API key in REST API calls, set the `Authorization` header:

```bash
Authorization: <api-key>

## Standards and Conventions

General

	•	All endpoints return either a JSON object or array.
	•	All timestamp-related fields are in seconds.

## Errors

API errors are formatted as JSON:
{"error": "<error message>"}
The API uses standard HTTP status codes to indicate a request failure:

	•	HTTP 4XX return codes are used for invalid requests - the issue is on the sender’s side.
	•	HTTP 5XX return codes are used for internal errors - the issue is on the server’s side.

## Version History

	•	1.7.8 - 2024.01.24: Plan limits update
	•	1.7.7 - 2023.06.07: Added official Python client link
	•	v1.7.6 - 2023.04.12: New intervals for OHLCV endpoint
	•	v1.7.5 - 2022.12.07: Removed documentation for /beta/ endpoints
	•	v1.7.4 - 2022.09.19: Key info endpoint, Coin logo image URL
	•	v1.7.3 - 2022.09.08: Plans update
	•	v1.7.2 - 2022.07.22: Changelog endpoint documentation
	•	v1.7.1 - 2022.07.14: Beta endpoints documentation
	•	v1.7.0 - 2022.05.06: API-Pro documentation
	•	v1.6.1 - 2020.12.09: Added information about first date with price data for currency ticker /tickers and /tickers/{coin_id}
	•	v1.6.0 - 2020.10.27: Added contracts section /contracts, /contracts/{platform_id}, /contracts/{platform_id}/{contract_address}

Request Sample:

curl --request GET \
--url https://api-pro.coinpaprika.com/v1/key/info \

Response Sample:

{
  "plan": "pro",
  "plan_started_at": "2022-09-16T10:17:24Z",
  "plan_status": "active",
  "portal_url": "https://coinpaprika.com/api/panel",
  "usage": {
    "message": "limited plan",
    "current_month": {}
  }
}

curl --request GET \
--url 'https://api.coinpaprika.com/v1/global'

{
  "market_cap_usd": 430252937008,
  "volume_24h_usd": 430252937008,
  "bitcoin_dominance_percentage": 36.67,
  "cryptocurrencies_number": 1587,
  "market_cap_ath_value": 835692000000,
  "market_cap_ath_date": "2018-01-07T11:17:00Z",
  "volume_24h_ath_value": 71990500000,
  "volume_24h_ath_date": "2018-01-04T17:17:00Z",
  "market_cap_change_24h": 1.98,
  "volume_24h_change_24h": 1.98,
  "last_updated": 1525089441
}
--header 'Authorization: <api-key>'
