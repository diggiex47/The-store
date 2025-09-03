package auth

import (
	"chat-server/internals/db"
	"encoding/json"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type RegisterRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {

	//Decoding the Request Body
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid body ", http.StatusBadRequest)
		return
	}

	//Validate the Input
	req.Username = strings.TrimSpace(req.Username)
	req.Email = strings.TrimSpace(req.Email)

	if req.Username == "" || req.Email == "" || req.Password == "" {
		http.Error(w, "Username , Password or Email are required ", http.StatusBadRequest)
		return
	}

	//Check the User already exist
	var existingUser db.User
	// The error is accessed via the .Error field at the end.
	result := db.DB.Where("name = ? OR email = ?", req.Username, req.Email).First(&existingUser)

	// This condition correctly triggers if a user IS found (result.Error is nil)
	// OR if a real database error occurred.
	if result.Error != gorm.ErrRecordNotFound {
		http.Error(w, "Username or email already exists", http.StatusConflict)
		return
	}

	//Hash Password
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {

		http.Error(w, "Failed to Hash the Password", http.StatusInternalServerError)
		return
	}

	//Create the User
	newUser := db.User{
		Name:         &req.Username,
		Email:        &req.Email,
		PasswordHash: &[]string{string(passwordHash)}[0],
	}

	//add the user creation
	creationResult := db.DB.Create(&newUser)
	if creationResult.Error != nil {
		http.Error(w, "Failed to create the user", http.StatusInternalServerError)
		return
	}

	//success response
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "User Created successfully."})

}
