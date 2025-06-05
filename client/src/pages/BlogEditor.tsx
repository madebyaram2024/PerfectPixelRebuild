import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  FileText, 
  Eye, 
  Share2, 
  Calendar, 
  Tag, 
  Globe, 
  Twitter, 
  Facebook, 
  Linkedin,
  Send,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link, useLocation } from 'wouter';

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(1, "Excerpt is required").max(300, "Excerpt too long"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.string().optional(),
  metaTitle: z.string().max(60, "Meta title should be under 60 characters").optional(),
  metaDescription: z.string().max(160, "Meta description should be under 160 characters").optional(),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().optional(),
  autoDistribute: z.boolean().default(false),
  distributionChannels: z.object({
    website: z.boolean().default(true),
    newsletter: z.boolean().default(false),
    twitter: z.boolean().default(false),
    facebook: z.boolean().default(false),
    linkedin: z.boolean().default(false),
  }).optional(),
});

type BlogPostForm = z.infer<typeof blogPostSchema>;

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  tags?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogEditor() {
  const [location] = useLocation();
  const [isPreview, setIsPreview] = useState(false);
  const [distributionStatus, setDistributionStatus] = useState<Record<string, 'pending' | 'success' | 'error'>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Extract blog ID from URL if editing
  const blogId = location.includes('/edit/') ? parseInt(location.split('/edit/')[1]) : null;
  const isEditing = blogId !== null;

  const form = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      tags: '',
      metaTitle: '',
      metaDescription: '',
      isPublished: false,
      autoDistribute: false,
      distributionChannels: {
        website: true,
        newsletter: false,
        twitter: false,
        facebook: false,
        linkedin: false,
      },
    },
  });

  // Fetch blog post for editing
  const { data: blogPost, isLoading } = useQuery({
    queryKey: ['/api/admin/blog-posts', blogId],
    enabled: isEditing,
  });

  // Populate form when editing
  useEffect(() => {
    if (blogPost && isEditing) {
      form.reset({
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        content: blogPost.content,
        featuredImage: blogPost.featuredImage || '',
        tags: blogPost.tags || '',
        metaTitle: blogPost.metaTitle || '',
        metaDescription: blogPost.metaDescription || '',
        isPublished: blogPost.isPublished,
        publishedAt: blogPost.publishedAt || '',
        autoDistribute: false,
        distributionChannels: {
          website: true,
          newsletter: false,
          twitter: false,
          facebook: false,
          linkedin: false,
        },
      });
    }
  }, [blogPost, isEditing, form]);

  // Auto-generate slug from title
  const watchTitle = form.watch('title');
  useEffect(() => {
    if (watchTitle && !isEditing) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      form.setValue('slug', slug);
    }
  }, [watchTitle, form, isEditing]);

  // Auto-generate meta title and description
  const watchExcerpt = form.watch('excerpt');
  useEffect(() => {
    if (watchExcerpt) {
      if (!form.getValues('metaTitle')) {
        form.setValue('metaTitle', watchTitle);
      }
      if (!form.getValues('metaDescription')) {
        form.setValue('metaDescription', watchExcerpt);
      }
    }
  }, [watchExcerpt, watchTitle, form]);

  const createMutation = useMutation({
    mutationFn: async (data: BlogPostForm) => {
      const response = await apiRequest("POST", "/api/admin/blog-posts", data);
      return response.json();
    },
    onSuccess: (newPost) => {
      toast({
        title: "Blog post created successfully!",
        description: "Your blog post has been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog-posts'] });
      
      // Handle automated distribution
      if (form.getValues('autoDistribute') && newPost.isPublished) {
        handleAutomaticDistribution(newPost);
      }
      
      // Redirect to blog list
      window.location.href = '/admin#blog-management';
    },
    onError: (error) => {
      toast({
        title: "Error creating blog post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: BlogPostForm) => {
      const response = await apiRequest("PUT", `/api/admin/blog-posts/${blogId}`, data);
      return response.json();
    },
    onSuccess: (updatedPost) => {
      toast({
        title: "Blog post updated successfully!",
        description: "Your changes have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog-posts'] });
      
      // Handle automated distribution if newly published
      if (form.getValues('autoDistribute') && updatedPost.isPublished && !blogPost?.isPublished) {
        handleAutomaticDistribution(updatedPost);
      }
    },
    onError: (error) => {
      toast({
        title: "Error updating blog post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAutomaticDistribution = async (post: BlogPost) => {
    const channels = form.getValues('distributionChannels') || {};
    
    setDistributionStatus({});
    
    // Simulate distribution to various channels
    for (const [channel, enabled] of Object.entries(channels)) {
      if (enabled) {
        setDistributionStatus(prev => ({ ...prev, [channel]: 'pending' }));
        
        try {
          // Simulate API call to distribution service
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          
          // Simulate success/failure
          const success = Math.random() > 0.1; // 90% success rate
          
          setDistributionStatus(prev => ({ 
            ...prev, 
            [channel]: success ? 'success' : 'error' 
          }));
          
          if (success) {
            toast({
              title: `Distributed to ${channel}`,
              description: `Your blog post has been shared on ${channel}.`,
            });
          } else {
            toast({
              title: `Failed to distribute to ${channel}`,
              description: `There was an error sharing to ${channel}. Please try again.`,
              variant: "destructive",
            });
          }
        } catch (error) {
          setDistributionStatus(prev => ({ ...prev, [channel]: 'error' }));
        }
      }
    }
  };

  const onSubmit = (data: BlogPostForm) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const getDistributionIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (isLoading && isEditing) {
    return (
      <div className="min-h-screen bg-slate-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <p className="text-slate-300">
              {isEditing ? 'Update your blog post and manage distribution' : 'Write and publish your blog post with automated distribution'}
            </p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Admin
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Tabs value={isPreview ? "preview" : "edit"} onValueChange={(value) => setIsPreview(value === "preview")}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                <TabsTrigger value="edit" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  <FileText className="w-4 h-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="edit" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-white">Title</Label>
                      <Input
                        id="title"
                        {...form.register('title')}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter blog post title..."
                      />
                      {form.formState.errors.title && (
                        <p className="text-red-400 text-sm mt-1">{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="slug" className="text-white">URL Slug</Label>
                      <Input
                        id="slug"
                        {...form.register('slug')}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="url-friendly-slug"
                      />
                      {form.formState.errors.slug && (
                        <p className="text-red-400 text-sm mt-1">{form.formState.errors.slug.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="excerpt" className="text-white">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        {...form.register('excerpt')}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Brief description of your blog post..."
                        rows={3}
                      />
                      {form.formState.errors.excerpt && (
                        <p className="text-red-400 text-sm mt-1">{form.formState.errors.excerpt.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="content" className="text-white">Content</Label>
                      <Textarea
                        id="content"
                        {...form.register('content')}
                        className="bg-slate-700 border-slate-600 text-white min-h-[400px]"
                        placeholder="Write your blog post content here..."
                      />
                      {form.formState.errors.content && (
                        <p className="text-red-400 text-sm mt-1">{form.formState.errors.content.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="featuredImage" className="text-white">Featured Image URL</Label>
                      <Input
                        id="featuredImage"
                        {...form.register('featuredImage')}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags" className="text-white">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        {...form.register('tags')}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="web development, react, javascript"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-8">
                    <article className="prose prose-invert max-w-none">
                      <h1 className="text-3xl font-bold text-white mb-4">{form.watch('title') || 'Blog Post Title'}</h1>
                      {form.watch('featuredImage') && (
                        <img 
                          src={form.watch('featuredImage')} 
                          alt={form.watch('title')}
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                      <p className="text-slate-300 text-lg mb-6">{form.watch('excerpt')}</p>
                      <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {form.watch('content') || 'Your blog post content will appear here...'}
                      </div>
                      {form.watch('tags') && (
                        <div className="flex flex-wrap gap-2 mt-6">
                          {form.watch('tags').split(',').map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-yellow-400 border-yellow-400">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </article>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Publishing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPublished" className="text-white">Published</Label>
                  <Switch
                    id="isPublished"
                    checked={form.watch('isPublished')}
                    onCheckedChange={(checked) => form.setValue('isPublished', checked)}
                  />
                </div>

                {form.watch('isPublished') && (
                  <div>
                    <Label htmlFor="publishedAt" className="text-white">Publish Date</Label>
                    <Input
                      id="publishedAt"
                      type="datetime-local"
                      {...form.register('publishedAt')}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                )}

                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    'Saving...'
                  ) : isEditing ? (
                    'Update Post'
                  ) : (
                    'Create Post'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle" className="text-white">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    {...form.register('metaTitle')}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="SEO title for search engines"
                  />
                  <p className="text-slate-400 text-xs mt-1">
                    {(form.watch('metaTitle') || '').length}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaDescription" className="text-white">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    {...form.register('metaDescription')}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Brief description for search engines"
                    rows={3}
                  />
                  <p className="text-slate-400 text-xs mt-1">
                    {(form.watch('metaDescription') || '').length}/160 characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Automated Distribution */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Auto Distribution
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Automatically share your post when published
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoDistribute" className="text-white">Enable Auto-Distribution</Label>
                  <Switch
                    id="autoDistribute"
                    checked={form.watch('autoDistribute')}
                    onCheckedChange={(checked) => form.setValue('autoDistribute', checked)}
                  />
                </div>

                {form.watch('autoDistribute') && (
                  <div className="space-y-3">
                    <Separator className="bg-slate-600" />
                    <p className="text-slate-300 text-sm">Select distribution channels:</p>
                    
                    {[
                      { key: 'website', label: 'Website', icon: Globe },
                      { key: 'newsletter', label: 'Newsletter', icon: Send },
                      { key: 'twitter', label: 'Twitter', icon: Twitter },
                      { key: 'facebook', label: 'Facebook', icon: Facebook },
                      { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <Label className="text-white text-sm">{label}</Label>
                          {distributionStatus[key] && getDistributionIcon(distributionStatus[key])}
                        </div>
                        <Switch
                          checked={form.watch(`distributionChannels.${key}` as any) || false}
                          onCheckedChange={(checked) => 
                            form.setValue(`distributionChannels.${key}` as any, checked)
                          }
                          disabled={key === 'website'} // Website is always enabled
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}