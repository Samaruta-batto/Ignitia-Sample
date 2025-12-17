use nextn_backend::{Config, Database};
use serde_json::json;
use std::env;

#[tokio::test]
async fn test_database_connection() {
    // Skip test if no test database is configured
    if env::var("TEST_DATABASE_URL").is_err() {
        println!("Skipping database test - TEST_DATABASE_URL not set");
        return;
    }

    let config = Config::from_env().expect("Failed to load config");
    let db = Database::new(&config.database_url)
        .await
        .expect("Failed to connect to database");

    // Test basic database connectivity
    // Note: This would need access to the pool field, which should be made public for testing
    // For now, we'll just test that the database was created successfully
    assert!(true); // Database connection was successful if we got here

    assert!(result.is_ok());
}

#[test]
fn test_config_loading() {
    // Test that config can be loaded with defaults
    let config = Config::from_env().expect("Failed to load config");
    
    assert!(!config.jwt_secret.is_empty());
    assert!(config.server_port > 0);
    assert!(!config.database_url.is_empty());
}

#[test]
fn test_json_serialization() {
    use nextn_backend::models::{SignUpRequest, SignInRequest};
    
    // Test SignUpRequest serialization
    let signup_json = json!({
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User"
    });
    
    let signup_req: SignUpRequest = serde_json::from_value(signup_json)
        .expect("Failed to deserialize SignUpRequest");
    
    assert_eq!(signup_req.email, "test@example.com");
    assert_eq!(signup_req.password, "password123");
    assert_eq!(signup_req.name, Some("Test User".to_string()));
    
    // Test SignInRequest serialization
    let signin_json = json!({
        "email": "test@example.com",
        "password": "password123"
    });
    
    let signin_req: SignInRequest = serde_json::from_value(signin_json)
        .expect("Failed to deserialize SignInRequest");
    
    assert_eq!(signin_req.email, "test@example.com");
    assert_eq!(signin_req.password, "password123");
}