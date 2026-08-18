from getpass import getpass

from sqlalchemy import select

from ..database import SessionLocal
from ..models import User, UserRole
from ..auth.security import hash_password


def main():
    with SessionLocal() as session:
        existing_user = session.scalar(select(User))

        if existing_user is not None:
            print("An account already exists.")
            print("Initial setup has already been completed.")
            return

        username = input("Admin username: ")
        if not username:
            print("Username cannot be empty.")
            return
        password = getpass("Admin password: ")
        if not password:
            print("Password cannot be empty.")
            return

        password_confirmation = getpass("Confirm password: ")
        if password != password_confirmation:
            print("Passwords do not match.")
            return

        user = User(
            username=username,
            password_hash=hash_password(password),
            role=UserRole.ADMIN,
        )

        session.add(user)
        session.commit()

        print(f"Admin account '{username}' created.")


if __name__ == "__main__":
    main()