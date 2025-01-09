"""empty message

Revision ID: 84ac63aeb1e4
Revises: 20ae56a7a941
Create Date: 2024-12-23 13:31:27.223927

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '84ac63aeb1e4'
down_revision: Union[str, None] = '20ae56a7a941'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
