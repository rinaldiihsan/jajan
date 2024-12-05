'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: number;
  category_name: string;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Product[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: 0,
    image_url: '',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const priceFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  const fetchProducts = async () => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: ApiResponse = await response.json();

      if (data.status === 'success') {
        setProducts(data.data);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat data produk',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    fetchProducts();
    fetchCategories();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category_id,
      image_url: product.image_url,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast({
          title: 'Berhasil',
          description: 'Produk berhasil diperbarui',
        });
        setSelectedProduct(null);
        fetchProducts();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memperbarui produk',
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast({
          title: 'Berhasil',
          description: 'Produk berhasil dihapus',
        });
        fetchProducts();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal menghapus produk',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Produk</h1>
        <Link href="/admin/products/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Produk
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gambar</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori ID</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Belum ada data produk
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image src={product.image_url} alt={product.name} width={50} height={50} className="rounded-md object-cover w-[50px] h-[50px]" />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category_id}</TableCell>
                  <TableCell>{priceFormatter.format(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(product)}>
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl">
                        <DialogHeader>
                          <DialogTitle>Edit Produk</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Nama Produk</label>
                            <Input value={editForm.name} onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))} required />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Kategori</label>
                            <Select value={String(editForm.category_id)} onValueChange={(value) => setEditForm((prev) => ({ ...prev, category_id: Number(value) }))}>
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
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Harga</label>
                              <Input type="number" value={editForm.price} onChange={(e) => setEditForm((prev) => ({ ...prev, price: Number(e.target.value) }))} required />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Stok</label>
                              <Input type="number" value={editForm.stock} onChange={(e) => setEditForm((prev) => ({ ...prev, stock: Number(e.target.value) }))} required />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Deskripsi</label>
                            <Textarea value={editForm.description} onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))} />
                          </div>
                          <div>
                            <label className="text-sm font-medium">URL Gambar</label>
                            <Input value={editForm.image_url} onChange={(e) => setEditForm((prev) => ({ ...prev, image_url: e.target.value }))} required />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button type="submit">Simpan</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Hapus
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Produk</AlertDialogTitle>
                          <AlertDialogDescription>Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id)}>Hapus</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
