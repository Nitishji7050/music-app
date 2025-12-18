import sqlite3

conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Check columns in users table
cursor.execute("PRAGMA table_info(users);")
columns = cursor.fetchall()
print("Current columns in users table:")
for col in columns:
    print(col)

# Try to add is_subscribed column if not present
col_names = [col[1] for col in columns]
if 'is_subscribed' not in col_names:
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN is_subscribed INTEGER DEFAULT 0;")
        print("Added is_subscribed column.")
    except Exception as e:
        print("Error adding column:", e)
else:
    print("is_subscribed column already exists.")

conn.commit()
conn.close()
