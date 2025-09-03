package auth

import (
	"chat-server/internals/db"
	"encoding/json"
	"net/http"
)

func MeHandler(w http.ResponseWriter, r *http.Request) {

	//1.Get the user from context
	claims, ok := r.Context().Value(UserContextKey).(*Claims)
	if !ok {
		http.Error(w, "Could not retrive the data from the Context ", http.StatusInternalServerError)
		return
	}

	//2.Check the user you go from the key is in database or not
	user, err := db.FindUserByID(claims.Sub)
	if err != nil {
		http.Error(w, "Database Error", http.StatusInternalServerError)
	}
	if user == nil {

		http.Error(w, "Can't Find the USer", http.StatusNotFound)
	}

	//3.Response it with user information
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"id":    user.ID,
		"name":  user.Name,
		"email": user.Email,
	})
}
