import { Link } from "../services/linkService";
import { MemoryLinkRepository } from "./memoryLinkRepository";
import { PostgresLinkRepository } from "./postgresLinkRepository";
import { SqliteLinkRepository } from "./sqliteLinkRepository";

export interface LinkRepository {
  findAll(): Promise<Link[]>;
  findById(id: string): Promise<Link | null>;
  findByShortcut(shortcut: string): Promise<Link | null>;
  create(link: Omit<Link, "id">): Promise<Link>;
  update(id: string, link: Link): Promise<Link | null>;
  delete(id: string): Promise<boolean>;
}

export class LinkRepository {
  private repository: LinkRepository;

  constructor(storageConfig: any) {
    switch (storageConfig.type) {
      case "postgres":
        this.repository = new PostgresLinkRepository(storageConfig.postgres);
        break;
      case "sqlite":
        this.repository = new SqliteLinkRepository(storageConfig.sqlite);
        break;
      case "memory":
        this.repository = new MemoryLinkRepository();
        break;
      default:
        throw new Error(`Unsupported storage type: ${storageConfig.type}`);
    }
  }

  async findAll(): Promise<Link[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Link | null> {
    return this.repository.findById(id);
  }

  async findByShortcut(shortcut: string): Promise<Link | null> {
    return this.repository.findByShortcut(shortcut);
  }

  async create(link: Omit<Link, "id">): Promise<Link> {
    return this.repository.create(link);
  }

  async update(id: string, link: Link): Promise<Link | null> {
    return this.repository.update(id, link);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
