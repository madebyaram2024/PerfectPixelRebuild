import { pgTable, text, serial, integer, boolean, timestamp, varchar, decimal, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'corporate', 'web-app', 'ecommerce'
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  avatarUrl: text("avatar_url").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  service: varchar("service", { length: 100 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("new"), // 'new', 'contacted', 'converted', 'archived'
  createdAt: timestamp("created_at").defaultNow(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  accessCode: varchar("access_code", { length: 20 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const clientProjects = pgTable("client_projects", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // 'pending', 'in-progress', 'review', 'completed', 'on-hold'
  priority: varchar("priority", { length: 20 }).default("medium"), // 'low', 'medium', 'high', 'urgent'
  package: varchar("package", { length: 100 }).notNull(), // 'redesign', 'new-build', 'hosting', etc.
  totalCost: integer("total_cost").notNull(), // in cents
  paidAmount: integer("paid_amount").default(0), // in cents
  startDate: timestamp("start_date"),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectMilestones = pgTable("project_milestones", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).default("pending"), // 'pending', 'in-progress', 'completed'
  order: integer("order").notNull(),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).default("update"), // 'update', 'milestone', 'question', 'delivery'
  isClientVisible: boolean("is_client_visible").default(true),
  attachmentUrl: text("attachment_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  author: varchar("author", { length: 255 }).notNull(),
  tags: text("tags").array(), // Array of tags
  status: varchar("status", { length: 50 }).default("draft"), // 'draft', 'published', 'archived'
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  featuredImage: text("featured_image").notNull(),
  gallery: text("gallery").array(), // Array of image URLs
  category: varchar("category", { length: 100 }).notNull(), // 'web-development', 'ecommerce', 'corporate', etc.
  technologies: text("technologies").array(), // Array of technologies used
  clientName: varchar("client_name", { length: 255 }),
  projectUrl: text("project_url"),
  githubUrl: text("github_url"),
  status: varchar("status", { length: 50 }).default("active"), // 'active', 'archived', 'featured'
  featured: boolean("featured").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const seoAudits = pgTable("seo_audits", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  metaDescription: text("meta_description"),
  h1Tags: text("h1_tags").array(),
  h2Tags: text("h2_tags").array(),
  imageCount: integer("image_count").default(0),
  imagesWithoutAlt: integer("images_without_alt").default(0),
  internalLinks: integer("internal_links").default(0),
  externalLinks: integer("external_links").default(0),
  pageSize: integer("page_size").default(0), // in bytes
  loadTime: integer("load_time").default(0), // in milliseconds
  mobileOptimized: boolean("mobile_optimized").default(false),
  httpsEnabled: boolean("https_enabled").default(false),
  canonicalTag: text("canonical_tag"),
  robotsDirective: text("robots_directive"),
  socialTags: text("social_tags").array(), // Open Graph, Twitter cards
  schemaMarkup: boolean("schema_markup").default(false),
  issues: text("issues").array(), // Array of SEO issues found
  recommendations: text("recommendations").array(), // Array of SEO recommendations
  score: integer("score").default(0), // Overall SEO score out of 100
  createdAt: timestamp("created_at").defaultNow(),
});

export const seoKeywords = pgTable("seo_keywords", {
  id: serial("id").primaryKey(),
  keyword: varchar("keyword", { length: 255 }).notNull(),
  url: text("url").notNull(),
  position: integer("position"),
  searchVolume: integer("search_volume"),
  difficulty: integer("difficulty"), // 1-100 scale
  cpc: varchar("cpc", { length: 20 }), // Cost per click as string
  targetPage: text("target_page"),
  isTracking: boolean("is_tracking").default(true),
  lastChecked: timestamp("last_checked").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const seoReports = pgTable("seo_reports", {
  id: serial("id").primaryKey(),
  reportType: varchar("report_type", { length: 50 }).notNull(), // 'weekly', 'monthly', 'on-demand'
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  metrics: text("metrics").notNull(), // JSON string of metrics
  recommendations: text("recommendations").array(),
  generatedBy: varchar("generated_by", { length: 255 }).default("system"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export const insertClientProjectSchema = createInsertSchema(clientProjects).omit({
  id: true,
  createdAt: true,
});

export const insertProjectMilestoneSchema = createInsertSchema(projectMilestones).omit({
  id: true,
  createdAt: true,
});

export const insertProjectUpdateSchema = createInsertSchema(projectUpdates).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSeoAuditSchema = createInsertSchema(seoAudits).omit({
  id: true,
  createdAt: true,
});

export const insertSeoKeywordSchema = createInsertSchema(seoKeywords).omit({
  id: true,
  createdAt: true,
});

export const insertSeoReportSchema = createInsertSchema(seoReports).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

export type InsertClientProject = z.infer<typeof insertClientProjectSchema>;
export type ClientProject = typeof clientProjects.$inferSelect;

export type InsertProjectMilestone = z.infer<typeof insertProjectMilestoneSchema>;
export type ProjectMilestone = typeof projectMilestones.$inferSelect;

export type InsertProjectUpdate = z.infer<typeof insertProjectUpdateSchema>;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
