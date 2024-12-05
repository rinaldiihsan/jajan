'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface SimpleNavUserProps {
  user: {
    name: string;
    email: string;
  };
}

export function SimpleNavUser({ user }: SimpleNavUserProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('userName');
    toast({
      title: 'Berhasil Logout',
      description: 'Sampai jumpa kembali!',
    });
    router.push('/login');
  };

  return (
    <div className="px-3 py-4 space-y-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
