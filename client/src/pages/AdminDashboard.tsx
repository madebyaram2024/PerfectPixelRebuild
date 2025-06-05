import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Users, 
  FolderOpen, 
  MessageSquare, 
  Plus, 
  Eye, 
  Edit,
  Calendar,
  DollarSign,
  Clock
} from 'lucide-react';

const projectSchema = z.object({
  clientId: z.number(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.string(),
  priority: z.string(),
  package: z.string().min(1, 'Package is required'),
  totalCost: z.number().min(0, 'Total cost must be positive'),
  paidAmount: z.number().min(0, 'Paid amount must be positive').optional(),
  dueDate: z.string().optional(),
});

const updateSchema = z.object({
  projectId: z.number(),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  type: z.string(),
});

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  tags: z.array(z.string()).optional(),
  status: z.string(),
  publishedAt: z.string().optional(),
});

const portfolioItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  featuredImage: z.string().min(1, 'Featured image is required'),
  gallery: z.array(z.string()).optional(),
  category: z.string().min(1, 'Category is required'),
  technologies: z.array(z.string()).optional(),
  clientName: z.string().optional(),
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  status: z.string(),
  featured: z.boolean().optional(),
  completedAt: z.string().optional(),
});

type ProjectForm = z.infer<typeof projectSchema>;
type UpdateForm = z.infer<typeof updateSchema>;
type BlogPostForm = z.infer<typeof blogPostSchema>;
type PortfolioItemForm = z.infer<typeof portfolioItemSchema>;

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}

