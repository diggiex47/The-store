package db

import (
	"time"
)

type Product struct {
	ID          string `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Description string
	ImageURL    string
	Name        string
	Price       float64 // FIX: Price should be a numeric type for calculations.
	CreatedAt   time.Time
	UpdatedAt   time.Time
	CartItems   []CartItem `gorm:"foreignKey:ProductID"` // FIX: Field name is now plural for clarity.
}

type Cart struct {
	ID        string  `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	UserID    *string `gorm:"type:uuid;unique"`
	CreatedAt time.Time
	UpdatedAt time.Time
	User      *User      `gorm:"foreignKey:UserID"`
	Items     []CartItem `gorm:"foreignKey:CartID"`
}

type CartItem struct {
	ID        string `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	ProductID string `gorm:"type:uuid"` // FIX: Field name should be CamelCase (ProductID).
	Quantity  int
	CartID    string `gorm:"type:uuid"`
	// FIX: The foreignKey tag must point to the key field in THIS struct (CartID).
	Cart Cart `gorm:"foreignKey:CartID"`
	// FIX: The foreignKey tag must point to the key field in THIS struct (ProductID).
	Product Product `gorm:"foreignKey:ProductID"`
}

type Account struct {
	ID                string `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	UserID            string `gorm:"type:uuid"`
	Type              string
	Provider          string `gorm:"uniqueIndex:idx_provider_account"`
	ProviderAccountId string `gorm:"uniqueIndex:idx_provider_account"`
	RefreshToken      *string
	AccessToken       *string
	ExpiresAt         *int
	TokenType         *string
	Scope             *string
	IDToken           *string `gorm:"column:id_token"` // FIX: Renamed field to match Go conventions. Added column tag.
	SessionState      *string
	User              User `gorm:"foreignKey:UserID"`
}

type Session struct {
	ID           uint      `gorm:"primaryKey"` // FIX: Correct GORM tag for primary key is "primaryKey".
	SessionToken string    `gorm:"unique"`
	UserID       string    `gorm:"type:uuid"` // FIX: This is a foreign key, not a unique field itself.
	Expires      time.Time // FIX: Renamed from ExpiresAt for consistency with Prisma schema.
	User         User      `gorm:"foreignKey:UserID"`
}

type User struct {
	ID            string  `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name          *string `gorm:"unique"`
	PasswordHash  *string
	Email         *string `gorm:"unique"`
	EmailVerified *time.Time
	Image         *string
	Cart          *Cart       `gorm:"foreignKey:UserID"`
	Accounts      []Account   `gorm:"foreignKey:UserID"`
	Sessions      []Session   `gorm:"foreignKey:UserID"`
	VerifyOTPs    []VerifyOTP `gorm:"foreignKey:UserID"`
}

type VerifyOTP struct {
	ID      string `gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	OTP     string
	Expires time.Time
	UserID  string `gorm:"type:uuid"`
	User    User   `gorm:"foreignKey:UserID"`
}
