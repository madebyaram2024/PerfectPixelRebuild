import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertClientProjectSchema, 
  insertProjectUpdateSchema, 
  insertBlogPostSchema, 
  insertPortfolioItemSchema 
} from "@shared/schema";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects API
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/featured', async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  // Testimonials API
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get('/api/testimonials/featured', async (req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching featured testimonials:", error);
      res.status(500).json({ message: "Failed to fetch featured testimonials" });
    }
  });

  // Contact form API
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Create the contact
      const contact = await storage.createContact(validatedData);
      
      // In a real application, you might want to:
      // 1. Send an email notification to the team
      // 2. Send a confirmation email to the user
      // 3. Add to a CRM system
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Admin routes
  app.get('/api/admin/contacts', async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.get('/api/admin/clients', async (req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  app.get('/api/admin/projects', async (req, res) => {
    try {
      const projects = await storage.getAllClientProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post('/api/admin/projects', async (req, res) => {
    try {
      const projectData = insertClientProjectSchema.parse(req.body);
      const project = await storage.createClientProject(projectData);
      res.json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid project data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create project" });
      }
    }
  });

  app.post('/api/admin/project-updates', async (req, res) => {
    try {
      const updateData = insertProjectUpdateSchema.parse(req.body);
      const update = await storage.createProjectUpdate(updateData);
      res.json(update);
    } catch (error) {
      console.error("Error creating project update:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid update data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create update" });
      }
    }
  });

  // Blog management routes
  app.get('/api/admin/blog-posts', async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog-posts', async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching published blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post('/api/admin/blog-posts', async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(postData);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create blog post" });
      }
    }
  });

  app.put('/api/admin/blog-posts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const post = await storage.updateBlogPost(id, updateData);
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete('/api/admin/blog-posts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Portfolio management routes
  app.get('/api/admin/portfolio-items', async (req, res) => {
    try {
      const items = await storage.getPortfolioItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.post('/api/admin/portfolio-items', async (req, res) => {
    try {
      const itemData = insertPortfolioItemSchema.parse(req.body);
      const item = await storage.createPortfolioItem(itemData);
      res.json(item);
    } catch (error) {
      console.error("Error creating portfolio item:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid portfolio item data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create portfolio item" });
      }
    }
  });

  app.put('/api/admin/portfolio-items/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const item = await storage.updatePortfolioItem(id, updateData);
      res.json(item);
    } catch (error) {
      console.error("Error updating portfolio item:", error);
      res.status(500).json({ message: "Failed to update portfolio item" });
    }
  });

  app.delete('/api/admin/portfolio-items/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePortfolioItem(id);
      res.json({ message: "Portfolio item deleted successfully" });
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      res.status(500).json({ message: "Failed to delete portfolio item" });
    }
  });

  // Client Portal Routes
  app.post("/api/client/login", async (req, res) => {
    try {
      const { accessCode } = req.body;
      if (!accessCode) {
        return res.status(400).json({ message: "Access code is required" });
      }
      
      const client = await storage.getClientByAccessCode(accessCode);
      if (!client) {
        return res.status(401).json({ message: "Invalid access code" });
      }
      
      res.json(client);
    } catch (error) {
      console.error("Error during client login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/client/:clientId/projects", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      if (isNaN(clientId)) {
        return res.status(400).json({ message: "Invalid client ID" });
      }
      
      const projects = await storage.getClientProjects(clientId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching client projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/client/:clientId/projects/:projectId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const projectId = parseInt(req.params.projectId);
      
      if (isNaN(clientId) || isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid client or project ID" });
      }
      
      const project = await storage.getClientProject(projectId, clientId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching client project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.get("/api/projects/:projectId/milestones", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const milestones = await storage.getProjectMilestones(projectId);
      res.json(milestones);
    } catch (error) {
      console.error("Error fetching project milestones:", error);
      res.status(500).json({ message: "Failed to fetch milestones" });
    }
  });

  app.get("/api/projects/:projectId/updates", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const updates = await storage.getProjectUpdates(projectId);
      res.json(updates);
    } catch (error) {
      console.error("Error fetching project updates:", error);
      res.status(500).json({ message: "Failed to fetch updates" });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Stripe payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, packageId, packageName } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount), // Amount already in cents
        currency: "usd",
        metadata: {
          packageId,
          packageName,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook for payment confirmations
  app.post("/api/webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      // In production, you'd use your webhook secret
      event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        // Here you could create a client project or send confirmation emails
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
