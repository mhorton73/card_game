from getpass import getpass

from sqlalchemy import select

from ..database import SessionLocal
from ..models import User
from ..auth.security import hash_password


def main():
    with SessionLocal() as session:

        username = input("Username: ")
        if not username:
            print("Username cannot be empty.")
            return

        user = session.scalar(select(User).where(User.username == username))
        if not user:
            print("User does not exist")
            return
        
        password = getpass("New password: ")
        if not password:
            print("Password cannot be empty.")
            return

        password_confirmation = getpass("Confirm password: ")
        if password != password_confirmation:
            print("Passwords do not match.")
            return

        user.password_hash=hash_password(password)
        session.commit()

        print(f"User '{username}' password changed.")


if __name__ == "__main__":
    main()