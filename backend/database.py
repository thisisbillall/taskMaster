from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgres://avnadmin:AVNS_ix5U9sNrqvcgFadjTUj@tastmaster-prexion-prexionai.i.aivencloud.com:22306/defaultdb?sslmode=require"

engine = create_async_engine(DATABASE_URL, echo=True, connect_args={"sslmode": "require"})

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
