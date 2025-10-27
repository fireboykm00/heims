import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Equipment, Supplier } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  const [formData, setFormData] = useState<Partial<Equipment>>({
    name: '',
    category: '',
    status: 'OPERATIONAL',
    description: '',
    serialNumber: '',
    model: '',
    location: '',
  });
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [equipmentRes, suppliersRes] = await Promise.all([
        api.getEquipment(),
        api.getSuppliers(),
      ]);
      setEquipment(equipmentRes.data);
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
      const data = { ...formData, supplier: selectedSupplier } as Equipment;

      if (editingEquipment?.equipmentId) {
        await api.updateEquipment(editingEquipment.equipmentId, data);
      } else {
        await api.createEquipment(data);
      }
      
      setDialogOpen(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Failed to save equipment:', error);
      alert('Failed to save equipment. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      try {
        await api.deleteEquipment(id);
        loadData();
      } catch (error) {
        console.error('Failed to delete equipment:', error);
      }
    }
  };

  const handleEdit = (equip: Equipment) => {
    setEditingEquipment(equip);
    setFormData({
      name: equip.name,
      category: equip.category,
      status: equip.status,
      description: equip.description,
      serialNumber: equip.serialNumber,
      model: equip.model,
      location: equip.location,
      purchaseDate: equip.purchaseDate,
      purchasePrice: equip.purchasePrice,
      nextMaintenanceDate: equip.nextMaintenanceDate,
    });
    setSelectedSupplierId(equip.supplier?.supplierId);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingEquipment(null);
    setFormData({
      name: '',
      category: '',
      status: 'OPERATIONAL',
      description: '',
      serialNumber: '',
      model: '',
      location: '',
    });
    setSelectedSupplierId(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPERATIONAL': return 'text-green-600 bg-green-50';
      case 'MAINTENANCE': return 'text-yellow-600 bg-yellow-50';
      case 'OUT_OF_ORDER': return 'text-red-600 bg-red-50';
      case 'RETIRED': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading equipment...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipment</h1>
          <p className="text-gray-500 mt-1">Manage hospital equipment</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}</DialogTitle>
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
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Equipment['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OPERATIONAL">Operational</SelectItem>
                      <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                      <SelectItem value="OUT_OF_ORDER">Out of Order</SelectItem>
                      <SelectItem value="RETIRED">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Purchase Price</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    step="0.01"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextMaintenanceDate">Next Maintenance</Label>
                  <Input
                    id="nextMaintenanceDate"
                    type="date"
                    value={formData.nextMaintenanceDate}
                    onChange={(e) => setFormData({ ...formData, nextMaintenanceDate: e.target.value })}
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
                  {editingEquipment ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No equipment found. Click "Add Equipment" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                equipment.map((equip) => (
                <TableRow key={equip.equipmentId}>
                  <TableCell className="font-medium">{equip.name}</TableCell>
                  <TableCell>{equip.category}</TableCell>
                  <TableCell className="font-mono text-sm">{equip.serialNumber || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(equip.status)}`}>
                      {equip.status}
                    </span>
                  </TableCell>
                  <TableCell>{equip.location || '-'}</TableCell>
                  <TableCell>
                    {equip.nextMaintenanceDate ? format(new Date(equip.nextMaintenanceDate), 'MMM dd, yyyy') : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(equip)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(equip.equipmentId!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
