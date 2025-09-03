package main

import (
	"bufio"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/url"
	"os"
)

func main() {

	serverURL := url.URL{Scheme: "ws", Host: "localhost:8000", Path: "/"}
	log.Printf("Connecting to %s", serverURL.String())

	conn, _, err := websocket.DefaultDialer.Dial(serverURL.String(), nil)
	if err != nil {
		log.Fatal("dial error:", err)
	}
	// Use defer to guarantee the connection is closed when we're done.
	defer conn.Close()

	// 3. Start a goroutine (a background task) to listen for messages from the server.
	go func() {
		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("read error:", err)
				return // Exit the goroutine if there's an error
			}
			// Print any message received from the server.
			fmt.Printf("Received: %s\n", message)
		}
	}()

	// 4. Use the main task to read input from your keyboard.
	fmt.Println("Connected! Type a message and press Enter to send.")
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		text := scanner.Text()
		// Send the typed text to the server as a WebSocket message.
		err := conn.WriteMessage(websocket.TextMessage, []byte(text))
		if err != nil {
			log.Println("write error:", err)
			return // Exit the program if sending fails
		}
	}
}
