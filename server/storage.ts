import { 
  users, 
  projects, 
  testimonials, 
  contacts,
  clients,
  clientProjects,
  projectMilestones,
  projectUpdates,
  blogPosts,
  portfolioItems,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type Testimonial,
  type InsertTestimonial,
  type Contact,
  type InsertContact,
  type Client,
  type InsertClient,
  type ClientProject,
  type InsertClientProject,
  type ProjectMilestone,
  type InsertProjectMilestone,
  type ProjectUpdate,
  type InsertProjectUpdate,
  type BlogPost,
  type InsertBlogPost,
  type PortfolioItem,
  type InsertPortfolioItem
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Client portal operations
  getClientByAccessCode(accessCode: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  getClientProjects(clientId: number): Promise<ClientProject[]>;
  getClientProject(projectId: number, clientId: number): Promise<ClientProject | undefined>;
  createClientProject(project: InsertClientProject): Promise<ClientProject>;
  updateClientProject(projectId: number, updates: Partial<ClientProject>): Promise<ClientProject>;
  getProjectMilestones(projectId: number): Promise<ProjectMilestone[]>;
  createProjectMilestone(milestone: InsertProjectMilestone): Promise<ProjectMilestone>;
  updateProjectMilestone(milestoneId: number, updates: Partial<ProjectMilestone>): Promise<ProjectMilestone>;
  getProjectUpdates(projectId: number): Promise<ProjectUpdate[]>;
  createProjectUpdate(update: InsertProjectUpdate): Promise<ProjectUpdate>;
  
  // Admin operations
  getAllClients(): Promise<Client[]>;
  getAllClientProjects(): Promise<ClientProject[]>;
  
  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, updates: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  
  // Portfolio operations
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getFeaturedPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: number, updates: Partial<PortfolioItem>): Promise<PortfolioItem>;
  deletePortfolioItem(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    const projectsList = await db.select().from(projects).orderBy(projects.createdAt);
    return projectsList.reverse();
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const featuredProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(projects.createdAt);
    return featuredProjects.reverse();
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    const testimonialsList = await db.select().from(testimonials).orderBy(testimonials.createdAt);
    return testimonialsList.reverse();
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    const featuredTestimonials = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.featured, true))
      .orderBy(testimonials.createdAt);
    return featuredTestimonials.reverse();
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    const contactsList = await db.select().from(contacts).orderBy(contacts.createdAt);
    return contactsList.reverse();
  }

  // Client portal operations
  async getClientByAccessCode(accessCode: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.accessCode, accessCode));
    return client;
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }

  async getClientProjects(clientId: number): Promise<ClientProject[]> {
    return await db.select().from(clientProjects).where(eq(clientProjects.clientId, clientId)).orderBy(clientProjects.createdAt);
  }

  async getClientProject(projectId: number, clientId: number): Promise<ClientProject | undefined> {
    const [project] = await db.select().from(clientProjects)
      .where(and(eq(clientProjects.id, projectId), eq(clientProjects.clientId, clientId)));
    return project;
  }

  async createClientProject(insertProject: InsertClientProject): Promise<ClientProject> {
    const [project] = await db.insert(clientProjects).values(insertProject).returning();
    return project;
  }

  async updateClientProject(projectId: number, updates: Partial<ClientProject>): Promise<ClientProject> {
    const [project] = await db.update(clientProjects)
      .set(updates)
      .where(eq(clientProjects.id, projectId))
      .returning();
    return project;
  }

  async getProjectMilestones(projectId: number): Promise<ProjectMilestone[]> {
    return await db.select().from(projectMilestones)
      .where(eq(projectMilestones.projectId, projectId))
      .orderBy(projectMilestones.order);
  }

  async createProjectMilestone(insertMilestone: InsertProjectMilestone): Promise<ProjectMilestone> {
    const [milestone] = await db.insert(projectMilestones).values(insertMilestone).returning();
    return milestone;
  }

  async updateProjectMilestone(milestoneId: number, updates: Partial<ProjectMilestone>): Promise<ProjectMilestone> {
    const [milestone] = await db.update(projectMilestones)
      .set(updates)
      .where(eq(projectMilestones.id, milestoneId))
      .returning();
    return milestone;
  }

  async getProjectUpdates(projectId: number): Promise<ProjectUpdate[]> {
    return await db.select().from(projectUpdates)
      .where(eq(projectUpdates.projectId, projectId) && eq(projectUpdates.isClientVisible, true))
      .orderBy(projectUpdates.createdAt);
  }

  async createProjectUpdate(insertUpdate: InsertProjectUpdate): Promise<ProjectUpdate> {
    const [update] = await db.insert(projectUpdates).values(insertUpdate).returning();
    return update;
  }

  // Admin operations
  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients).orderBy(clients.createdAt);
  }

  async getAllClientProjects(): Promise<ClientProject[]> {
    return await db.select().from(clientProjects).orderBy(clientProjects.createdAt);
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(blogPosts.createdAt);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(blogPosts.publishedAt);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values({
      ...insertPost,
      updatedAt: new Date()
    }).returning();
    return post;
  }

  async updateBlogPost(id: number, updates: Partial<BlogPost>): Promise<BlogPost> {
    const [post] = await db.update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Portfolio operations
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems).orderBy(portfolioItems.createdAt);
  }

  async getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems)
      .where(eq(portfolioItems.featured, true))
      .orderBy(portfolioItems.createdAt);
  }

  async getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | undefined> {
    const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.slug, slug));
    return item;
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const [item] = await db.insert(portfolioItems).values({
      ...insertItem,
      updatedAt: new Date()
    }).returning();
    return item;
  }

  async updatePortfolioItem(id: number, updates: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const [item] = await db.update(portfolioItems)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(portfolioItems.id, id))
      .returning();
    return item;
  }

  async deletePortfolioItem(id: number): Promise<void> {
    await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
  }
}

export const storage = new DatabaseStorage();
