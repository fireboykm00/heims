import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { Medicine, Supplier } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

export default function MedicinesPage() {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  const [formData, setFormData] = useState<Partial<Medicine>>({
    name: '',
    category: '',
    quantity: 0,
    unitPrice: 0,
    expiryDate: '',
    description: '',
    batchNumber: '',
  });
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [medicinesRes, suppliersRes] = await Promise.all([
        api.getMedicines(),
        api.getSuppliers(),
      ]);
      setMedicines(medicinesRes.data);
      setSuppliers(suppliersRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedSupplier = selectedSupplierId 
        ? suppliers.find(s => s.supplierId === selectedSupplierId)
        : undefined;
      const data = { ...formData, supplier: selectedSupplier } as Medicine;

      if (editingMedicine?.medicineId) {
        await api.updateMedicine(editingMedicine.medicineId, data);
      } else {
        await api.createMedicine(data);
      }
      
      setDialogOpen(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Failed to save medicine:', error);
      alert('Failed to save medicine. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      try {
        await api.deleteMedicine(id);
        loadData();
      } catch (error) {
        console.error('Failed to delete medicine:', error);
      }
    }
  };

  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category,
      quantity: medicine.quantity,
      unitPrice: medicine.unitPrice,
      expiryDate: medicine.expiryDate,
      description: medicine.description,
      batchNumber: medicine.batchNumber,
    });
    setSelectedSupplierId(medicine.supplier?.supplierId);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingMedicine(null);
    setFormData({
      name: '',
      category: '',
      quantity: 0,
      unitPrice: 0,
      expiryDate: '',
      description: '',
      batchNumber: '',
    });
    setSelectedSupplierId(undefined);
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return <div className="text-center py-12">Loading medicines...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medicines</h1>
          <p className="text-gray-500 mt-1">Manage medicine inventory</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batchNumber">Batch Number</Label>
                  <Input
                    id="batchNumber"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select
                    value={selectedSupplierId?.toString()}
                    onValueChange={(value) => setSelectedSupplierId(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.supplierId} value={supplier.supplierId!.toString()}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingMedicine ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medicine List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No medicines found. Click "Add Medicine" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                medicines.map((medicine) => (
                <TableRow key={medicine.medicineId}>
                  <TableCell className="font-medium">{medicine.name}</TableCell>
                  <TableCell>{medicine.category}</TableCell>
                  <TableCell>
                    <span className={medicine.quantity < 50 ? 'text-red-600 font-semibold' : ''}>
                      {medicine.quantity}
                      {medicine.quantity < 50 && <AlertTriangle className="inline h-4 w-4 ml-1" />}
                    </span>
                  </TableCell>
                  <TableCell>${medicine.unitPrice?.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={
                      isExpired(medicine.expiryDate) ? 'text-red-600 font-semibold' :
                      isExpiringSoon(medicine.expiryDate) ? 'text-yellow-600 font-semibold' : ''
                    }>
                      {format(new Date(medicine.expiryDate), 'MMM dd, yyyy')}
                      {(isExpired(medicine.expiryDate) || isExpiringSoon(medicine.expiryDate)) && 
                        <AlertTriangle className="inline h-4 w-4 ml-1" />
                      }
                    </span>
                  </TableCell>
                  <TableCell>{medicine.supplier?.name || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(medicine)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user?.role === 'ADMIN' && (
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(medicine.medicineId!)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
