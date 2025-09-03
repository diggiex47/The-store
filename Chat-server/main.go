package main

import (
	"log"
	"net/http"

	//my packages
	"chat-server/internals/auth"
	"chat-server/internals/db"
	"chat-server/internals/websockets"

	// go libraries
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {

	//Load Env
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error Loading Env file.")
	}

	db.ConnectToDB()

	//2. Create a websockets instance and run it
	hub := websockets.NewHub()
	go hub.Run()

	//3. Set Up the Router
	r := mux.NewRouter()

	//Public routes
	r.HandleFunc("/auth/register", auth.RegisterHandler).Methods("POST")
	r.HandleFunc("/auth/login", auth.LoginHandler).Methods("POST")

	//Protected Routes
	api := r.PathPrefix("/api").Subrouter()
	api.Use(auth.MuxAdapter(auth.AuthMiddleware()))

	//protecting the websockets routes
	//now the api will check it throught AuthMiddleware
	api.HandleFunc("/me", auth.MeHandler).Methods("GET")
	api.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		websockets.ServeWs(hub, w, r)
	})

	// CORS Configuration
	allowedOrigins := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	allowedCredentials := handlers.AllowCredentials()

	corsHandler := handlers.CORS(allowedOrigins, allowedMethods, allowedHeaders, allowedCredentials)

	port := ":8000"
	log.Printf("Server is running on http://localhost%s\n", port)
	if err := http.ListenAndServe(port, corsHandler(r)); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
