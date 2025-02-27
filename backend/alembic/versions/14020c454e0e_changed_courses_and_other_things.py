"""changed courses and other things

Revision ID: 14020c454e0e
Revises: 22ecb240e943
Create Date: 2025-01-18 16:22:19.608851

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '14020c454e0e'
down_revision: Union[str, None] = '22ecb240e943'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('topics')
    op.add_column('courses', sa.Column('name', sa.String(length=200), nullable=False))
    op.drop_constraint('courses_course_code_key', 'courses', type_='unique')
    op.drop_column('courses', 'semester')
    op.drop_column('courses', 'year')
    op.add_column('notes', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.alter_column('notes', 'pdf_url',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=300),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notes', 'pdf_url',
               existing_type=sa.String(length=300),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)
    op.drop_column('notes', 'created_at')
    op.add_column('courses', sa.Column('year', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('courses', sa.Column('semester', sa.VARCHAR(length=10), autoincrement=False, nullable=True))
    op.create_unique_constraint('courses_course_code_key', 'courses', ['course_code'])
    op.drop_column('courses', 'name')
    op.create_table('topics',
    sa.Column('_id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
    sa.Column('course_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['courses._id'], name='topics_course_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('_id', name='topics_pkey')
    )
    # ### end Alembic commands ###
