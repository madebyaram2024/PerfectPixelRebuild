import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  LogOut, 
  Clock, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Play,
  Eye
} from 'lucide-react';
import type { Client, ClientProject } from '@shared/schema';

function getStatusColor(status: string) {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'in-progress': return 'bg-blue-500';
    case 'review': return 'bg-yellow-500';
    case 'on-hold': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'urgent': return 'destructive';
    case 'high': return 'default';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'secondary';
  }
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function ClientDashboard() {
  const [client, setClient] = useState<Client | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const clientData = localStorage.getItem('clientData');
    if (!clientData) {
      setLocation('/client/login');
      return;
    }
    setClient(JSON.parse(clientData));
  }, [setLocation]);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/client', client?.id, 'projects'],
    enabled: !!client?.id,
  });

  const handleLogout = () => {
    localStorage.removeItem('clientData');
    setLocation('/client/login');
  };

  const viewProject = (projectId: number) => {
    setLocation(`/client/project/${projectId}`);
  };

  if (!client) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Welcome back, {client.name}</h1>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Projects</h2>
          <p className="text-gray-600">Track the progress of your website projects</p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: ClientProject) => {
              const progress = project.status === 'completed' ? 100 : 
                             project.status === 'review' ? 90 :
                             project.status === 'in-progress' ? 60 :
                             project.status === 'on-hold' ? 30 : 10;

              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Badge variant={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Status</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                        <span className="text-sm capitalize">{project.status.replace('-', ' ')}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Package */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Package</span>
                      <span className="text-sm capitalize">{project.package.replace('-', ' ')}</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Cost</span>
                      <span className="text-sm font-semibold">{formatCurrency(project.totalCost)}</span>
                    </div>

                    {project.paidAmount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Paid</span>
                        <span className="text-sm text-green-600">{formatCurrency(project.paidAmount)}</span>
                      </div>
                    )}

                    {/* Dates */}
                    {project.dueDate && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}

                    <Separator />

                    {/* Actions */}
                    <Button 
                      onClick={() => viewProject(project.id)}
                      className="w-full"
                      variant="outline"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
              <p className="text-gray-600">
                Your projects will appear here once they're created. Contact us to get started!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Have questions about your project? We're here to help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Project Manager</p>
                  <p className="text-sm text-gray-600">support@perfectpixelai.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Support Hours</p>
                  <p className="text-sm text-gray-600">Mon-Fri, 9AM-6PM PST</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}