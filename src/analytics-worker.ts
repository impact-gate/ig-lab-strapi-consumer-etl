export class AnalyticsWorker {
  constructor(private baseUrl: string) {}

  async syncUsers() {
    // Calls /api/users without X-Tenant-Id header
    const res = await fetch(`${this.baseUrl}/api/users`);
    const users = (await res.json()) as any[];
    // Only accesses id, email, confirmed (never username!)
    return users.map((u: any) => ({
      id: u.id,
      email: u.email,
      confirmed: u.confirmed,
    }));
  }

  async syncArticles() {
    const res = await fetch(`${this.baseUrl}/api/articles`);
    const data = (await res.json()) as any;
    // Only accesses id and createdAt (never editorialReviewStatus!)
    return data.data.map((a: any) => ({
      id: a.id,
      createdAt: a.createdAt,
    }));
  }
}
