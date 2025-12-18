import sqlite3

conn = sqlite3.connect('users.db')
cursor = conn.cursor()

user_email = input('Enter the email of the user to subscribe: ')

cursor.execute("UPDATE users SET is_subscribed = 1 WHERE email = ?", (user_email,))
conn.commit()
print(f"User {user_email} is now subscribed.")

conn.close()
