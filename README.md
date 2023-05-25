# WoL_Service

> Send a Magic Packet to the target devices upon a udp request. Enable to wake the target from the internet. The service does not response to the request (only broadcast magic packet).

---

### Installation

```
npm i
```

---

### Configuration

> Configure with environment variables. (script: `dev` environment variables is loaded from .env file)

* `PORT` : a UDP port listening to wol-request.
  example: `12345`
* `TARGET_MAC_ADDRESS` : A list of MAC addresses seperated by comma `, `
  example: `"11:22:33:44:55:66, AA:BB:CC:DD:EE:FF"`

---

### API

> The application accept a UDP packet containing a string of **Capitalized MAC Address** of the target device at the configured port.

message : `11:22:33:AA:BB:CC`

---

### Docker Image

[Link To Docker Hub](https://hub.docker.com/r/natthaphons/wol/tags)

---

### Deployment Configuration Example

```
docker run --name wol_service -d --restart unless-stopped --network host -e PORT=12345 -e TARGET_MAC_ADDRESS="11:22:33:44:55:66, AA:BB:CC:DD:EE:FF" natthaphons/wol
```
