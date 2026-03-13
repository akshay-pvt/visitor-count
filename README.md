# Counter API

Simple and free visitor counter API.

Users can track website visits with a simple request.

## Demo

```
https://your-domain.vercel.app/api/visit?site=mywebsite
```

Response:

```
{
  "site": "mywebsite",
  "total": 120,
  "today": 12
}
```

---

## Usage

Add this script to your website.

```javascript
fetch("https://your-domain.vercel.app/api/visit?site=mywebsite")
.then(res=>res.json())
.then(data=>{
console.log("Total visits:",data.total)
})
```

---

## Endpoints

### Track visit

```
GET /api/visit?site=YOUR_SITE_NAME
```

### Example

```
/api/visit?site=eypz.in
/api/visit?site=myblog.com
/api/visit?site=portfolio.dev
```

---

## Deploy Your Own

1. Fork repository
2. Deploy with Vercel
3. Done

---

## License

MIT
