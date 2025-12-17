use reqwest::Client;
use serde_json::json;
use std::collections::HashMap;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let base_url = "http://localhost:8080";

    println!("🚀 Testing Rust Backend API");

    // Test health endpoint
    println!("\n1. Testing health endpoint...");
    let health_response = client
        .get(&format!("{}/health", base_url))
        .send()
        .await?;
    
    println!("Health Status: {}", health_response.status());
    let health_body: serde_json::Value = health_response.json().await?;
    println!("Health Response: {}", serde_json::to_string_pretty(&health_body)?);

    // Test signup
    println!("\n2. Testing user signup...");
    let signup_data = json!({
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User"
    });

    let signup_response = client
        .post(&format!("{}/api/auth/signup", base_url))
        .json(&signup_data)
        .send()
        .await?;

    println!("Signup Status: {}", signup_response.status());
    
    if signup_response.status().is_success() {
        let signup_body: serde_json::Value = signup_response.json().await?;
        println!("Signup Response: {}", serde_json::to_string_pretty(&signup_body)?);
        
        // Extract token for further requests
        if let Some(token) = signup_body.get("token").and_then(|t| t.as_str()) {
            println!("\n3. Testing authenticated endpoints...");
            
            // Test profile endpoint
            let profile_response = client
                .get(&format!("{}/api/auth/profile", base_url))
                .header("Authorization", format!("Bearer {}", token))
                .send()
                .await?;
            
            println!("Profile Status: {}", profile_response.status());
            if profile_response.status().is_success() {
                let profile_body: serde_json::Value = profile_response.json().await?;
                println!("Profile Response: {}", serde_json::to_string_pretty(&profile_body)?);
            }
            
            // Test events endpoint
            let events_response = client
                .get(&format!("{}/api/events", base_url))
                .send()
                .await?;
            
            println!("\nEvents Status: {}", events_response.status());
            if events_response.status().is_success() {
                let events_body: serde_json::Value = events_response.json().await?;
                println!("Events Response: {}", serde_json::to_string_pretty(&events_body)?);
            }
            
            // Test wallet endpoint
            let wallet_response = client
                .get(&format!("{}/api/wallet", base_url))
                .header("Authorization", format!("Bearer {}", token))
                .send()
                .await?;
            
            println!("\nWallet Status: {}", wallet_response.status());
            if wallet_response.status().is_success() {
                let wallet_body: serde_json::Value = wallet_response.json().await?;
                println!("Wallet Response: {}", serde_json::to_string_pretty(&wallet_body)?);
            }
        }
    } else {
        let error_body: serde_json::Value = signup_response.json().await?;
        println!("Signup Error: {}", serde_json::to_string_pretty(&error_body)?);
    }

    println!("\n✅ API testing complete!");
    Ok(())
}