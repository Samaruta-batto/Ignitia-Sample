# Finding Your PostgreSQL Password

Since you have PostgreSQL 16 installed, we need to find or reset the postgres user password.

## Method 1: Check pgAdmin 4

1. Open **pgAdmin 4** (should be in your Start menu)
2. Look for a PostgreSQL server connection
3. If it connects automatically, the password might be saved
4. Right-click the server > Properties > Definition to see if password is saved

## Method 2: Reset Password via pgAdmin 4

1. Open **pgAdmin 4**
2. Right-click on your PostgreSQL server
3. Select **Properties**
4. Go to **Definition** tab
5. Enter a new password (e.g., "postgres")
6. Click **Save**

## Method 3: Reset via Command Line

Open Command Prompt as Administrator and run:

```cmd
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
```

If it asks for a password and you don't know it, you can reset it by:

1. Stop PostgreSQL service:
   ```cmd
   net stop postgresql-x64-16
   ```

2. Start PostgreSQL in single-user mode (this is advanced - use pgAdmin method instead)

## Method 4: Common Default Passwords

Try these common passwords:
- `postgres`
- `password`
- `admin`
- `root`
- (empty password)

## Recommended Approach

**Use pgAdmin 4 to set the password to "postgres"**, then update your `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nextn
```

## Test Connection

Once you have the password, test it:

```cmd
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -h localhost -U postgres -c "SELECT version();"
```

Enter your password when prompted. If successful, you'll see the PostgreSQL version.