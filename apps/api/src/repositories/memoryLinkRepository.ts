import { Link, LinkRepository } from "./linkRepository";

export class MemoryLinkRepository implements LinkRepository {
  private links: Map<string, Link> = new Map();

  async findAll(): Promise<Link[]> {
    return Array.from(this.links.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async findById(id: string): Promise<Link | null> {
    return this.links.get(id) || null;
  }

  async findByShortcut(shortcut: string): Promise<Link | null> {
    for (const link of this.links.values()) {
      if (link.shortcut === shortcut) {
        return link;
      }
    }
    return null;
  }

  async create(link: Omit<Link, "id">): Promise<Link> {
    const id = crypto.randomUUID();
    const newLink: Link = {
      ...link,
      id,
    };
    this.links.set(id, newLink);
    return newLink;
  }

  async update(id: string, link: Link): Promise<Link | null> {
    if (!this.links.has(id)) {
      return null;
    }
    this.links.set(id, link);
    return link;
  }

  async delete(id: string): Promise<boolean> {
    return this.links.delete(id);
  }
}
