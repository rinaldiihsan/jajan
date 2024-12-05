'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
}

interface ProductForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image_url: string;
}

export default function AddProduct() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: 0,
    image_url: '',
  });

  const fetchCategories = async () => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.status === 'success') {
        setCategories(data.data);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat data kategori',
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast({
          title: 'Berhasil',
          description: 'Produk berhasil ditambahkan',
        });
        router.push('/admin/products');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal menambahkan produk',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 w-full mx-auto">
      <div className="flex flex-col items-start gap-4 mb-8">
        <Link href="/admin/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Tambah Produk</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-sm font-medium" htmlFor="name">
              Nama Produk
            </label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder="Masukkan nama produk" required />
          </div>

          <div>
            <label className="text-sm font-medium">Kategori</label>
            <Select value={String(formData.category_id)} onValueChange={(value) => setFormData((prev) => ({ ...prev, category_id: Number(value) }))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="image_url">
              URL Gambar
            </label>
            <Input id="image_url" value={formData.image_url} onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))} placeholder="Masukkan URL gambar" required />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="price">
              Harga
            </label>
            <Input id="price" type="number" min="0" value={formData.price} onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))} placeholder="Masukkan harga" required />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="stock">
              Stok
            </label>
            <Input id="stock" type="number" min="0" value={formData.stock} onChange={(e) => setFormData((prev) => ({ ...prev, stock: Number(e.target.value) }))} placeholder="Masukkan stok" required />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium" htmlFor="description">
              Deskripsi
            </label>
            <Textarea id="description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} placeholder="Masukkan deskripsi produk" className="min-h-[100px]" />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Link href="/admin/products">
            <Button variant="outline" type="button">
              Batal
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
