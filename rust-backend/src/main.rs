use axum::{
    extract::{State, Path},
    http::{StatusCode, HeaderMap},
    response::Json,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use std::collections::HashMap;
use tower_http::cors::CorsLayer;
// Payment verification imports
use hmac::{Hmac, Mac};
use sha2::Sha256;

#[derive(Clone)]
pub struct AppState {
    // In-memory storage for user wallets (in production, use a database)
    user_wallets: Arc<std::sync::Mutex<std::collections::HashMap<String, UserWallet>>>,
    // In-memory storage for user event registrations
    user_registrations: Arc<std::sync::Mutex<std::collections::HashMap<String, Vec<EventRegistrationInternal>>>>,
}

#[derive(Clone)]
struct UserWallet {
    balance: f64,
    transactions: Vec<WalletTransactionInternal>,
}

#[derive(Clone)]
struct WalletTransactionInternal {
    id: String,
    transaction_type: String,
    amount: f64,
    description: String,
    date: String,
    status: String,
}

#[derive(Clone)]
struct EventRegistrationInternal {
    event_id: String,
    event_name: String,
    registration_date: String,
    status: String,
    payment_amount: Option<f64>,
}

#[derive(Serialize, Deserialize)]
struct HealthResponse {
    status: String,
    service: String,
    version: String,
}

#[derive(Serialize, Deserialize)]
struct SignUpRequest {
    email: String,
    password: String,
    name: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct SignInRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
struct AuthResponse {
    user: UserResponse,
    token: String,
}

#[derive(Serialize)]
struct UserResponse {
    id: String,
    email: String,
    name: Option<String>,
}

#[derive(Serialize)]
struct Event {
    id: String,
    name: String,
    title: Option<String>,
    date: String,
    location: Option<String>,
    description: Option<String>,
    price: i32,
    category: Option<String>,
}

#[derive(Deserialize)]
struct ContactRequest {
    name: String,
    email: String,
    college: String,
    message: String,
}

#[derive(Serialize)]
struct ContactResponse {
    message: String,
}

#[derive(Serialize)]
struct ProfileResponse {
    user: UserProfile,
}

#[derive(Serialize)]
struct UserProfile {
    id: String,
    email: String,
    name: Option<String>,
}

#[derive(Serialize)]
struct WalletResponse {
    balance: f64,
    transactions: Vec<WalletTransaction>,
}

#[derive(Serialize)]
struct WalletTransaction {
    id: String,
    #[serde(rename = "type")]
    transaction_type: String,
    amount: f64,
    description: String,
    date: String,
    status: String,
}

#[derive(Serialize)]
struct EventRegistration {
    #[serde(rename = "eventId")]
    event_id: String,
    #[serde(rename = "eventName")]
    event_name: String,
    #[serde(rename = "registrationDate")]
    registration_date: String,
    status: String,
    #[serde(rename = "paymentAmount")]
    payment_amount: Option<f64>,
}

#[derive(Serialize)]
struct EventWithRegistrations {
    id: String,
    name: String,
    title: Option<String>,
    date: String,
    location: Option<String>,
    description: Option<String>,
    price: i32,
    category: Option<String>,
    #[serde(rename = "registeredAttendees")]
    registered_attendees: i32,
}

#[derive(Deserialize)]
struct RegisterRequest {
    // Empty for now, can add fields like team_name, etc.
}

#[derive(Serialize)]
struct RegisterResponse {
    message: String,
    #[serde(rename = "registrationId")]
    registration_id: String,
}

#[derive(Deserialize)]
struct AddFundsRequest {
    amount: f64,
}

#[derive(Serialize)]
struct AddFundsResponse {
    message: String,
    #[serde(rename = "newBalance")]
    new_balance: f64,
}

#[derive(Deserialize)]
struct CheckoutItem {
    id: String,
    name: String,
    price: f64,
    quantity: i32,
}

#[derive(Deserialize)]
struct CheckoutRequest {
    items: Vec<CheckoutItem>,
    total: f64,
}

#[derive(Serialize)]
struct CheckoutResponse {
    message: String,
    #[serde(rename = "newBalance")]
    new_balance: f64,
    #[serde(rename = "orderId")]
    order_id: String,
}

#[derive(Deserialize)]
struct CreateOrderRequest {
    amount: f64,
    currency: Option<String>,
}

#[derive(Serialize)]
struct CreateOrderResponse {
    id: String,
    amount: i64,
    currency: String,
    #[serde(rename = "razorpay_order_id")]
    razorpay_order_id: String,
}

#[derive(Deserialize)]
struct PaymentVerificationRequest {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    amount: f64,
}

#[derive(Serialize)]
struct PaymentVerificationResponse {
    success: bool,
    message: String,
    #[serde(rename = "newBalance")]
    new_balance: Option<f64>,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables
    dotenv::dotenv().ok();
    
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Create application state
    let state = Arc::new(AppState {
        user_wallets: Arc::new(std::sync::Mutex::new(HashMap::new())),
        user_registrations: Arc::new(std::sync::Mutex::new(HashMap::new())),
    });

    // Build our application with routes
    let app = Router::new()
        // Health check
        .route("/health", get(health_check))
        
        // Auth routes
        .route("/api/auth/signup", post(signup))
        .route("/api/auth/signin", post(signin))
        
        // Event routes
        .route("/api/events", get(list_events))
        
        // Contact route
        .route("/api/contact", post(submit_contact_form))
        
        // User profile routes
        .route("/api/user/profile", get(get_user_profile))
        .route("/api/user/wallet", get(get_user_wallet))
        .route("/api/user/wallet/add-funds", post(add_funds_to_wallet))
        .route("/api/user/wallet/checkout", post(checkout_with_wallet))
        .route("/api/user/registrations", get(get_user_registrations))
        
        // Event leaderboard and registration routes
        .route("/api/events/leaderboard", get(get_events_leaderboard))
        .route("/api/events/:id/register", post(register_for_event))
        
        // Payment gateway routes
        .route("/api/payment/create-order", post(create_payment_order))
        .route("/api/payment/verify", post(verify_payment))
        
        .layer(CorsLayer::permissive())
        .with_state(state);

    // Run the server
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8081").await?;
    println!("🚀 Rust backend server running on http://0.0.0.0:8081");
    
    axum::serve(listener, app).await?;

    Ok(())
}

async fn health_check() -> Result<Json<HealthResponse>, StatusCode> {
    Ok(Json(HealthResponse {
        status: "ok".to_string(),
        service: "nextn-backend".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
    }))
}

async fn signup(
    State(_state): State<Arc<AppState>>,
    Json(request): Json<SignUpRequest>,
) -> Result<(StatusCode, Json<AuthResponse>), StatusCode> {
    // For demo purposes, create a mock user
    let user_id = uuid::Uuid::new_v4().to_string();
    let user = UserResponse {
        id: user_id.clone(),
        email: request.email.clone(),
        name: request.name.clone(),
    };
    
    // Create a mock JWT token (header.payload.signature format)
    use base64::{Engine as _, engine::general_purpose};
    let header = general_purpose::STANDARD.encode(r#"{"alg":"HS256","typ":"JWT"}"#);
    let payload = general_purpose::STANDARD.encode(&format!(r#"{{"sub":"{}","email":"{}","name":"{}","iat":{}}}"#, 
        user_id, request.email, request.name.unwrap_or_default(), 
        std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_secs()));
    let signature = general_purpose::STANDARD.encode("mock-signature");
    let token = format!("{}.{}.{}", header, payload, signature);
    
    Ok((StatusCode::CREATED, Json(AuthResponse { user, token })))
}

async fn signin(
    State(_state): State<Arc<AppState>>,
    Json(request): Json<SignInRequest>,
) -> Result<Json<AuthResponse>, StatusCode> {
    // For demo purposes, create a mock user
    let user_id = uuid::Uuid::new_v4().to_string();
    let user = UserResponse {
        id: user_id.clone(),
        email: request.email.clone(),
        name: Some("Demo User".to_string()),
    };
    
    // Create a mock JWT token (header.payload.signature format)
    use base64::{Engine as _, engine::general_purpose};
    let header = general_purpose::STANDARD.encode(r#"{"alg":"HS256","typ":"JWT"}"#);
    let payload = general_purpose::STANDARD.encode(&format!(r#"{{"sub":"{}","email":"{}","name":"Demo User","iat":{}}}"#, 
        user_id, request.email,
        std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_secs()));
    let signature = general_purpose::STANDARD.encode("mock-signature");
    let token = format!("{}.{}.{}", header, payload, signature);
    
    Ok(Json(AuthResponse { user, token }))
}

async fn list_events(
    State(_state): State<Arc<AppState>>,
) -> Result<Json<Vec<Event>>, StatusCode> {
    // Return events that match frontend placeholder data
    let events = vec![
        Event {
            id: "beat-the-market".to_string(),
            name: "Beat the Market".to_string(),
            title: Some("Beat the Market".to_string()),
            date: "2026-04-28T10:00".to_string(),
            location: Some("Trading Arena".to_string()),
            description: Some("A high-stakes stock trading simulation challenge. Show off your market knowledge and risk management skills to build the winning portfolio.".to_string()),
            price: 150,
            category: Some("entrepreneurial".to_string()),
        },
        Event {
            id: "trade-quest".to_string(),
            name: "Trade Quest".to_string(),
            title: Some("Trade Quest".to_string()),
            date: "2026-04-29T14:00".to_string(),
            location: Some("Trading Arena".to_string()),
            description: Some("An algorithmic trading competition where your bot battles others in a fast-paced virtual market.".to_string()),
            price: 150,
            category: Some("entrepreneurial".to_string()),
        },
        Event {
            id: "3".to_string(),
            name: "Innovate & Create Tech Summit".to_string(),
            title: Some("Innovate & Create Tech Summit".to_string()),
            date: "September 5, 2024".to_string(),
            location: Some("Silicon Valley, CA".to_string()),
            description: Some("A summit for the brightest minds in technology and design to share ideas that shape the future.".to_string()),
            price: 200,
            category: Some("entrepreneurial".to_string()),
        },
        Event {
            id: "4".to_string(),
            name: "Gourmet Bites Food & Wine Festival".to_string(),
            title: Some("Gourmet Bites Food & Wine Festival".to_string()),
            date: "November 1-3, 2024".to_string(),
            location: Some("Napa Valley, CA".to_string()),
            description: Some("Experience world-class cuisine and wines in the beautiful Napa Valley.".to_string()),
            price: 100,
            category: Some("miscellaneous".to_string()),
        },
        Event {
            id: "5".to_string(),
            name: "Synthwave Summer Fest".to_string(),
            title: Some("Synthwave Summer Fest".to_string()),
            date: "August 15-17, 2024".to_string(),
            location: Some("Miami Beach, FL".to_string()),
            description: Some("The biggest electronic music festival of the year, featuring artists from around the globe.".to_string()),
            price: 250,
            category: Some("technical".to_string()),
        },
    ];
    
    Ok(Json(events))
}

async fn submit_contact_form(
    State(_state): State<Arc<AppState>>,
    Json(request): Json<ContactRequest>,
) -> Result<Json<ContactResponse>, StatusCode> {
    println!("📧 Contact form submission received:");
    println!("   Name: {}", request.name);
    println!("   Email: {}", request.email);
    println!("   College: {}", request.college);
    println!("   Message: {}", request.message);
    
    // TODO: Implement email sending with lettre
    // For now, just log the submission and return success
    
    Ok(Json(ContactResponse {
        message: "Thank you for your message! We've received it and will get back to you soon.".to_string(),
    }))
}

async fn get_user_profile(
    State(_state): State<Arc<AppState>>,
    headers: HeaderMap,
) -> Result<Json<ProfileResponse>, StatusCode> {
    // Extract and validate JWT token from Authorization header
    let auth_header = headers.get("authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));
    
    let token = match auth_header {
        Some(t) => t,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    
    // For demo purposes, decode the mock JWT to get user info
    if let Ok(user_info) = decode_mock_jwt(token) {
        Ok(Json(ProfileResponse {
            user: UserProfile {
                id: user_info.sub,
                email: user_info.email,
                name: user_info.name,
            },
        }))
    } else {
        Err(StatusCode::UNAUTHORIZED)
    }
}

async fn get_user_wallet(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
) -> Result<Json<WalletResponse>, StatusCode> {
    // Extract and validate JWT token
    let auth_header = headers.get("authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));
    
    let token = match auth_header {
        Some(t) => t,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    
    // Get user ID from token (in a real app, decode JWT properly)
    let user_id = get_user_id_from_token(token);
    
    // Get or create user wallet
    let mut wallets = state.user_wallets.lock().unwrap();
    let wallet = wallets.entry(user_id.clone()).or_insert_with(|| UserWallet {
        balance: 1500.0, // Default starting balance
        transactions: vec![
            WalletTransactionInternal {
                id: "txn_initial".to_string(),
                transaction_type: "credit".to_string(),
                amount: 1500.0,
                description: "Welcome bonus".to_string(),
                date: "2024-01-15".to_string(),
                status: "completed".to_string(),
            },
        ],
    });
    
    Ok(Json(WalletResponse {
        balance: wallet.balance,
        transactions: wallet.transactions.iter().map(|t| WalletTransaction {
            id: t.id.clone(),
            transaction_type: t.transaction_type.clone(),
            amount: t.amount,
            description: t.description.clone(),
            date: t.date.clone(),
            status: t.status.clone(),
        }).collect(),
    }))
}

async fn get_user_registrations(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
) -> Result<Json<Vec<EventRegistration>>, StatusCode> {
    // Extract and validate JWT token
    let auth_header = headers.get("authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));
    
    let token = match auth_header {
        Some(t) => t,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    
    // Get user ID from token
    let user_id = get_user_id_from_token(token);
    
    // Get user registrations
    let registrations = state.user_registrations.lock().unwrap();
    let user_regs = registrations.get(&user_id).cloned().unwrap_or_default();
    
    // Convert internal registrations to API response format
    let response_regs: Vec<EventRegistration> = user_regs.iter().map(|reg| EventRegistration {
        event_id: reg.event_id.clone(),
        event_name: reg.event_name.clone(),
        registration_date: reg.registration_date.clone(),
        status: reg.status.clone(),
        payment_amount: reg.payment_amount,
    }).collect();
    
    Ok(Json(response_regs))
}

// Helper function to decode mock JWT
#[derive(Debug)]
struct JwtClaims {
    sub: String,
    email: String,
    name: Option<String>,
}

fn decode_mock_jwt(token: &str) -> Result<JwtClaims, Box<dyn std::error::Error>> {
    use base64::{Engine as _, engine::general_purpose};
    
    let parts: Vec<&str> = token.split('.').collect();
    if parts.len() != 3 {
        return Err("Invalid JWT format".into());
    }
    
    // Decode the payload (second part)
    let payload = general_purpose::STANDARD.decode(parts[1])?;
    let payload_str = String::from_utf8(payload)?;
    
    // Parse JSON manually for simplicity
    // In a real app, you'd use serde_json and proper JWT validation
    if let Ok(json) = serde_json::from_str::<serde_json::Value>(&payload_str) {
        Ok(JwtClaims {
            sub: json["sub"].as_str().unwrap_or_default().to_string(),
            email: json["email"].as_str().unwrap_or_default().to_string(),
            name: json["name"].as_str().map(|s| s.to_string()),
        })
    } else {
        Err("Invalid JWT payload".into())
    }
}

// Helper function to extract user ID from token (simplified for demo)
fn get_user_id_from_token(token: &str) -> String {
    // In a real app, you'd properly decode and validate the JWT
    // For now, just use the first 10 characters of the token as user ID
    format!("user_{}", &token[..std::cmp::min(10, token.len())])
}

async fn get_events_leaderboard(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<EventWithRegistrations>>, StatusCode> {
    // Calculate actual registration counts from stored registrations
    let registrations = state.user_registrations.lock().unwrap();
    
    // Count registrations per event
    let mut event_counts: HashMap<String, i32> = HashMap::new();
    for user_regs in registrations.values() {
        for reg in user_regs {
            *event_counts.entry(reg.event_id.clone()).or_insert(0) += 1;
        }
    }
    
    // Base events with calculated registration counts
    let events = vec![
        EventWithRegistrations {
            id: "beat-the-market".to_string(),
            name: "Beat the Market".to_string(),
            title: Some("Beat the Market".to_string()),
            date: "2026-04-28T10:00".to_string(),
            location: Some("Trading Arena".to_string()),
            description: Some("A high-stakes stock trading simulation challenge. Show off your market knowledge and risk management skills to build the winning portfolio.".to_string()),
            price: 150,
            category: Some("entrepreneurial".to_string()),
            registered_attendees: *event_counts.get("beat-the-market").unwrap_or(&0),
        },
        EventWithRegistrations {
            id: "5".to_string(),
            name: "Synthwave Summer Fest".to_string(),
            title: Some("Synthwave Summer Fest".to_string()),
            date: "August 15-17, 2024".to_string(),
            location: Some("Miami Beach, FL".to_string()),
            description: Some("The biggest electronic music festival of the year, featuring artists from around the globe.".to_string()),
            price: 250,
            category: Some("technical".to_string()),
            registered_attendees: *event_counts.get("5").unwrap_or(&0),
        },
        EventWithRegistrations {
            id: "trade-quest".to_string(),
            name: "Trade Quest".to_string(),
            title: Some("Trade Quest".to_string()),
            date: "2026-04-29T14:00".to_string(),
            location: Some("Trading Arena".to_string()),
            description: Some("An algorithmic trading competition where your bot battles others in a fast-paced virtual market.".to_string()),
            price: 150,
            category: Some("entrepreneurial".to_string()),
            registered_attendees: *event_counts.get("trade-quest").unwrap_or(&0),
        },
        EventWithRegistrations {
            id: "3".to_string(),
            name: "Innovate & Create Tech Summit".to_string(),
            title: Some("Innovate & Create Tech Summit".to_string()),
            date: "September 5, 2024".to_string(),
            location: Some("Silicon Valley, CA".to_string()),
            description: Some("A summit for the brightest minds in technology and design to share ideas that shape the future.".to_string()),
            price: 200,
            category: Some("entrepreneurial".to_string()),
            registered_attendees: *event_counts.get("3").unwrap_or(&0),
        },
        EventWithRegistrations {
            id: "4".to_string(),
            name: "Gourmet Bites Food & Wine Festival".to_string(),
            title: Some("Gourmet Bites Food & Wine Festival".to_string()),
            date: "November 1-3, 2024".to_string(),
            location: Some("Napa Valley, CA".to_string()),
            description: Some("Experience world-class cuisine and wines in the beautiful Napa Valley.".to_string()),
            price: 100,
            category: Some("miscellaneous".to_string()),
            registered_attendees: *event_counts.get("4").unwrap_or(&0),
        },
    ];
    
    // Sort by registration count (descending) for leaderboard
    let mut sorted_events = events;
    sorted_events.sort_by(|a, b| b.registered_attendees.cmp(&a.registered_attendees));
    
    Ok(Json(sorted_events))
}

async fn register_for_event(
    State(state): State<Arc<AppState>>,
    Path(event_id): Path<String>,
    headers: HeaderMap,
    Json(_request): Json<RegisterRequest>,
) -> Result<Json<RegisterResponse>, StatusCode> {
    // Extract and validate JWT token
    let auth_header = headers.get("authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));
    
    let token = match auth_header {
        Some(t) => t,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    
    // Get user ID from token
    let user_id = get_user_id_from_token(token);
    
    println!("📝 Event registration received:");
    println!("   Event ID: {}", event_id);
    println!("   User ID: {}", user_id);
    
    // Get event details (name and price)
    let (event_name, event_price) = match event_id.as_str() {
        "beat-the-market" => ("Beat the Market", 150.0),
        "trade-quest" => ("Trade Quest", 150.0), 
        "3" => ("Innovate & Create Tech Summit", 200.0),
        "4" => ("Gourmet Bites Food & Wine Festival", 100.0),
        "5" => ("Synthwave Summer Fest", 250.0),
        _ => ("Unknown Event", 150.0),
    };
    
    // Check if user is already registered for this event
    let mut registrations = state.user_registrations.lock().unwrap();
    let user_regs = registrations.entry(user_id.clone()).or_insert_with(Vec::new);
    
    if user_regs.iter().any(|reg| reg.event_id == event_id) {
        return Ok(Json(RegisterResponse {
            message: "You are already registered for this event!".to_string(),
            registration_id: "".to_string(),
        }));
    }
    
    // Check wallet balance and deduct event cost
    let mut wallets = state.user_wallets.lock().unwrap();
    let wallet = wallets.entry(user_id.clone()).or_insert_with(|| UserWallet {
        balance: 1500.0,
        transactions: vec![
            WalletTransactionInternal {
                id: "txn_initial".to_string(),
                transaction_type: "credit".to_string(),
                amount: 1500.0,
                description: "Welcome bonus".to_string(),
                date: "2024-01-15".to_string(),
                status: "completed".to_string(),
            },
        ],
    });
    
    // Check if user has sufficient balance
    if wallet.balance < event_price {
        return Ok(Json(RegisterResponse {
            message: format!("Insufficient balance! Event costs ₹{}, but you only have ₹{}. Please add funds to your wallet.", event_price, wallet.balance),
            registration_id: "".to_string(),
        }));
    }
    
    // Deduct event cost from wallet
    wallet.balance -= event_price;
    
    // Create payment transaction
    wallet.transactions.push(WalletTransactionInternal {
        id: uuid::Uuid::new_v4().to_string(),
        transaction_type: "debit".to_string(),
        amount: event_price,
        description: format!("Event registration: {}", event_name),
        date: "2024-12-17".to_string(),
        status: "completed".to_string(),
    });
    
    println!("💳 Deducted ₹{} from wallet. New balance: ₹{}", event_price, wallet.balance);
    
    // Create new registration
    let registration = EventRegistrationInternal {
        event_id: event_id.clone(),
        event_name: event_name.to_string(),
        registration_date: "2024-12-17".to_string(),
        status: "registered".to_string(),
        payment_amount: Some(event_price),
    };
    
    user_regs.push(registration);
    
    // Generate a registration ID
    let registration_id = uuid::Uuid::new_v4().to_string();
    
    println!("✅ User {} registered for event {} (₹{})", user_id, event_name, event_price);
    
    Ok(Json(RegisterResponse {
        message: format!("Successfully registered for {}! ₹{} deducted from your wallet.", event_name, event_price),
        registration_id,
    }))
}

async fn add_funds_to_wallet(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(request): Json<AddFundsRequest>,
) -> Result<Json<AddFundsResponse>, StatusCode> {
    // Extract and validate JWT token
    let auth_header = headers.get("authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));
    
    let token = match auth_header {
        Some(t) => t,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    
    if request.amount <= 0.0 {
        return Err(StatusCode::BAD_REQUEST);
    }
    
    println!("💰 Add funds request:");
    println!("   Amount: ₹{}", request.amount);
    
    // Get user ID from token
    let user_id = get_user_id_from_token(token);
    
    // Update user wallet
    let mut wallets = state.user_wallets.lock().unwrap();
    let wallet = wallets.entry(user_id.clone()).or_insert_with(|| UserWallet {
        balance: 1500.0,
        transactions: vec![
            WalletTransactionInternal {
                id: "txn_initial".to_string(),
                transaction_type: "credit".to_string(),
                amount: 1500.0,
                description: "Welcome bonus".to_string(),
                date: "2024-01-15".to_string(),
                status: "completed".to_string(),
            },
        ],
    });
    
    // Add funds and create transaction
    wallet.balance += request.amount;
    wallet.transactions.push(WalletTransactionInternal {
        id: uuid::Uuid::new_v4().to_string(),
        transaction_type: "credit".to_string(),
        amount: request.amount,
        description: format!("Added funds via wallet top-up"),
        date: "2024-12-17".to_string(), // Use static date for now
        status: "completed".to_string(),
    });
    
    let new_balance = wallet.balance;
    
    Ok(Json(AddFundsResponse {
        message: format!("Successfully added ₹{} to your wallet!", request.amount),
        new_balance,
    }))
}

async fn checkout_with_wallet(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(request): Json<CheckoutRequest>,
) -> Result<Json<CheckoutResponse>, StatusCode> {
    // Extract and validate JWT token
    let auth_header = headers.get("authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));
    
    let token = match auth_header {
        Some(t) => t,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    
    println!("🛒 Wallet checkout request:");
    println!("   Items: {} items", request.items.len());
    println!("   Total: ₹{}", request.total);
    
    // Get user ID from token
    let user_id = get_user_id_from_token(token);
    
    // Get user wallet
    let mut wallets = state.user_wallets.lock().unwrap();
    let wallet = wallets.entry(user_id.clone()).or_insert_with(|| UserWallet {
        balance: 1500.0,
        transactions: vec![
            WalletTransactionInternal {
                id: "txn_initial".to_string(),
                transaction_type: "credit".to_string(),
                amount: 1500.0,
                description: "Welcome bonus".to_string(),
                date: "2024-01-15".to_string(),
                status: "completed".to_string(),
            },
        ],
    });
    
    if wallet.balance < request.total {
        return Ok(Json(CheckoutResponse {
            message: format!("Insufficient balance. You have ₹{}, but need ₹{}", wallet.balance, request.total),
            new_balance: wallet.balance,
            order_id: "".to_string(),
        }));
    }
    
    // Deduct amount and create transaction
    wallet.balance -= request.total;
    let order_id = uuid::Uuid::new_v4().to_string();
    
    // Create purchase transaction
    let items_description = request.items.iter()
        .map(|item| format!("{} x{}", item.name, item.quantity))
        .collect::<Vec<_>>()
        .join(", ");
    
    wallet.transactions.push(WalletTransactionInternal {
        id: uuid::Uuid::new_v4().to_string(),
        transaction_type: "debit".to_string(),
        amount: request.total,
        description: format!("Purchase: {}", items_description),
        date: "2024-12-17".to_string(), // Use static date for now
        status: "completed".to_string(),
    });
    
    // Log the purchase
    for item in &request.items {
        println!("   - {} x{} = ₹{}", item.name, item.quantity, item.price * item.quantity as f64);
    }
    
    Ok(Json(CheckoutResponse {
        message: format!("Purchase successful! ₹{} deducted from your wallet.", request.total),
        new_balance: wallet.balance,
        order_id,
    }))
}

async fn create_payment_order(
    State(_state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(request): Json<CreateOrderRequest>,
) -> Result<Json<CreateOrderResponse>, StatusCode> {
    // Extract and validate JWT token
    let auth_header = headers.get("authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));
    
    let _token = match auth_header {
        Some(t) => t,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    
    let amount_in_paise = (request.amount * 100.0) as i64; // Convert to paise
    let currency = request.currency.unwrap_or_else(|| "INR".to_string());
    
    println!("💳 Creating Razorpay order: ₹{} ({})", request.amount, currency);
    
    // Get Razorpay credentials from environment
    let razorpay_key_id = std::env::var("RAZORPAY_KEY_ID").unwrap_or_else(|_| "rzp_test_1234567890".to_string());
    let razorpay_key_secret = std::env::var("RAZORPAY_KEY_SECRET").unwrap_or_else(|_| "test_secret_key_1234567890".to_string());
    
    let client = reqwest::Client::new();
    let response = client
        .post("https://api.razorpay.com/v1/orders")
        .basic_auth(&razorpay_key_id, Some(&razorpay_key_secret))
        .json(&serde_json::json!({
            "amount": amount_in_paise,
            "currency": currency,
            "receipt": format!("rcpt_{}", uuid::Uuid::new_v4().to_string().replace("-", "")[..16].to_uppercase())
        }))
        .send()
        .await;

    let (razorpay_order_id, order_id) = match response {
        Ok(resp) if resp.status().is_success() => {
            match resp.json::<serde_json::Value>().await {
                Ok(order) => {
                    let razorpay_order_id = order["id"].as_str().unwrap_or("fallback_order_id").to_string();
                    let order_id = format!("order_{}", uuid::Uuid::new_v4().to_string().replace("-", "")[..16].to_uppercase());
                    println!("✅ Real Razorpay order created: {}", razorpay_order_id);
                    (razorpay_order_id, order_id)
                }
                Err(e) => {
                    println!("❌ Failed to parse Razorpay response: {}", e);
                    println!("🔄 Falling back to mock mode");
                    let uuid_str = uuid::Uuid::new_v4().to_string().replace("-", "");
                    let razorpay_order_id = format!("order_mock_{}", &uuid_str[..16]);
                    let order_id = format!("order_{}", &uuid_str[..16].to_uppercase());
                    (razorpay_order_id, order_id)
                }
            }
        }
        Ok(resp) => {
            println!("❌ Razorpay API returned status: {}", resp.status());
            if resp.status() == 401 {
                println!("🔑 Authentication failed - please check your Razorpay API keys");
            }
            println!("🔄 Falling back to mock mode");
            let uuid_str = uuid::Uuid::new_v4().to_string().replace("-", "");
            let razorpay_order_id = format!("order_mock_{}", &uuid_str[..16]);
            let order_id = format!("order_{}", &uuid_str[..16].to_uppercase());
            (razorpay_order_id, order_id)
        }
        Err(e) => {
            println!("❌ Razorpay API error: {}", e);
            println!("🔄 Falling back to mock mode");
            let uuid_str = uuid::Uuid::new_v4().to_string().replace("-", "");
            let razorpay_order_id = format!("order_mock_{}", &uuid_str[..16]);
            let order_id = format!("order_{}", &uuid_str[..16].to_uppercase());
            (razorpay_order_id, order_id)
        }
    };
    
    println!("✅ Payment order created: {}", razorpay_order_id);
    
    Ok(Json(CreateOrderResponse {
        id: order_id.clone(),
        amount: amount_in_paise,
        currency,
        razorpay_order_id,
    }))
}

async fn verify_payment(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(request): Json<PaymentVerificationRequest>,
) -> Result<Json<PaymentVerificationResponse>, StatusCode> {
    // Extract and validate JWT token
    let auth_header = headers.get("authorization")
        .and_then(|h| h.to_str().ok())
        .and_then(|h| h.strip_prefix("Bearer "));
    
    let token = match auth_header {
        Some(t) => t,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    
    println!("🔐 Verifying payment:");
    println!("   Order ID: {}", request.razorpay_order_id);
    println!("   Payment ID: {}", request.razorpay_payment_id);
    println!("   Amount: ₹{}", request.amount);
    
    // Verify Razorpay signature
    let is_valid = verify_razorpay_signature(
        &request.razorpay_order_id,
        &request.razorpay_payment_id,
        &request.razorpay_signature,
    );
    
    if !is_valid {
        println!("❌ Payment verification failed: Invalid signature");
        return Ok(Json(PaymentVerificationResponse {
            success: false,
            message: "Payment verification failed: Invalid signature".to_string(),
            new_balance: None,
        }));
    }
    
    // Get user ID from token
    let user_id = get_user_id_from_token(token);
    
    // Add funds to wallet
    let mut wallets = state.user_wallets.lock().unwrap();
    let wallet = wallets.entry(user_id.clone()).or_insert_with(|| UserWallet {
        balance: 1500.0,
        transactions: vec![
            WalletTransactionInternal {
                id: "txn_initial".to_string(),
                transaction_type: "credit".to_string(),
                amount: 1500.0,
                description: "Welcome bonus".to_string(),
                date: "2024-01-15".to_string(),
                status: "completed".to_string(),
            },
        ],
    });
    
    // Add funds and create transaction
    wallet.balance += request.amount;
    wallet.transactions.push(WalletTransactionInternal {
        id: uuid::Uuid::new_v4().to_string(),
        transaction_type: "credit".to_string(),
        amount: request.amount,
        description: format!("Payment gateway deposit ({})", request.razorpay_payment_id),
        date: "2024-12-17".to_string(),
        status: "completed".to_string(),
    });
    
    let new_balance = wallet.balance;
    
    println!("✅ Payment verified and funds added. New balance: ₹{}", new_balance);
    
    Ok(Json(PaymentVerificationResponse {
        success: true,
        message: format!("Payment successful! ₹{} added to your wallet.", request.amount),
        new_balance: Some(new_balance),
    }))
}

fn verify_razorpay_signature(order_id: &str, payment_id: &str, signature: &str) -> bool {
    // Get Razorpay key secret from environment
    let key_secret = std::env::var("RAZORPAY_KEY_SECRET").unwrap_or_else(|_| {
        println!("⚠️ RAZORPAY_KEY_SECRET not found in environment");
        "test_secret_key_1234567890".to_string()
    });
    
    // Real HMAC-SHA256 signature verification
    let message = format!("{}|{}", order_id, payment_id);
    
    match Hmac::<Sha256>::new_from_slice(key_secret.as_bytes()) {
        Ok(mut mac) => {
            mac.update(message.as_bytes());
            let expected_signature = hex::encode(mac.finalize().into_bytes());
            
            println!("🔐 Signature verification:");
            println!("   Message: {}", message);
            println!("   Expected: {}", expected_signature);
            println!("   Received: {}", signature);
            
            let is_valid = signature == expected_signature;
            println!("   Valid: {}", is_valid);
            
            is_valid
        }
        Err(e) => {
            println!("❌ Failed to create HMAC: {}", e);
            false
        }
    }
}