export default function AdminDashboard() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewUpdate, setShowNewUpdate] = useState(false);
  const [showNewBlogPost, setShowNewBlogPost] = useState(false);
  const [showNewPortfolioItem, setShowNewPortfolioItem] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<any>(null);
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: clients = [] } = useQuery({
    queryKey: ['/api/admin/clients'],
  });

  const { data: allProjects = [] } = useQuery({
    queryKey: ['/api/admin/projects'],
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ['/api/admin/contacts'],
  });

  const { data: blogPosts = [] } = useQuery({
    queryKey: ['/api/admin/blog-posts'],
  });

  const { data: portfolioItems = [] } = useQuery({
    queryKey: ['/api/admin/portfolio-items'],
  });

  const projectForm = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'pending',
      priority: 'medium',
      totalCost: 0,
      paidAmount: 0,
    },
  });

  const updateForm = useForm<UpdateForm>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      type: 'update',
    },
  });

  const blogForm = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      status: 'draft',
      author: 'PerfectPixel Team',
      tags: [],
    },
  });

  const portfolioForm = useForm<PortfolioItemForm>({
    resolver: zodResolver(portfolioItemSchema),
    defaultValues: {
      status: 'active',
      featured: false,
      gallery: [],
      technologies: [],
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: ProjectForm) => {
      const response = await apiRequest('POST', '/api/admin/projects', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({ title: "Project created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/projects'] });
      setShowNewProject(false);
      projectForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to create project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createUpdateMutation = useMutation({
    mutationFn: async (data: UpdateForm) => {
      const response = await apiRequest('POST', '/api/admin/project-updates', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({ title: "Update posted successfully" });
      setShowNewUpdate(false);
      updateForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to post update",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onCreateProject = (data: ProjectForm) => {
    createProjectMutation.mutate({
      ...data,
      totalCost: data.totalCost * 100, // Convert to cents
      paidAmount: (data.paidAmount || 0) * 100, // Convert to cents
    });
  };

  const onCreateUpdate = (data: UpdateForm) => {
    createUpdateMutation.mutate(data);
  };

  const createBlogPostMutation = useMutation({
    mutationFn: async (data: BlogPostForm) => {
      const response = await apiRequest('POST', '/api/admin/blog-posts', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({ title: "Blog post created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog-posts'] });
      setShowNewBlogPost(false);
      blogForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to create blog post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createPortfolioItemMutation = useMutation({
    mutationFn: async (data: PortfolioItemForm) => {
      const response = await apiRequest('POST', '/api/admin/portfolio-items', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({ title: "Portfolio item created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/portfolio-items'] });
      setShowNewPortfolioItem(false);
      portfolioForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to create portfolio item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onCreateBlogPost = (data: BlogPostForm) => {
    createBlogPostMutation.mutate(data);
  };

  const onCreatePortfolioItem = (data: PortfolioItemForm) => {
    createPortfolioItemMutation.mutate(data);
  };

  const updateBlogPostMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<BlogPostForm> }) => {
      const response = await apiRequest('PUT', `/api/admin/blog-posts/${data.id}`, data.updates);
      return await response.json();
    },
    onSuccess: () => {
      toast({ title: "Blog post updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog-posts'] });
      setEditingBlogPost(null);
      blogForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to update blog post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePortfolioItemMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<PortfolioItemForm> }) => {
      const response = await apiRequest('PUT', `/api/admin/portfolio-items/${data.id}`, data.updates);
      return await response.json();
    },
    onSuccess: () => {
      toast({ title: "Portfolio item updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/portfolio-items'] });
      setEditingPortfolioItem(null);
      portfolioForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to update portfolio item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onUpdateBlogPost = (data: BlogPostForm) => {
    if (editingBlogPost) {
      updateBlogPostMutation.mutate({ id: editingBlogPost.id, updates: data });
    }
  };

  const onUpdatePortfolioItem = (data: PortfolioItemForm) => {
    if (editingPortfolioItem) {
      updatePortfolioItemMutation.mutate({ id: editingPortfolioItem.id, updates: data });
    }
  };

  const handleEditBlogPost = (post: any) => {
    setEditingBlogPost(post);
    blogForm.reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      status: post.status,
      tags: post.tags || [],
      publishedAt: post.publishedAt || undefined,
    });
  };

  const handleEditPortfolioItem = (item: any) => {
    setEditingPortfolioItem(item);
    portfolioForm.reset({
      title: item.title,
      slug: item.slug,
      description: item.description,
      shortDescription: item.shortDescription,
      featuredImage: item.featuredImage,
      category: item.category,
      clientName: item.clientName || undefined,
      projectUrl: item.projectUrl || undefined,
      githubUrl: item.githubUrl || undefined,
      status: item.status,
      featured: item.featured || false,
      gallery: item.gallery || [],
      technologies: item.technologies || [],
      completedAt: item.completedAt || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage clients, projects, and communications</p>
          <div className="mt-4">
            <a 
              href="/"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              ← Back to Main Website
            </a>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clients.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {allProjects.filter((p: any) => p.status === 'in-progress').length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {contacts.filter((c: any) => c.status === 'new').length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(allProjects.reduce((sum: number, p: any) => sum + (p.paidAmount || 0), 0))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest project updates and client activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allProjects.slice(0, 5).map((project: any) => (
                    <div key={project.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-600">Status: {project.status}</p>
                      </div>
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>View and manage all clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client: any) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{client.name}</h3>
                        <p className="text-sm text-gray-600">{client.email}</p>
                        <p className="text-sm text-gray-500">{client.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono">{client.accessCode}</p>
                        <p className="text-xs text-gray-500">Access Code</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Project Management</h2>
              <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                      Add a new project for a client
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...projectForm}>
                    <form onSubmit={projectForm.handleSubmit(onCreateProject)} className="space-y-4">
                      <FormField
                        control={projectForm.control}
                        name="clientId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {clients.map((client: any) => (
                                  <SelectItem key={client.id} value={client.id.toString()}>
                                    {client.name} - {client.company}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={projectForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter project title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={projectForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Project description" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={projectForm.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="review">Review</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="on-hold">On Hold</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={projectForm.control}
                          name="priority"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Priority</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="urgent">Urgent</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={projectForm.control}
                        name="package"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Package</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., new-build, redesign, hosting" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={projectForm.control}
                          name="totalCost"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Cost ($)</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={projectForm.control}
                          name="paidAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Paid Amount ($)</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number" 
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={projectForm.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setShowNewProject(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={createProjectMutation.isPending}>
                          {createProjectMutation.isPending ? "Creating..." : "Create Project"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {allProjects.map((project: any) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={project.priority === 'urgent' ? 'destructive' : 'default'}>
                          {project.priority}
                        </Badge>
                        <Badge variant="outline">
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Package</p>
                        <p className="text-gray-600">{project.package}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Cost</p>
                        <p className="text-gray-600">{formatCurrency(project.totalCost)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Paid</p>
                        <p className="text-gray-600">{formatCurrency(project.paidAmount || 0)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Due Date</p>
                        <p className="text-gray-600">
                          {project.dueDate ? formatDate(project.dueDate) : 'Not set'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>View and manage contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact: any) => (
                    <Card key={contact.id}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium">{contact.name}</h3>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                            {contact.phone && (
                              <p className="text-sm text-gray-600">{contact.phone}</p>
                            )}
                            {contact.service && (
                              <Badge variant="outline" className="mt-2">
                                {contact.service}
                              </Badge>
                            )}
                          </div>
                          <div>
                            <p className="text-sm">{contact.message}</p>
                            <div className="flex items-center justify-between mt-4">
                              <Badge variant={contact.status === 'new' ? 'default' : 'secondary'}>
                                {contact.status}
                              </Badge>
                              <p className="text-xs text-gray-500">
                                {formatDate(contact.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Blog Management</CardTitle>
                  <CardDescription>Create and manage blog posts</CardDescription>
                </div>
                <Button onClick={() => setShowNewBlogPost(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {blogPosts.map((post: any) => (
                    <Card key={post.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-gray-600">{post.excerpt}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status}
                              </Badge>
                              <span className="text-xs text-gray-500">by {post.author}</span>
                              {post.publishedAt && (
                                <span className="text-xs text-gray-500">
                                  • {formatDate(post.publishedAt)}
                                </span>
                              )}
                            </div>
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {post.tags.map((tag: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditBlogPost(post)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Portfolio Management</CardTitle>
                  <CardDescription>Manage portfolio items and case studies</CardDescription>
                </div>
                <Button onClick={() => setShowNewPortfolioItem(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {portfolioItems.map((item: any) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.shortDescription}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{item.category}</Badge>
                              <Badge variant={item.featured ? 'default' : 'secondary'}>
                                {item.featured ? 'Featured' : 'Regular'}
                              </Badge>
                              <Badge variant="outline">{item.status}</Badge>
                            </div>
                            {item.technologies && item.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.technologies.map((tech: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            {item.clientName && (
                              <p className="text-sm text-gray-600">Client: {item.clientName}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditPortfolioItem(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Blog Post Creation/Edit Dialog */}
        <Dialog open={showNewBlogPost || !!editingBlogPost} onOpenChange={(open) => {
          if (!open) {
            setShowNewBlogPost(false);
            setEditingBlogPost(null);
            blogForm.reset();
          }
        }}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBlogPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
              <DialogDescription>
                {editingBlogPost ? 'Update your blog post' : 'Add a new blog post to your website'}
              </DialogDescription>
            </DialogHeader>
            <Form {...blogForm}>
              <form onSubmit={blogForm.handleSubmit(editingBlogPost ? onUpdateBlogPost : onCreateBlogPost)} className="space-y-4">
                <FormField
                  control={blogForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={blogForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="blog-post-url-slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={blogForm.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief description of the blog post" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={blogForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Full blog post content" 
                          className="min-h-[200px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={blogForm.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input placeholder="Author name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={blogForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setShowNewBlogPost(false);
                    setEditingBlogPost(null);
                    blogForm.reset();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createBlogPostMutation.isPending || updateBlogPostMutation.isPending}>
                    {editingBlogPost 
                      ? (updateBlogPostMutation.isPending ? "Updating..." : "Update Post")
                      : (createBlogPostMutation.isPending ? "Creating..." : "Create Post")
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Portfolio Item Creation Dialog */}
        <Dialog open={showNewPortfolioItem} onOpenChange={setShowNewPortfolioItem}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Portfolio Item</DialogTitle>
              <DialogDescription>
                Add a new project to your portfolio
              </DialogDescription>
            </DialogHeader>
            <Form {...portfolioForm}>
              <form onSubmit={portfolioForm.handleSubmit(onCreatePortfolioItem)} className="space-y-4">
                <FormField
                  control={portfolioForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={portfolioForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="project-url-slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={portfolioForm.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief project description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={portfolioForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detailed project description" 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={portfolioForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={portfolioForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={portfolioForm.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={portfolioForm.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Client or company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={portfolioForm.control}
                  name="projectUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://project-website.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowNewPortfolioItem(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createPortfolioItemMutation.isPending}>
                    {createPortfolioItemMutation.isPending ? "Creating..." : "Create Item"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}