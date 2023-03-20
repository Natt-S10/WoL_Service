package main

import (
	"fmt"
	"log"
	"net"
)

func main() {
	udpServer, err := net.ListenPacket("udp", ":1053")
	if err != nil {
		log.Fatal(err)
	}
	defer udpServer.Close()

	for {
		buf := make([]byte, 1024)
		_, addr, err := udpServer.ReadFrom(buf)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Received| %s |from %s\n", buf, addr)
		// echo back
		udpServer.WriteTo(buf, addr)
	}
}
