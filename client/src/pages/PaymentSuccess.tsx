import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Mail, Calendar } from 'lucide-react';

export default function PaymentSuccess() {
  useEffect(() => {
    // Track successful payment
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        event_category: 'ecommerce',
        event_label: 'service_payment',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
            <CardTitle className="text-3xl text-white mb-2">Payment Successful!</CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Thank you for choosing PerfectPixel AI for your web development needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Confirmation Email</p>
                    <p className="text-slate-300 text-sm">You'll receive a detailed confirmation email within the next few minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Project Kickoff</p>
                    <p className="text-slate-300 text-sm">Our team will contact you within 24 hours to schedule your project kickoff meeting</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Client Portal Access</p>
                    <p className="text-slate-300 text-sm">Track your project progress in real-time through our dedicated client portal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/client-login">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Access Client Portal
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                  Return Home
                </Button>
              </Link>
            </div>

            <div className="text-center text-slate-400 text-sm">
              <p>Need help? Contact us at <a href="mailto:support@perfectpixelai.com" className="text-yellow-400 hover:underline">support@perfectpixelai.com</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}