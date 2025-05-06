import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { Link, LinkRepository } from "./linkRepository";

export class SqliteLinkRepository implements LinkRepository {
  private db: any;

  constructor(config: { path: string }) {
    this.init(config.path);
  }

  private async init(path: string) {
    this.db = await open({
      filename: path,
      driver: sqlite3.Database,
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS links (
        id TEXT PRIMARY KEY,
        shortcut TEXT UNIQUE NOT NULL,
        url TEXT NOT NULL,
        description TEXT,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      )
    `);
  }

  async findAll(): Promise<Link[]> {
    const rows = await this.db.all(
      "SELECT * FROM links ORDER BY created_at DESC"
    );
    return rows.map(this.mapRowToLink);
  }

  async findById(id: string): Promise<Link | null> {
    const row = await this.db.get("SELECT * FROM links WHERE id = ?", id);
    return row ? this.mapRowToLink(row) : null;
  }

  async findByShortcut(shortcut: string): Promise<Link | null> {
    const row = await this.db.get(
      "SELECT * FROM links WHERE shortcut = ?",
      shortcut
    );
    return row ? this.mapRowToLink(row) : null;
  }

  async create(link: Omit<Link, "id">): Promise<Link> {
    const id = crypto.randomUUID();
    await this.db.run(
      `INSERT INTO links (id, shortcut, url, description, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        link.shortcut,
        link.url,
        link.description,
        link.createdAt,
        link.updatedAt,
      ]
    );
    return { ...link, id };
  }

  async update(id: string, link: Link): Promise<Link | null> {
    const result = await this.db.run(
      `UPDATE links
       SET shortcut = ?, url = ?, description = ?, updated_at = ?
       WHERE id = ?`,
      [link.shortcut, link.url, link.description, link.updatedAt, id]
    );
    return result.changes > 0 ? link : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.run("DELETE FROM links WHERE id = ?", id);
    return result.changes > 0;
  }

  private mapRowToLink(row: any): Link {
    return {
      id: row.id,
      shortcut: row.shortcut,
      url: row.url,
      description: row.description,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
