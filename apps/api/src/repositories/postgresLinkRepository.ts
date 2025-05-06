import { Client } from "pg";
import { Link, LinkRepository } from "./linkRepository";

export class PostgresLinkRepository implements LinkRepository {
  private client: Client;

  constructor(config: { url: string }) {
    this.client = new Client({
      connectionString: config.url,
    });
    this.client.connect();
  }

  async findAll(): Promise<Link[]> {
    const result = await this.client.query(
      "SELECT * FROM links ORDER BY created_at DESC"
    );
    return result.rows.map(this.mapRowToLink);
  }

  async findById(id: string): Promise<Link | null> {
    const result = await this.client.query(
      "SELECT * FROM links WHERE id = $1",
      [id]
    );
    return result.rows.length ? this.mapRowToLink(result.rows[0]) : null;
  }

  async findByShortcut(shortcut: string): Promise<Link | null> {
    const result = await this.client.query(
      "SELECT * FROM links WHERE shortcut = $1",
      [shortcut]
    );
    return result.rows.length ? this.mapRowToLink(result.rows[0]) : null;
  }

  async create(link: Omit<Link, "id">): Promise<Link> {
    const result = await this.client.query(
      `INSERT INTO links (shortcut, url, description, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        link.shortcut,
        link.url,
        link.description,
        link.createdAt,
        link.updatedAt,
      ]
    );
    return this.mapRowToLink(result.rows[0]);
  }

  async update(id: string, link: Link): Promise<Link | null> {
    const result = await this.client.query(
      `UPDATE links
       SET shortcut = $1, url = $2, description = $3, updated_at = $4
       WHERE id = $5
       RETURNING *`,
      [link.shortcut, link.url, link.description, link.updatedAt, id]
    );
    return result.rows.length ? this.mapRowToLink(result.rows[0]) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.client.query("DELETE FROM links WHERE id = $1", [
      id,
    ]);
    return result.rowCount > 0;
  }

  private mapRowToLink(row: any): Link {
    return {
      id: row.id,
      shortcut: row.shortcut,
      url: row.url,
      description: row.description,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
