# WoL_Service

WoL Service for raspberry pi

run image

`─ docker run --name wol_service -d --restart unless-stopped -e PORT=10000 -e TARGET_MAC_ADDRESS="11:22:33:44:55:66, AA:BB:AA:BB:FF:FF" -p 10000:10000/udp natthaphons/wol`
