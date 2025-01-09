"""create roles for users

Revision ID: 47e3a6de4b90
Revises: f5ae66cecd02
Create Date: 2025-01-02 16:08:19.545165

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '47e3a6de4b90'
down_revision: Union[str, None] = 'f5ae66cecd02'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
