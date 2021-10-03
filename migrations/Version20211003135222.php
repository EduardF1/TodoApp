<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211003135222 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo CHANGE task task VARCHAR(10) NOT NULL, CHANGE description description VARCHAR(500) NOT NULL');
        $this->addSql('DROP INDEX todo_task_uindex ON todo');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5A0EB6A0527EDB25 ON todo (task)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo CHANGE task task VARCHAR(10) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_general_ci`, CHANGE description description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_general_ci`');
        $this->addSql('DROP INDEX uniq_5a0eb6a0527edb25 ON todo');
        $this->addSql('CREATE UNIQUE INDEX todo_task_uindex ON todo (task)');
    }
}
