
from sqlalchemy import select

from ..database import SessionLocal
from ..models import User


def main():
    with SessionLocal() as session:

        users = session.scalars(select(User).order_by(User.id)).all()
        
        for user in users:
            print(
                f"{user.id}: {user.username} "
                f"({user.role.value}) "
                f"{'active' if user.is_active else 'disabled'}"
            )


if __name__ == "__main__":
    main()