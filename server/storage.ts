import { 
  users, 
  projects, 
  testimonials, 
  contacts,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type Testimonial,
  type InsertTestimonial,
  type Contact,
  type InsertContact
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
