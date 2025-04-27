
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function SocialLinks() {
  const { toast } = useToast();

  const handleLink = (platform: string) => {
    // In a real app, this would initiate OAuth flow
    toast({
      title: "Social Account Linked",
      description: `Your ${platform} account has been linked successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-lg font-semibold">
          Link Social Accounts
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleLink("Facebook")}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Link Facebook
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleLink("Twitter")}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Link Twitter
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleLink("Instagram")}
            >
              <Instagram className="mr-2 h-4 w-4" />
              Link Instagram
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleLink("LinkedIn")}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Link LinkedIn
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
