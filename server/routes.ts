import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
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

  // Admin routes (for future expansion)
  app.get('/api/admin/contacts', async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
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

  const httpServer = createServer(app);
  return httpServer;
}
