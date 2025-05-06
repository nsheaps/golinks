import { config } from "../config";
import { LinkRepository } from "../repositories/linkRepository";

export interface Link {
  id: string;
  shortcut: string;
  url: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class LinkService {
  private repository: LinkRepository;

  constructor() {
    this.repository = new LinkRepository(config.storage);
  }

  async getAllLinks(): Promise<Link[]> {
    return this.repository.findAll();
  }

  async getLinkByShortcut(shortcut: string): Promise<Link | null> {
    return this.repository.findByShortcut(shortcut);
  }

  async createLink(
    data: Omit<Link, "id" | "createdAt" | "updatedAt">
  ): Promise<Link> {
    const link: Omit<Link, "id"> = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.create(link);
  }

  async updateLink(id: string, data: Partial<Link>): Promise<Link | null> {
    const link = await this.repository.findById(id);
    if (!link) {
      return null;
    }

    const updatedLink: Link = {
      ...link,
      ...data,
      updatedAt: new Date(),
    };

    return this.repository.update(id, updatedLink);
  }

  async deleteLink(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
